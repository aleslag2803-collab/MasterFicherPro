import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rutas públicas (sin autenticación requerida)
  const rutasPublicas = ["/iniciar-sesion", "/crear-cuenta"];
  const esRutaPublica = rutasPublicas.includes(pathname);

  // Obtener token/usuario de la cookie o sesión
  const usuario = request.cookies.get("usuario")?.value;

  // Si intenta acceder a ruta pública estando autenticado, redirigir a dashboard
  if (esRutaPublica && usuario) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Si intenta acceder a ruta privada sin autenticación, redirigir a login
  if (!esRutaPublica && pathname !== "/" && !usuario) {
    return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
