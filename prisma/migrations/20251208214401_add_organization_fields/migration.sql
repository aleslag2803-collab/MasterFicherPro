/*
  Warnings:

  - Added the required column `nombre` to the `Organizacion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Organizacion" (
    "idOrganizacion" TEXT NOT NULL PRIMARY KEY,
    "idUsuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "emailContacto" TEXT,
    "telefono" TEXT,
    "direccion" TEXT,
    "nombreCarpeta" TEXT NOT NULL,
    "nivelJerarquico" INTEGER NOT NULL,
    "padreId" TEXT,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Organizacion_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Organizacion" ("idOrganizacion") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Organizacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Organizacion" ("fechaCreacion", "idOrganizacion", "idUsuario", "nivelJerarquico", "nombreCarpeta", "padreId") SELECT "fechaCreacion", "idOrganizacion", "idUsuario", "nivelJerarquico", "nombreCarpeta", "padreId" FROM "Organizacion";
DROP TABLE "Organizacion";
ALTER TABLE "new_Organizacion" RENAME TO "Organizacion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
