import "dotenv/config";
import { Ollama } from "ollama";
import fs from "fs/promises";
import path from "path";

// Validación temprana de config
const OLLAMA_HOST = process.env.OLLAMA_HOST;
const MODEL = process.env.OLLAMA_MODEL || "";

if (!OLLAMA_HOST || !MODEL) {
  console.error("❌ Faltan variables: OLLAMA_HOST y OLLAMA_MODEL requeridas");
  process.exit(1);
}

const client = new Ollama({ host: OLLAMA_HOST });

// ✏️ Edita aquí la transcripción del cliente
const transcripcion = `
Cliente: Necesito un sistema que cuando le mando un audio lo transcriba en texto
de mi cliente para capturar requerimientos y obtener los requerimientos.
La idea principal es tener documentadas las llamadas de los clientes y obtener
los requerimientos. Es una empresa que desarrolla aplicaciones y es consultora.
`;

async function verificarConexion(): Promise<void> {
  try {
    console.log("🔌 Verificando conexión...");
    const res = await fetch(`${OLLAMA_HOST}/api/tags`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = (await res.json()) as { models: { name: string }[] };
    console.log("✅ Conexión exitosa");
    console.log("📦 Modelos disponibles:");
    for (const model of data.models) {
      console.log(`   • ${model.name}`);
    }
    console.log("");
  } catch (error) {
    console.error("❌ Error conectando con Ollama:");
    console.error(error);
    process.exit(1);
  }
}

async function generarDocumento(
  nombre: string,
  prompt: string,
  transcripcion: string,
  reintentos = 2,
): Promise<void> {
  for (let intento = 0; intento <= reintentos; intento++) {
    try {
      console.log(`\n🚀 Generando ${nombre}...`);

      const inicio = Date.now();

      const stream = await client.chat({
        model: MODEL,
        stream: true,
        options: {
          temperature: 0.2,
        },
        messages: [
          {
            role: "system",
            content: `
Eres un consultor senior especializado en:

- Arquitectura de Software
- Product Management
- Scrum
- Bases de Datos
- SaaS Empresariales

Debes generar documentación profesional en Markdown.

${prompt}
`,
          },
          {
            role: "user",
            content: transcripcion,
          },
        ],
      });

      let contenido = "";

      process.stdout.write("\n");
      process.stdout.write("────────────────────────────\n");

      for await (const chunk of stream) {
        const texto = chunk.message?.content ?? "";

        contenido += texto;

        process.stdout.write(texto);
      }

      process.stdout.write("\n");
      process.stdout.write("────────────────────────────\n");

      const archivo = path.join("output", `${nombre}.md`);

      await fs.writeFile(archivo, contenido, "utf8");

      const tiempo = ((Date.now() - inicio) / 1000).toFixed(1);

      console.log(`\n✅ ${nombre}.md generado (${tiempo}s)`);

      return;
    } catch (error) {
      if (intento === reintentos) {
        console.error(`❌ ${nombre} falló`);
        console.error(error);
      } else {
        console.log(`⚠️ Reintentando ${nombre}...`);

        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }
}

async function main() {
  console.clear();
  console.log("=================================");
  console.log("   AI BUSINESS ANALYST");
  console.log("=================================");
  console.log(`🌐 Host: ${OLLAMA_HOST}`);
  console.log(`🤖 Modelo: ${MODEL}`);
  console.log("");

  await verificarConexion();

  await fs.mkdir("output", { recursive: true });

  const trabajos = [
    {
      nombre: "resumen",
      prompt: `Genera un documento con las siguientes secciones:
# Resumen Ejecutivo
# Objetivos del Proyecto
# Problemas Detectados
# Beneficios Esperados
Sé extremadamente detallado y profesional.`,
    },
    {
      nombre: "requerimientos",
      prompt: `Genera un documento con las siguientes secciones:
# Requerimientos Funcionales
# Requerimientos No Funcionales
# Restricciones
# Integraciones
# Roles del Sistema
Incluye mínimo 30 requerimientos en total, numerados y bien descritos.`,
    },
    {
      nombre: "historias-usuario",
      prompt: `Genera mínimo 30 historias de usuario en formato:
"Como [rol], quiero [acción] para [beneficio]"
Agrúpalas por módulos del sistema. Incluye criterios de aceptación para cada una.`,
    },
    {
      nombre: "arquitectura",
      prompt: `Diseña la arquitectura del sistema con las siguientes secciones:
# Arquitectura General
# Frontend
# Backend
# Base de Datos
# APIs e Integraciones
# Seguridad
# Infraestructura
Incluye diagramas ASCII donde sea relevante.`,
    },
    {
      nombre: "database",
      prompt: `Diseña el modelo de base de datos con:
# Entidades Principales
# Relaciones entre Entidades
# Índices Recomendados
# Restricciones e Integridad
Incluye ejemplos de SQL (CREATE TABLE) para las entidades principales.`,
    },
    {
      nombre: "backlog",
      prompt: `Genera el backlog del proyecto con:
# MVP (Producto Mínimo Viable)
# Sprint 1
# Sprint 2
# Sprint 3
# Sprint 4
Incluye estimaciones en puntos de historia y descripción de cada tarea.`,
    },
  ];

  // Procesar en lotes de 2 para no saturar Ollama
  const LOTE = 2;
  for (let i = 0; i < trabajos.length; i += LOTE) {
    const lote = trabajos.slice(i, i + LOTE);
    await Promise.all(
      lote.map((t) => generarDocumento(t.nombre, t.prompt, transcripcion)),
    );
  }

  console.log("");
  console.log("🎉 Todos los documentos fueron generados en ./output/");
}

main();
