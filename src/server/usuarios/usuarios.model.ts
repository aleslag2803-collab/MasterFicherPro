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

export interface UsuarioCreateInput {
  nombre: string
  correo: string
  passwordHash: string
  rol: string
  estado?: boolean
}
