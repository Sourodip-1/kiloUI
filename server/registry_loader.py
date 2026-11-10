"""Authoritative Kilo UI Component Registry Loader.

Parses registry/registry-data.ts directly in Python with zero drift,
extracting component schemas, properties, variants, slots, allowed children,
and design constraints.
"""

from __future__ import annotations

import difflib
import json
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

# Module-level cache: (mtime, parsed_registry_data)
_REGISTRY_CACHE: Tuple[float, Dict[str, Any]] | None = None

# Known slots and slot patterns across React primitives
KNOWN_SLOT_NAMES: Set[str] = {
    "leftIcon",
    "rightIcon",
    "icon",
    "prefix",
    "suffix",
    "trigger",
    "content",
    "header",
    "footer",
    "action",
    "indicator",
    "drawer",
    "handle",
    "badge",
    "avatar",
    "addon",
}

# Categories standard order
STANDARD_CATEGORIES: List[str] = [
    "Actions",
    "Forms & Inputs",
    "Overlays",
    "Data Display",
    "Navigation",
    "Media & Layout",
    "Backgrounds & Shaders",
    "Cursors",
    "Mobile",
]


def resolve_registry_path(custom_path: str | Path | None = None) -> Path:
    """Resolve the absolute path to registry/registry-data.ts."""
    if custom_path:
        p = Path(custom_path).resolve()
        if p.is_file():
            return p
        raise FileNotFoundError(f"Registry file not found at: {custom_path}")

    # Try relative to this file: ../registry/registry-data.ts
    current_file_dir = Path(__file__).resolve().parent
    candidate_1 = (current_file_dir / ".." / "registry" / "registry-data.ts").resolve()
    if candidate_1.is_file():
        return candidate_1

    # Try current working directory
    cwd = Path.cwd().resolve()
    candidate_2 = (cwd / "registry" / "registry-data.ts").resolve()
    if candidate_2.is_file():
        return candidate_2

    raise FileNotFoundError(
        f"Could not locate registry/registry-data.ts in {candidate_1} or {candidate_2}"
    )


def load_registry(
    registry_path: str | Path | None = None, reload: bool = False
) -> Dict[str, Any]:
    """Parse registry/registry-data.ts directly and return raw dictionary of primitives.

    Uses high-speed JSON slicing without Node.js execution. Caches in-memory
    based on file modification time for sub-millisecond query performance.
    """
    global _REGISTRY_CACHE

    target_path = resolve_registry_path(registry_path)
    current_mtime = os.path.getmtime(target_path)

    if not reload and _REGISTRY_CACHE is not None:
        cached_mtime, cached_data = _REGISTRY_CACHE
        if cached_mtime == current_mtime:
            return cached_data

    with open(target_path, "r", encoding="utf-8") as f:
        content = f.read()

    marker = "export const REGISTRY_DATA: Record<string, RegistryItem> = "
    marker_pos = content.find(marker)
    if marker_pos == -1:
        # Fallback search for REGISTRY_DATA assignment
        match = re.search(r"export\s+const\s+REGISTRY_DATA[^=]*=\s*\{", content)
        if not match:
            raise ValueError("Could not find REGISTRY_DATA export in registry-data.ts")
        start_idx = match.end() - 1
    else:
        start_idx = marker_pos + len(marker)

    # Slice JSON data from start_idx
    json_candidate = content[start_idx:].strip()

    # If trailing semicolon exists, strip it
    if json_candidate.endswith(";"):
        json_candidate = json_candidate[:-1].rstrip()

    try:
        registry_data: Dict[str, Any] = json.loads(json_candidate)
    except json.JSONDecodeError as exc:
        # If direct parse fails due to trailing contents, find matching closing brace
        brace_count = 0
        end_idx = 0
        for i, char in enumerate(json_candidate):
            if char == "{":
                brace_count += 1
            elif char == "}":
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i + 1
                    break
        if end_idx > 0:
            registry_data = json.loads(json_candidate[:end_idx])
        else:
            raise ValueError(f"Failed to parse REGISTRY_DATA JSON: {exc}") from exc

    _REGISTRY_CACHE = (current_mtime, registry_data)
    return registry_data


def normalize_primitive_name(name: str) -> str:
    """Normalize component names across camelCase, PascalCase, snake_case, and kebab-case.

    Examples:
        - "SearchBar" -> "search-bar"
        - "search_bar" -> "search-bar"
        - "popover-dialog" -> "popover-dialog"
        - "  Button " -> "button"
    """
    trimmed = name.strip()
    if not trimmed:
        return ""

    # Replace underscores with hyphens
    s = trimmed.replace("_", "-")

    # Insert hyphen before uppercase letters preceded by lowercase (camelCase / PascalCase)
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", s)

    # Collapse multiple hyphens and lowercase
    s = re.sub(r"-+", "-", s).lower()
    return s


