// src/server/organizaciones/organizaciones.services.ts

import {
  findAllOrganizaciones,
  findOrganizacionesByUsuario,
  findOrganizacionById,
  createOrganizacion,
  updateOrganizacion,
  deleteOrganizacion,
  findOrganizacionesByPadre,
} from "./organizaciones.repository"
import { Organizacion, OrganizacionCreateInput, OrganizacionUpdateInput } from "./organizaciones.model"

export async function listarOrganizacionesService(): Promise<Organizacion[]> {
  const organizaciones = await findAllOrganizaciones()
  return organizaciones
}

export async function listarOrganizacionesPorUsuarioService(idUsuario: string): Promise<Organizacion[]> {
  const organizaciones = await findOrganizacionesByUsuario(idUsuario)
  return organizaciones
}

export async function obtenerOrganizacionPorIdService(id: string): Promise<Organizacion | null> {
  const organizacion = await findOrganizacionById(id)
  return organizacion
}

export async function crearOrganizacionService(body: any): Promise<Organizacion> {
  // Validación
  if (!body?.idUsuario || !body?.nombre || !body?.nombreCarpeta) {
    throw new Error("idUsuario, nombre y nombreCarpeta son obligatorios")
  }

  if (body.nivelJerarquico === undefined || typeof body.nivelJerarquico !== "number") {
    throw new Error("nivelJerarquico es obligatorio y debe ser un número")
  }

  const data: OrganizacionCreateInput = {
    idUsuario: body.idUsuario,
    nombre: body.nombre,
    descripcion: body.descripcion,
    emailContacto: body.emailContacto,
    telefono: body.telefono,
    direccion: body.direccion,
    nombreCarpeta: body.nombreCarpeta,
    nivelJerarquico: body.nivelJerarquico,
    padreId: body.padreId,
  }

  const organizacion = await createOrganizacion(data)
  return organizacion
}

export async function actualizarOrganizacionService(id: string, body: any): Promise<Organizacion> {
  // Verificar que la organizacion exista
  const organizacionExistente = await findOrganizacionById(id)
  if (!organizacionExistente) {
    throw new Error("Organización no encontrada")
  }

  // Validar que al menos un campo sea proporcionado
  if (!body || Object.keys(body).length === 0) {
    throw new Error("Debe proporcionar al menos un campo para actualizar")
  }

  const data: OrganizacionUpdateInput = {
    ...(body.nombre && { nombre: body.nombre }),
    ...(body.descripcion !== undefined && { descripcion: body.descripcion }),
    ...(body.emailContacto !== undefined && { emailContacto: body.emailContacto }),
    ...(body.telefono !== undefined && { telefono: body.telefono }),
    ...(body.direccion !== undefined && { direccion: body.direccion }),
    ...(body.nombreCarpeta && { nombreCarpeta: body.nombreCarpeta }),
    ...(body.nivelJerarquico !== undefined && { nivelJerarquico: body.nivelJerarquico }),
    ...(body.padreId !== undefined && { padreId: body.padreId }),
  }

  const organizacion = await updateOrganizacion(id, data)
  return organizacion
}

export async function eliminarOrganizacionService(id: string): Promise<Organizacion> {
  // Verificar que la organizacion exista
  const organizacionExistente = await findOrganizacionById(id)
  if (!organizacionExistente) {
    throw new Error("Organización no encontrada")
  }

  // Verificar que no tenga sub-organizaciones
  const subOrganizaciones = await findOrganizacionesByPadre(id)
  if (subOrganizaciones.length > 0) {
    throw new Error(
      "No se puede eliminar una organización que tiene sub-organizaciones. Elimina primero las sub-organizaciones.",
    )
  }

  const organizacion = await deleteOrganizacion(id)
  return organizacion
}

export async function obtenerJerarquiaService(padreId: string): Promise<Organizacion[]> {
  const organizaciones = await findOrganizacionesByPadre(padreId)
  return organizaciones
}
