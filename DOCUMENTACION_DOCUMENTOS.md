# Documentación del Módulo de Documentos

## Resumen General
Implementación completa del módulo CRUD de Documentos con operaciones de creación, lectura, actualización y eliminación (soft delete). El módulo incluye búsqueda, filtrado, gestión de organización asociada, y auditoría de usuario.

---

## 1. INTERRELACIONES DE BASE DE DATOS

### Modelo Prisma: Documentos

```prisma
model Documentos {
  idDocumento          String               @id @default(uuid())
  idUsuarioPropietario String
  idOrganizacion       String?
  nombreArchivo        String
  tipoArchivo          String
  contenidoArchivo     Bytes?
  tamanoBytes          Int?
  fechaSubida          DateTime             @default(now())
  version              String?
  estado               String
  etiquetas            String?
  resumen              String?
  esAuditoria          Boolean              @default(false)
  esEliminado          Boolean              @default(false)
  
  // Relaciones
  usuarioPropietario   Usuarios             @relation(fields: [idUsuarioPropietario], references: [idUsuario])
  organizacion         Organizacion?        @relation(fields: [idOrganizacion], references: [idOrganizacion])
  historial            HistorialAcciones[]
  permisos             Permisos[]
  procesosAuditoria    ProcesosAuditoria[]
  versiones            VersionesDocumento[]
}
```

### Relaciones Establecidas

1. **Usuarios** (`idUsuarioPropietario` → `Usuarios.idUsuario`)
   - Un usuario puede ser propietario de muchos documentos
   - Campo requerido (NOT NULL)
   - Se usa para auditoría y permisos

2. **Organizacion** (`idOrganizacion` → `Organizacion.idOrganizacion`)
   - Un documento pertenece a una organización (opcional)
   - Campo opcional (NULL permitido)
   - Se asigna al subir el documento

3. **HistorialAcciones** (relación inversa)
   - Registra todas las acciones sobre el documento

4. **Permisos** (relación inversa)
   - Define quién puede acceder al documento

5. **ProcesosAuditoria** (relación inversa)
   - Documentos parte de procesos de auditoría

6. **VersionesDocumento** (relación inversa)
   - Historial de versiones del documento

### Cambios de Schema

**Migración**: `20251209043402_add_id_organizacion_to_documentos`

```sql
-- Agregado a la tabla Documentos
ALTER TABLE Documentos ADD COLUMN idOrganizacion String;
ALTER TABLE Documentos ADD FOREIGN KEY (idOrganizacion) REFERENCES Organizacion(idOrganizacion) ON DELETE SET NULL;
```

---

## 2. OPERACIONES BACKEND

### 2.1 Modelo de Datos

**Archivo**: `src/server/documentos/documentos.model.ts`

```typescript
// Input para crear documento
export interface DocumentoCreateInput {
  idUsuarioPropietario: string
  idOrganizacion?: string
  nombreArchivo: string
  tipoArchivo: string
  contenidoArchivo?: Uint8Array
  tamanoBytes?: number
  estado?: string
  version?: string
  etiquetas?: string
  resumen?: string
  esAuditoria?: boolean
}

// Input para actualizar documento (solo metadatos)
export interface DocumentoUpdateInput {
  nombreArchivo?: string
  estado?: string
  version?: string
  etiquetas?: string
  resumen?: string
}

// Response
export interface DocumentoResponse {
  idDocumento: string
  idUsuarioPropietario: string
  idOrganizacion?: string
  nombreArchivo: string
  tipoArchivo: string
  tamanoBytes?: number
  fechaSubida: string
  version?: string
  estado: string
  etiquetas?: string
  resumen?: string
}
```

### 2.2 Repository (Capa de Datos)

**Archivo**: `src/server/documentos/documentos.repository.ts`

**Operaciones implementadas:**

#### GET - Obtener todos los documentos
```typescript
export async function findAllDocumentos()
```
- Filtra documentos no eliminados (`esEliminado: false`)
- Retorna array de documentos con metadatos

#### GET - Obtener documento por ID
```typescript
export async function findDocumentoById(idDocumento: string)
```
- Obtiene documento completo incluyendo contenido binario
- Retorna null si no existe o está eliminado

#### GET - Obtener solo metadatos del documento
```typescript
export async function findDocumentoMetadataById(idDocumento: string)
```
- Obtiene documento sin el contenido binario (más eficiente)
- Útil para listar y detalles sin archivos grandes

