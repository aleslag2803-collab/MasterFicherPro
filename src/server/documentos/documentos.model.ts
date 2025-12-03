// src/server/documentos/documentos.model.ts

export interface Documento {
  idDocumento: string
  idUsuarioPropietario: string
  nombreArchivo: string
  tipoArchivo: string
  contenidoArchivo: Uint8Array   // 👈 antes Buffer
  tamanoBytes: number
  fechaSubida: Date
  version?: string | null
  estado: string
  etiquetas?: string | null
  resumen?: string | null
}

export interface DocumentoCreateInput {
  idUsuarioPropietario: string
  nombreArchivo: string
  tipoArchivo: string
  contenidoArchivo: Uint8Array   // 👈 antes Buffer
  tamanoBytes: number
  version?: string
  estado: string
  etiquetas?: string
  resumen?: string
}
