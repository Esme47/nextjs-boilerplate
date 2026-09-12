import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// IMPORTANTE: force-dynamic (no force-static). Con force-static, Next.js
// "hornea" el HTML una sola vez y en despliegues siguientes reutiliza esa
// version cacheada del build anterior, aunque el archivo .html haya
// cambiado en el repositorio (por eso el catalogo se quedaba pegado en
// una version vieja). Con force-dynamic, el archivo se lee de nuevo en
// cada solicitud, garantizando que siempre se sirva el contenido actual.
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
