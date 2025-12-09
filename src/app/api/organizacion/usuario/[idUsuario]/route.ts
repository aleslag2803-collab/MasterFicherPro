// src/app/api/organizacion/usuario/[idUsuario]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getOrganizacionesPorUsuarioController } from "@/src/server/organizaciones/organizaciones.controller"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ idUsuario: string }> }
) {
  const { idUsuario } = await params
  const result = await getOrganizacionesPorUsuarioController(idUsuario)
  return NextResponse.json(result.body, { status: result.status })
}
