// src/server/usuarios/usuarios.repository.ts

import { prisma } from "@/src/lib/prisma"
import { Usuario, UsuarioCreateInput, UsuarioUpdateInput } from "./usuarios.model"

// Obtener todos los usuarios (sin eliminados)
export async function findAllUsuarios(): Promise<Usuario[]> {
  const usuarios = await prisma.usuarios.findMany({
    where: { esEliminado: false },
    orderBy: { fechaRegistro: "desc" },
  })

  return usuarios as unknown as Usuario[]
}

// Obtener un usuario por ID
export async function findUsuarioById(id: string): Promise<Usuario | null> {
  const usuario = await prisma.usuarios.findUnique({
    where: { idUsuario: id },
  })

  if (usuario?.esEliminado) {
    return null
  }

  return usuario as unknown as Usuario | null
}

// Obtener un usuario por correo
export async function findUsuarioByCorreo(correo: string): Promise<Usuario | null> {
  const usuario = await prisma.usuarios.findUnique({
    where: { correo },
  })

  if (usuario?.esEliminado) {
    return null
  }

  return usuario as unknown as Usuario | null
}

// Crear un usuario
export async function createUsuario(data: UsuarioCreateInput): Promise<Usuario> {
  const nuevoUsuario = await prisma.usuarios.create({
    data: {
      nombre: data.nombre,
      correo: data.correo,
      passwordHash: data.passwordHash,
      rol: data.rol,
      estado: data.estado ?? true,
    },
  })

  return nuevoUsuario as unknown as Usuario
}

// Actualizar un usuario
export async function updateUsuario(id: string, data: UsuarioUpdateInput): Promise<Usuario> {
  const usuarioActualizado = await prisma.usuarios.update({
    where: { idUsuario: id },
    data: {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.correo && { correo: data.correo }),
      ...(data.passwordHash && { passwordHash: data.passwordHash }),
      ...(data.rol && { rol: data.rol }),
      ...(data.estado !== undefined && { estado: data.estado }),
    },
  })

  return usuarioActualizado as unknown as Usuario
}

// Soft delete - marcar como eliminado
export async function softDeleteUsuario(id: string): Promise<Usuario> {
  const usuarioEliminado = await prisma.usuarios.update({
    where: { idUsuario: id },
    data: {
      esEliminado: true,
      estado: false,
      fechaEliminacion: new Date(),
    },
  })

  return usuarioEliminado as unknown as Usuario
}

// Restaurar un usuario eliminado
export async function restoreUsuario(id: string): Promise<Usuario> {
  const usuarioRestaurado = await prisma.usuarios.update({
    where: { idUsuario: id },
    data: {
      esEliminado: false,
      estado: true,
      fechaEliminacion: null,
    },
  })

  return usuarioRestaurado as unknown as Usuario
}
