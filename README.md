# AI Business Analyst

Un analista de requerimientos impulsado por inteligencia artificial que transforma conversaciones de clientes en documentación técnica lista para el desarrollo de software.

## Descripción

AI Business Analyst es una herramienta diseñada para ayudar a desarrolladores, freelancers y agencias a acelerar la fase de descubrimiento y análisis de proyectos.

A partir de una conversación, transcripción o reunión con un cliente, el sistema utiliza modelos de lenguaje ejecutados localmente mediante Ollama para generar documentación estructurada que puede utilizarse como punto de partida para el desarrollo de software.

El objetivo es reducir el tiempo dedicado a la recopilación de requerimientos y convertir información desorganizada en artefactos útiles para equipos de desarrollo.

---

## Características

* Generación automática de documentación técnica.
* Procesamiento local mediante Ollama.
* Compatible con modelos como:

  * qwen2.5-coder:7b
  * llama3.1:8b
  * gemma3
* Exportación de documentos en formato Markdown.
* Arquitectura extensible basada en agentes especializados.
* Ejecución completamente local sin dependencia de servicios externos.

---

## Documentos Generados

El sistema puede generar automáticamente:

* Resumen Ejecutivo
* Requerimientos Funcionales
* Requerimientos No Funcionales
* Historias de Usuario
* Arquitectura de Software
* Diseño de Base de Datos
* Backlog Inicial
* Roadmap de Desarrollo

Ejemplo:

```text
output/
├── resumen.md
├── requerimientos.md
├── historias-usuario.md
├── arquitectura.md
├── database.md
└── backlog.md
```

---

## Arquitectura

```text
Cliente
   │
   ▼
Transcripción
   │
   ▼
AI Business Analyst
   │
   ├── Resumen
   ├── Requerimientos
   ├── Arquitectura
   ├── Base de Datos
   ├── Historias de Usuario
   └── Backlog
   │
   ▼
Documentación Generada
```

---

## Tecnologías Utilizadas

* Node.js
* TypeScript
* Ollama
* Qwen 2.5 Coder
* Llama 3.1
* Markdown

---

## Instalación

Clonar el repositorio:

```bash
git clone <repository-url>
cd ai-business-analyst
```

Instalar dependencias:

```bash
npm install
```

Iniciar Ollama:

```bash
ollama serve
```

Descargar un modelo compatible:

```bash
ollama pull qwen2.5-coder:7b
```

Ejecutar el proyecto:

```bash
npm run dev
```

---

## Casos de Uso

### Freelancers

Transformar reuniones con clientes en documentación inicial.

### Agencias

Reducir tiempo en la fase de análisis y descubrimiento.

### Equipos de Desarrollo

Generar artefactos iniciales para planificación de proyectos.

### Consultoría

Documentar requerimientos de manera rápida y consistente.

---

## Roadmap

### Fase 1

* Generación de documentos Markdown.
* Integración con Ollama.
* Soporte para múltiples modelos.

### Fase 2

* Procesamiento automático de audio.
* Integración con Whisper.
* Generación de documentos PDF.

### Fase 3

* Generación automática de esquemas Prisma.
* Generación de OpenAPI.
* Exportación de backlog en JSON.

### Fase 4

* Interfaz web.
* Gestión de proyectos.
* Memoria persistente.
* Sistema multiagente.

---

## Visión del Proyecto

La meta es construir una plataforma capaz de actuar como un Analista de Negocio virtual que transforme reuniones, llamadas y entrevistas con clientes en documentación estructurada y accionable para equipos de desarrollo.

---

## Licencia

MIT License
