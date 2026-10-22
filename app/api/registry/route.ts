import { NextResponse } from "next/server";
import { REGISTRY_DATA } from "@/registry/registry-data";

export async function GET() {
  const list = Object.values(REGISTRY_DATA).map((item) => ({
    name: item.name,
    title: item.title,
    category: item.category,
    type: item.type || "components:ui",
    description: item.description,
    dependencies: item.dependencies,
  }));

  return NextResponse.json(
    {
      name: "kilo-ui",
      version: "0.1.0",
      description: "Official Kilo UI Component Registry",
      components: list,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}
