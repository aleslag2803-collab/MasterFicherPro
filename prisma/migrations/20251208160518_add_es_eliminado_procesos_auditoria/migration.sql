-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProcesosAuditoria" (
    "idProcesoAuditoria" TEXT NOT NULL PRIMARY KEY,
    "idDocumento" TEXT NOT NULL,
    "idAuditor" TEXT,
    "nombre" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'en_proceso',
    "fechaLimite" DATETIME,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "esEliminado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ProcesosAuditoria_idAuditor_fkey" FOREIGN KEY ("idAuditor") REFERENCES "Usuarios" ("idUsuario") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProcesosAuditoria_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documentos" ("idDocumento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProcesosAuditoria" ("estado", "fechaActualizacion", "fechaCreacion", "fechaLimite", "idAuditor", "idDocumento", "idProcesoAuditoria", "nombre") SELECT "estado", "fechaActualizacion", "fechaCreacion", "fechaLimite", "idAuditor", "idDocumento", "idProcesoAuditoria", "nombre" FROM "ProcesosAuditoria";
DROP TABLE "ProcesosAuditoria";
ALTER TABLE "new_ProcesosAuditoria" RENAME TO "ProcesosAuditoria";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
