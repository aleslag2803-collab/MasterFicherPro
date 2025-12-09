import {
  createDocumento,
  findAllDocumentos,
  findDocumentoById,
  updateDocumento,
  markDocumentoAsEliminado,   // 👈 nuevo import
} from "./documentos.repository"
import { Documento, DocumentoCreateInput, DocumentoUpdateInput } from "./documentos.model"

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

export async function actualizarDocumentoService(
  idDocumento: string,
  body: any
): Promise<Documento> {
  if (!idDocumento) {
    throw new Error("idDocumento es obligatorio")
  }

  // Verificar que el documento exista
  const documentoExistente = await findDocumentoById(idDocumento)
  if (!documentoExistente) {
    throw new Error("Documento no encontrado")
  }

  // Validar que al menos un campo sea proporcionado
  if (!body || Object.keys(body).length === 0) {
    throw new Error("Debe proporcionar al menos un campo para actualizar")
  }

  const data: DocumentoUpdateInput = {
    ...(body.nombreArchivo && { nombreArchivo: body.nombreArchivo }),
    ...(body.version !== undefined && { version: body.version }),
    ...(body.estado && { estado: body.estado }),
    ...(body.etiquetas !== undefined && { etiquetas: body.etiquetas }),
    ...(body.resumen !== undefined && { resumen: body.resumen }),
  }

  const documento = await updateDocumento(idDocumento, data)
  if (!documento) {
    throw new Error("Error al actualizar el documento")
  }

  return documento
}

export async function eliminarDocumentoService(
  idDocumento: string
): Promise<boolean> {
  if (!idDocumento) {
    throw new Error("idDocumento es obligatorio")
  }

  const result = await markDocumentoAsEliminado(idDocumento)
  return !!result
}