#### POST - Crear documento
```typescript
export async function createDocumento(data: DocumentoCreateInput)
```
- Crea nuevo documento con contenido binario
- Genera UUID único automático
- Establece fecha de subida actual

#### PUT - Actualizar documento
```typescript
export async function updateDocumento(
  idDocumento: string,
  data: DocumentoUpdateInput
)
```
- Actualiza solo metadatos (nombre, estado, versión, etiquetas, resumen)
- No modifica contenido del archivo
- Retorna documento actualizado

#### DELETE - Soft Delete de documento
```typescript
export async function softDeleteDocumento(idDocumento: string)
```
- Marca documento como eliminado sin eliminar de BD
- Establece `esEliminado = true`
- Registra fecha de eliminación

### 2.3 Service (Capa de Lógica de Negocio)

**Archivo**: `src/server/documentos/documentos.service.ts`

**Funciones implementadas:**

#### `obtenerDocumentosService()`
- Obtiene lista de documentos activos
- Filtro automático de eliminados

#### `obtenerDocumentoPorIdService(idDocumento: string)`
- Valida que el documento exista
- Manejo de errores descriptivos
- Retorna documento completo

#### `crearDocumentoService(input: DocumentoCreateInput)`
- Validación de datos obligatorios
- Validación de tipo de archivo (solo PDF)
- Compresión de metadatos en etiquetas
- Cálculo de tamaño de archivo

#### `actualizarDocumentoService(id: string, data: DocumentoUpdateInput)`
- Validación de documento existente
- Validación de al menos un campo para actualizar
- Actualización selectiva de metadatos
- Retorna documento actualizado

#### `eliminarDocumentoService(idDocumento: string)`
- Realiza soft delete
- Validación previa de existencia
- Retorna confirmación

### 2.4 Controller (Capa HTTP)

**Archivo**: `src/server/documentos/documentos.controller.ts`

**Controllers implementados:**

```typescript
// GET /api/documentos
export async function getDocumentosController()
- Status: 200 (éxito) | 500 (error)
- Response: { body: Documentos[], status: 200 }

// GET /api/documentos/[id]?mode=meta
export async function getDocumentoController(idDocumento: string)
- Status: 200 (éxito) | 404 (no encontrado) | 500 (error)
- Mode: "meta" para solo metadatos, sin especificar para completo

// POST /api/documentos
export async function postDocumentoController(input: DocumentoCreateInput)
- Status: 201 (creado) | 400 (validación) | 500 (error)
- Validación de archivo PDF
- Retorna documento creado

// PUT /api/documentos/[id]
export async function putDocumentoController(
  id: string,
  data: DocumentoUpdateInput
)
- Status: 200 (actualizado) | 400 (validación) | 404 (no encontrado) | 500 (error)
- Actualiza solo metadatos

// DELETE /api/documentos/[id]
export async function deleteDocumentoController(idDocumento: string)
- Status: 200 (eliminado) | 404 (no encontrado) | 500 (error)
- Soft delete del documento
```

### 2.5 API Routes

**Archivo**: `src/app/api/documentos/route.ts`

#### GET /api/documentos
```
Método: GET
Retorna: Array de documentos activos
Status: 200 | 500
Ejemplo response:
[
  {
    idDocumento: "uuid",
    nombreArchivo: "documento.pdf",
    tipoArchivo: "application/pdf",
    estado: "activo",
    etiquetas: "contrato, importante",
    ...
  }
]
```

#### POST /api/documentos
```
Método: POST
Content-Type: multipart/form-data
Campos requeridos:
  - file: File (PDF)
  - idUsuarioPropietario: string
Campos opcionales:
  - idOrganizacion: string (UUID)
  - estado: string
  - version: string
  - etiquetas: string
  - resumen: string
  - esAuditoria: boolean
  - auditoriaNombreProceso: string
  - auditoriaUsuarioCreador: string
  - auditoriaFechaLimite: string

Status: 201 (creado) | 400 (validación) | 500 (error)
Ejemplo response:
{
  idDocumento: "uuid-generado",
  nombreArchivo: "documento.pdf",
  tipoArchivo: "application/pdf",
  tamanoBytes: 50000,
  fechaSubida: "2025-12-09T...",
  estado: "ACTIVO",
  idOrganizacion: "org-uuid",
  ...
}
```

**Archivo**: `src/app/api/documentos/[id]/route.ts`

