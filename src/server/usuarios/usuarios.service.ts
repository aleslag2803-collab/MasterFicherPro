// src/server/usuarios/usuarios.service.ts
import {
  createUsuario,
  findAllUsuarios,
  findUsuarioById,
  updateUsuario,
  softDeleteUsuario,
  findUsuarioByCorreo,
} from "./usuarios.repository"
import { Usuario, UsuarioCreateInput, UsuarioUpdateInput } from "./usuarios.model"

export async function listarUsuariosService(): Promise<Usuario[]> {
  const usuarios = await findAllUsuarios()
  return usuarios
}

export async function obtenerUsuarioPorIdService(id: string): Promise<Usuario | null> {
  const usuario = await findUsuarioById(id)
  return usuario
}

export async function actualizarUsuarioService(id: string, body: any): Promise<Usuario> {
  // Verificar que el usuario exista
  const usuarioExistente = await findUsuarioById(id)
  if (!usuarioExistente) {
    throw new Error("Usuario no encontrado")
  }

  // Validar que al menos un campo sea proporcionado
  if (!body || Object.keys(body).length === 0) {
    throw new Error("Debe proporcionar al menos un campo para actualizar")
  }

  // Si se intenta cambiar el correo, verificar que no exista
  if (body.correo && body.correo !== usuarioExistente.correo) {
    const usuarioConCorreo = await findUsuarioByCorreo(body.correo)
    if (usuarioConCorreo) {
      throw new Error("El correo ya está en uso")
    }
  }

  const data: UsuarioUpdateInput = {
    ...(body.nombre && { nombre: body.nombre }),
    ...(body.correo && { correo: body.correo }),
    ...(body.passwordHash && { passwordHash: body.passwordHash }),
    ...(body.rol && { rol: body.rol }),
    ...(body.estado !== undefined && { estado: body.estado }),
  }

  const usuario = await updateUsuario(id, data)
  return usuario
}

export async function eliminarUsuarioService(id: string): Promise<Usuario> {
  // Verificar que el usuario exista
  const usuarioExistente = await findUsuarioById(id)
  if (!usuarioExistente) {
    throw new Error("Usuario no encontrado")
  }

  // Realizar soft delete
  const usuario = await softDeleteUsuario(id)
  return usuario
}

export async function crearUsuarioService(body: any): Promise<Usuario> {
  // ✅ Solo validamos lo que SÍ estás enviando desde el front
  if (!body?.nombre || !body?.correo || !body?.rol) {
    throw new Error("nombre, correo y rol son obligatorios")
  }

  // Verificar si el correo ya existe
  const usuarioExistente = await findUsuarioByCorreo(body.correo)
  if (usuarioExistente) {
    throw new Error("El correo ya está registrado")
  }

  const data: UsuarioCreateInput = {
    nombre: body.nombre,
    correo: body.correo,
    // 👇 Si no viene passwordHash, usamos cadena vacía (o algún dummy)
    passwordHash: body.passwordHash ?? "",
    rol: body.rol,
    estado: body.estado ?? true,
  }

  const usuario = await createUsuario(data)
  return usuario
}
