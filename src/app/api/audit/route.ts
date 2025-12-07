import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { document_id, auditor_id, name, deadline } = body

    if (!document_id) {
      return NextResponse.json(
        { error: "document_id es obligatorio" },
        { status: 400 }
      )
    }

    // Verificar que el documento exista
    const documento = await prisma.documentos.findUnique({
      where: { idDocumento: document_id },
    })

    if (!documento) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      )
    }

    // Crear proceso de auditoría
    const proceso = await prisma.procesosAuditoria.create({
      data: {
        idDocumento: document_id,
        idAuditor: auditor_id ?? null,
        nombre: name ?? `Auditoría de ${documento.nombreArchivo}`,
        // estado tiene default "en_proceso" en la BD, pero lo dejo explícito
        estado: "en_proceso",
        fechaLimite: deadline ? new Date(deadline) : null,
      },
    })

    // Marcar el documento como “esAuditoria = true”
    await prisma.documentos.update({
      where: { idDocumento: document_id },
      data: { esAuditoria: true },
    })

    return NextResponse.json(proceso, { status: 201 })
  } catch (error: any) {
    console.error("Error en POST /api/audit", error)
    return NextResponse.json(
      { error: error?.message ?? "Error al crear proceso de auditoría" },
      { status: 500 }
    )
  }
}
