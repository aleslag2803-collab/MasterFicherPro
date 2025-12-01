import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const permisos = await prisma.permisos.findMany()
  return NextResponse.json(permisos)
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.permisos.create({
    data: {
      idUsuario: body.idUsuario,
      idDocumento: body.idDocumento,
      tipoAcceso: body.tipoAcceso,
    },
  })
  return NextResponse.json(nuevo)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const actualizado = await prisma.permisos.update({
    where: { idPermiso: body.idPermiso },
    data: {
      idUsuario: body.idUsuario,
      idDocumento: body.idDocumento,
      tipoAcceso: body.tipoAcceso,
    },
  })
  return NextResponse.json(actualizado)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.permisos.delete({ where: { idPermiso: body.idPermiso } })
  return NextResponse.json({ message: "Permiso eliminado" })
}
