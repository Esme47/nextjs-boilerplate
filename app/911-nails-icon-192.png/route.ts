import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const iconFile = path.join(process.cwd(), "911-nails-icon-192.png");

export async function GET() {
  const data = await readFile(iconFile);

  return new NextResponse(data, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
