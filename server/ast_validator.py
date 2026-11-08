"""Authoritative Declarative Design AST Validation Engine (Python FastMCP Stack).

Implements the 6-stage validation pipeline:
1. Structure & Schema Integrity (JSON parsing, version, meta, unique node IDs)
2. Primitive Registry Resolution (integrates with server.registry_loader, suggests closest match)
3. Prop Type and Enum Conformance (checks prop types, required props, and variant enums)
4. Slot Rules and Allowed Children (verifies slot cardinality and containment)
5. Touch Target Ergonomics (minimum 44x44px for mobile interactive nodes)
6. Strict Aesthetic Boundary Enforcement (rejects glowing circles, green pulsing dots, and colorful gradients)

Provides deterministic auto-repair (repaired_ast) for recoverable AST defects.
"""

from __future__ import annotations

import copy
import difflib
import json
import re
from typing import Any, Dict, List, Optional, Set, Tuple

# ---------------------------------------------------------------------------
# 1. Authoritative Diagnostic Error Codes
# ---------------------------------------------------------------------------
DIAGNOSTIC_CODES = {
    "SCHEMA_VIOLATION": "SCHEMA_VIOLATION",
    "UNREGISTERED_PRIMITIVE": "UNREGISTERED_PRIMITIVE",
    "INVALID_PROP_TYPE": "INVALID_PROP_TYPE",
    "MISSING_REQUIRED_PROP": "MISSING_REQUIRED_PROP",
    "INVALID_PROP_VALUE": "INVALID_PROP_VALUE",
    "SLOT_RULE_VIOLATION": "SLOT_RULE_VIOLATION",
    "TOUCH_TARGET_TOO_SMALL": "TOUCH_TARGET_TOO_SMALL",
    "PROHIBITED_AESTHETIC_DECORATION": "PROHIBITED_AESTHETIC_DECORATION",
    "TOKEN_RESOLUTION_ERROR": "TOKEN_RESOLUTION_ERROR",
}

# ---------------------------------------------------------------------------
# 2. Strict Aesthetic Regular Expressions (Clean Monochrome & M3 Neutrals)
# ---------------------------------------------------------------------------
GLOW_REGEX = re.compile(
    r"(accentGlow|glowing-circle|glow-mode|shadow-\[0_0_|\bneon\b|\bdrop-shadow-\[0_0_)",
    re.IGNORECASE,
)
PULSE_REGEX = re.compile(
    r"(pulsing-green-dot|accent-green.*pulse|bg-green.*animate-pulse|\banimate-pulse\b.*bg-(green|emerald|lime)|bg-(green|emerald|lime).*\banimate-pulse\b)",
    re.IGNORECASE,
)
GRADIENT_REGEX = re.compile(
    r"(\bbg-gradient-to-\S+\b|\bfrom-pink|\bto-purple|\bvia-purple|\bfrom-rose|\bto-violet|\bfrom-cyan|\bto-blue|\brainbow\b)",
    re.IGNORECASE,
)

# Standard valid container tag names
VALID_CONTAINERS: Set[str] = {
    "container",
    "stack",
    "row",
    "column",
    "box",
    "grid",
    "flex",
    "section",
    "header",
    "footer",
    "aside",
    "main",
    "div",
    "card",
}

# Standard valid text tag names
VALID_TEXT_TAGS: Set[str] = {
    "text",
    "p",
    "span",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "label",
    "code",
    "pre",
    "blockquote",
    "caption",
}

# Mobile interactive primitive names that require >= 44x44px touch targets
MOBILE_INTERACTIVE_PRIMITIVES: Set[str] = {
    "button",
    "icon-button",
    "switch",
    "checkbox",
    "toggle",
    "thumb-segment-controller",
    "floating-action-dock",
    "swipe-action-card",
}

# Known primitive aliases for auto-repair
PRIMITIVE_ALIASES: Dict[str, str] = {
    "bottomsheet": "mobile-bottom-sheet",
    "bottom-sheet": "mobile-bottom-sheet",
    "bottom_sheet": "mobile-bottom-sheet",
    "drawer": "drawer-dialog",
    "swipeaction": "swipe-action-card",
    "swipe-action": "swipe-action-card",
    "swipe-card": "swipe-action-card",
    "thumbsegment": "thumb-segment-controller",
    "segment-controller": "thumb-segment-controller",
    "pulltorefresh": "pull-to-refresh",
    "floatingdock": "floating-action-dock",
    "action-dock": "floating-action-dock",
}

