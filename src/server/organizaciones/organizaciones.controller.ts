// src/server/organizaciones/organizaciones.controller.ts

import {
  listarOrganizacionesService,
  listarOrganizacionesPorUsuarioService,
  obtenerOrganizacionPorIdService,
  crearOrganizacionService,
  actualizarOrganizacionService,
  eliminarOrganizacionService,
  obtenerJerarquiaService,
} from "./organizaciones.services"

export async function getOrganizacionesController() {
  try {
    const organizaciones = await listarOrganizacionesService()
    return {
      status: 200,
      body: organizaciones,
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al obtener organizaciones",
      },
    }
  }
}

export async function getOrganizacionesPorUsuarioController(idUsuario: string) {
  try {
    const organizaciones = await listarOrganizacionesPorUsuarioService(idUsuario)
    return {
      status: 200,
      body: organizaciones,
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al obtener organizaciones del usuario",
      },
    }
  }
}

export async function getOrganizacionPorIdController(id: string) {
  try {
    const organizacion = await obtenerOrganizacionPorIdService(id)
    if (!organizacion) {
      return {
        status: 404,
        body: {
          error: "Organización no encontrada",
        },
      }
    }
    return {
      status: 200,
      body: organizacion,
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al obtener organización",
      },
    }
  }
}

export async function postOrganizacionController(body: any) {
  try {
    const organizacion = await crearOrganizacionService(body)
    return {
      status: 201,
      body: organizacion,
    }
  } catch (error: any) {
    return {
      status: 400,
      body: {
        error: error?.message ?? "Error al crear organización",
      },
    }
  }
}

export async function putOrganizacionController(id: string, body: any) {
  try {
    const organizacion = await actualizarOrganizacionService(id, body)
    return {
      status: 200,
      body: organizacion,
    }
  } catch (error: any) {
    return {
      status: 400,
      body: {
        error: error?.message ?? "Error al actualizar organización",
      },
    }
  }
}

export async function deleteOrganizacionController(id: string) {
  try {
    const organizacion = await eliminarOrganizacionService(id)
    return {
      status: 200,
      body: {
        message: "Organización eliminada correctamente",
        organizacion,
      },
    }
  } catch (error: any) {
    return {
      status: 400,
      body: {
        error: error?.message ?? "Error al eliminar organización",
      },
    }
  }
}

export async function getJerarquiaController(padreId: string) {
  try {
    const organizaciones = await obtenerJerarquiaService(padreId)
    return {
      status: 200,
      body: organizaciones,
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al obtener jerarquía",
      },
    }
  }
}
