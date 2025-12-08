"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/sidebar";
import { Toaster } from "../components/ui/toaster";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const rutasSinMenu = ["/iniciar-sesion", "/crear-cuenta"];
  const ocultarMenu = rutasSinMenu.includes(pathname);

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