#### GET /api/documentos/[id]
```
Método: GET
Query params:
  - mode: "meta" (opcional) - retorna sin contenido binario

Status: 200 | 404 | 500
Si no tiene ?mode=meta, retorna archivo para descargar
Si tiene ?mode=meta, retorna solo metadatos JSON
```

#### PUT /api/documentos/[id]
```
Método: PUT
Content-Type: application/json
Body: {
  estado?: string          // "activo", "borrador", "revisión", "archivado"
  version?: string         // "1.0", "1.1", etc.
  etiquetas?: string       // "tag1, tag2"
  resumen?: string         // Descripción del documento
}

Status: 200 (actualizado) | 400 (validación) | 404 (no encontrado) | 500 (error)
Response: Documento actualizado con todos sus campos
```

#### DELETE /api/documentos/[id]
```
Método: DELETE

Status: 200 (eliminado) | 404 (no encontrado) | 500 (error)
Response: { message: "Documento eliminado correctamente" }
```

---

## 3. FUNCIONALIDADES FRONTEND

### 3.1 Componentes Principales

#### **DocumentsHeader** (`src/components/documentos/documentos-header.tsx`)

**Funcionalidades**:
- Búsqueda en tiempo real de documentos
- Botón para subir nuevo documento
- Botón de filtros (UI preparada)

**Props**:
```typescript
interface DocumentsHeaderProps {
  onSearchChange: (term: string) => void  // Callback para búsqueda
}
```

**Características**:
- Input de búsqueda con ícono
- Link a `/documentos/subir`
- Actualización instantánea al escribir

---

#### **DocumentsTable** (`src/components/documentos/documentos-table.tsx`)

**Funcionalidades**:
- Listar todos los documentos
- Búsqueda y filtrado
- Edición inline de metadatos
- Eliminación con confirmación
- Descargar/ver documento
- Estados: Activo, Borrador, Revisión, Archivado

**Columnas**:
| Columna | Descripción |
|---------|-------------|
| Nombre | Nombre del archivo |
| Tipo | Tipo MIME (application/pdf) |
| Organización | Extraída de las etiquetas |
| Fecha | Fecha de subida formateada |
| Estado | Badge con estado |
| Tamaño | Tamaño formateado (KB/MB) |
| Acciones | Dropdown con opciones |

**Acciones en Dropdown**:
- 👁️ Ver Detalle (Link a `/documentos/[id]`)
- ⬇️ Descargar / Ver (Abre PDF en nueva pestaña)
- ✏️ Editar (Abre modal)
- 🗑️ Eliminar (Con confirmación)

**Búsqueda**:
- Busca en: nombre, tipo, organización, estado
- Case-insensitive
- En tiempo real

**Edición Modal**:
- Abre modal `EditDocumentModal`
- Permite editar: estado, versión, etiquetas, resumen
- No permite editar nombre del archivo
- Con validación y toasts

---

#### **DocumentsTable - Estado y Handlers**

```typescript
const [documents, setDocuments] = useState<Documento[]>()     // Lista de documentos
const [editModalOpen, setEditModalOpen] = useState(false)     // Control modal
const [editingDoc, setEditingDoc] = useState<Documento|null>  // Doc en edición
const [confirmOpen, setConfirmOpen] = useState(false)         // Confirmación delete
const [docToDelete, setDocToDelete] = useState<Documento|null>// Doc para borrar
```

**Handlers**:
- `handleEditDoc(doc)` - Abre modal de edición
- `handleUpdateDoc(id, data)` - Actualiza documento via PUT
- `handleConfirmDelete()` - Elimina documento via DELETE

---

#### **DocumentDetails** (`src/components/documentos/documentos-details.tsx`)

**Funcionalidades**:
- Vista detallada de un documento
- Mostrar metadatos completos
- Edición de metadatos
- Eliminación del documento
- Información del usuario propietario
- Información de la organización

**Secciones**:

1. **Tarjeta Información**:
   - Tipo de archivo
   - Organización (con carga dinámica)
   - Fecha de subida
   - Usuario que lo subió (con carga dinámica)
   - Estado (badge)
   - Tamaño
   - Versión (si existe)
   - Etiquetas (si existen)
   - Resumen (si existe)

2. **Tarjeta Acciones**:
   - Descargar / Ver (abre PDF)
   - Compartir (UI preparada)
   - Editar (abre modal)
   - Eliminar (con confirmación)

**Carga de Datos Relacionados**:

