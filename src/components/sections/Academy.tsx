import { useEffect, useMemo, useState } from "react";

// Simple countdown to local time: 09/09/2025 19:00
function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const { days, hours, minutes, seconds, done } = useMemo(() => {
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, done: false };
  }, [now, target]);

  return { days, hours, minutes, seconds, done };
}

export default function Academy() {
  const target = useMemo(() => new Date("2025-12-02T19:00:00"), []);
  const { days, hours, minutes, seconds, done } = useCountdown(target);

  const blocks = useMemo(
    () => [
      {
        title: "Módulo 1: Pensar en clave de IA",
        desc: "En este módulo, aprenderás a pensar en clave de IA, transformando tu relación con la inteligencia artificial de herramienta a colaboradora estratégica.",
        points: [
          "**Fundamentos:** Comprenderás qué es realmente la IA Generativa, los LLMs y los modelos agénticos, y cómo cada uno se adapta a diferentes necesidades creativas y profesionales.",
          "**Arquitectura de datos:** Descubrirás por qué la organización de tu información es el 50% del éxito con IA. Aprenderás a estructurar tu conocimiento para que la IA acceda exactamente a lo que necesita, cuando lo necesita.",
          "**Decisión estratégica:** Dominarás los diferentes niveles de adopción de IA (desde búsquedas simples hasta agentes autónomos) para elegir la herramienta exacta según si tu tarea es puntual, recurrente o requiere autonomía completa.",
        ],
      },
      {
        title: "Módulo 2: Interactuar en clave de IA",
        desc: "En este módulo, tus conversaciones con la IA pasarán de funcionales a extraordinarias. Aprenderás las técnicas de Impact Prompt Engineering de LabnoLab para crear outputs que realmente impactan.",
        points: [
          "**Técnicas avanzadas:** Dominarás técnicas como Inmersión Narrativa, Desconexión de Familiaridad o Inversión de Perspectiva para obligar a la IA a pensar diferente y generar resultados innovadores, sensibles y profundamente humanos.",
          "**Estructura del prompt:** Crearás prompts profesionales que incluyen rol, contexto estratégico, instrucciones precisas, formato de output, ejemplos de calidad y criterios de evaluación, logrando control total sobre cada respuesta.",
          "**Personalización avanzada:** Configurarás tu perfil personalizado en tu plataforma de IA, crearás shortcuts para agilizar tareas recurrentes, y diseñarás proyectos donde cada chat comparte memoria, construyendo conocimiento acumulativo en cada interacción.",
        ],
      },
      {
        title: "Módulo 3: Investigar en clave de IA",
        desc: "En este módulo, convertirás la curiosidad en insights accionables, dominando los diferentes niveles de investigación con IA desde búsquedas básicas hasta agentes investigadores autónomos.",
        points: [
          "**Niveles de investigación:** Comprenderás las diferencias críticas entre buscadores tradicionales, LLMs con búsqueda web, modelos de Deep Research y agentes investigadores autónomos, sabiendo cuándo usar cada uno.",
          "**Deep research agéntico:** Utilizarás Deep Research para investigaciones que requieren razonamiento complejo y seguimiento de múltiples hilos informativos, y Tareas programadas y Navegadores agénticos para investigaciones programadas y navegación web autónoma.",
          "**Procesamiento y transformación:** Dominarás herramientas como NotebookLM para procesar grandes volúmenes de información específica y transformarla en formatos compartibles (podcasts, mapas mentales, informes), y aprenderás a usar otras plataformas como tu biblioteca digital permanente que alimenta todos tus proyectos.",
        ],
      },
      {
        title: "Módulo 4: Innovar en clave de IA",
        desc: "Este módulo transforma cómo diseñas procesos completos, creando equipos virtuales especializados y workflows que operan como sistemas profesionales integrados.",
        points: [
          "**Equipos de asistentes en cascada:** Crearás equipos multi-perfil (estratega, creativa, copywriter, diseñadora, desarrolladora) donde cada asistente domina su especialidad y el output de uno alimenta al siguiente, replicando la profundidad de equipos profesionales reales.",
          "**Diseño de flows metodológicos:** Aprenderás a diseñar flujos de trabajo completos donde diferentes herramientas y asistentes se encadenan estratégicamente, desde la investigación inicial hasta el producto final, manteniendo coherencia narrativa y visual en todo el proceso.",
          "**De personas a productos:** Descubrirás por qué establecer primero la identidad humana y visual de un proyecto (las personas que lo representan) antes que los productos o elementos técnicos, crearás universos coherentes donde cada pieza dialoga naturalmente con las demás.",
        ],
      },
      {
        title: "Módulo 5: Comunicar en clave de IA",
        desc: "En este módulo, dominarás la creación de contenido visual y audiovisual con IA, desde el prompting técnico hasta el montaje final, construyendo narrativas visuales profesionales y cohesivas.",
        points: [
          "**Prompting audiovisual especializado:** Aprenderás que los prompts de imagen y vídeo son radicalmente diferentes al texto, requiriendo vocabulario cinematográfico, parámetros técnicos precisos y, para vídeo, estructuras complejas en formato formatos como JSON.",
          "**Plataformas especializadas vs LLMs:** Comprenderás cuándo usar LLMs multimodales (Gemini, ChatGPT) por velocidad e integración, versus plataformas especializadas (Midjourney, Higgsfield, Weavy) cuando necesitas control granular, features específicas y máxima calidad.",
          "**Ecosistemas de creación:** Descubrirás plataformas all-in-one como Higgsfield o Freepik que centralizan múltiples modelos vía API, y herramientas de automatización como Weavy para crear workflows completos de shooting que se ejecutan automáticamente, transformando horas de producción en minutos.",
        ],
      },
      {
        title: "Módulo 6: Materializar en clave de IA",
        desc: "Este módulo final integra todo lo aprendido, transformando estrategia, contenido y diseño en plataformas digitales funcionales donde cada elemento cobra vida operativa.",
        points: [
          "**Vibe coding:** Aprenderás a describir la esencia, estética y funcionalidad deseada de una plataforma (landing page, e-commerce, aplicación) y que la IA la materialice técnicamente con Lovable, convirtiendo conceptos en código operativo.",
          "**Convergencia de outputs:** Comprenderás cómo hacer converger todos los elementos creados (estrategia, textos, identidad visual, fotografías de producto) en un ecosistema digital coherente donde cada pieza encuentra su lugar funcional.",
          "**Iteración activa:** Adoptarás una metodología de mejora continua usando capturas de pantalla o lenguaje natural para señalar ajustes, permitiendo que la IA refine automáticamente el output hasta alcanzar la visión exacta que buscas, sin necesidad de conocimientos técnicos profundos.",
        ],
      },
    ],
    []
  );

  return (
    <section id="academy" aria-labelledby="academy-title" className="border-t border-border bg-background">
      {/* Countdown bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="pad-x-fluid py-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="academy-title" className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Academy — Inscripciones abiertas
            </h2>
            <div aria-live="polite" className="grid grid-flow-col gap-3 text-center">
              {done ? (
                <span className="rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground">
                  Cerrado
                </span>
              ) : (
                <>
                  <TimeBox label="Días" value={days} />
                  <TimeBox label="Horas" value={hours} />
                  <TimeBox label="Min" value={minutes} />
                  <TimeBox label="Seg" value={seconds} />
                </>
              )}
            </div>
          </div>
          <p className="mt-2 text-sm/relaxed opacity-90">
            Finaliza el 02/12/2025 a las 19:00 (hora local)
          </p>
        </div>
      </div>

      {/* Methodology blocks */}
      <div className="pad-x-fluid py-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {blocks.map((block, idx) => (
            <article key={block.title} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h4 className="text-lg font-extrabold tracking-tight mb-3">{block.title}</h4>
              <p className="text-sm text-foreground/90 mb-4">
                {block.desc}
              </p>
              <div className="space-y-3">
                {block.points.map((point, i) => (
                  <div key={i} className="rounded-md bg-secondary/30 p-3">
                    <p className="text-sm text-foreground/85" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="min-w-16 rounded-md bg-background px-3 py-2 text-foreground shadow">
      <div className="text-xl font-extrabold tabular-nums leading-none">{padded}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{label}</div>
    </div>
  );
}
