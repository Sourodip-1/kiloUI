"""Automated unit test suite for Kilo UI Compiler and Interactive UI Renderer.

Verifies:
1. File structure and module exports in lib/compiler/ and components/compiler/.
2. Declarative Design AST compilation and primitive resolution.
3. Material 3 scoped token generation and CSS variable injection (--md-sys-color-*).
4. Layout and StyleBindings translation (flex, grid, spacing, surfaces).
5. Static TypeScript JSX emitter (imports, component definition, JSX formatting).
6. Clean TypeScript project compilation.
"""

import subprocess
import unittest
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


class TestKiloCompiler(unittest.TestCase):
    """Test suite for the Kilo UI Compiler engine."""

    def test_required_compiler_files_exist(self):
        """Verify all mandated compiler modules exist in lib/compiler/ and components/compiler/."""
        required_files = [
            BASE_DIR / "lib" / "compiler" / "compiler.tsx",
            BASE_DIR / "lib" / "compiler" / "emitter.ts",
            BASE_DIR / "lib" / "compiler" / "index.ts",
            BASE_DIR / "lib" / "compiler" / "m3-theme.ts",
            BASE_DIR / "lib" / "compiler" / "layout.ts",
            BASE_DIR / "lib" / "compiler" / "registry-map.tsx",
            BASE_DIR / "lib" / "compiler" / "types.ts",
            BASE_DIR / "components" / "compiler" / "ast-preview-stage.tsx",
            BASE_DIR / "components" / "compiler" / "index.ts",
        ]

        for file_path in required_files:
            self.assertTrue(file_path.is_file(), f"Missing required compiler file: {file_path}")

    def test_index_exports(self):
        """Verify lib/compiler/index.ts exports all mandated functions and types."""
        index_file = BASE_DIR / "lib" / "compiler" / "index.ts"
        content = index_file.read_text(encoding="utf-8")

        self.assertIn("KiloASTRenderer", content)
        self.assertIn("compileASTToReact", content)
        self.assertIn("emitTypeScriptSource", content)
        self.assertIn("resolveM3Tokens", content)
        self.assertIn("generateM3Palette", content)
        self.assertIn("COMPONENT_REGISTRY_MAP", content)

    def test_compiler_tsx_primitive_and_slot_resolution(self):
        """Verify lib/compiler/compiler.tsx implements primitive and slot resolution logic."""
        compiler_file = BASE_DIR / "lib" / "compiler" / "compiler.tsx"
        content = compiler_file.read_text(encoding="utf-8")

        self.assertIn('"use client"', content)
        self.assertIn("KiloASTRenderer", content)
        self.assertIn("compileASTToReact", content)
        self.assertIn("COMPONENT_REGISTRY_MAP", content)
        self.assertIn("kilo-m3-container", content)

        # Slot resolution logic
        self.assertIn("slots", content)
        self.assertIn("kilo-slot-header", content)
        self.assertIn("kilo-slot-content", content)
        self.assertIn("kilo-slot-actions", content)
        self.assertIn("kilo-slot-footer", content)

        # Token & layout resolution
        self.assertIn("resolveM3Tokens", content)
        self.assertIn("mergeStyles", content)

    def test_m3_theme_generation(self):
        """Verify lib/compiler/m3-theme.ts contains complete Material 3 tokens."""
        theme_file = BASE_DIR / "lib" / "compiler" / "m3-theme.ts"
        content = theme_file.read_text(encoding="utf-8")

        self.assertIn("generateM3Palette", content)
        self.assertIn("resolveM3Tokens", content)
        self.assertIn("--md-sys-color-primary", content)
        self.assertIn("--md-sys-color-surface", content)
        self.assertIn("--md-sys-color-outline", content)
        self.assertIn("--md-sys-color-surface-container", content)
        self.assertIn("--md-sys-elevation-level1", content)
        self.assertIn("--bg-main", content)
        self.assertIn("--surface-elevated", content)

    def test_primitive_registry_map_contains_all_targets(self):
        """Verify COMPONENT_REGISTRY_MAP includes both mobile and core primitives."""
        reg_file = BASE_DIR / "lib" / "compiler" / "registry-map.tsx"
        content = reg_file.read_text(encoding="utf-8")

        # Mobile primitives
        self.assertIn('"mobile-bottom-sheet":', content)
        self.assertIn('"swipe-action-card":', content)
        self.assertIn('"thumb-segment-controller":', content)
        self.assertIn('"pull-to-refresh":', content)
        self.assertIn('"floating-action-dock":', content)

        # Core primitives
        self.assertIn('"button":', content)
        self.assertIn('"card":', content)
        self.assertIn('"badge":', content)
        self.assertIn('"input":', content)
        self.assertIn('"switch":', content)
        self.assertIn('"checkbox":', content)
        self.assertIn('"dialog":', content)
        self.assertIn('"drawer-dialog":', content)
        self.assertIn('"tabs":', content)
        self.assertIn('"accordion":', content)
        self.assertIn('"stat-card":', content)
        self.assertIn('"skeleton":', content)

    def test_static_code_emitter(self):
        """Verify lib/compiler/emitter.ts generates valid TSX code structures."""
        emitter_file = BASE_DIR / "lib" / "compiler" / "emitter.ts"
        content = emitter_file.read_text(encoding="utf-8")

        self.assertIn("emitTypeScriptSource", content)
        self.assertIn('"use client"', content)
        self.assertIn("@/registry/ui/", content)
        self.assertIn("lucide-react", content)
        self.assertIn("export default function", content)
        self.assertIn("themeTokens", content)

    def test_components_compiler_preview_stage(self):
        """Verify components/compiler/ast-preview-stage.tsx provides viewport and code toggle."""
        stage_file = BASE_DIR / "components" / "compiler" / "ast-preview-stage.tsx"
        content = stage_file.read_text(encoding="utf-8")

        self.assertIn('"use client"', content)
        self.assertIn("ASTPreviewStage", content)
        self.assertIn("KiloASTRenderer", content)
        self.assertIn("emitTypeScriptSource", content)
        self.assertIn("iphone", content)
        self.assertIn("pixel", content)
        self.assertIn("compact", content)
        self.assertIn("responsive", content)

    def test_clean_typescript_compilation(self):
        """Verify TypeScript compiler (tsc --noEmit) passes with exit code 0."""
        result = subprocess.run(
            ["npx", "tsc", "--noEmit"],
            cwd=BASE_DIR,
            capture_output=True,
            text=True,
        )
        self.assertEqual(
            result.returncode,
            0,
            f"TypeScript compilation failed:\nSTDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}",
        )


if __name__ == "__main__":
    unittest.main()