```typescript
// 1. Obtiene documento por ID
const res = await fetch(`/api/documentos/${documentId}?mode=meta`)

// 2. Carga usuario propietario
const userRes = await fetch(`/api/usuarios/${data.idUsuarioPropietario}`)

// 3. Carga organización
const orgRes = await fetch(`/api/organizacion/${data.idOrganizacion}`)
```

**Toasts Implementados**:

```typescript
// Al actualizar exitosamente
toast({
  title: "Documento actualizado",
  description: "Los cambios se han guardado correctamente."
})

// Al error en actualización
toast({
  title: "Error al actualizar",
  description: error.message
})

// Al eliminar exitosamente
toast({
  title: "Documento eliminado",
  description: "El documento se ha marcado como eliminado correctamente."
})

// Al error en eliminación
toast({
  title: "Error al eliminar",
  description: error.message
})
```

---

#### **EditDocumentModal** (`src/components/documentos/editar-documento.tsx`)

**Funcionalidades**:
- Modal para editar metadatos del documento
- Sin permitir edición del nombre del archivo
- Campos editables: estado, versión, etiquetas, resumen

**Campos**:
```
- Nombre del Archivo: READ-ONLY (mostrado como texto)
- Estado: SELECT (activo, borrador, revisión, archivado)
- Versión: INPUT TEXT (ej: 1.0, 1.1)
- Etiquetas: INPUT TEXT (separadas por coma)
- Resumen: TEXTAREA (descripción multilinea)
```

**Estados**:
```typescript
const [estado, setEstado] = useState("activo")
const [version, setVersion] = useState("")
const [etiquetas, setEtiquetas] = useState("")
const [resumen, setResumen] = useState("")
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")
```

**Props**:
```typescript
interface EditDocumentModalProps {
  open: boolean                                    // Control de visibilidad
  onClose: () => void                             // Callback al cerrar
  documento: Documento | null                     // Doc a editar
  onUpdate: (id: string, data: any) => Promise<boolean>  // Callback PUT
}
```

---

#### **DocumentViewer** (`src/components/documentos/documentos-viewer.tsx`)

**Funcionalidades**:
- Visualización previa de PDF en iframe
- Carga de metadatos del documento
- Manejo de estados: loading, error, sin archivo

**Estados**:
- **Cargando**: Spinner con mensaje
- **Error**: Mensaje de error en rojo
- **Sin archivo**: Icono y mensaje indicando ausencia
- **Con archivo**: Iframe mostrando PDF

---

#### **UploadDocumentForm** (`src/components/documentos/formulario-subir-documento.tsx`)

**Funcionalidades**:
- Formulario completo para subir documentos
- Obtiene usuario de sesión
- Carga organizaciones de BD
- Captura datos del documento
- Soporte para procesos de auditoría
- Genera etiquetas automáticas

**Campos**:

1. **Archivo** (requerido)
   - Solo PDF
   - Muestra nombre del archivo seleccionado

2. **Tipo de Documento** (requerido)
   - Opciones: Contrato, Informe, Política, Manual, Otro

3. **Organización** (requerido)
   - Cargada dinámicamente de BD
   - SELECT con organizaciones disponibles

4. **Descripción** (opcional)
   - TEXTAREA para descripción breve

5. **¿Es un documento para auditoría?** (opcional)
   - Toggle que muestra/oculta sección de auditoría
   
   Si es auditoría, aparecen:
   - Nombre del proceso
   - Usuario que crea el proceso
   - Fecha límite del proceso

**Flujo de Envío**:

```typescript
// 1. Validar que exista archivo
// 2. Validar que sea PDF
// 3. Crear FormData con:
//    - file: archivo PDF
//    - idUsuarioPropietario: del usuario en sesión
//    - idOrganizacion: del select de organizaciones
//    - estado: "ACTIVO"
//    - version: "1.0"
//    - etiquetas: `tipoDocumento, organizacion` (auto-generadas)
//    - resumen: descripción o nombre del archivo
//    - esAuditoria: boolean
//    - [si esAuditoria] auditoriaNombreProceso, auditoriaUsuarioCreador, auditoriaFechaLimite

// 2. POST a /api/documentos
// 3. Si es auditoría, POST a /api/audit con datos del proceso
// 4. Redirigir a /documentos
```

**Toasts Implementados**:
```typescript
// Éxito
toast({
  title: "Documento subido",
  description: "El documento se ha subido correctamente."
})

// Auditoría exitosa
toast({
  title: "Documento y auditoría creados",
  description: "El documento se ha subido y el proceso de auditoría se creó correctamente."
})

// Errores
toast({
  title: "Error al subir",
  description: error_message
})
```

