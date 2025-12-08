// Representa un proceso de auditoría (tabla procesosAuditoria)
export interface ProcesoAuditoria {
  idProcesoAuditoria: number
  idDocumento: number
  idAuditor: number | null
  nombre: string
  estado: string
  fechaLimite: Date | null
  fechaCreacion: Date
}

// Proceso de auditoría + datos básicos de su documento
export interface ProcesoAuditoriaConDocumento extends ProcesoAuditoria {
  documento: {
    idDocumento: number
    nombreArchivo: string
  }
}
