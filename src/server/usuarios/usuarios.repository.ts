// src/server/usuarios/usuarios.repository.ts

import { prisma } from "@/src/lib/prisma"
import { Usuario, UsuarioCreateInput } from "./usuarios.model"

// Obtener todos los usuarios
export async function findAllUsuarios(): Promise<Usuario[]> {
  const usuarios = await prisma.usuarios.findMany({
    orderBy: { fechaRegistro: "desc" },
  })

  return usuarios as unknown as Usuario[]
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
