"""CLI options parser and execution entry point for Kilo UI FastMCP server."""

from __future__ import annotations

import argparse
import os
import sys
from typing import TYPE_CHECKING, Literal

# Ensure repository root is on sys.path when invoked directly as a script
_REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if _REPO_ROOT not in sys.path:
    sys.path.insert(0, _REPO_ROOT)

if TYPE_CHECKING:
    from mcp.server.fastmcp import FastMCP


def parse_args(args: list[str] | None = None) -> argparse.Namespace:
    """Parse command line arguments for the FastMCP server.

    Supported options:
      --transport: stdio, sse, streamable-http (default: stdio)
      --host: Host to bind to for HTTP/SSE (default: 127.0.0.1)
      --port: Port to bind to for HTTP/SSE (default: 8000)
    """
    parser = argparse.ArgumentParser(
        description="Kilo UI + Material 3 FastMCP Server"
    )
    parser.add_argument(
        "--transport",
        choices=["stdio", "sse", "streamable-http"],
        default="stdio",
        help="Transport protocol to use (default: stdio)",
    )
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="Host address to bind for SSE or Streamable HTTP (default: 127.0.0.1)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port number to bind for SSE or Streamable HTTP (default: 8000)",
    )
    return parser.parse_args(args)


def run_server(
    mcp_instance: FastMCP,
    transport: Literal["stdio", "sse", "streamable-http"] = "stdio",
    host: str = "127.0.0.1",
    port: int = 8000,
) -> None:
    """Configure server settings and execute the FastMCP server."""
    mcp_instance.settings.host = host
    mcp_instance.settings.port = port

    # In FastMCP 1.28.0, run accepts transport='stdio' | 'sse' | 'streamable-http'
    mcp_instance.run(transport=transport)


def main(args: list[str] | None = None) -> None:
    """CLI execution entrypoint."""
    from server.mcp_server import mcp

    parsed = parse_args(args)
    run_server(
        mcp,
        transport=parsed.transport,
        host=parsed.host,
        port=parsed.port,
    )


if __name__ == "__main__":
    main(sys.argv[1:])
