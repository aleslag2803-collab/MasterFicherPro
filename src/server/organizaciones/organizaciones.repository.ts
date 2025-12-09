// src/server/organizaciones/organizaciones.repository.ts

import { prisma } from "@/src/lib/prisma"
import { Organizacion, OrganizacionCreateInput, OrganizacionUpdateInput } from "./organizaciones.model"

// Obtener todas las organizaciones
export async function findAllOrganizaciones(): Promise<Organizacion[]> {
  const organizaciones = await prisma.organizacion.findMany({
    orderBy: { fechaCreacion: "desc" },
    include: {
      padre: true,
      hijos: true,
      usuario: true,
    },
  })

  return organizaciones as unknown as Organizacion[]
}

// Obtener organizaciones por usuario
export async function findOrganizacionesByUsuario(idUsuario: string): Promise<Organizacion[]> {
  const organizaciones = await prisma.organizacion.findMany({
    where: { idUsuario },
    orderBy: { fechaCreacion: "desc" },
    include: {
      padre: true,
      hijos: true,
      usuario: true,
    },
  })

  return organizaciones as unknown as Organizacion[]
}

// Obtener una organizacion por ID
export async function findOrganizacionById(id: string): Promise<Organizacion | null> {
  const organizacion = await prisma.organizacion.findUnique({
    where: { idOrganizacion: id },
    include: {
      padre: true,
      hijos: true,
      usuario: true,
    },
  })

  return organizacion as unknown as Organizacion | null
}

// Crear una organizacion
export async function createOrganizacion(data: OrganizacionCreateInput): Promise<Organizacion> {
  const nuevaOrganizacion = await prisma.organizacion.create({
    data: {
      idUsuario: data.idUsuario,
      nombre: data.nombre,
      descripcion: data.descripcion,
      emailContacto: data.emailContacto,
      telefono: data.telefono,
      direccion: data.direccion,
      nombreCarpeta: data.nombreCarpeta,
      nivelJerarquico: data.nivelJerarquico,
      padreId: data.padreId,
    },
    include: {
      padre: true,
      hijos: true,
      usuario: true,
    },
  })

  return nuevaOrganizacion as unknown as Organizacion
}

// Actualizar una organizacion
export async function updateOrganizacion(
  id: string,
  data: OrganizacionUpdateInput,
): Promise<Organizacion> {
  const organizacionActualizada = await prisma.organizacion.update({
    where: { idOrganizacion: id },
    data: {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.descripcion !== undefined && { descripcion: data.descripcion }),
      ...(data.emailContacto !== undefined && { emailContacto: data.emailContacto }),
      ...(data.telefono !== undefined && { telefono: data.telefono }),
      ...(data.direccion !== undefined && { direccion: data.direccion }),
      ...(data.nombreCarpeta && { nombreCarpeta: data.nombreCarpeta }),
      ...(data.nivelJerarquico !== undefined && { nivelJerarquico: data.nivelJerarquico }),
      ...(data.padreId !== undefined && { padreId: data.padreId }),
    },
    include: {
      padre: true,
      hijos: true,
      usuario: true,
    },
  })

  return organizacionActualizada as unknown as Organizacion
}

// Eliminar una organizacion
export async function deleteOrganizacion(id: string): Promise<Organizacion> {
  const organizacionEliminada = await prisma.organizacion.delete({
    where: { idOrganizacion: id },
    include: {
      padre: true,
      hijos: true,
      usuario: true,
    },
  })

  return organizacionEliminada as unknown as Organizacion
}

// Obtener jerarquía de organizaciones
export async function findOrganizacionesByPadre(padreId: string): Promise<Organizacion[]> {
  const organizaciones = await prisma.organizacion.findMany({
    where: { padreId },
    orderBy: { fechaCreacion: "desc" },
    include: {
      padre: true,
      hijos: true,
      usuario: true,
    },
  })

  return organizaciones as unknown as Organizacion[]
}
