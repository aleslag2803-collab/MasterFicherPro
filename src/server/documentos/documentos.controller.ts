import {
  listarDocumentosService,
  crearDocumentoService,
  obtenerDocumentoPorIdService,
  actualizarDocumentoService,
  eliminarDocumentoService,
} from "./documentos.service"

export async function getDocumentosController() {
  const documentos = await listarDocumentosService()
  return {
    status: 200,
    body: documentos,
  }
}

export async function getDocumentoPorIdController(idDocumento: string) {
  if (!idDocumento) {
    return {
      status: 400,
      body: { error: "idDocumento es requerido" },
    }
  }

  try {
    const documento = await obtenerDocumentoPorIdService(idDocumento)

    if (!documento) {
      return {
        status: 404,
        body: { error: "Documento no encontrado" },
      }
    }

    return {
      status: 200,
      body: documento,
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al obtener documento",
      },
    }
  }
}

export async function postDocumentoController(body: any) {
  try {
    const documento = await crearDocumentoService(body)
    return {
      status: 201,
      body: documento,
    }
  } catch (error: any) {
    return {
      status: 400,
      body: {
        error: error?.message ?? "Error al crear documento",
      },
    }
  } 
}

export async function putDocumentoController(idDocumento: string, body: any) {
  try {
    const documento = await actualizarDocumentoService(idDocumento, body)
    return {
      status: 200,
      body: documento,
    }
  } catch (error: any) {
    return {
      status: 400,
      body: {
        error: error?.message ?? "Error al actualizar documento",
      },
    }
  }
}

export async function deleteDocumentoController(idDocumento: string) {
  try {
    const result = await eliminarDocumentoService(idDocumento)

    if (!result) {
      return {
        status: 404,
        body: { error: "Documento no encontrado o no pudo ser eliminado" },
      }
    }

    return {
      status: 200,
      body: { message: "Documento eliminado exitosamente" },
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al eliminar el documento",
      },
    }
  }
}

