// src/server/usuarios/usuarios.model.ts

export interface Usuario {
  idUsuario: string
  nombre: string
  correo: string
  passwordHash: string
  rol: string
  estado: boolean
  fechaRegistro: Date
}

/**
 * Datos necesarios para crear un usuario desde la API.
 * No incluye idUsuario ni fechaRegistro porque los genera la BD.
 */
export interface UsuarioCreateInput {
  nombre: string
  correo: string
  passwordHash: string
  rol: string
  estado?: boolean
}
