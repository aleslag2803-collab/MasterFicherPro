import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      document_id,
      auditor_id,
      name,
      deadline,
      initial_comment,     // opcional
      user_id_for_comment, // opcional: usuario (admin) que deja el comentario
    } = body

    if (!document_id) {
      return NextResponse.json(
        { error: "document_id es obligatorio" },
        { status: 400 }
      )
    }

    // 1) Verificar que el documento exista
    const documento = await prisma.documentos.findUnique({
      where: { idDocumento: document_id },
    })

    if (!documento) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      )
    }

    // 2) (Opcional) validar que el auditor exista si te mandan auditor_id
    if (auditor_id) {
      const auditor = await prisma.usuarios.findUnique({
        where: { idUsuario: auditor_id },
      })

      if (!auditor) {
        return NextResponse.json(
          { error: "El auditor indicado no existe en la base de datos" },
          { status: 400 }
        )
      }
    }

    // 3) Crear proceso de auditoría
    const proceso = await prisma.procesosAuditoria.create({
      data: {
        idDocumento: document_id,
        idAuditor: auditor_id ?? null,
        nombre: name ?? `Auditoría de ${documento.nombreArchivo}`,
        estado: "en_proceso", // default en Prisma, pero lo dejamos explícito
        fechaLimite: deadline ? new Date(deadline) : null,
      },
    })

    // 4) Marcar el documento como de auditoría
    await prisma.documentos.update({
      where: { idDocumento: document_id },
      data: { esAuditoria: true },
    })

    // 5) Crear comentario inicial SOLO si mandan comentario y user
    let comentarioInicial = null

    if (initial_comment && user_id_for_comment) {
      // Validar que el usuario del comentario exista
      const user = await prisma.usuarios.findUnique({
        where: { idUsuario: user_id_for_comment },
      })

      if (!user) {
        return NextResponse.json(
          { error: "El usuario que comenta no existe en la base de datos" },
          { status: 400 }
        )
      }

      comentarioInicial = await prisma.comentariosAuditoria.create({
        data: {
          idProcesoAuditoria: proceso.idProcesoAuditoria,
          idUsuario: user_id_for_comment,
          comentario: initial_comment,
        },
      })
    }

    return NextResponse.json(
      {
        proceso,
        comentarioInicial,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error en POST /api/audit", error)
    return NextResponse.json(
      { error: error?.message ?? "Error al crear proceso de auditoría" },
      { status: 500 }
    )
  }
}
