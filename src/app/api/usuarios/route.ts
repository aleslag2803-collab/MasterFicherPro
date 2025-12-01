// src/app/api/usuarios/route.ts
import { getUsuariosController } from "@/src/server/usuarios/usuarios.controllers"
import { NextRequest, NextResponse } from "next/server"
import { postUsuarioController } from "@/src/server/usuarios/usuarios.controllers"
export async function GET() {
  const result = await getUsuariosController()
  return NextResponse.json(result.body, { status: result.status })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const result = await postUsuarioController(data)
  return NextResponse.json(result.body, { status: result.status })
}
