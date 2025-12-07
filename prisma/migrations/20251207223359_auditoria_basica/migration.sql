-- CreateTable
CREATE TABLE "ProcesosAuditoria" (
    "idProcesoAuditoria" TEXT NOT NULL PRIMARY KEY,
    "idDocumento" TEXT NOT NULL,
    "idAuditor" TEXT,
    "nombre" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'en_proceso',
    "fechaLimite" DATETIME,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProcesosAuditoria_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProcesosAuditoria_idAuditor_fkey" FOREIGN KEY ("idAuditor") REFERENCES "Usuarios" ("idUsuario") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ComentariosAuditoria" (
    "idComentarioAuditoria" TEXT NOT NULL PRIMARY KEY,
    "idProcesoAuditoria" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "comentario" TEXT,
    "urlAdjunto" TEXT,
    "fechaComentario" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ComentariosAuditoria_idProcesoAuditoria_fkey" FOREIGN KEY ("idProcesoAuditoria") REFERENCES "ProcesosAuditoria" ("idProcesoAuditoria") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ComentariosAuditoria_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CriteriosAuditoria" (
    "idCriterioAuditoria" TEXT NOT NULL PRIMARY KEY,
    "idProcesoAuditoria" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "notas" TEXT,
    CONSTRAINT "CriteriosAuditoria_idProcesoAuditoria_fkey" FOREIGN KEY ("idProcesoAuditoria") REFERENCES "ProcesosAuditoria" ("idProcesoAuditoria") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DecisionesAuditoria" (
    "idDecisionAuditoria" TEXT NOT NULL PRIMARY KEY,
    "idProcesoAuditoria" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "motivo" TEXT,
    "fechaDecision" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DecisionesAuditoria_idProcesoAuditoria_fkey" FOREIGN KEY ("idProcesoAuditoria") REFERENCES "ProcesosAuditoria" ("idProcesoAuditoria") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DecisionesAuditoria_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
