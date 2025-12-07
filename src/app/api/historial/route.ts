import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  // Incluimos usuario y documento relacionados
  const historial = await prisma.historialAcciones.findMany({
    orderBy: { fechaAccion: "desc" },
    include: {
      usuario: true,
      documento: true,
    },
  })

  // Normalizamos a la estructura que usa el frontend de Auditoría
  const result = historial.map((item) => ({
    id: item.idHistorial,
    user: item.usuario?.nombre ?? "Usuario desconocido",
    action: item.accion,
    resource: item.documento?.nombreArchivo ?? item.idDocumento,
    // Si después auditas otros recursos, aquí lo ajustas
    type: "Documento",
    timestamp: item.fechaAccion.toISOString(),
    details: item.detalle ?? "",
  }))

  return NextResponse.json(result)
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
