import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

// ✅ GET: obtener todos los usuarios
export async function GET() {
  try {
    const usuarios = await prisma.usuarios.findMany({
      orderBy: { fechaRegistro: "desc" },
    })
    return NextResponse.json(usuarios)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return NextResponse.json({ error: "Error al obtener los usuarios" }, { status: 500 })
  }
}

// ✅ POST: crear nuevo usuario
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const nuevo = await prisma.usuarios.create({
      data: {
        nombre: body.nombre,
        correo: body.correo,
        passwordHash: body.passwordHash,
        rol: body.rol,
        estado: body.estado ?? true,
      },
    })
    return NextResponse.json(nuevo)
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 })
  }
}
