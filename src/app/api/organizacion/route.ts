import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const carpetas = await prisma.organizacion.findMany({
    include: { usuario: true, hijos: true, padre: true },
  })
  return NextResponse.json(carpetas)
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.organizacion.create({
    data: {
      idUsuario: body.idUsuario,
      nombreCarpeta: body.nombreCarpeta,
      nivelJerarquico: body.nivelJerarquico,
      padreId: body.padreId ?? null,
    },
  })
  return NextResponse.json(nuevo)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const actualizado = await prisma.organizacion.update({
    where: { idOrganizacion: body.idOrganizacion },
    data: {
      nombreCarpeta: body.nombreCarpeta,
      nivelJerarquico: body.nivelJerarquico,
      padreId: body.padreId ?? null,
    },
  })
  return NextResponse.json(actualizado)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.organizacion.delete({ where: { idOrganizacion: body.idOrganizacion } })
  return NextResponse.json({ message: "Carpeta eliminada" })
}
