import { prisma } from "@/src/lib/prisma"
import { Documento, DocumentoCreateInput } from "./documentos.model"

// 🔹 Obtener todos los documentos (solo NO eliminados)
export async function findAllDocumentos(): Promise<Documento[]> {
  const documentos = await prisma.documentos.findMany({
    where: {
      esEliminado: false,          // 👈 solo activos
    },
    orderBy: { fechaSubida: "desc" },
  })

  return documentos as unknown as Documento[]
}

// 🔹 Obtener un documento por id
export async function findDocumentoById(
  idDocumento: string
): Promise<Documento | null> {
  const documento = await prisma.documentos.findUnique({
    where: { idDocumento },
  })

  return documento as unknown as Documento | null
}

// 🔹 Crear un documento
export async function createDocumento(
  data: DocumentoCreateInput
): Promise<Documento> {
  const nuevoDocumento = await prisma.documentos.create({
    data: {
      idUsuarioPropietario: data.idUsuarioPropietario,
      nombreArchivo: data.nombreArchivo,
      tipoArchivo: data.tipoArchivo,
      contenidoArchivo: data.contenidoArchivo as any,
      tamanoBytes: data.tamanoBytes,
      version: data.version ?? null,
      estado: data.estado,
      etiquetas: data.etiquetas ?? null,
      resumen: data.resumen ?? null,
      esAuditoria: false,
      esEliminado: false,          // 👈 siempre inicia en false
    },
  })

  return nuevoDocumento as unknown as Documento
}

// ❌ Antes: delete físico
// export async function deleteDocumentoById(idDocumento: string): Promise<boolean> { ... }

// 🔹 Actualizar metadatos de un documento
export async function updateDocumento(
  idDocumento: string,
  data: any
): Promise<Documento | null> {
  try {
    const documento = await prisma.documentos.update({
      where: { idDocumento },
      data: {
        ...(data.nombreArchivo && { nombreArchivo: data.nombreArchivo }),
        ...(data.version !== undefined && { version: data.version }),
        ...(data.estado && { estado: data.estado }),
        ...(data.etiquetas !== undefined && { etiquetas: data.etiquetas }),
        ...(data.resumen !== undefined && { resumen: data.resumen }),
      },
    })

    return documento as unknown as Documento
  } catch (error) {
    console.error("Error actualizando documento", error)
    return null
  }
}

// ✅ Ahora: soft delete → esEliminado = true
export async function markDocumentoAsEliminado(
  idDocumento: string
): Promise<Documento | null> {
  try {
    const documento = await prisma.documentos.update({
      where: { idDocumento },
      data: {
        esEliminado: true,
        // opcional: también podrías cambiar estado
        // estado: "INACTIVO",
      },
    })

    return documento as unknown as Documento
  } catch (error) {
    console.error("Error marcando documento como eliminado", error)
    return null
  }
}
