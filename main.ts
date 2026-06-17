import { Ollama } from "ollama";
import fs from "fs/promises";
import path from "path";

const client = new Ollama({
  host: "http://localhost:11434",
});

const transcripcion = `
Cliente:

Necesito un sistema para una veterinaria.

Quiero gestionar pacientes, dueños, citas,
expedientes médicos y recordatorios por WhatsApp.

También quiero reportes, control de pagos,
inventario de medicamentos y facturación.
`;

async function generarDocumento(
  nombre: string,
  prompt: string
) {
  try {
    console.log(`🚀 Generando ${nombre}...`);

    const response = await client.chat({
      model: "qwen2.5-coder:7b",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: transcripcion,
        },
      ],
    });

    const archivo = path.join(
      "output",
      `${nombre}.md`
    );

    await fs.writeFile(
      archivo,
      response.message.content,
      "utf8"
    );

    console.log(`✅ ${nombre}.md generado`);
  } catch (error) {
    console.error(
      `❌ Error generando ${nombre}:`,
      error
    );
  }
}

async function main() {
  await fs.mkdir("output", {
    recursive: true,
  });

  const trabajos = [
    {
      nombre: "resumen",
      prompt: `
Eres un analista de negocio senior.

Genera:

# Resumen Ejecutivo
# Objetivos del Proyecto
# Problemas Detectados
# Beneficios Esperados

Sé extremadamente detallado.
      `,
    },

    {
      nombre: "requerimientos",
      prompt: `
Eres Product Owner Senior.

Genera:

# Requerimientos Funcionales
# Requerimientos No Funcionales
# Restricciones
# Integraciones Externas
# Roles de Usuario

Mínimo 30 requerimientos.
      `,
    },

    {
      nombre: "historias-usuario",
      prompt: `
Eres Product Owner Senior.

Genera mínimo 30 historias de usuario.

Formato:

Como [rol]
Quiero [acción]
Para [beneficio]

Agrúpalas por módulos.
      `,
    },

    {
      nombre: "arquitectura",
      prompt: `
Eres Arquitecto de Software Senior.

Diseña:

# Arquitectura General
# Frontend
# Backend
# Base de Datos
# Seguridad
# APIs
# Infraestructura
# Escalabilidad

Incluye diagramas ASCII.
      `,
    },

    {
      nombre: "database",
      prompt: `
Eres DBA Senior.

Diseña:

# Entidades
# Relaciones
# Campos
# Índices
# Restricciones

Incluye ejemplos SQL.
      `,
    },

    {
      nombre: "backlog",
      prompt: `
Eres Scrum Master Senior.

Genera:

# MVP
# Sprint 1
# Sprint 2
# Sprint 3
# Sprint 4

Prioriza tareas.

Incluye estimaciones.
      `,
    },
  ];

  for (const trabajo of trabajos) {
    await generarDocumento(
      trabajo.nombre,
      trabajo.prompt
    );
  }

  console.log(
    "\n🎉 Todos los documentos fueron generados."
  );
}

main();