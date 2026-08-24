
import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const catalogFile = path.join(
  process.cwd(),
  "app",
  "911-Nails-Catalogo-Profesional-2026-V38-Actualizado-Lamparas-SUN-PRO.html",
);

export async function GET() {
  const html = await readFile(catalogFile, "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