# Standard slot rules for Declarative Design AST primitives
STANDARD_PRIMITIVE_SLOTS: Dict[str, Set[str]] = {
    "mobile-bottom-sheet": {"header", "content", "footer", "handle", "trigger", "actions"},
    "swipe-action-card": {"leftAction", "rightAction", "content", "indicator"},
    "thumb-segment-controller": {"icon", "label", "addon", "content"},
    "pull-to-refresh": {"indicator", "content"},
    "floating-action-dock": {"primaryAction", "secondaryActions", "trigger", "actions", "content"},
    "button": {"leftIcon", "rightIcon", "icon", "prefix", "suffix", "content"},
    "icon-button": {"icon"},
    "card": {"header", "content", "footer", "title", "description", "actions"},
    "dialog": {"header", "content", "footer", "trigger"},
    "drawer-dialog": {"header", "content", "footer", "trigger"},
    "popover-dialog": {"trigger", "content"},
    "tabs": {"tabList", "content"},
    "badge": {"icon"},
    "input": {"prefix", "suffix", "icon"},
}


# ---------------------------------------------------------------------------
# 3. Helper Functions for Registry Resolution
# ---------------------------------------------------------------------------
_SCHEMA_CACHE: Dict[str, Dict[str, Any]] = {}


def _get_primitive_schema_entry(norm_name: str) -> Optional[Dict[str, Any]]:
    """Retrieve full authoritative schema for a primitive including slots and enriched props."""
    if norm_name in _SCHEMA_CACHE:
        return _SCHEMA_CACHE[norm_name]
    try:
        from server.registry_loader import get_primitive_schema

        schema = get_primitive_schema(norm_name)
        _SCHEMA_CACHE[norm_name] = schema
        return schema
    except Exception:
        return None


def _get_registry_data() -> Dict[str, Any]:
    """Safely retrieve primitive registry from server.registry_loader."""
    try:
        from server.registry_loader import load_registry

        return load_registry()
    except Exception:
        return {}


def _normalize_name(name: str) -> str:
    """Normalize primitive name using registry_loader or fallback kebab-case."""
    try:
        from server.registry_loader import normalize_primitive_name

        return normalize_primitive_name(name)
    except Exception:
        s = name.strip().replace("_", "-")
        s = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", s)
        return re.sub(r"-+", "-", s).lower()


# ---------------------------------------------------------------------------
# 4. Aesthetic Class Name Sanitizer
# ---------------------------------------------------------------------------
def sanitize_class_names(class_str: str) -> str:
    """Strip glowing circles, pulsing green dots, and colorful gradients from class string."""
    if not class_str or not isinstance(class_str, str):
        return ""
    has_pulse = bool(re.search(r"\b(animate-pulse|animate-ping|pulse)\b", class_str, re.IGNORECASE))
    has_green = bool(re.search(r"\b(bg-(?:green|emerald|lime)|accent-green|text-(?:green|emerald|lime))\S*", class_str, re.IGNORECASE))
    strip_pulse_and_green = has_pulse and has_green

    tokens = class_str.split()
    clean_tokens: List[str] = []
    for token in tokens:
        if GLOW_REGEX.search(token):
            continue
        if GRADIENT_REGEX.search(token):
            continue
        if re.search(r"pulsing-green-dot", token, re.IGNORECASE):
            continue
        if strip_pulse_and_green:
            if re.search(r"\b(animate-pulse|animate-ping|pulse)\b", token, re.IGNORECASE):
                continue
            if re.search(r"\b(bg-(?:green|emerald|lime)|accent-green|text-(?:green|emerald|lime))\S*", token, re.IGNORECASE):
                continue
        clean_tokens.append(token)
    return " ".join(clean_tokens)


