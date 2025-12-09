"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Toaster } from "../components/ui/toaster";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación
    const usuario = sessionStorage.getItem("usuario");
    setIsAuthenticated(!!usuario);
    setIsLoading(false);

    // Si está autenticado y está en login/crear-cuenta, redirigir a dashboard
    if (usuario && (pathname === "/iniciar-sesion" || pathname === "/crear-cuenta")) {
      router.push("/dashboard");
    }

    // Si NO está autenticado y NO está en rutas públicas, redirigir a login
    if (!usuario && pathname !== "/" && pathname !== "/iniciar-sesion" && pathname !== "/crear-cuenta") {
      router.push("/iniciar-sesion");
    }
  }, [pathname, router]);

  const rutasSinMenu = ["/iniciar-sesion", "/crear-cuenta"];
  const ocultarMenu = rutasSinMenu.includes(pathname);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin">
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {!ocultarMenu && <Sidebar />}

      <main className="flex-1 bg-[#f7f8fc] p-6 overflow-y-auto">
        {children}
      </main>

      <Toaster />
    </div>
  );
}
