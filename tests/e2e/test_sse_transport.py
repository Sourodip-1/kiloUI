"""Tier 1 Live Wire Test: FastMCP SSE Transport over HTTP.

Tests over-the-wire JSON-RPC protocol communication using Server-Sent Events (SSE)
and HTTP POST message delivery by launching `python3 server/mcp_server.py --transport sse`
and communicating via Anthropic's official `mcp.client.sse.sse_client`.
"""

import asyncio
import os
import socket
import subprocess
import sys
import time
import unittest
from typing import Optional

from mcp.client.session import ClientSession
from mcp.client.sse import sse_client

from tests.e2e.helpers import get_free_port

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
SERVER_SCRIPT = os.path.join(PROJECT_ROOT, "server/mcp_server.py")


class TestSSETransport(unittest.IsolatedAsyncioTestCase):
    """Test live FastMCP SSE transport over HTTP."""

    server_process: Optional[subprocess.Popen] = None
    port: int = 8000

    async def asyncSetUp(self):
        """Start FastMCP SSE server in background subprocess."""
        if not os.path.exists(SERVER_SCRIPT):
            self.skipTest(f"Server script {SERVER_SCRIPT} does not exist yet.")

        self.port = get_free_port()
        env = {**os.environ, "PYTHONUNBUFFERED": "1", "PYTHONPATH": PROJECT_ROOT}
        
        cmd = [
            sys.executable,
            SERVER_SCRIPT,
            "--transport",
            "sse",
            "--host",
            "127.0.0.1",
            "--port",
            str(self.port),
        ]

        self.server_process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env,
        )

        # Wait up to 10 seconds for TCP port to open
        started = False
        start_time = time.time()

        while time.time() - start_time < 10.0:
            if self.server_process.poll() is not None:
                # Process died early
                stderr = self.server_process.stderr.read().decode("utf-8", errors="replace")
                self.fail(f"SSE server process exited unexpectedly with code {self.server_process.returncode}: {stderr}")
            
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(0.3)
                if s.connect_ex(("127.0.0.1", self.port)) == 0:
                    started = True
                    break
            await asyncio.sleep(0.2)

        if not started:
            self.server_process.terminate()
            self.fail(f"FastMCP SSE server failed to listen on port {self.port} within 10s")

    async def asyncTearDown(self):
        """Shut down background server process."""
        if self.server_process:
            self.server_process.terminate()
            try:
                self.server_process.wait(timeout=3.0)
            except subprocess.TimeoutExpired:
                self.server_process.kill()

    async def test_sse_server_session_handshake_and_tool_call(self):
        """Verify client connects to SSE endpoint, initializes session, and calls tool."""
        sse_url = f"http://127.0.0.1:{self.port}/sse"

        async with sse_client(sse_url) as (read_stream, write_stream):
            async with ClientSession(read_stream, write_stream) as session:
                init_result = await session.initialize()
                self.assertIsNotNone(init_result)

                # 1. List tools over SSE
                tools_res = await session.list_tools()
                tool_names = [t.name for t in tools_res.tools]
                self.assertIn("calculate_m3_palette", tool_names)

                # 2. Call tool over SSE
                call_res = await session.call_tool(
                    "calculate_m3_palette",
                    {"seed": "#5CA904"},
                )
                self.assertIsNotNone(call_res)
                self.assertGreater(len(call_res.content), 0)
                first = call_res.content[0]
                self.assertTrue(hasattr(first, "text"))
                self.assertIn("primary", first.text)


if __name__ == "__main__":
    unittest.main()
