"use client"

import { toast } from "sonner"

export function useEliminarOrganizacion() {
  const eliminar = async (idOrganizacion: string) => {
    const confirmar = confirm("¿Seguro que deseas eliminar esta organización?")
    if (!confirmar) return false

    try {
      const res = await fetch(`/api/organizacion/${idOrganizacion}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Error al eliminar")
      }

      toast.success("Organización eliminada correctamente")
      return true
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar la organización")
      return false
    }
  }

  return eliminar
}
