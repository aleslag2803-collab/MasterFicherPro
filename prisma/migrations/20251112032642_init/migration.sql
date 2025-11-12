/*
  Warnings:

  - The primary key for the `CuestionarioIA` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Documentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HistorialAcciones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notificaciones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Organizacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Permisos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VersionesDocumento` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CuestionarioIA" (
    "idCuestionario" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "fechaRespuesta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CuestionarioIA_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CuestionarioIA" ("fechaRespuesta", "idCuestionario", "idUsuario", "pregunta", "respuesta") SELECT "fechaRespuesta", "idCuestionario", "idUsuario", "pregunta", "respuesta" FROM "CuestionarioIA";
DROP TABLE "CuestionarioIA";
ALTER TABLE "new_CuestionarioIA" RENAME TO "CuestionarioIA";
CREATE TABLE "new_Documentos" (
    "idDocumento" TEXT NOT NULL PRIMARY KEY,
    "idUsuarioPropietario" TEXT NOT NULL,
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
INSERT INTO "new_Documentos" ("estado", "etiquetas", "fechaSubida", "idDocumento", "idUsuarioPropietario", "nombreArchivo", "resumen", "rutaArchivo", "tipoArchivo", "version") SELECT "estado", "etiquetas", "fechaSubida", "idDocumento", "idUsuarioPropietario", "nombreArchivo", "resumen", "rutaArchivo", "tipoArchivo", "version" FROM "Documentos";
DROP TABLE "Documentos";
ALTER TABLE "new_Documentos" RENAME TO "Documentos";
CREATE TABLE "new_HistorialAcciones" (
    "idHistorial" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "fechaAccion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detalle" TEXT,
    CONSTRAINT "HistorialAcciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HistorialAcciones_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HistorialAcciones" ("accion", "detalle", "fechaAccion", "idDocumento", "idHistorial", "idUsuario") SELECT "accion", "detalle", "fechaAccion", "idDocumento", "idHistorial", "idUsuario" FROM "HistorialAcciones";
DROP TABLE "HistorialAcciones";
ALTER TABLE "new_HistorialAcciones" RENAME TO "HistorialAcciones";
CREATE TABLE "new_Notificaciones" (
    "idNotificacion" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "fechaEnvio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notificaciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Notificaciones" ("fechaEnvio", "idNotificacion", "idUsuario", "leido", "mensaje") SELECT "fechaEnvio", "idNotificacion", "idUsuario", "leido", "mensaje" FROM "Notificaciones";
DROP TABLE "Notificaciones";
ALTER TABLE "new_Notificaciones" RENAME TO "Notificaciones";
CREATE TABLE "new_Organizacion" (
    "idOrganizacion" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "nombreCarpeta" TEXT NOT NULL,
    "nivelJerarquico" INTEGER NOT NULL,
    "padreId" TEXT,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Organizacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Organizacion_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Organizacion" ("idOrganizacion") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Organizacion" ("fechaCreacion", "idOrganizacion", "idUsuario", "nivelJerarquico", "nombreCarpeta", "padreId") SELECT "fechaCreacion", "idOrganizacion", "idUsuario", "nivelJerarquico", "nombreCarpeta", "padreId" FROM "Organizacion";
DROP TABLE "Organizacion";
ALTER TABLE "new_Organizacion" RENAME TO "Organizacion";
CREATE TABLE "new_Permisos" (
    "idPermiso" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "tipoAcceso" TEXT NOT NULL,
    "fechaAsignacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Permisos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Permisos_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Permisos" ("fechaAsignacion", "idDocumento", "idPermiso", "idUsuario", "tipoAcceso") SELECT "fechaAsignacion", "idDocumento", "idPermiso", "idUsuario", "tipoAcceso" FROM "Permisos";
DROP TABLE "Permisos";
ALTER TABLE "new_Permisos" RENAME TO "Permisos";
CREATE TABLE "new_Usuarios" (
    "idUsuario" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Usuarios" ("correo", "estado", "fechaRegistro", "idUsuario", "nombre", "passwordHash", "rol") SELECT "correo", "estado", "fechaRegistro", "idUsuario", "nombre", "passwordHash", "rol" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");
CREATE TABLE "new_VersionesDocumento" (
    "idVersion" TEXT NOT NULL PRIMARY KEY,
    "idDocumento" TEXT NOT NULL,
    "numeroVersion" TEXT NOT NULL,
    "rutaArchivo" TEXT NOT NULL,
    "fechaVersion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VersionesDocumento_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VersionesDocumento" ("fechaVersion", "idDocumento", "idVersion", "numeroVersion", "rutaArchivo") SELECT "fechaVersion", "idDocumento", "idVersion", "numeroVersion", "rutaArchivo" FROM "VersionesDocumento";
DROP TABLE "VersionesDocumento";
ALTER TABLE "new_VersionesDocumento" RENAME TO "VersionesDocumento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
