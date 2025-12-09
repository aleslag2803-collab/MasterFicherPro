import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Comenzando a sembrar la base de datos...")

  // ===========================
  // USUARIOS
  // ===========================
  const usuario1 = await prisma.usuarios.upsert({
    where: { correo: "alessa@example.com" },
    update: {},
    create: {
      idUsuario: "b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1",
      nombre: "Alessa Lagos",
      correo: "alessa@example.com",
      passwordHash: "hashedpass123",
      rol: "admin",
    },
  })

  const usuario2 = await prisma.usuarios.upsert({
    where: { correo: "carlos@example.com" },
    update: {},
    create: {
      idUsuario: "9c9d18c5-3b22-46c2-bd4f-b44f2609135b",
      nombre: "Carlos Pérez",
      correo: "carlos@example.com",
      passwordHash: "hashedpass456",
      rol: "editor",
    },
  })

  const usuario3 = await prisma.usuarios.upsert({
    where: { correo: "lucia@example.com" },
    update: {},
    create: {
      idUsuario: "d7a6a3a9-30aa-47d1-a431-bf6f1280d942",
      nombre: "Lucía Gómez",
      correo: "lucia@example.com",
      passwordHash: "hashedpass789",
      rol: "lector",
    },
  })

  console.log("✅ Usuarios creados:", { usuario1, usuario2, usuario3 })

  // ===========================
  // DOCUMENTOS
  // ===========================
  const documento1 = await prisma.documentos.upsert({
    where: { idDocumento: "d2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111" },
    update: {},
    create: {
      idDocumento: "d2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111",
      idUsuarioPropietario: usuario1.idUsuario,
      nombreArchivo: "Proyecto_MasterFicher.pdf",
      tipoArchivo: "application/pdf",
      version: "v1.0",
      estado: "activo",
      etiquetas: "proyecto, masterficher, inicio",
      resumen: "Documento inicial del proyecto MasterFicher",
      contenidoArchivo: Buffer.from("PDF de prueba - Proyecto MasterFicher"),
      tamanoBytes: 1024,
    },
  })

  const documento2 = await prisma.documentos.upsert({
    where: { idDocumento: "e5f4a2b9-9c22-4e11-8a97-ec91e8a8d17a" },
    update: {},
    create: {
      idDocumento: "e5f4a2b9-9c22-4e11-8a97-ec91e8a8d17a",
      idUsuarioPropietario: usuario2.idUsuario,
      nombreArchivo: "ReporteVentas.xlsx",
      tipoArchivo: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      version: "v2.1",
      estado: "activo",
      etiquetas: "reportes, finanzas",
      resumen: "Reporte de ventas actualizado al Q3",
      tamanoBytes: 2048,
    },
  })

  const documento3 = await prisma.documentos.upsert({
    where: { idDocumento: "a3e8c3f5-49b2-40cd-84f7-9e1a456d122e" },
    update: {},
    create: {
      idDocumento: "a3e8c3f5-49b2-40cd-84f7-9e1a456d122e",
      idUsuarioPropietario: usuario3.idUsuario,
      nombreArchivo: "Guía_Usuario.docx",
      tipoArchivo: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      version: "v1.2",
      estado: "borrador",
      etiquetas: "documentación, guía",
      resumen: "Manual de uso básico para nuevos usuarios",
      tamanoBytes: 1536,
    },
  })

  console.log("✅ Documentos creados:", { documento1, documento2, documento3 })

  // ===========================
  // ORGANIZACIÓN
  // ===========================
  const org1 = await prisma.organizacion.upsert({
    where: { idOrganizacion: "4b8f1a2e-1b9d-44c8-bec9-9f1e4a9c7771" },
    update: {},
    create: {
      idOrganizacion: "4b8f1a2e-1b9d-44c8-bec9-9f1e4a9c7771",
      idUsuario: usuario1.idUsuario,
      nombre: "Documentos Generales",
      nombreCarpeta: "Documentos Generales",
      nivelJerarquico: 1,
      padreId: null,
    },
  })

  const org2 = await prisma.organizacion.upsert({
    where: { idOrganizacion: "0f8a7c6e-2b3d-4a9a-9c8f-9b8d7e6f5552" },
    update: {},
    create: {
      idOrganizacion: "0f8a7c6e-2b3d-4a9a-9c8f-9b8d7e6f5552",
      idUsuario: usuario1.idUsuario,
      nombre: "Proyectos",
      nombreCarpeta: "Proyectos",
      nivelJerarquico: 2,
      padreId: org1.idOrganizacion,
    },
  })

  const org3 = await prisma.organizacion.upsert({
    where: { idOrganizacion: "2c3b4a5d-6e7f-8a9b-b0c1-d2e3f4a56663" },
    update: {},
    create: {
      idOrganizacion: "2c3b4a5d-6e7f-8a9b-b0c1-d2e3f4a56663",
      idUsuario: usuario1.idUsuario,
      nombre: "Informes",
      nombreCarpeta: "Informes",
      nivelJerarquico: 2,
      padreId: org1.idOrganizacion,
    },
  })

  console.log("✅ Organizaciones creadas")

  // ===========================
  // CUESTIONARIOS IA
  // ===========================
  const cuestionario1 = await prisma.cuestionarioIA.upsert({
    where: { idCuestionario: "a8b9c1d2-e3f4-4a5b-9c6d-7e8f9a90001" },
    update: {},
    create: {
      idCuestionario: "a8b9c1d2-e3f4-4a5b-9c6d-7e8f9a90001",
      idUsuario: usuario1.idUsuario,
      pregunta: "¿Cómo organizar mejor mis documentos?",
      respuesta: "Puedes crear carpetas jerárquicas y asignar etiquetas temáticas.",
    },
  })

  console.log("✅ Cuestionarios IA creados")

  console.log("🎉 Seed completado exitosamente!")
}

main()
  .catch((e) => {
    console.error("❌ Error durante seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
