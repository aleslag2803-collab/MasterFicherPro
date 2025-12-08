import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export const runtime = "nodejs"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params

  try {
    const proceso = await prisma.procesosAuditoria.findUnique({
      where: { idProcesoAuditoria: id },
      include: {
        documento: true,
        auditor: true,
        comentarios: {
          include: { usuario: true },
          orderBy: { fechaComentario: "asc" },
        },
      },
    })

    if (!proceso) {
      return NextResponse.json(
        { error: "Proceso de auditoría no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(proceso, { status: 200 })
  } catch (error: any) {
    console.error("Error en GET /api/audit/[id]", error)
    return NextResponse.json(
      {
        error:
          error?.message ?? "Error al obtener el proceso de auditoría",
      },
      { status: 500 }
    )
  }
}

// 👇 NUEVO: actualizar estado del proceso
export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params

  try {
    const body = await req.json()
    const { estado } = body

    if (!estado) {
      return NextResponse.json(
        { error: "El campo 'estado' es obligatorio" },
        { status: 400 }
      )
    }

    const updated = await prisma.procesosAuditoria.update({
      where: { idProcesoAuditoria: id },
      data: {
        estado,
        fechaActualizacion: new Date(), // marca la última actualización
      },
      include: {
        documento: true,
        auditor: true,
        comentarios: {
          include: { usuario: true },
          orderBy: { fechaComentario: "asc" },
        },
      },
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (error: any) {
    console.error("Error en PATCH /api/audit/[id]", error)
    return NextResponse.json(
      {
        error:
          error?.message ?? "Error al actualizar el proceso de auditoría",
      },
      { status: 500 }
    )
  }
}
