import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export const runtime = "nodejs"

export async function POST(
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
    const { comentario, userId } = body

    if (!comentario || !comentario.trim()) {
      return NextResponse.json(
        { error: "El comentario es obligatorio" },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: "El usuario es obligatorio" },
        { status: 400 }
      )
    }

    // Validar que exista el proceso
    const proceso = await prisma.procesosAuditoria.findUnique({
      where: { idProcesoAuditoria: id },
    })

    if (!proceso) {
      return NextResponse.json(
        { error: "Proceso de auditoría no encontrado" },
        { status: 404 }
      )
    }

    // Validar usuario
    const user = await prisma.usuarios.findUnique({
      where: { idUsuario: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 400 }
      )
    }

    const nuevoComentario = await prisma.comentariosAuditoria.create({
      data: {
        idProcesoAuditoria: id,
        idUsuario: userId,
        comentario: comentario.trim(),
      },
      include: {
        usuario: true,
      },
    })

    return NextResponse.json(nuevoComentario, { status: 201 })
  } catch (error: any) {
    console.error("Error en POST /api/audit/[id]/comments", error)
    return NextResponse.json(
      {
        error:
          error?.message ?? "Error al crear el comentario de auditoría",
      },
      { status: 500 }
    )
  }
}
