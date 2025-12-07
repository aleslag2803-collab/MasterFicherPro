-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Documentos" (
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
    "esEliminado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Documentos_idUsuarioPropietario_fkey" FOREIGN KEY ("idUsuarioPropietario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Documentos" ("contenidoArchivo", "esAuditoria", "estado", "etiquetas", "fechaSubida", "idDocumento", "idUsuarioPropietario", "nombreArchivo", "resumen", "tamanoBytes", "tipoArchivo", "version") SELECT "contenidoArchivo", "esAuditoria", "estado", "etiquetas", "fechaSubida", "idDocumento", "idUsuarioPropietario", "nombreArchivo", "resumen", "tamanoBytes", "tipoArchivo", "version" FROM "Documentos";
DROP TABLE "Documentos";
ALTER TABLE "new_Documentos" RENAME TO "Documentos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
