import { NextRequest, NextResponse } from "next/server"
import { deleteDocumentoController, getDocumentoPorIdController } from "@/src/server/documentos/documentos.controller"

export const runtime = "nodejs"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params          // 👈 desempaquetamos la promesa
  const idDocumento = id
  const mode = req.nextUrl.searchParams.get("mode") ?? "blob"

  const result = await getDocumentoPorIdController(idDocumento)

  if (result.status !== 200) {
    return NextResponse.json(result.body, { status: result.status })
  }

  const documento: any = result.body

  if (mode === "meta") {
    return NextResponse.json(documento, { status: 200 })
  }

  if (!documento?.contenidoArchivo) {
    return new NextResponse("Archivo no encontrado", { status: 404 })
  }

  return new NextResponse(documento.contenidoArchivo, {
    status: 200,
    headers: {
      "Content-Type": documento.tipoArchivo || "application/pdf",
      "Content-Disposition": `inline; filename="${documento.nombreArchivo}"`,
    },
  })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const idDocumento = params.id

  const result = await deleteDocumentoController(idDocumento)

  if (result.status !== 200) {
    return NextResponse.json(result.body, { status: result.status })
  }

  return NextResponse.json(result.body, { status: 200 })
}
