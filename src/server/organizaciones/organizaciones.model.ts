// src/server/organizaciones/organizaciones.model.ts

export interface Organizacion {
  idOrganizacion: string
  idUsuario: string
  nombre: string
  descripcion: string | null
  emailContacto: string | null
  telefono: string | null
  direccion: string | null
  nombreCarpeta: string
  nivelJerarquico: number
  padreId: string | null
  fechaCreacion: Date
}

export interface OrganizacionCreateInput {
  idUsuario: string
  nombre: string
  descripcion?: string
  emailContacto?: string
  telefono?: string
  direccion?: string
  nombreCarpeta: string
  nivelJerarquico: number
  padreId?: string
}

export interface OrganizacionUpdateInput {
  nombre?: string
  descripcion?: string
  emailContacto?: string
  telefono?: string
  direccion?: string
  nombreCarpeta?: string
  nivelJerarquico?: number
  padreId?: string
}
