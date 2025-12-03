// src/server/documentos/documentos.repository.ts

import { prisma } from "@/src/lib/prisma"
import { Documento, DocumentoCreateInput } from "./documentos.model"

// Obtener todos los documentos
export async function findAllDocumentos(): Promise<Documento[]> {
  const documentos = await prisma.documentos.findMany({
    orderBy: { fechaSubida: "desc" },
  })

  return documentos as unknown as Documento[]
}

// Obtener un documento por id
export async function findDocumentoById(
  idDocumento: string
): Promise<Documento | null> {
  const documento = await prisma.documentos.findUnique({
    where: { idDocumento },
  })

  return documento as unknown as Documento | null
}

// Crear un documento
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
    },
  })

  return nuevoDocumento as unknown as Documento
}

