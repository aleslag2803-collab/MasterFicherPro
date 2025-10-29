import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const usuarios = await prisma.usuarios.findMany()
  return NextResponse.json(usuarios) // ✅ ESTA es la forma correcta
}

export async function POST(request: Request) {
  const body = await request.json()
  const nuevo = await prisma.usuarios.create({
    data: {
      nombre: body.nombre,
      correo: body.correo,
      passwordHash: body.passwordHash,
      rol: body.rol,
    },
  })
  return NextResponse.json(nuevo) // ✅
}
