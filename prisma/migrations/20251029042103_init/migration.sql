/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Usuarios" (
    "idUsuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Documentos" (
    "idDocumento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuarioPropietario" INTEGER NOT NULL,
    "nombreArchivo" TEXT NOT NULL,
    "tipoArchivo" TEXT NOT NULL,
    "rutaArchivo" TEXT NOT NULL,
    "fechaSubida" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT,
    "estado" TEXT NOT NULL,
    "etiquetas" TEXT,
    "resumen" TEXT,
    CONSTRAINT "Documentos_idUsuarioPropietario_fkey" FOREIGN KEY ("idUsuarioPropietario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Permisos" (
    "idPermiso" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "idDocumento" INTEGER NOT NULL,
    "tipoAcceso" TEXT NOT NULL,
    "fechaAsignacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Permisos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Permisos_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "idOrganizacion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "nombreCarpeta" TEXT NOT NULL,
    "nivelJerarquico" INTEGER NOT NULL,
    "padreId" INTEGER,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Organizacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Organizacion_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Organizacion" ("idOrganizacion") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CuestionarioIA" (
    "idCuestionario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "fechaRespuesta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CuestionarioIA_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistorialAcciones" (
    "idHistorial" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "idDocumento" INTEGER NOT NULL,
    "accion" TEXT NOT NULL,
    "fechaAccion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detalle" TEXT,
    CONSTRAINT "HistorialAcciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HistorialAcciones_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VersionesDocumento" (
    "idVersion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idDocumento" INTEGER NOT NULL,
    "numeroVersion" TEXT NOT NULL,
    "rutaArchivo" TEXT NOT NULL,
    "fechaVersion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VersionesDocumento_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notificaciones" (
    "idNotificacion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "fechaEnvio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notificaciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");
