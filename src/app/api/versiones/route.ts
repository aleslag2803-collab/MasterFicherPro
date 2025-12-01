import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const versiones = await prisma.versionesDocumento.findMany()
  return NextResponse.json(versiones)
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.versionesDocumento.create({
    data: {
      idDocumento: body.idDocumento,
      numeroVersion: body.numeroVersion,
      rutaArchivo: body.rutaArchivo,
    },
  })
  return NextResponse.json(nuevo)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const actualizado = await prisma.versionesDocumento.update({
    where: { idVersion: body.idVersion },
    data: {
      numeroVersion: body.numeroVersion,
      rutaArchivo: body.rutaArchivo,
    },
  })
  return NextResponse.json(actualizado)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.versionesDocumento.delete({ where: { idVersion: body.idVersion } })
  return NextResponse.json({ message: "Versión eliminada" })
}
