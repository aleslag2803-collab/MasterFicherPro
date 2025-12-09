import { NextRequest, NextResponse } from "next/server"
import {
  deleteDocumentoController,
  getDocumentoPorIdController,
  putDocumentoController,
} from "@/src/server/documentos/documentos.controller"

export const runtime = "nodejs"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const mode = req.nextUrl.searchParams.get("mode") ?? "blob"

    const result = await getDocumentoPorIdController(id)

    if (result.status !== 200) {
      return NextResponse.json(result.body, { status: result.status })
    }

    const documento: any = result.body

    if (mode === "meta") {
      return NextResponse.json(documento)
    }

    if (!documento?.contenidoArchivo) {
      return new NextResponse("Archivo no encontrado", { status: 404 })
    }

    let uint: Uint8Array

    if (typeof documento.contenidoArchivo === "string") {
      const hex = documento.contenidoArchivo.replace(/^\\x/, "")
      const bytes = hex.match(/.{1,2}/g)?.map((b: string) => parseInt(b, 16)) || []
      uint = new Uint8Array(bytes)
    }

    // 🔥 Normalización desde Uint8Array (pero su buffer es SharedArrayBuffer)
    else if (documento.contenidoArchivo instanceof Uint8Array) {
      uint = documento.contenidoArchivo
    }
    else {
      return new NextResponse("Tipo de archivo no soportado", { status: 500 })
    }

    // ⭐⭐⭐⭐ ESTA ES LA CLAVE ⭐⭐⭐⭐
    // Copiamos byte por byte a un ArrayBuffer REAL
    const cleanBuffer = new ArrayBuffer(uint.byteLength)
    const cleanArray = new Uint8Array(cleanBuffer)
    cleanArray.set(uint)

    // Blob seguro y tipado correctamente
    const blob = new Blob([cleanBuffer], {
      type: documento.tipoArchivo || "application/pdf",
    })

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": documento.tipoArchivo || "application/pdf",
        "Content-Disposition": `inline; filename="${encodeURIComponent(
          documento.nombreArchivo || "documento.pdf"
        )}"`,
        "Content-Length": cleanArray.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error("Error en GET /api/documentos/[id]:", error)
    return new NextResponse("Error interno del servidor", { status: 500 })
  }
}


// PUT /api/documentos/[id]
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params
  const idDocumento = id
  const data = await req.json()

  const result = await putDocumentoController(idDocumento, data)

  return NextResponse.json(result.body, { status: result.status })
}

// DELETE /api/documentos/[id]
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params
  const idDocumento = id

  const result = await deleteDocumentoController(idDocumento)

  return NextResponse.json(result.body, { status: result.status })
}
