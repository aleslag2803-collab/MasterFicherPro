## Integrantes: 
-Bacelis Orea Diego Antonio
-Colorado Lagos Alessa Vianey
-Kantun Balam José Francisco
-Quintal Solis José Emanuel

## Descripción del proyecto:
Master Ficher es una plataforma moderna de gestión documental, diseñada para organizaciones que requieren un control eficiente de documentos, trazabilidad de auditorías y herramientas inteligentes de análisis y clasificación.

La aplicación permite almacenar, consultar, auditar, descargar y administrar documentos en un entorno seguro y centralizado, complementado con capacidades adicionales impulsadas por IA.

## Arquitectura general de las APIs

/api
    ↳/cuestionario-IA
    ↳/documentos
    ↳/historial
    ↳/notificaciones
    ↳/organizacion
    ↳/permisos
    ↳/usuarios
    ↳/versiones


## Características principales

 Gestión documental completa

 -Subida de documentos en formato PDF.

 -Previsualización y descarga directa.

 -Versionamiento y control de cambios.

 -Eliminación lógica manteniendo trazabilidad.

 -Metadatos descriptivos (estado, etiquetas, resumen, tipo, fecha).

 Auditorías internas

 -Creación automática de procesos de auditoría cuando un documento es marcado como tal.

 -Asignación opcional de auditor responsable.

 -Registro estructurado de comentarios, decisiones y criterios de auditoría.

 Inteligencia Artificial (OpenAI)

 -Clasificación automática.

 -Generación de resúmenes.

 -Etiquetado inteligente.

 -Asistencia contextual (en desarrollo).

 Organización y permisos (en expansión)

 -Soporte para estructuras organizacionales.

 -Roles 

 -Historial de acciones por usuario.

 ## Arquitectura del Proyecto

El sistema está desarrollado con tecnologías modernas y escalables:

*Capa	Tecnología
Frontend: Next.js 14 (App Router), React, TailwindCSS / ShadCN UI
Backend: API Routes de Next.js, Servicios y controladores desacoplados
Base de Datos:	Prisma ORM + SQLite (dev)
IA: OpenAI API
Control de Versiones: Git + GitHub

## Requisitos del sistema

Node.js 18+

npm 9+

Entorno Unix/Windows/Mac

Clave OpenAI válida

## Instalación
git clone https://github.com/tu-org/master-ficher.git
cd master-ficher
npm install

## Variables de entorno

Crear un archivo .env en la raíz:

DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="tu_api_key_aqui"

## Ejecutar el proyecto
npm run dev


La aplicación estará disponible en:

http://localhost:3000

## Estado de Autenticación

El proyecto incluye un módulo en desarrollo para:

- Registro de usuarios

- Inicio de sesión con email y contraseña

- Sistema básico de roles

Actualmente se encuentra en fase de implementación y pruebas internas.


