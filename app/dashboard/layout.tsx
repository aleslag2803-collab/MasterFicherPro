import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/top-bar";


const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocManager",
  description: "Sistema de gestión documental",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50`}>
        <div className="flex h-screen">
          {/* Barra lateral */}
          <Sidebar />

          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Barra superior */}
            <Topbar />

            {/* Contenido principal */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>

        <Analytics />
      </body>
    </html>
  );
}
