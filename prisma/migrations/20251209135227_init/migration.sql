-- CreateTable
CREATE TABLE "Usuarios" (
    "idUsuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "esEliminado" BOOLEAN NOT NULL DEFAULT false,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaEliminacion" TIMESTAMP(3),

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Documentos" (
    "idDocumento" TEXT NOT NULL,
    "idUsuarioPropietario" TEXT NOT NULL,
    "idOrganizacion" TEXT,
    "nombreArchivo" TEXT NOT NULL,
    "tipoArchivo" TEXT NOT NULL,
    "contenidoArchivo" BYTEA,
    "tamanoBytes" INTEGER,
    "fechaSubida" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT,
    "estado" TEXT NOT NULL,
    "etiquetas" TEXT,
    "resumen" TEXT,
    "esAuditoria" BOOLEAN NOT NULL DEFAULT false,
    "esEliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Documentos_pkey" PRIMARY KEY ("idDocumento")
);

-- CreateTable
CREATE TABLE "Permisos" (
    "idPermiso" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "tipoAcceso" TEXT NOT NULL,
    "fechaAsignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permisos_pkey" PRIMARY KEY ("idPermiso")
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "idOrganizacion" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "emailContacto" TEXT,
    "telefono" TEXT,
    "direccion" TEXT,
    "nombreCarpeta" TEXT NOT NULL,
    "nivelJerarquico" INTEGER NOT NULL,
    "padreId" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("idOrganizacion")
);

-- CreateTable
CREATE TABLE "CuestionarioIA" (
    "idCuestionario" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "fechaRespuesta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CuestionarioIA_pkey" PRIMARY KEY ("idCuestionario")
);

-- CreateTable
CREATE TABLE "ProcesosAuditoria" (
    "idProcesoAuditoria" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "idAuditor" TEXT,
    "nombre" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'en_proceso',
    "fechaLimite" TIMESTAMP(3),
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "esEliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProcesosAuditoria_pkey" PRIMARY KEY ("idProcesoAuditoria")
);

-- CreateTable
CREATE TABLE "ComentariosAuditoria" (
    "idComentarioAuditoria" TEXT NOT NULL,
    "idProcesoAuditoria" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "comentario" TEXT,
    "urlAdjunto" TEXT,
    "fechaComentario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComentariosAuditoria_pkey" PRIMARY KEY ("idComentarioAuditoria")
);

-- CreateTable
CREATE TABLE "CriteriosAuditoria" (
    "idCriterioAuditoria" TEXT NOT NULL,
    "idProcesoAuditoria" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "notas" TEXT,

    CONSTRAINT "CriteriosAuditoria_pkey" PRIMARY KEY ("idCriterioAuditoria")
);

-- CreateTable
CREATE TABLE "DecisionesAuditoria" (
    "idDecisionAuditoria" TEXT NOT NULL,
    "idProcesoAuditoria" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "motivo" TEXT,
    "fechaDecision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DecisionesAuditoria_pkey" PRIMARY KEY ("idDecisionAuditoria")
);

-- CreateTable
CREATE TABLE "HistorialAcciones" (
    "idHistorial" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "fechaAccion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detalle" TEXT,

    CONSTRAINT "HistorialAcciones_pkey" PRIMARY KEY ("idHistorial")
);

-- CreateTable
CREATE TABLE "VersionesDocumento" (
    "idVersion" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "numeroVersion" TEXT NOT NULL,
    "rutaArchivo" TEXT NOT NULL,
    "fechaVersion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VersionesDocumento_pkey" PRIMARY KEY ("idVersion")
);

-- CreateTable
CREATE TABLE "Notificaciones" (
    "idNotificacion" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "fechaEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificaciones_pkey" PRIMARY KEY ("idNotificacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_idUsuarioPropietario_fkey" FOREIGN KEY ("idUsuarioPropietario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_idOrganizacion_fkey" FOREIGN KEY ("idOrganizacion") REFERENCES "Organizacion"("idOrganizacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permisos" ADD CONSTRAINT "Permisos_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos"("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permisos" ADD CONSTRAINT "Permisos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizacion" ADD CONSTRAINT "Organizacion_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Organizacion"("idOrganizacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizacion" ADD CONSTRAINT "Organizacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CuestionarioIA" ADD CONSTRAINT "CuestionarioIA_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesosAuditoria" ADD CONSTRAINT "ProcesosAuditoria_idAuditor_fkey" FOREIGN KEY ("idAuditor") REFERENCES "Usuarios"("idUsuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesosAuditoria" ADD CONSTRAINT "ProcesosAuditoria_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos"("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentariosAuditoria" ADD CONSTRAINT "ComentariosAuditoria_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentariosAuditoria" ADD CONSTRAINT "ComentariosAuditoria_idProcesoAuditoria_fkey" FOREIGN KEY ("idProcesoAuditoria") REFERENCES "ProcesosAuditoria"("idProcesoAuditoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CriteriosAuditoria" ADD CONSTRAINT "CriteriosAuditoria_idProcesoAuditoria_fkey" FOREIGN KEY ("idProcesoAuditoria") REFERENCES "ProcesosAuditoria"("idProcesoAuditoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionesAuditoria" ADD CONSTRAINT "DecisionesAuditoria_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionesAuditoria" ADD CONSTRAINT "DecisionesAuditoria_idProcesoAuditoria_fkey" FOREIGN KEY ("idProcesoAuditoria") REFERENCES "ProcesosAuditoria"("idProcesoAuditoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialAcciones" ADD CONSTRAINT "HistorialAcciones_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos"("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialAcciones" ADD CONSTRAINT "HistorialAcciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionesDocumento" ADD CONSTRAINT "VersionesDocumento_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos"("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificaciones" ADD CONSTRAINT "Notificaciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;
