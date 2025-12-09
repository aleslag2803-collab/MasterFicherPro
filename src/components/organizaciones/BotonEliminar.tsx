"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useEliminarOrganizacion() {
  const eliminar = async (idOrganizacion: number) => {
    const confirmar = confirm("¿Seguro que deseas eliminar esta organización?");
    if (!confirmar) return false;

    try {
      const res = await fetch("/api/organizacion", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idOrganizacion }),
      });

      if (!res.ok) throw new Error();

      toast.success("Organización eliminada");
      return true; // <= importante
    } catch {
      toast.error("Error al eliminar");
      return false;
    }
  };

  return eliminar;
}
