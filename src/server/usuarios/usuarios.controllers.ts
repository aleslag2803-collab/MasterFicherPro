// src/server/usuarios/usuarios.controller.ts
import { UsuarioCreateInput } from "./usuarios.model"
import { createUsuario } from "./usuarios.repository"
import {
  listarUsuariosService,
  crearUsuarioService,
  obtenerUsuarioPorIdService,
  actualizarUsuarioService,
  eliminarUsuarioService,
} from "./usuarios.service"

export async function getUsuariosController() {
  try {
    const usuarios = await listarUsuariosService()
    return {
      status: 200,
      body: usuarios,
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al obtener usuarios",
      },
    }
  }
}

export async function getUsuarioPorIdController(id: string) {
  try {
    const usuario = await obtenerUsuarioPorIdService(id)
    if (!usuario) {
      return {
        status: 404,
        body: {
          error: "Usuario no encontrado",
        },
      }
    }
    return {
      status: 200,
      body: usuario,
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        error: error?.message ?? "Error al obtener usuario",
      },
    }
  }
}

export async function postUsuarioController(data: UsuarioCreateInput) {
  const { nombre, correo, rol, estado, passwordHash } = data

  // ✅ Solo validamos lo que SÍ estás mandando desde el front
  if (!nombre || !correo || !rol) {
    return {
      status: 400,
      body: { error: "nombre, correo y rol son obligatorios" },
    }
  }

  const nuevoUsuario = await crearUsuarioService({
    nombre,
    correo,
    rol,
    estado: estado ?? true,
    // 👇 Si no mandas passwordHash, ponemos una cadena vacía
    passwordHash: passwordHash ?? "",
  })

  return {
    status: 201,
    body: nuevoUsuario,
  }
}

export async function deleteUsuarioController(id: string) {
  try {
    const usuario = await eliminarUsuarioService(id)
    return {
      status: 200,
      body: {
        message: "Usuario eliminado correctamente",
        usuario,
      },
    }
  } catch (error: any) {
    return {
      status: 400,
      body: {
        error: error?.message ?? "Error al eliminar usuario",
      },
    }
  }
}
export async function putUsuarioController(id: string, body: any) {
  try {
    // Llamamos al service que ya tienes
    const usuarioActualizado = await actualizarUsuarioService(id, body)

    return {
      status: 200,
      body: usuarioActualizado,
    }
  } catch (error: any) {
    const message = error?.message ?? "Error al actualizar usuario"
    // Si el service lanza "Usuario no encontrado", devolvemos 404
    const status = message === "Usuario no encontrado" ? 404 : 400

    return {
      status,
      body: {
        error: message,
      },
    }
  }
}
