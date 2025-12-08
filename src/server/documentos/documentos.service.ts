import {
  createDocumento,
  findAllDocumentos,
  findDocumentoById,
  markDocumentoAsEliminado,   // 👈 nuevo import
} from "./documentos.repository"
import { Documento, DocumentoCreateInput } from "./documentos.model"
// ❌ ya no usamos deleteDocumentoById
// import { deleteDocumentoById } from "./documentos.repository"

export async function listarDocumentosService(): Promise<Documento[]> {
  const documentos = await findAllDocumentos()
  return documentos
}

export async function obtenerDocumentoPorIdService(
  idDocumento: string
): Promise<Documento | null> {
  if (!idDocumento) {
    throw new Error("idDocumento es obligatorio")
  }

  const documento = await findDocumentoById(idDocumento)
  return documento
}

export async function crearDocumentoService(body: any): Promise<Documento> {
  if (
    !body?.idUsuarioPropietario ||
    !body?.nombreArchivo ||
    !body?.tipoArchivo ||
    !body?.contenidoArchivo ||
    typeof body?.tamanoBytes !== "number" ||
    !body?.estado
  ) {
    throw new Error(
      "idUsuarioPropietario, nombreArchivo, tipoArchivo, contenidoArchivo, tamanoBytes y estado son obligatorios"
    )
  }

  const isPdf =
    body.tipoArchivo === "application/pdf" ||
    (typeof body.nombreArchivo === "string" &&
      body.nombreArchivo.toLowerCase().endsWith(".pdf"))

  if (!isPdf) {
    throw new Error("Solo se permiten archivos PDF")
  }

  const data: DocumentoCreateInput = {
    idUsuarioPropietario: body.idUsuarioPropietario,
    nombreArchivo: body.nombreArchivo,
    tipoArchivo: body.tipoArchivo,
    contenidoArchivo: body.contenidoArchivo,
    tamanoBytes: body.tamanoBytes,
    version: body.version,
    estado: body.estado,
    etiquetas: body.etiquetas,
    resumen: body.resumen,
  }

  const documento = await createDocumento(data)
  return documento
}

// 🔹 Soft delete: esEliminado = true
export async function eliminarDocumentoService(
  idDocumento: string
): Promise<boolean> {
  if (!idDocumento) {
    throw new Error("idDocumento es obligatorio")
  }

  const result = await markDocumentoAsEliminado(idDocumento)
  return !!result        // true si se actualizó, false si falló / no existe
}
