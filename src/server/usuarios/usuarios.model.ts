// src/server/usuarios/usuarios.model.ts

export interface Usuario {
  idUsuario: string
  nombre: string
  correo: string
  passwordHash: string
  rol: string
  estado: boolean
  esEliminado: boolean
  fechaRegistro: Date
  fechaEliminacion: Date | null
}


export interface UsuarioCreateInput {
  nombre: string
  correo: string
  passwordHash: string
  rol: string
  estado?: boolean

  // opcional, casi nunca lo mandarás desde el front
  esEliminado?: boolean
  fechaEliminacion?: Date | null
}

export interface UsuarioUpdateInput {
  nombre?: string
  correo?: string
  passwordHash?: string
  rol?: string
  estado?: boolean

  esEliminado?: boolean
  fechaEliminacion?: Date | null
}
