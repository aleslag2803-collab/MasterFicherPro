-- CreateTable
CREATE TABLE "Usuarios" (
    "idUsuario" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Documentos" (
    "idDocumento" TEXT NOT NULL PRIMARY KEY,
    "idUsuarioPropietario" TEXT NOT NULL,
    "nombreArchivo" TEXT NOT NULL,
    "tipoArchivo" TEXT NOT NULL,
    "contenidoArchivo" BLOB,
    "tamanoBytes" INTEGER,
    "fechaSubida" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT,
    "estado" TEXT NOT NULL,
    "etiquetas" TEXT,
    "resumen" TEXT,
    "esAuditoria" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Documentos_idUsuarioPropietario_fkey" FOREIGN KEY ("idUsuarioPropietario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Permisos" (
    "idPermiso" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "tipoAcceso" TEXT NOT NULL,
    "fechaAsignacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Permisos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Permisos_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "idOrganizacion" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "nombreCarpeta" TEXT NOT NULL,
    "nivelJerarquico" INTEGER NOT NULL,
    "padreId" TEXT,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Organizacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Organizacion_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Organizacion" ("idOrganizacion") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CuestionarioIA" (
    "idCuestionario" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "fechaRespuesta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CuestionarioIA_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistorialAcciones" (
    "idHistorial" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "fechaAccion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detalle" TEXT,
    CONSTRAINT "HistorialAcciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HistorialAcciones_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VersionesDocumento" (
    "idVersion" TEXT NOT NULL PRIMARY KEY,
    "idDocumento" TEXT NOT NULL,
    "numeroVersion" TEXT NOT NULL,
    "rutaArchivo" TEXT NOT NULL,
    "fechaVersion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VersionesDocumento_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notificaciones" (
    "idNotificacion" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "fechaEnvio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notificaciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");