---

### 3.2 Página Principal

**Archivo**: `src/app/documentos/page.tsx`

```typescript
"use client"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")  // Estado compartido

  return (
    <div className="space-y-6">
      <DocumentsHeader onSearchChange={setSearchTerm} />    // Pass callback
      <DocumentsTable searchTerm={searchTerm} />             // Pass término
    </div>
  )
}
```

**Flujo**:
1. Usuario escribe en input de búsqueda
2. `DocumentsHeader` llama `onSearchChange(term)`
3. Se actualiza `searchTerm` en page
4. Se pasa a `DocumentsTable` como prop
5. Tabla filtra documentos en tiempo real

---

### 3.3 Rutas Disponibles

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/documentos` | GET | Lista de documentos con búsqueda |
| `/documentos/subir` | GET | Formulario para subir documento |
| `/documentos/[id]` | GET | Detalle del documento |
| `/api/documentos` | GET/POST | CRUD de documentos |
| `/api/documentos/[id]` | GET/PUT/DELETE | Operaciones por ID |

---

## 4. FLUJOS DE USUARIO

### 4.1 Subir Documento

```
Usuario → Click "Subir Documento"
  ↓
Navega a /documentos/subir
  ↓
Completa formulario:
  - Selecciona archivo PDF
  - Elige tipo de documento
  - Elige organización
  - Escribe descripción
  - (Opcional) Marca como auditoría
  ↓
Click "Subir Documento"
  ↓
POST /api/documentos (multipart/form-data)
  ↓
Backend valida PDF + genera UUID + guarda en BD
  ↓
(Si auditoría) POST /api/audit
  ↓
Toast: "Documento subido correctamente"
  ↓
Redirige a /documentos
```

### 4.2 Ver Documento

```
Usuario → Tabla de documentos
  ↓
Click "Ver Detalle" en dropdown
  ↓
Navega a /documentos/[id]
  ↓
GET /api/documentos/[id]?mode=meta
  ↓
GET /api/usuarios/[idUsuario]
  ↓
GET /api/organizacion/[idOrganizacion]
  ↓
Muestra:
  - Metadatos del documento
  - Nombre del usuario propietario
  - Nombre de la organización
  - Vista previa en iframe
  ↓
Botones: Descargar, Compartir, Editar, Eliminar
```

### 4.3 Editar Documento

```
Usuario → Tabla o Detalles del documento
  ↓
Click "Editar" o botón de edición
  ↓
Abre EditDocumentModal
  ↓
Completa cambios:
  - Estado
  - Versión
  - Etiquetas
  - Resumen
  (No puede cambiar nombre)
  ↓
Click "Actualizar"
  ↓
PUT /api/documentos/[id]
  Body: { estado, version, etiquetas, resumen }
  ↓
Backend valida + actualiza en BD
  ↓
Toast: "Documento actualizado"
  ↓
Cierra modal + actualiza UI
```

### 4.4 Buscar Documentos

```
Usuario → Ingresa texto en búsqueda
  ↓
onChange dispara onSearchChange(term)
  ↓
searchTerm se actualiza en page
  ↓
DocumentsTable recibe nuevo searchTerm
  ↓
useEffect filtra documentos:
  - nombreArchivo contiene term
  - tipoArchivo contiene term
  - organización contiene term
  - estado contiene term
  (Case-insensitive)
  ↓
Muestra resultados filtrados en tiempo real
```

### 4.5 Eliminar Documento

```
Usuario → Tabla o Detalles
  ↓
Click "Eliminar"
  ↓
Muestra confirmación: "¿Estás seguro?"
  ↓
Si confirma:
  ↓
  DELETE /api/documentos/[id]
  ↓
  Backend marca: esEliminado = true
  ↓
  Toast: "Documento eliminado"
  ↓
  En tabla: remueve fila de lista
  En detalles: redirige a /documentos (500ms)
```

---

## 5. CAMBIOS EN LA BASE DE DATOS

### 5.1 Campos Agregados

| Campo | Tipo | Descripción | Migración |
|-------|------|-------------|-----------|
| `idOrganizacion` | String (UUID) | FK a Organizacion | `20251209043402_add_id_organizacion_to_documentos` |

### 5.2 Relaciones Nuevas

- **Documentos.organizacion** ← Organización (One-to-Many)
- **Organizacion.documentos** → Documentos (Many)

### 5.3 Soft Delete

El documento NO se elimina de la BD, se marca con:
- `esEliminado = true`
- `fechaEliminacion = DateTime.now()`

Todas las consultas filtran automáticamente: `WHERE esEliminado = false`

---

## 6. VALIDACIONES

### Backend

```typescript
// En crearDocumentoService
✓ idUsuarioPropietario requerido
✓ Archivo debe ser PDF (MIME: application/pdf)
✓ nombreArchivo no vacío
✓ Máximo tamaño de archivo (configurable)

