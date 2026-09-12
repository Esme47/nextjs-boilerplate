import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const catalogFile = path.join(
  process.cwd(),
  "app",
  "911_Nails_Catalogo_V39_5_Confianza_Fidelizacion.html",
);

export async function GET() {
  const html = await readFile(catalogFile, "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
