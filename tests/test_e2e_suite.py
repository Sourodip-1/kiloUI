"""Master E2E Test Suite and Runner for Kilo UI + Material 3 MCP Architecture.

Orchestrates all 4 test tiers:
- Tier 1: Feature Coverage (Transports, 4 Resources, 4 Tools, 2 Prompts)
- Tier 2: Boundary & Corner Cases (Invalid Seeds, Malformed ASTs, Prohibited Aesthetics)
- Tier 3: Cross-Feature Combinations (AST + M3 Tokens, Slots, Auto-Repair)
- Tier 4: Real-World Scenarios (Mobile Settings, Swipe Feed, Action Dock, Compiler)
- Wire Transports: Live stdio subprocess & SSE HTTP streaming

Usage:
    python3 tests/test_e2e_suite.py
    python3 -m unittest tests/test_e2e_suite.py -v
"""

import os
import sys
import time
import unittest

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from tests.e2e.test_tier1_coverage import TestTier1FeatureCoverage
from tests.e2e.test_tier2_boundaries import TestTier2Boundaries
from tests.e2e.test_tier3_combinations import TestTier3Combinations
from tests.e2e.test_tier4_scenarios import TestTier4RealWorldScenarios
from tests.e2e.test_stdio_transport import TestStdioTransport
from tests.e2e.test_sse_transport import TestSSETransport


def create_e2e_suite() -> unittest.TestSuite:
    """Assemble all E2E test cases across all tiers into a unified test suite."""
    suite = unittest.TestSuite()
    loader = unittest.TestLoader()

    suite.addTests(loader.loadTestsFromTestCase(TestTier1FeatureCoverage))
    suite.addTests(loader.loadTestsFromTestCase(TestTier2Boundaries))
    suite.addTests(loader.loadTestsFromTestCase(TestTier3Combinations))
    suite.addTests(loader.loadTestsFromTestCase(TestTier4RealWorldScenarios))
    suite.addTests(loader.loadTestsFromTestCase(TestStdioTransport))
    suite.addTests(loader.loadTestsFromTestCase(TestSSETransport))

    return suite


def run_e2e_suite() -> bool:
    """Run the complete E2E test suite and print a comprehensive summary report."""
    print("=" * 80)
    print(" KILO UI + MATERIAL 3 MCP — COMPREHENSIVE E2E TEST SUITE")
    print("=" * 80)
    print(f" Python Interpreter : {sys.executable} ({sys.version.split()[0]})")
    print(f" Working Directory  : {PROJECT_ROOT}")
    print(f" Timestamp          : {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}")
    print("-" * 80)
    print(" Test Methodology: 4-Tier Opaque-Box & Live Wire Transports")
    print("   • Tier 1: Feature Coverage (Transports, Resources, Tools, Prompts)")
    print("   • Tier 2: Boundary & Corner Cases (Malformed Inputs, Prohibited Aesthetics)")
    print("   • Tier 3: Cross-Feature Combinations (AST + M3 Tokens, Auto-Repair)")
    print("   • Tier 4: Real-World Scenarios (Mobile Settings, Swipe Feed, Compiler)")
    print("   • Wire  : Live stdio subprocess & SSE HTTP streamable transport")
    print("-" * 80)

    start_time = time.time()
    suite = create_e2e_suite()
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    elapsed = time.time() - start_time

    print("=" * 80)
    print(" E2E TEST EXECUTION SUMMARY")
    print("=" * 80)
    print(f" Tests Run          : {result.testsRun}")
    print(f" Passed             : {result.testsRun - len(result.failures) - len(result.errors) - len(result.skipped)}")
    print(f" Failures           : {len(result.failures)}")
    print(f" Errors             : {len(result.errors)}")
    print(f" Skipped            : {len(result.skipped)}")
    print(f" Total Time         : {elapsed:.2f}s")
    print("=" * 80)

    if result.wasSuccessful():
        print(" RESULT: [PASS] All E2E test tiers verified successfully.")
        return True
    else:
        print(" RESULT: [FAIL] One or more tests failed or encountered errors.")
        return False


if __name__ == "__main__":
    success = run_e2e_suite()
    sys.exit(0 if success else 1)