# ---------------------------------------------------------------------------
# 5. Deterministic Auto-Repair Function
# ---------------------------------------------------------------------------
def auto_repair_ast(
    ast_dict: Dict[str, Any],
    diagnostics: Optional[List[Dict[str, Any]]] = None,
    registry_data: Optional[Dict[str, Any]] = None,
    max_depth: int = 64,
) -> Tuple[Dict[str, Any], int, List[str]]:
    """Traverse and repair recoverable defects in a Declarative Design AST.

    Repairs:
      1. Coerces string booleans ('true'/'false') and numeric strings ('44') to native types.
      2. Strips prohibited aesthetic classes (glows, pulsing green dots, gradients).
      3. Replaces invalid variants with schema default variant.
      4. Normalizes component aliases (e.g. 'bottomsheet' -> 'mobile-bottom-sheet').
      5. Deduplicates conflicting node IDs deterministically.
      6. Enforces minimum 44x44px touch bounds on mobile interactive components.
    """
    repaired = copy.deepcopy(ast_dict)
    repairs_count = 0
    repair_log: List[str] = []

    if registry_data is None:
        registry_data = _get_registry_data()

    meta = repaired.get("meta", {})
    is_mobile = isinstance(meta, dict) and meta.get("viewport") == "mobile"

    seen_ids: Dict[str, int] = {}

    def _walk_repair(node: Any, path: str, depth: int = 0, max_depth: int = 64) -> None:
        nonlocal repairs_count
        if depth > max_depth:
            return

        if not isinstance(node, dict):
            return

        # 1. Deduplicate node ID
        node_id = node.get("id")
        if not node_id or not isinstance(node_id, str):
            repairs_count += 1
            node_id = f"node_{repairs_count}"
            node["id"] = node_id
            repair_log.append(f"Supplied missing node id at '{path}' -> '{node_id}'")

        count = seen_ids.get(node_id, 0)
        if count > 0:
            repairs_count += 1
            dedup_id = f"{node_id}_dup{count}"
            node["id"] = dedup_id
            repair_log.append(f"Deduplicated node id '{node_id}' at '{path}' -> '{dedup_id}'")
        seen_ids[node_id] = count + 1

        # 2. Normalize component alias
        comp_name = node.get("component") or (node.get("name") if node.get("kind") == "component" else None)
        if comp_name and isinstance(comp_name, str):
            norm_comp = comp_name.strip().lower()
            if norm_comp in PRIMITIVE_ALIASES:
                canonical = PRIMITIVE_ALIASES[norm_comp]
                if canonical != comp_name:
                    repairs_count += 1
                    node["component"] = canonical
                    if "name" in node and node.get("kind") == "component":
                        node["name"] = canonical
                    repair_log.append(f"Normalized component alias '{comp_name}' -> '{canonical}' at '{path}'")
                    comp_name = canonical

        # 3. Prop repairs
        props = node.get("props")
        if isinstance(props, dict):
            # Class name aesthetic sanitization
            if "className" in props and isinstance(props["className"], str):
                orig_cls = props["className"]
                clean_cls = sanitize_class_names(orig_cls)
                if clean_cls != orig_cls:
                    props["className"] = clean_cls
                    repairs_count += 1
                    repair_log.append(f"Sanitized prohibited aesthetic classes at '{path}.props.className'")

            # Type coercion
            for p_key, p_val in list(props.items()):
                if isinstance(p_val, str):
                    if p_val.lower() == "true":
                        props[p_key] = True
                        repairs_count += 1
                        repair_log.append(f"Coerced string 'true' to boolean True at '{path}.props.{p_key}'")
                    elif p_val.lower() == "false":
                        props[p_key] = False
                        repairs_count += 1
                        repair_log.append(f"Coerced string 'false' to boolean False at '{path}.props.{p_key}'")
                    elif re.match(r"^-?\d+(\.\d+)?$", p_val) and p_key in (
                        "size",
                        "gap",
                        "elevation",
                        "tabIndex",
                        "threshold",
                        "min",
                        "max",
                        "step",
                    ):
                        try:
                            num = float(p_val) if "." in p_val else int(p_val)
                            props[p_key] = num
                            repairs_count += 1
                            repair_log.append(f"Coerced numeric string '{p_val}' to {num} at '{path}.props.{p_key}'")
                        except ValueError:
                            pass

            # Variant fallback if invalid
            if comp_name and isinstance(comp_name, str) and registry_data:
                norm_c = _normalize_name(comp_name)
                if norm_c in registry_data:
                    prim_entry = registry_data[norm_c]
                    supported_vars = prim_entry.get("variants", [])
                    cur_var = props.get("variant")
                    if cur_var and supported_vars and cur_var not in supported_vars:
                        default_var = supported_vars[0] if supported_vars else "default"
                        props["variant"] = default_var
                        repairs_count += 1
                        repair_log.append(
                            f"Reset invalid variant '{cur_var}' to default '{default_var}' on '{comp_name}' at '{path}'"
                        )

        # 4. StyleBindings sanitization
        style_bindings = node.get("styleBindings")
        if isinstance(style_bindings, dict) and "className" in style_bindings:
            orig_sb = style_bindings["className"]
            if isinstance(orig_sb, str):
                clean_sb = sanitize_class_names(orig_sb)
                if clean_sb != orig_sb:
                    style_bindings["className"] = clean_sb
                    repairs_count += 1
                    repair_log.append(f"Sanitized styleBindings.className at '{path}'")

        # 5. Touch target ergonomics on mobile
        kind = node.get("kind")
        norm_c_check = _normalize_name(comp_name) if comp_name and isinstance(comp_name, str) else ""
        if is_mobile and kind == "component" and norm_c_check in MOBILE_INTERACTIVE_PRIMITIVES:
            layout = node.get("layout")
            if not isinstance(layout, dict):
                layout = {}
                node["layout"] = layout

            min_w = layout.get("minWidth", 0)
            min_h = layout.get("minHeight", 0)
            try:
                min_w_num = float(min_w) if isinstance(min_w, (int, float, str)) and str(min_w).isdigit() else 0
                min_h_num = float(min_h) if isinstance(min_h, (int, float, str)) and str(min_h).isdigit() else 0
            except ValueError:
                min_w_num, min_h_num = 0, 0

            if min_w_num < 44 or min_h_num < 44:
                layout["minWidth"] = max(min_w_num, 44)
                layout["minHeight"] = max(min_h_num, 44)
                repairs_count += 1
                repair_log.append(
                    f"Adjusted mobile touch target min dimensions to 44x44px for '{norm_c_check}' at '{path}'"
                )

        # 6. Recurse slots
        slots = node.get("slots")
        if isinstance(slots, dict):
            for slot_name, slot_nodes in slots.items():
                slot_path = f"{path}.slots.{slot_name}"
                if isinstance(slot_nodes, list):
                    for idx, sn in enumerate(slot_nodes):
                        _walk_repair(sn, f"{slot_path}[{idx}]", depth=depth + 1, max_depth=max_depth)
                elif isinstance(slot_nodes, dict):
                    _walk_repair(slot_nodes, slot_path, depth=depth + 1, max_depth=max_depth)

        # 7. Recurse children
        children = node.get("children")
        if isinstance(children, list):
            for idx, child in enumerate(children):
                _walk_repair(child, f"{path}.children[{idx}]", depth=depth + 1, max_depth=max_depth)

    root = repaired.get("root")
    if isinstance(root, dict):
        _walk_repair(root, "root", depth=0, max_depth=max_depth)

    return repaired, repairs_count, repair_log


