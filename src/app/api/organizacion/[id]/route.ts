// src/app/api/organizacion/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import {
  getOrganizacionPorIdController,
  putOrganizacionController,
  deleteOrganizacionController,
} from "@/src/server/organizaciones/organizaciones.controller"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const result = await getOrganizacionPorIdController(id)
  return NextResponse.json(result.body, { status: result.status })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const data = await req.json()
  const result = await putOrganizacionController(id, data)
  return NextResponse.json(result.body, { status: result.status })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
 const { id } = await params
  const result = await deleteOrganizacionController(id)
  return NextResponse.json(result.body, { status: result.status })
}
