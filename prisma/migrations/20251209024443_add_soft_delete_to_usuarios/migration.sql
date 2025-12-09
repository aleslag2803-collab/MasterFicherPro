-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuarios" (
    "idUsuario" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "esEliminado" BOOLEAN NOT NULL DEFAULT false,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaEliminacion" DATETIME
);
INSERT INTO "new_Usuarios" ("correo", "estado", "fechaRegistro", "idUsuario", "nombre", "passwordHash", "rol") SELECT "correo", "estado", "fechaRegistro", "idUsuario", "nombre", "passwordHash", "rol" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
