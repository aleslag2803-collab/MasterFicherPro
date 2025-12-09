// src/app/api/usuarios/[id]/route.ts
import {
  getUsuarioPorIdController,
  putUsuarioController,
  deleteUsuarioController,
} from "@/src/server/usuarios/usuarios.controllers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params

  const result = await getUsuarioPorIdController(id)
  return NextResponse.json(result.body, { status: result.status })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await req.json()

  const result = await putUsuarioController(id, data)
  return NextResponse.json(result.body, { status: result.status })
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params

  const result = await deleteUsuarioController(id)
  return NextResponse.json(result.body, { status: result.status })
}
