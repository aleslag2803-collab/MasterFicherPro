import {
  createDocumento,
  findAllDocumentos,
  findDocumentoById,
} from "./documentos.repository"
import { Documento, DocumentoCreateInput } from "./documentos.model"
import { deleteDocumentoById } from "./documentos.repository"

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

export async function eliminarDocumentoService(idDocumento: string): Promise<boolean> {
  if (!idDocumento) {
    throw new Error("idDocumento es obligatorio")
  }

  // Llamar al repositorio para eliminar el documento
  const result = await deleteDocumentoById(idDocumento)
  return result
}

