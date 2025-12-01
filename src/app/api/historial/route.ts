import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const historial = await prisma.historialAcciones.findMany()
  return NextResponse.json(historial)
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.historialAcciones.create({
    data: {
      idUsuario: body.idUsuario,
      idDocumento: body.idDocumento,
      accion: body.accion,
      detalle: body.detalle,
    },
  })
  return NextResponse.json(nuevo)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const actualizado = await prisma.historialAcciones.update({
    where: { idHistorial: body.idHistorial },
    data: {
      accion: body.accion,
      detalle: body.detalle,
    },
  })
  return NextResponse.json(actualizado)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.historialAcciones.delete({ where: { idHistorial: body.idHistorial } })
  return NextResponse.json({ message: "Registro eliminado" })
}
