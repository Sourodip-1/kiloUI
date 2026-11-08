"""Test helpers and harnesses for Kilo UI + Material 3 MCP E2E test suite."""

import asyncio
import importlib
import json
import os
import socket
import sys
from typing import Any, Dict, List, Optional, Tuple

# Ensure project root is in sys.path
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)


def get_free_port() -> int:
    """Find and return an available TCP port on localhost."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        s.listen(1)
        return s.getsockname()[1]


def get_mcp_server_instance():
    """Dynamically load and return the FastMCP server instance from server.mcp_server."""
    try:
        mod = importlib.import_module("server.mcp_server")
        if hasattr(mod, "mcp"):
            return mod.mcp
        if hasattr(mod, "server"):
            return mod.server
        for attr in dir(mod):
            obj = getattr(mod, attr)
            if obj.__class__.__name__ == "FastMCP":
                return obj
        raise AttributeError("No FastMCP instance found in server.mcp_server")
    except ImportError as exc:
        raise ImportError(f"Could not import server.mcp_server: {exc}")


async def call_server_tool(mcp_server, tool_name: str, arguments: Optional[Dict[str, Any]] = None) -> Any:
    """Call an MCP tool on the FastMCP instance and extract/parse result."""
    if arguments is None:
        arguments = {}
    result = await mcp_server.call_tool(tool_name, arguments)
    
    # In FastMCP 1.28.0, call_tool returns a tuple: (content_list, structured_dict)
    if isinstance(result, tuple) and len(result) >= 2:
        structured = result[1]
        if isinstance(structured, dict):
            if "result" in structured and len(structured) == 1:
                return structured["result"]
            return structured
        content_list = result[0]
    elif isinstance(result, list):
        content_list = result
    else:
        return result

    if isinstance(content_list, list) and len(content_list) > 0:
        if len(content_list) == 1:
            first = content_list[0]
            text = getattr(first, "text", getattr(first, "content", None))
            if text is not None and isinstance(text, str):
                try:
                    return json.loads(text)
                except (json.JSONDecodeError, TypeError):
                    return text
        else:
            parsed_items = []
            for item in content_list:
                text = getattr(item, "text", getattr(item, "content", None))
                if text is not None and isinstance(text, str):
                    try:
                        parsed_items.append(json.loads(text))
                    except (json.JSONDecodeError, TypeError):
                        parsed_items.append(text)
                else:
                    parsed_items.append(item)
            return parsed_items
            
    return content_list


async def read_server_resource(mcp_server, uri: str) -> Any:
    """Read an MCP resource from the FastMCP instance and parse payload."""
    result = await mcp_server.read_resource(uri)
    
    # FastMCP read_resource returns list of ReadResourceContents or ResourceContents
    if isinstance(result, list) and len(result) >= 1:
        item = result[0]
        text = getattr(item, "text", getattr(item, "content", None))
        if text is not None:
            if isinstance(text, (bytes, bytearray)):
                text = text.decode("utf-8", errors="replace")
            try:
                return json.loads(text)
            except (json.JSONDecodeError, TypeError):
                return text
        return item
        
    if hasattr(result, "text") or hasattr(result, "content"):
        text = getattr(result, "text", getattr(result, "content", None))
        try:
            return json.loads(text)
        except (json.JSONDecodeError, TypeError):
            return text
            
    return result


async def get_server_prompt(mcp_server, prompt_name: str, arguments: Optional[Dict[str, Any]] = None) -> Any:
    """Get an MCP prompt from the FastMCP instance."""
    if arguments is None:
        arguments = {}
    return await mcp_server.get_prompt(prompt_name, arguments)
