// src/app/api/usuarios/route.ts
import { NextRequest, NextResponse } from "next/server"
import { 
  getUsuariosController, 
  postUsuarioController 
} from "@/src/server/usuarios/usuarios.controllers"

export async function GET() {
  try {
    const result = await getUsuariosController()
    return NextResponse.json(result.body, { status: result.status })
  } catch (error) {
    console.error("Error en GET /api/usuarios:", error)
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log("POST /api/usuarios - body recibido:", data)

    const result = await postUsuarioController(data)
    console.log("POST /api/usuarios - result:", result)

    return NextResponse.json(result.body, { status: result.status })
  } catch (error) {
    console.error("Error en POST /api/usuarios:", error)
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 },
    )
  }
}
