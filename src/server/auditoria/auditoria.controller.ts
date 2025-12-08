import { listarProcesosAuditoriaService } from "./auditoria.service"

export async function getProcesosAuditoriaController() {
  const procesos = await listarProcesosAuditoriaService()

  // Aquí damos forma a la respuesta que usa el frontend
  const body = procesos.map((p) => ({
    idProcesoAuditoria: p.idProcesoAuditoria,
    nombre: p.nombre,
    estado: p.estado,
    fechaLimite: p.fechaLimite,
    documento: {
      idDocumento: p.documento.idDocumento,
      nombreArchivo: p.documento.nombreArchivo,
    },
  }))

  return {
    status: 200,
    body,
  }
}
