import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const documentos = await prisma.documentos.findMany({
    include: { usuarioPropietario: true },
  })
  return NextResponse.json(documentos)
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.documentos.create({
    data: {
      idUsuarioPropietario: body.idUsuarioPropietario,
      nombreArchivo: body.nombreArchivo,
      tipoArchivo: body.tipoArchivo,
      rutaArchivo: body.rutaArchivo,
      version: body.version,
      estado: body.estado,
      etiquetas: body.etiquetas,
      resumen: body.resumen,
    },
  })
  return NextResponse.json(nuevo)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const actualizado = await prisma.documentos.update({
    where: { idDocumento: body.idDocumento },
    data: {
      nombreArchivo: body.nombreArchivo,
      tipoArchivo: body.tipoArchivo,
      rutaArchivo: body.rutaArchivo,
      version: body.version,
      estado: body.estado,
      etiquetas: body.etiquetas,
      resumen: body.resumen,
    },
  })
  return NextResponse.json(actualizado)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.documentos.delete({ where: { idDocumento: body.idDocumento } })
  return NextResponse.json({ message: "Documento eliminado" })
}
