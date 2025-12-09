import { NextRequest, NextResponse } from "next/server"
import {
  getOrganizacionesController,
  postOrganizacionController,
} from "@/src/server/organizaciones/organizaciones.controller"

export async function GET() {
  const result = await getOrganizacionesController()
  return NextResponse.json(result.body, { status: result.status })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const result = await postOrganizacionController(data)
  return NextResponse.json(result.body, { status: result.status })
}

