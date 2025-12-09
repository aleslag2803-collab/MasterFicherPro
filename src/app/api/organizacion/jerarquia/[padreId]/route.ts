// src/app/api/organizacion/jerarquia/[padreId]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getJerarquiaController } from "@/src/server/organizaciones/organizaciones.controller"

export async function GET(
  req: NextRequest,
  { params }: { params: { padreId: string } },
) {
  const padreId = params.padreId
  const result = await getJerarquiaController(padreId)
  return NextResponse.json(result.body, { status: result.status })
}
