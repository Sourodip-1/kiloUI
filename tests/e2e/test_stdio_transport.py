"""Tier 1 Live Wire Test: FastMCP Stdio Transport Subprocess.

Tests over-the-wire JSON-RPC protocol communication over standard I/O (stdin/stdout)
by spawning `python3 server/mcp_server.py --transport stdio` as a subprocess
and communicating via Anthropic's official `mcp.client.stdio.stdio_client`.
"""

import asyncio
import os
import sys
import unittest
from typing import Any, Dict

from mcp.client.session import ClientSession
from mcp.client.stdio import StdioServerParameters, stdio_client

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
SERVER_SCRIPT = os.path.join(PROJECT_ROOT, "server/mcp_server.py")


class TestStdioTransport(unittest.IsolatedAsyncioTestCase):
    """Test live FastMCP stdio transport communication."""

    async def test_stdio_server_handshake_and_tool_execution(self):
        """Verify stdio transport subprocess boots, initializes session, and calls tool."""
        if not os.path.exists(SERVER_SCRIPT):
            self.skipTest(f"Server script {SERVER_SCRIPT} does not exist yet.")

        server_params = StdioServerParameters(
            command=sys.executable,
            args=[SERVER_SCRIPT, "--transport", "stdio"],
            env={**os.environ, "PYTHONUNBUFFERED": "1", "PYTHONPATH": PROJECT_ROOT},
        )

        async with stdio_client(server_params) as (read_stream, write_stream):
            async with ClientSession(read_stream, write_stream) as session:
                init_result = await session.initialize()
                self.assertIsNotNone(init_result)

                # 1. List tools over stdio
                tools_result = await session.list_tools()
                tool_names = [t.name for t in tools_result.tools]
                self.assertIn("calculate_m3_palette", tool_names)
                self.assertIn("list_kilo_primitives", tool_names)

                # 2. Call tool over stdio
                call_res = await session.call_tool(
                    "calculate_m3_palette",
                    {"seed": "#6750A4"},
                )
                self.assertIsNotNone(call_res)
                self.assertGreater(len(call_res.content), 0)
                first_content = call_res.content[0]
                self.assertTrue(hasattr(first_content, "text"))
                self.assertIn("primary", first_content.text)

                # 3. Read resource over stdio
                resource_res = await session.read_resource("kilo://registry/catalog")
                self.assertIsNotNone(resource_res)
                self.assertGreater(len(resource_res.contents), 0)
                first_res_content = resource_res.contents[0]
                self.assertTrue(hasattr(first_res_content, "text"))
                self.assertIn("primitives", first_res_content.text.lower())


if __name__ == "__main__":
    unittest.main()
