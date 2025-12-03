-- ===========================
-- USUARIOS
-- ===========================
INSERT INTO Usuarios (idUsuario, nombre, correo, passwordHash, rol)
VALUES
('b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'Alessa Lagos', 'alessa@example.com', 'hashedpass123', 'admin'),
('9c9d18c5-3b22-46c2-bd4f-b44f2609135b', 'Carlos Pérez', 'carlos@example.com', 'hashedpass456', 'editor'),
('d7a6a3a9-30aa-47d1-a431-bf6f1280d942', 'Lucía Gómez', 'lucia@example.com', 'hashedpass789', 'lector');

-- ===========================
-- DOCUMENTOS  (NUEVA ESTRUCTURA)
-- ===========================
-- NOTA: ya no existe rutaArchivo; contenidoArchivo y tamanoBytes quedan NULL (sin archivo físico)
INSERT INTO Documentos (idDocumento, idUsuarioPropietario, nombreArchivo, tipoArchivo, version, estado, etiquetas, resumen)
VALUES
('d2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'Proyecto_MasterFicher.pdf', 'application/pdf', 'v1.0', 'activo', 'proyecto, masterficher, inicio', 'Documento inicial del proyecto MasterFicher'),
('e5f4a2b9-9c22-4e11-8a97-ec91e8a8d17a', '9c9d18c5-3b22-46c2-bd4f-b44f2609135b', 'ReporteVentas.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'v2.1', 'activo', 'reportes, finanzas', 'Reporte de ventas actualizado al Q3'),
('a3e8c3f5-49b2-40cd-84f7-9e1a456d122e', 'd7a6a3a9-30aa-47d1-a431-bf6f1280d942', 'Guía_Usuario.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'v1.2', 'borrador', 'documentación, guía', 'Manual de uso básico para nuevos usuarios');

-- ===========================
-- PERMISOS
-- ===========================
INSERT INTO Permisos (idPermiso, idUsuario, idDocumento, tipoAcceso)
VALUES
('9a9e2b11-b3c1-4d8a-9a45-876f1c93b111', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'd2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111', 'propietario'),
('f4a5b6c7-d8e9-4f1a-92b4-c1b3e8a7f222', '9c9d18c5-3b22-46c2-bd4f-b44f2609135b', 'd2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111', 'lectura'),
('c7b8a9d2-1e3f-4b55-b8e2-7a91c6f9d333', 'd7a6a3a9-30aa-47d1-a431-bf6f1280d942', 'e5f4a2b9-9c22-4e11-8a97-ec91e8a8d17a', 'edición'),
('f8e9d0c1-a2b3-4d4c-92f1-d8c9a0b2e444', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'a3e8c3f5-49b2-40cd-84f7-9e1a456d122e', 'lectura');

-- ===========================
-- ORGANIZACIÓN
-- ===========================
INSERT INTO Organizacion (idOrganizacion, idUsuario, nombreCarpeta, nivelJerarquico, padreId)
VALUES
('4b8f1a2e-1b9d-44c8-bec9-9f1e4a9c7771', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'Documentos Generales', 1, NULL),
('0f8a7c6e-2b3d-4a9a-9c8f-9b8d7e6f5552', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'Proyectos', 2, '4b8f1a2e-1b9d-44c8-bec9-9f1e4a9c7771'),
('2c3b4a5d-6e7f-8a9b-b0c1-d2e3f4a56663', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'Informes', 2, '4b8f1a2e-1b9d-44c8-bec9-9f1e4a9c7771'),
('3d2f1a4e-5b6c-7d8e-9f0a-b1c2d3e48874', '9c9d18c5-3b22-46c2-bd4f-b44f2609135b', 'Finanzas', 1, NULL),
('5f6e7d8c-9b0a-1c2d-3e4f-5a6b7c88885', 'd7a6a3a9-30aa-47d1-a431-bf6f1280d942', 'Manuales', 1, NULL);

-- ===========================
-- CUESTIONARIOS IA
-- ===========================
INSERT INTO CuestionarioIA (idCuestionario, idUsuario, pregunta, respuesta)
VALUES
('a8b9c1d2-e3f4-4a5b-9c6d-7e8f9a90001', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', '¿Cómo organizar mejor mis documentos?', 'Puedes crear carpetas jerárquicas y asignar etiquetas temáticas.'),
('b9c8d7e6-f5a4-4b3c-9d2e-1f0a2b90002', '9c9d18c5-3b22-46c2-bd4f-b44f2609135b', '¿Qué formatos acepta el sistema?', 'El sistema acepta PDF, DOCX, XLSX y TXT.'),
('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c90003', 'd7a6a3a9-30aa-47d1-a431-bf6f1280d942', '¿Cómo actualizo un documento?', 'Puedes subir una nueva versión desde la sección de versiones.');

-- ===========================
-- HISTORIAL
-- ===========================
INSERT INTO HistorialAcciones (idHistorial, idUsuario, idDocumento, accion, detalle)
VALUES
('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e90004', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'd2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111', 'creación', 'Subió el documento del proyecto'),
('f2e3d4c5-b6a7-4c8d-9e0f-1a2b3c90005', '9c9d18c5-3b22-46c2-bd4f-b44f2609135b', 'd2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111', 'lectura', 'Revisó el documento'),
('a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a90006', 'd7a6a3a9-30aa-47d1-a431-bf6f1280d942', 'e5f4a2b9-9c22-4e11-8a97-ec91e8a8d17a', 'edición', 'Actualizó las cifras del reporte'),
('b5c6d7e8-f9a0-4b1c-2d3e-4f5a6b90007', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'a3e8c3f5-49b2-40cd-84f7-9e1a456d122e', 'descarga', 'Descargó el manual de usuario');

-- ===========================
-- VERSIONES
-- ===========================
INSERT INTO VersionesDocumento (idVersion, idDocumento, numeroVersion, rutaArchivo)
VALUES
('c7d8e9f0-a1b2-4c3d-5e6f-7a8b9c90008', 'd2d1b3c4-3f2e-4c25-a8b9-9a0b8e73c111', 'v1.0', '/docs/versiones/Proyecto_MasterFicher_v1.0.pdf'),
('e8f9a0b1-c2d3-4e5f-6a7b-8c9d0e90009', 'e5f4a2b9-9c22-4e11-8a97-ec91e8a8d17a', 'v2.0', '/docs/versiones/ReporteVentas_v2.0.xlsx'),
('f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f90010', 'e5f4a2b9-9c22-4e11-8a97-ec91e8a8d17a', 'v2.1', '/docs/versiones/ReporteVentas_v2.1.xlsx'),
('a2b3c4d5-e6f7-4a8b-9c0d-1e2f3a90011', 'a3e8c3f5-49b2-40cd-84f7-9e1a456d122e', 'v1.2', '/docs/versiones/Guia_Usuario_v1.2.docx');

-- ===========================
-- NOTIFICACIONES
-- ===========================
INSERT INTO Notificaciones (idNotificacion, idUsuario, mensaje, leido)
VALUES
('b3c4d5e6-f7a8-4b9c-0d1e-2f3a4b90012', 'b1b7e1c6-9a65-44e3-8e11-bc8a7a8d86c1', 'Nuevo documento agregado: Proyecto_MasterFicher.pdf', 0),
('c4d5e6f7-a8b9-4c0d-1e2f-3a4b5c90013', '9c9d18c5-3b22-46c2-bd4f-b44f2609135b', 'Tienes acceso al documento de Alessa', 0),
('d5e6f7a8-b9c0-4d1e-2f3a-4b5c6d90014', 'd7a6a3a9-30aa-47d1-a431-bf6f1280d942', 'El documento Guía_Usuario fue actualizado', 1);
