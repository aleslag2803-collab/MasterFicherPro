import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const preguntas = await prisma.cuestionarioIA.findMany()
  return NextResponse.json(preguntas)
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.cuestionarioIA.create({
    data: {
      idUsuario: body.idUsuario,
      pregunta: body.pregunta,
      respuesta: body.respuesta,
    },
  })
  return NextResponse.json(nuevo)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const actualizado = await prisma.cuestionarioIA.update({
    where: { idCuestionario: body.idCuestionario },
    data: {
      pregunta: body.pregunta,
      respuesta: body.respuesta,
    },
  })
  return NextResponse.json(actualizado)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.cuestionarioIA.delete({ where: { idCuestionario: body.idCuestionario } })
  return NextResponse.json({ message: "Pregunta eliminada" })
}
