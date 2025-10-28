import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Obtener todos los usuarios
export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

// Crear un nuevo usuario
export async function POST(req: Request) {
  const data = await req.json()
  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  })
  return NextResponse.json(newUser, { status: 201 })
}
