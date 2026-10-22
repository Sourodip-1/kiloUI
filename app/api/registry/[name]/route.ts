import { NextRequest, NextResponse } from "next/server";
import { REGISTRY_DATA } from "@/registry/registry-data";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  const item = REGISTRY_DATA[name.toLowerCase()];

  if (!item) {
    return NextResponse.json(
      { error: `Component "${name}" not found in Kilo UI registry.` },
      { status: 404 }
    );
  }

  return NextResponse.json(item, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
