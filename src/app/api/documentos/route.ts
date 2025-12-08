// app/api/documentos/route.ts
import { NextRequest, NextResponse } from "next/server"
import {
  getDocumentosController,
  postDocumentoController,
} from "@/src/server/documentos/documentos.controller"

export const runtime = "nodejs" // importante para poder usar Buffer

// GET /api/documentos -> lista documentos
export async function GET() {
  const result = await getDocumentosController()
  return NextResponse.json(result.body, { status: result.status })
}

// POST /api/documentos -> subir documento (PDF u otro)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File | null
    const idUsuarioPropietario = formData.get("idUsuarioPropietario") as
      | string
      | null

    if (!file) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo" },
        { status: 400 }
      )
    }

    if (!idUsuarioPropietario) {
      return NextResponse.json(
        { error: "idUsuarioPropietario es obligatorio" },
        { status: 400 }
      )
    }

    // 👇 VALIDACIÓN DE QUE SEA PDF
    const mimeType = file.type
    const fileName = file.name.toLowerCase()

    const isPdf =
      mimeType === "application/pdf" || fileName.endsWith(".pdf")

    if (!isPdf) {
      return NextResponse.json(
        { error: "Solo se permiten archivos PDF" },
        { status: 400 }
      )
    }

    const arrayBuffer = (await file.arrayBuffer()) as ArrayBuffer
    const uint8 = new Uint8Array(arrayBuffer)

    const bodyForService = {
      idUsuarioPropietario,
      nombreArchivo: file.name,
      // 👇 ya no pongas fallback a PDF, respeta el mime
      tipoArchivo: mimeType,
      contenidoArchivo: uint8,
      tamanoBytes: uint8.byteLength,
      estado: (formData.get("estado") as string) || "ACTIVO",
      version: (formData.get("version") as string) || undefined,
      etiquetas: (formData.get("etiquetas") as string) || undefined,
      resumen: (formData.get("resumen") as string) || undefined,
    }

    const result = await postDocumentoController(bodyForService)

    return NextResponse.json(result.body, { status: result.status })
  } catch (error: any) {
    console.error("Error en POST /api/documentos", error)
    return NextResponse.json(
      { error: error?.message ?? "Error al subir documento" },
      { status: 500 }
    )
  }
}

