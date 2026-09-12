import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necesario porque app/catalogo/route.ts lee el archivo del catalogo con
  // una ruta calculada en tiempo de ejecucion (path.join(process.cwd(), ...)).
  // Sin esto, Next.js no detecta esa dependencia y no incluye el archivo
  // .html dentro del paquete de la funcion dinamica, causando un error/404
  // al recibir una visita real aunque el build compile bien.
  outputFileTracingIncludes: {
    "/catalogo": ["./app/911_Nails_Catalogo_V39_5_Confianza_Fidelizacion.html"],
  },
};

export default nextConfig;