def parse_props_from_code(code: str) -> List[Dict[str, Any]]:
    """Extract TypeScript prop definitions from component source code using regex.

    Used as an authoritative fallback when a primitive in REGISTRY_DATA does not
    explicitly populate the `props` array in registry-data.ts.
    """
    props: List[Dict[str, Any]] = []
    seen_names: Set[str] = set()

    # Find the main Props interface (e.g., export interface PopoverDialogProps extends ...)
    match = re.search(
        r"export\s+interface\s+(\w+Props)\s*(?:extends[^{]+)?\{([\s\S]*?)\n\}",
        code,
    )
    if not match:
        return props

    body = match.group(2)
    # Parse lines like:
    # /** JSDoc description */
    # variant?: "compact-pill" | "expanded-hud";
    # open?: boolean;
    # onOpenChange?: (open: boolean) => void;
    prop_pattern = re.compile(
        r"(?:/\*\*\s*([\s\S]*?)\s*\*/\s*)?([a-zA-Z0-9_]+)(\??)\s*:\s*([^;]+);",
        re.MULTILINE,
    )

    for m in prop_pattern.finditer(body):
        jsdoc = m.group(1) or ""
        name = m.group(2).strip()
        optional = m.group(3) == "?"
        prop_type = m.group(4).strip()

        if name in seen_names:
            continue
        seen_names.add(name)

        description = " ".join(line.strip().lstrip("* ") for line in jsdoc.splitlines()).strip()
        if not description:
            description = f"Controls the {name} property."

        # Parse union supported values if string literal union
        supported_values: List[str] = []
        if '"' in prop_type or "'" in prop_type:
            literals = re.findall(r"['\"]([^'\"]+)['\"]", prop_type)
            if literals:
                supported_values = literals

        props.append(
            {
                "name": name,
                "type": prop_type,
                "defaultValue": "undefined",
                "description": description,
                "required": not optional,
                "supportedValues": supported_values,
            }
        )

    return props


def _extract_supported_values(prop_type: str) -> List[str]:
    """Extract string literal union values from a prop type string."""
    if '"' in prop_type or "'" in prop_type:
        values = re.findall(r"['\"]([^'\"]+)['\"]", prop_type)
        return list(dict.fromkeys(values))  # unique preserving order
    return []


def _infer_slots(props: List[Dict[str, Any]]) -> List[str]:
    """Infer slot names from prop definitions."""
    slots: List[str] = []
    for p in props:
        name = p.get("name", "")
        p_type = p.get("type", "")

        # Children is handled separately in allowedChildren
        if name == "children":
            continue

        if (
            name in KNOWN_SLOT_NAMES
            or name.endswith("Icon")
            or name.endswith("Slot")
            or name.endswith("Trigger")
            or name.endswith("Content")
            or name.endswith("Header")
            or name.endswith("Footer")
            or "React.ReactNode" in p_type
            or "ReactNode" in p_type
        ):
            slots.append(name)

    return sorted(list(set(slots)))


def _infer_allowed_children(item_name: str, category: str, props: List[Dict[str, Any]]) -> List[str]:
    """Infer allowed child node types based on component nature."""
    # Check if component accepts children
    has_children = any(p.get("name") == "children" for p in props)

    # Primitives that are strictly void/self-closing
    void_primitives = {
        "separator",
        "slider",
        "switch",
        "progress",
        "input",
        "input-otp",
        "checkbox",
        "radio-group",
        "target-cursor",
        "laser-cursor",
        "spline-canvas",
        "shader-hero",
    }

    if normalize_primitive_name(item_name) in void_primitives:
        return []

    if not has_children and category in ("Cursors", "Backgrounds & Shaders"):
        return []

    # Text / inline primitives
    if item_name in ("badge", "kbd", "label", "text-shimmer", "text-scramble", "number-ticker"):
        return ["text", "string"]

    # Container / layout / cards / dialogs / buttons
    return ["*"]


def _generate_constraints(
    name: str,
    category: str,
    variants: List[str],
    props: List[Dict[str, Any]],
) -> List[str]:
    """Generate authoritative design and usage constraints for a primitive."""
    constraints: List[str] = [
        "Adhere to clean monochrome styling; no glowing circles, green pulsing dots, or colorful gradients.",
        "Map container background to Material 3 neutral surface hierarchy (--bg-main, --surface-elevated, --surface-secondary).",
    ]

    if variants:
        constraints.append(f"Supported variants: {', '.join(variants)}.")

    required_props = [p.get("name") for p in props if p.get("required") and p.get("name") != "children"]
    if required_props:
        constraints.append(f"Required properties: {', '.join(required_props)}.")

    if category == "Mobile" or category == "Mobile App":
        constraints.append("Designed for thumb-friendly ergonomics with touch target >= 44x44px.")

    return constraints


