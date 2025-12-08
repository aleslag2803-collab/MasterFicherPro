import { ProcesoAuditoriaConDocumento } from "./auditoria.model"
import { findProcesosAuditoriaConDocumento } from "./auditoria.repository"

export async function listarProcesosAuditoriaService(): Promise<ProcesoAuditoriaConDocumento[]> {
  return await findProcesosAuditoriaConDocumento()
}