// En actualizarDocumentoService
✓ idDocumento existe
✓ Documento no está eliminado
✓ Al menos un campo para actualizar
```

### Frontend

```typescript
// En UploadDocumentForm
✓ Archivo seleccionado
✓ Tipo de documento seleccionado
✓ Organización seleccionada
✓ Si esAuditoria:
  - Nombre del proceso requerido
  - Usuario creador requerido
  - Fecha límite requerida

// En EditDocumentModal
✓ Al menos estado válido
✓ No permite campos vacíos (excepto opcionales)
```

---

## 7. GESTIÓN DE ERRORES

### Toasts de Error

```typescript
// En DocumentsTable
"No se pudo eliminar" → data?.error
"Error de conexión" → Fallo en fetch

// En DocumentDetails
"Error al actualizar" → error.message
"Error al eliminar" → error.message

// En UploadDocumentForm
"Archivo requerido" → No hay file
"Error al subir" → Backend error
"Proceso de auditoría" → Error en /api/audit
"Error de conexión" → Fallo en fetch
```

### Status HTTP

```
201 → Documento creado exitosamente
200 → Operación exitosa (GET, PUT, DELETE)
400 → Validación fallida (archivo no PDF, campos requeridos)
404 → Documento no encontrado
500 → Error del servidor
```

---

## 8. ESTADO DEL MÓDULO

### ✅ Completado

- ✅ CRUD completo (GET, POST, PUT, DELETE)
- ✅ Soft delete implementado
- ✅ Búsqueda en tiempo real
- ✅ Relación con Usuarios (propietario)
- ✅ Relación con Organizaciones
- ✅ Modal de edición
- ✅ Confirmación de eliminación
- ✅ Toasts de éxito/error
- ✅ Carga de datos relacionados (Usuario, Organización)
- ✅ Vista previa de PDF (iframe)
- ✅ Formulario de subida con auditoría

### ⏳ Pendiente

- ⏳ Descarga de documentos (endpoint GET sin ?mode=meta)
- ⏳ Compartir documento (UI preparada, funcionalidad backend)
- ⏳ Versionado de documentos (tabla VersionesDocumento existe)
- ⏳ Búsqueda avanzada con filtros
- ⏳ Exportar listado de documentos

---

## 9. EJEMPLOS DE LLAMADAS API

### Crear Documento

```bash
curl -X POST http://localhost:3000/api/documentos \
  -F "file=@documento.pdf" \
  -F "idUsuarioPropietario=user-uuid" \
  -F "idOrganizacion=org-uuid" \
  -F "estado=ACTIVO" \
  -F "version=1.0" \
  -F "etiquetas=contrato, importante" \
  -F "resumen=Documento de contrato"
```

### Actualizar Documento

```bash
curl -X PUT http://localhost:3000/api/documentos/doc-uuid \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "revisión",
    "version": "1.1",
    "etiquetas": "contrato, importante, revisado",
    "resumen": "Documento actualizado en revisión"
  }'
```

### Obtener Documento (Metadatos)

```bash
curl http://localhost:3000/api/documentos/doc-uuid?mode=meta
```

### Eliminar Documento

```bash
curl -X DELETE http://localhost:3000/api/documentos/doc-uuid
```

---

## 10. RESUMEN TÉCNICO

| Aspecto | Detalle |
|---------|---------|
| **Patrón Arquitectura** | MVC/MVCS (Model → Repository → Service → Controller) |
| **Base de Datos** | SQLite con Prisma ORM |
| **Validación** | Backend (seguridad) + Frontend (UX) |
| **Soft Delete** | Sí (esEliminado = true) |
| **Auditoría** | Integrada con módulo de Procesos de Auditoría |
| **Búsqueda** | En tiempo real, client-side filtering |
| **Autenticación** | Sesión en sessionStorage |
| **Formato Archivo** | Solo PDF (application/pdf) |
| **Almacenamiento Binario** | Bytes en BD (campo contenidoArchivo) |

---

**Última actualización**: 2025-12-09
**Estado**: COMPLETO (CRUD + Frontend)