def get_primitive_schema(name: str, registry_data: Dict[str, Any] | None = None) -> Dict[str, Any]:
    """Retrieve the authoritative schema for a specific primitive.

    Args:
        name: The component name (case-insensitive, kebab-case, snake_case, or camelCase).
        registry_data: Optional pre-loaded registry data.

    Returns:
        Authoritative schema dictionary with name, title, category, description,
        variants, props, slots, allowedChildren, constraints, files, dependencies.

    Raises:
        ValueError: If the primitive is not found in the registry, including closest matches.
    """
    if registry_data is None:
        registry_data = load_registry()

    normalized_query = normalize_primitive_name(name)

    # Exact match first
    matched_key: Optional[str] = None
    if normalized_query in registry_data:
        matched_key = normalized_query
    else:
        # Search by normalizing registry keys
        for key in registry_data:
            if normalize_primitive_name(key) == normalized_query:
                matched_key = key
                break

    if not matched_key:
        available_keys = list(registry_data.keys())
        close_matches = difflib.get_close_matches(
            normalized_query, available_keys, n=3, cutoff=0.4
        )
        if close_matches:
            raise ValueError(
                f"Primitive '{name}' not found. Did you mean: {close_matches}?"
            )
        raise ValueError(
            f"Primitive '{name}' not found in Kilo UI registry."
        )

    raw_item = registry_data[matched_key]
    item_name = raw_item.get("name", matched_key)
    category = raw_item.get("category", "General")
    title = raw_item.get("title", item_name.replace("-", " ").title())
    description = raw_item.get("description", "")
    variants = raw_item.get("variants", [])
    dependencies = raw_item.get("dependencies", [])
    registry_dependencies = raw_item.get("registryDependencies", [])
    files = raw_item.get("files", [])
    usage = raw_item.get("usage", "")

    # Extract props: use explicit props if present, otherwise parse from source files
    raw_props = raw_item.get("props")
    enriched_props: List[Dict[str, Any]] = []

    if raw_props and isinstance(raw_props, list) and len(raw_props) > 0:
        for p in raw_props:
            prop_copy = dict(p)
            prop_type = prop_copy.get("type", "")
            if "supportedValues" not in prop_copy:
                prop_copy["supportedValues"] = _extract_supported_values(prop_type)
            if "required" not in prop_copy:
                prop_copy["required"] = False
            enriched_props.append(prop_copy)
    elif files:
        # Fallback to parsing props from file content
        for file_obj in files:
            content = file_obj.get("content", "")
            parsed = parse_props_from_code(content)
            if parsed:
                enriched_props.extend(parsed)
                break

    slots = _infer_slots(enriched_props)
    allowed_children = _infer_allowed_children(item_name, category, enriched_props)
    constraints = _generate_constraints(item_name, category, variants, enriched_props)

    return {
        "name": item_name,
        "title": title,
        "category": category,
        "description": description,
        "variants": variants,
        "dependencies": dependencies,
        "registryDependencies": registry_dependencies,
        "props": enriched_props,
        "slots": slots,
        "allowedChildren": allowed_children,
        "constraints": constraints,
        "files": files,
        "usage": usage,
    }


def list_primitives(
    category: str | None = None, registry_data: Dict[str, Any] | None = None
) -> List[Dict[str, Any]]:
    """List primitives, optionally filtered by category.

    Args:
        category: Optional category filter (case-insensitive, whitespace-trimmed).
        registry_data: Optional pre-loaded registry data.

    Returns:
        List of primitive summaries: [{"name": ..., "title": ..., "category": ..., "description": ..., "variants": [...]}, ...]
    """
    if registry_data is None:
        registry_data = load_registry()

    result: List[Dict[str, Any]] = []
    target_category = category.strip().lower() if category else None

    for key, item in registry_data.items():
        item_cat = item.get("category", "")
        if target_category and item_cat.strip().lower() != target_category:
            continue

        result.append(
            {
                "name": item.get("name", key),
                "title": item.get("title", key.replace("-", " ").title()),
                "category": item_cat,
                "description": item.get("description", ""),
                "variants": item.get("variants", []),
            }
        )

    # Sort deterministically by name
    result.sort(key=lambda x: x["name"])
    return result


def get_registry_catalog(registry_data: Dict[str, Any] | None = None) -> Dict[str, Any]:
    """Return complete catalog index of all Kilo UI primitives grouped by category.

    Matches kilo://registry/catalog interface contract.
    """
    if registry_data is None:
        registry_data = load_registry()

    primitives = list_primitives(registry_data=registry_data)
    categories = sorted(list(set(p["category"] for p in primitives if p["category"])))

    return {
        "name": "kilo-ui",
        "version": "1.38.9",
        "description": "Authoritative Kilo UI Component Registry",
        "total": len(primitives),
        "total_primitives": len(primitives),
        "categories": categories,
        "primitives": primitives,
    }