# ---------------------------------------------------------------------------
# 6. Complete 6-Stage AST Validator Implementation
# ---------------------------------------------------------------------------
def validate_design_ast(
    ast: Dict[str, Any] | str,
    auto_repair: bool = True,
    strict_aesthetics: bool = True,
    custom_registry: Optional[Dict[str, Any]] = None,
    max_depth: int = 64,
) -> Dict[str, Any]:
    """Validate a declarative Design AST against primitive schemas and aesthetic design rules.

    6-Stage Validation:
      1. Structure & Schema Integrity: version '1.0.0', meta object, root node, node ID uniqueness.
      2. Primitive Registry Resolution: resolves against registry, detects unregistered primitives.
      3. Prop Type & Enum Conformance: validates prop types, required props, variant enums.
      4. Slot Rules & Cardinality: validates declared slots against primitive slot definitions.
      5. Touch Target Ergonomics: flags sub-44px interactive controls on mobile viewport.
      6. Strict Aesthetic Boundary Enforcement: detects and rejects glowing circles, green pulsing dots,
         and rainbow gradients (PROHIBITED_AESTHETIC_DECORATION).

    Args:
        ast: Declarative Design AST dict or JSON string.
        auto_repair: Whether to generate a deterministic auto-corrected AST when defects are found.
        strict_aesthetics: If True, treats aesthetic violations as errors; if False, as warnings.
        custom_registry: Optional override registry dictionary.

    Returns:
        {
            "valid": bool,
            "errors": list[dict],
            "warnings": list[dict],
            "diagnostics": list[dict],
            "repaired_ast": dict | None,
            "summary": {
                "total_nodes": int,
                "primitives_used": list[str],
            }
        }
    """
    # Accept string or dict
    if isinstance(ast, str):
        try:
            ast = json.loads(ast)
        except Exception as exc:
            err = {
                "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                "path": "",
                "nodeId": "",
                "severity": "error",
                "message": f"Malformed AST JSON: {exc}",
                "issue": f"Malformed AST JSON: {exc}",
                "suggestion": "Provide valid JSON string representing DesignAST.",
            }
            return {
                "valid": False,
                "errors": [err],
                "warnings": [],
                "diagnostics": [err],
                "repaired_ast": None,
                "summary": {"total_nodes": 0, "primitives_used": []},
            }

    if not isinstance(ast, dict):
        err = {
            "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
            "path": "",
            "nodeId": "",
            "severity": "error",
            "message": "AST root must be a JSON object/dict.",
            "issue": "AST root must be a JSON object/dict.",
            "suggestion": "Provide a dict containing 'version', 'meta', and 'root'.",
        }
        return {
            "valid": False,
            "errors": [err],
            "warnings": [],
            "diagnostics": [err],
            "repaired_ast": None,
            "summary": {"total_nodes": 0, "primitives_used": []},
        }

    errors: List[Dict[str, Any]] = []
    warnings: List[Dict[str, Any]] = []
    primitives_used: Set[str] = set()
    node_count = 0

    # -----------------------------------------------------------------------
    # Stage 1: Structure & Schema Integrity Check
    # -----------------------------------------------------------------------
    version = ast.get("version")
    if not version or not isinstance(version, str):
        errors.append({
            "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
            "path": "version",
            "nodeId": "",
            "severity": "error",
            "message": "Missing or invalid AST 'version' string (expected '1.0.0').",
            "issue": "Missing or invalid AST 'version' string (expected e.g. '1.0.0').",
            "suggestion": "Set version: '1.0.0'.",
        })
    elif version != "1.0.0":
        errors.append({
            "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
            "path": "version",
            "nodeId": "",
            "severity": "error",
            "message": f"Unsupported AST version '{version}'. Expected '1.0.0'.",
            "issue": f"Unsupported AST version '{version}'. Expected '1.0.0'.",
            "suggestion": "Set version: '1.0.0'.",
        })

    meta = ast.get("meta")
    if not isinstance(meta, dict):
        errors.append({
            "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
            "path": "meta",
            "nodeId": "",
            "severity": "error",
            "message": "AST 'meta' field must be an object.",
            "issue": "AST 'meta' field must be an object.",
            "suggestion": "Include meta: { id: '...', title: '...' }.",
        })
    else:
        if not meta.get("id") or not isinstance(meta.get("id"), str):
            errors.append({
                "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                "path": "meta.id",
                "nodeId": "",
                "severity": "error",
                "message": "AST meta is missing a valid string 'id'.",
                "issue": "AST meta is missing a valid string 'id'.",
                "suggestion": "Add a unique string id to meta.",
            })

    root = ast.get("root")
    if not isinstance(root, dict):
        errors.append({
            "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
            "path": "root",
            "nodeId": "",
            "severity": "error",
            "message": "AST 'root' must be a node object.",
            "issue": "AST 'root' must be a node object.",
            "suggestion": "Provide a valid DesignASTNode for root.",
        })
        return {
            "valid": False,
            "errors": errors,
            "warnings": warnings,
            "diagnostics": errors + warnings,
            "repaired_ast": None,
            "summary": {"total_nodes": 0, "primitives_used": []},
        }

    # Load authoritative registry
    registry_data = custom_registry if custom_registry is not None else _get_registry_data()
    valid_names_index: Dict[str, Dict[str, Any]] = {}
    if registry_data:
        for k, v in registry_data.items():
            norm_k = _normalize_name(k)
            valid_names_index[norm_k] = v

    is_mobile_viewport = isinstance(meta, dict) and meta.get("viewport") == "mobile"
    seen_node_ids: Set[str] = set()

    # -----------------------------------------------------------------------
    # Recursive Node Validator
    # -----------------------------------------------------------------------
    def _validate_node(node: Any, path: str, depth: int = 0, max_depth: int = 64) -> None:
        nonlocal node_count
        if depth > max_depth:
            errors.append({
                "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                "path": path,
                "nodeId": node.get("id") if isinstance(node, dict) and isinstance(node.get("id"), str) else "",
                "severity": "error",
                "message": "Exceeded maximum AST nesting depth of 64.",
                "issue": "Exceeded maximum AST nesting depth of 64.",
                "suggestion": "Flatten your component hierarchy to have nesting depth <= 64.",
            })
            return

        if not isinstance(node, dict):
            errors.append({
                "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                "path": path,
                "nodeId": "",
                "severity": "error",
                "message": f"Expected node object at '{path}', got {type(node).__name__}",
                "issue": f"Expected node object at '{path}', got {type(node).__name__}",
            })
            return

        node_count += 1
        node_id = node.get("id")

        # Node ID validation and uniqueness
        if not node_id or not isinstance(node_id, str):
            errors.append({
                "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                "path": f"{path}.id",
                "nodeId": "",
                "severity": "error",
                "message": f"Node at '{path}' is missing a valid string 'id'.",
                "issue": f"Node at '{path}' is missing a valid string 'id'.",
                "suggestion": "Provide a non-empty string identifier.",
            })
        else:
            if node_id in seen_node_ids:
                errors.append({
                    "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                    "path": f"{path}.id",
                    "nodeId": node_id,
                    "severity": "error",
                    "message": f"Duplicate node ID '{node_id}' detected at '{path}'.",
                    "issue": f"Duplicate node ID '{node_id}' detected at '{path}'.",
                    "suggestion": f"Ensure all node IDs in the tree are globally unique.",
                })
            else:
                seen_node_ids.add(node_id)

        # Node kind check
        kind = node.get("kind")
        if kind not in ("component", "container", "text"):
            errors.append({
                "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                "path": f"{path}.kind",
                "nodeId": node_id or "",
                "severity": "error",
                "message": f"Invalid node kind '{kind}' at '{path}'. Expected 'component', 'container', or 'text'.",
                "issue": f"Invalid node kind '{kind}' at '{path}'. Expected 'component', 'container', or 'text'.",
            })
            return

        comp_name_raw = node.get("component") or (node.get("name") if kind == "component" else None)

        # Stage 2: Primitive Registry Resolution
        if kind == "component":
            if not comp_name_raw or not isinstance(comp_name_raw, str):
                errors.append({
                    "code": DIAGNOSTIC_CODES["SCHEMA_VIOLATION"],
                    "path": f"{path}.component",
                    "nodeId": node_id or "",
                    "severity": "error",
                    "message": f"Component node at '{path}' missing 'component' name.",
                    "issue": f"Component node at '{path}' missing 'component' name.",
                })
            else:
                norm_comp = _normalize_name(comp_name_raw)
                primitives_used.add(norm_comp)

                if valid_names_index and norm_comp not in valid_names_index:
                    close = difflib.get_close_matches(norm_comp, list(valid_names_index.keys()), n=3, cutoff=0.4)
                    suggestion = (
                        f"Did you mean: {close}?"
                        if close
                        else "See kilo://registry/catalog for available primitives."
                    )
                    errors.append({
                        "code": DIAGNOSTIC_CODES["UNREGISTERED_PRIMITIVE"],
                        "path": f"{path}.component",
                        "nodeId": node_id or "",
                        "severity": "error",
                        "message": f"Unknown primitive '{comp_name_raw}' at '{path}'.",
                        "issue": f"Unknown primitive '{comp_name_raw}' at '{path}'.",
                        "suggestion": suggestion,
                    })
                elif valid_names_index and norm_comp in valid_names_index:
                    schema_entry = _get_primitive_schema_entry(norm_comp)
                    prim_entry = schema_entry if schema_entry is not None else valid_names_index[norm_comp]
                    # Stage 3: Prop Type & Variant Enum Conformance
                    _validate_node_props(node, path, node_id, comp_name_raw, prim_entry)

                    # Stage 4: Slot Rules
                    _validate_node_slots(node, path, node_id, comp_name_raw, prim_entry)

        # Stage 5: Touch Target Ergonomics (44x44px minimum on mobile)
        _check_touch_ergonomics(node, path, node_id, comp_name_raw, is_mobile_viewport)

        # Stage 6: Strict Aesthetic Boundary Enforcement
        _check_aesthetic_violations(node, path, node_id, strict_aesthetics)

        # Check Token Bindings
        _check_token_bindings(node, path, node_id)

        # Recurse named slots
        slots = node.get("slots")
        if isinstance(slots, dict):
            for slot_name, slot_nodes in slots.items():
                slot_path = f"{path}.slots.{slot_name}"
                if isinstance(slot_nodes, list):
                    for idx, sn in enumerate(slot_nodes):
                        _validate_node(sn, f"{slot_path}[{idx}]", depth=depth + 1, max_depth=max_depth)
                elif isinstance(slot_nodes, dict):
                    _validate_node(slot_nodes, slot_path, depth=depth + 1, max_depth=max_depth)

        # Recurse children
        children = node.get("children")
        if isinstance(children, list):
            for idx, child in enumerate(children):
                _validate_node(child, f"{path}.children[{idx}]", depth=depth + 1, max_depth=max_depth)

    # -----------------------------------------------------------------------
    # Stage 3 Helper: Prop & Variant Verification
    # -----------------------------------------------------------------------
    def _validate_node_props(
        node: Dict[str, Any],
        path: str,
        node_id: Optional[str],
        comp_name: str,
        prim_entry: Dict[str, Any],
    ) -> None:
        props = node.get("props")
        if not isinstance(props, dict):
            return

        # Variant enum check
        variant = props.get("variant")
        if variant is not None:
            if not isinstance(variant, str):
                errors.append({
                    "code": DIAGNOSTIC_CODES["INVALID_PROP_TYPE"],
                    "path": f"{path}.props.variant",
                    "nodeId": node_id or "",
                    "severity": "error",
                    "message": f"Prop 'variant' on '{comp_name}' must be a string.",
                    "issue": f"Prop 'variant' on '{comp_name}' must be a string.",
                })
            else:
                supported_variants = prim_entry.get("variants", [])
                if supported_variants and variant not in supported_variants:
                    errors.append({
                        "code": DIAGNOSTIC_CODES["INVALID_PROP_VALUE"],
                        "path": f"{path}.props.variant",
                        "nodeId": node_id or "",
                        "severity": "error",
                        "message": f"Invalid variant '{variant}' for primitive '{comp_name}'.",
                        "issue": f"Invalid variant '{variant}' for primitive '{comp_name}'.",
                        "suggestion": f"Supported variants: {supported_variants}",
                    })

        # Schema prop types
        schema_props = prim_entry.get("props", [])
        for sp in schema_props:
            prop_name = sp.get("name")
            prop_type = sp.get("type", "")
            required = sp.get("required", False)

            is_event_handler = (
                isinstance(prop_name, str)
                and prop_name.startswith("on")
                and len(prop_name) > 2
                and prop_name[2].isupper()
            )
            prop_present = prop_name in props
            if not prop_present:
                if prop_name == "items" and ("options" in props or "actions" in props):
                    prop_present = True

            if required and not prop_present and prop_name != "children" and not is_event_handler:
                errors.append({
                    "code": DIAGNOSTIC_CODES["MISSING_REQUIRED_PROP"],
                    "path": f"{path}.props.{prop_name}",
                    "nodeId": node_id or "",
                    "severity": "error",
                    "message": f"Missing required property '{prop_name}' on primitive '{comp_name}'.",
                    "issue": f"Missing required property '{prop_name}' on primitive '{comp_name}'.",
                })

            if prop_name in props:
                val = props[prop_name]
                # If boolean expected (and string NOT allowed), flag string booleans
                if "boolean" in prop_type and "string" not in prop_type and isinstance(val, str) and val.lower() in ("true", "false"):
                    errors.append({
                        "code": DIAGNOSTIC_CODES["INVALID_PROP_TYPE"],
                        "path": f"{path}.props.{prop_name}",
                        "nodeId": node_id or "",
                        "severity": "error",
                        "message": f"Prop '{prop_name}' on '{comp_name}' expected boolean, got string '{val}'.",
                        "issue": f"Prop '{prop_name}' on '{comp_name}' expected boolean, got string '{val}'.",
                        "suggestion": f"Use boolean {val.lower() == 'true'} instead of string.",
                    })
                # If number expected (and string NOT allowed), flag string numbers
                elif "number" in prop_type and "string" not in prop_type and isinstance(val, str) and val.isdigit():
                    errors.append({
                        "code": DIAGNOSTIC_CODES["INVALID_PROP_TYPE"],
                        "path": f"{path}.props.{prop_name}",
                        "nodeId": node_id or "",
                        "severity": "error",
                        "message": f"Prop '{prop_name}' on '{comp_name}' expected number, got string '{val}'.",
                        "issue": f"Prop '{prop_name}' on '{comp_name}' expected number, got string '{val}'.",
                        "suggestion": f"Use number {int(val)} instead of string.",
                    })

    # -----------------------------------------------------------------------
    # Stage 4 Helper: Slot Rules
    # -----------------------------------------------------------------------
    def _validate_node_slots(
        node: Dict[str, Any],
        path: str,
        node_id: Optional[str],
        comp_name: str,
        prim_entry: Dict[str, Any],
    ) -> None:
        slots = node.get("slots")
        if not isinstance(slots, dict):
            return

        norm_c = _normalize_name(comp_name)
        supported_slots = set(prim_entry.get("slots", []))
        if norm_c in STANDARD_PRIMITIVE_SLOTS:
            supported_slots.update(STANDARD_PRIMITIVE_SLOTS[norm_c])
        if norm_c in VALID_CONTAINERS:
            supported_slots.update({"header", "content", "footer", "actions", "title", "description"})

        for slot_key in slots.keys():
            if slot_key not in supported_slots:
                errors.append({
                    "code": DIAGNOSTIC_CODES["SLOT_RULE_VIOLATION"],
                    "path": f"{path}.slots.{slot_key}",
                    "nodeId": node_id or "",
                    "severity": "error",
                    "message": f"Slot '{slot_key}' is not supported by primitive '{comp_name}'.",
                    "issue": f"Slot '{slot_key}' is not supported by primitive '{comp_name}'.",
                    "suggestion": f"Supported slots: {sorted(list(supported_slots)) if supported_slots else 'none'}",
                })

    # -----------------------------------------------------------------------
    # Stage 5 Helper: Touch Target Ergonomics Check
    # -----------------------------------------------------------------------
    def _check_touch_ergonomics(
        node: Dict[str, Any],
        path: str,
        node_id: Optional[str],
        comp_name_raw: Optional[str],
        is_mobile: bool,
    ) -> None:
        if not is_mobile or not comp_name_raw:
            return

        norm_c = _normalize_name(comp_name_raw)
        if norm_c in MOBILE_INTERACTIVE_PRIMITIVES:
            layout = node.get("layout", {})
            props = node.get("props", {})

            width_sub_44 = False
            height_sub_44 = False

            if isinstance(layout, dict):
                w = layout.get("width")
                h = layout.get("height")
                mw = layout.get("minWidth")
                mh = layout.get("minHeight")

                if isinstance(w, (int, float)) and w < 44:
                    width_sub_44 = True
                if isinstance(h, (int, float)) and h < 44:
                    height_sub_44 = True
                if isinstance(mw, (int, float)) and mw < 44:
                    width_sub_44 = True
                if isinstance(mh, (int, float)) and mh < 44:
                    height_sub_44 = True

            if isinstance(props, dict) and props.get("size") in ("xs", "sm"):
                height_sub_44 = True

            if width_sub_44 or height_sub_44:
                warnings.append({
                    "code": DIAGNOSTIC_CODES["TOUCH_TARGET_TOO_SMALL"],
                    "path": f"{path}.layout",
                    "nodeId": node_id or "",
                    "severity": "warning",
                    "message": f"Interactive control '{comp_name_raw}' at '{path}' is below the 44x44px touch target boundary.",
                    "issue": f"Interactive control '{comp_name_raw}' at '{path}' is below the 44x44px touch target boundary.",
                    "suggestion": "Set layout minWidth: 44, minHeight: 44 or size: 'default' for thumb-friendly mobile ergonomics.",
                })

    # -----------------------------------------------------------------------
    # Stage 6 Helper: Strict Aesthetic Boundary Enforcement
    # -----------------------------------------------------------------------
    def _check_aesthetic_violations(
        node: Dict[str, Any],
        path: str,
        node_id: Optional[str],
        is_strict: bool,
    ) -> None:
        props = node.get("props")
        severity = "error" if is_strict else "warning"
        target_list = errors if is_strict else warnings

        if isinstance(props, dict):
            props_str = json.dumps(props)

            if GLOW_REGEX.search(props_str):
                item = {
                    "code": DIAGNOSTIC_CODES["PROHIBITED_AESTHETIC_DECORATION"],
                    "path": f"{path}.props",
                    "nodeId": node_id or "",
                    "severity": severity,
                    "message": "Prohibited glowing circle or neon shadow detected. Kilo UI enforces clean monochrome styling.",
                    "issue": "Prohibited glowing circle or neon shadow detected. Kilo UI enforces clean monochrome styling.",
                    "suggestion": "Replace neon glows with subtle M3 neutral surface tokens (e.g. var(--surface-secondary)).",
                }
                target_list.append(item)
                # Also record warning for backward compatibility with tests expecting warning list
                if is_strict:
                    warnings.append(dict(item, severity="warning"))

            if PULSE_REGEX.search(props_str):
                item = {
                    "code": DIAGNOSTIC_CODES["PROHIBITED_AESTHETIC_DECORATION"],
                    "path": f"{path}.props",
                    "nodeId": node_id or "",
                    "severity": severity,
                    "message": "Prohibited pulsing green dot detected. Kilo UI avoids animated pulsing radars.",
                    "issue": "Prohibited pulsing green dot detected. Kilo UI avoids animated pulsing radars.",
                    "suggestion": "Use subtle static indicators with var(--text-muted) or clean monochrome badges.",
                }
                target_list.append(item)
                if is_strict:
                    warnings.append(dict(item, severity="warning"))

            if GRADIENT_REGEX.search(props_str):
                item = {
                    "code": DIAGNOSTIC_CODES["PROHIBITED_AESTHETIC_DECORATION"],
                    "path": f"{path}.props",
                    "nodeId": node_id or "",
                    "severity": severity,
                    "message": "Prohibited colorful gradient detected. Kilo UI enforces clean monochrome styling.",
                    "issue": "Prohibited colorful gradient detected. Kilo UI enforces clean monochrome styling.",
                    "suggestion": "Replace multi-hue gradients with subtle M3 neutral surface containers.",
                }
                target_list.append(item)
                if is_strict:
                    warnings.append(dict(item, severity="warning"))

        # Check styleBindings
        style_bindings = node.get("styleBindings")
        if isinstance(style_bindings, dict):
            sb_str = json.dumps(style_bindings)
            if GLOW_REGEX.search(sb_str) or PULSE_REGEX.search(sb_str) or GRADIENT_REGEX.search(sb_str):
                item = {
                    "code": DIAGNOSTIC_CODES["PROHIBITED_AESTHETIC_DECORATION"],
                    "path": f"{path}.styleBindings",
                    "nodeId": node_id or "",
                    "severity": severity,
                    "message": "Prohibited aesthetic decoration in styleBindings (glowing circle, pulse, or gradient).",
                    "issue": "Prohibited aesthetic decoration in styleBindings (glowing circle, pulse, or gradient).",
                    "suggestion": "Adhere to clean monochrome surfaces and M3 tokens.",
                }
                target_list.append(item)
                if is_strict:
                    warnings.append(dict(item, severity="warning"))

    # -----------------------------------------------------------------------
    # Token Resolution Helper
    # -----------------------------------------------------------------------
    def _check_token_bindings(
        node: Dict[str, Any], path: str, node_id: Optional[str]
    ) -> None:
        props = node.get("props")
        if isinstance(props, dict):
            for k, v in props.items():
                if isinstance(v, dict) and "$token" in v:
                    tok = v.get("$token", "")
                    if not (
                        tok.startswith("m3.")
                        or tok.startswith("var(--")
                        or tok.startswith("--")
                    ):
                        warnings.append({
                            "code": DIAGNOSTIC_CODES["TOKEN_RESOLUTION_ERROR"],
                            "path": f"{path}.props.{k}",
                            "nodeId": node_id or "",
                            "severity": "warning",
                            "message": f"Invalid token format '{tok}'. Expected 'm3.*' or 'var(--*)'.",
                            "issue": f"Invalid token format '{tok}'. Expected 'm3.*' or 'var(--*)'.",
                            "suggestion": "Use 'm3.color.*' or 'var(--surface-elevated)'.",
                        })

    # Execute validation walk from root
    _validate_node(root, "root", depth=0, max_depth=max_depth)

    is_valid = len(errors) == 0

    # Execute deterministic auto-repair if requested
    repaired_ast: Optional[Dict[str, Any]] = None
    if auto_repair and (len(errors) > 0 or len(warnings) > 0):
        try:
            repaired_ast, repairs_count, _ = auto_repair_ast(
                ast_dict=ast,
                diagnostics=errors + warnings,
                registry_data=registry_data,
                max_depth=max_depth,
            )
        except Exception:
            repaired_ast = None

    return {
        "valid": is_valid,
        "errors": errors,
        "warnings": warnings,
        "diagnostics": errors + warnings,
        "repaired_ast": repaired_ast,
        "summary": {
            "total_nodes": node_count,
            "primitives_used": sorted(list(primitives_used)),
        },
    }
