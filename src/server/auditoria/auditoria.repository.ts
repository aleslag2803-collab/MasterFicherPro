import { prisma } from "@/src/lib/prisma"
import { ProcesoAuditoriaConDocumento } from "./auditoria.model"

// Obtiene todos los procesos de auditoría con su documento asociado
export async function findProcesosAuditoriaConDocumento(): Promise<ProcesoAuditoriaConDocumento[]> {
  const procesos = await prisma.procesosAuditoria.findMany({
    where: {
      documento: {
        esAuditoria: true,
        esEliminado: false,
      },
    },
    include: {
      documento: true,
    },
    orderBy: {
      fechaCreacion: "desc",
    },
  })

  return procesos as unknown as ProcesoAuditoriaConDocumento[]
}
