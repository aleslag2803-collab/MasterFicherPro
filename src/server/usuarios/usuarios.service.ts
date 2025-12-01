// src/server/usuarios/usuarios.service.ts
import { createUsuario, findAllUsuarios } from "./usuarios.repository"
import { Usuario, UsuarioCreateInput } from "./usuarios.model"

export async function listarUsuariosService(): Promise<Usuario[]> {
  const usuarios = await findAllUsuarios()
  return usuarios
}

export async function crearUsuarioService(body: any): Promise<Usuario> {
  // Validación simple (puedes mejorarla con Zod luego)
  if (!body?.nombre || !body?.correo || !body?.passwordHash || !body?.rol) {
    throw new Error("nombre, correo, passwordHash y rol son obligatorios")
  }

  const data: UsuarioCreateInput = {
    nombre: body.nombre,
    correo: body.correo,
    passwordHash: body.passwordHash, // aquí podrías hashear si recibes password plano
    rol: body.rol,
    estado: body.estado ?? true,
  }

  const usuario = await createUsuario(data)
  return usuario
}
