// src/server/usuarios/usuarios.controller.ts
import { listarUsuariosService, crearUsuarioService } from "./usuarios.service"

export async function getUsuariosController() {
  const usuarios = await listarUsuariosService()
  return {
    status: 200,
    body: usuarios,
  }
}

export async function postUsuarioController(body: any) {
  try {
    const usuario = await crearUsuarioService(body)
    return {
      status: 201,
      body: usuario,
    }
  } catch (error: any) {
    return {
      status: 400,
      body: {
        error: error?.message ?? "Error al crear usuario",
      },
    }
  }
}
