import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const notificaciones = await prisma.notificaciones.findMany()
  return NextResponse.json(notificaciones)
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.notificaciones.create({
    data: {
      idUsuario: body.idUsuario,
      mensaje: body.mensaje,
      leido: body.leido ?? false,
    },
  })
  return NextResponse.json(nuevo)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const actualizado = await prisma.notificaciones.update({
    where: { idNotificacion: body.idNotificacion },
    data: {
      mensaje: body.mensaje,
      leido: body.leido,
    },
  })
  return NextResponse.json(actualizado)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.notificaciones.delete({ where: { idNotificacion: body.idNotificacion } })
  return NextResponse.json({ message: "Notificación eliminada" })
}
