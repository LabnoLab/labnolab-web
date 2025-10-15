import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Smile, MessageCircle, Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const { days, hours, minutes, seconds } = useMemo(() => {
    const diff = Math.max(0, target.getTime() - now.getTime());
    const total = Math.floor(diff / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return { days, hours, minutes, seconds };
  }, [now, target]);
  return { days, hours, minutes, seconds };
}

export default function Academy() {
  useEffect(() => { document.title = "Academy | LabnoLab"; }, []);
  const target = useMemo(() => new Date("2025-12-02T19:00:00"), []);
  const t = useCountdown(target);

  const steps = useMemo(() => ([
    {
      title: "Módulo 1: Pensar en clave de IA",
      description: "En este módulo, aprenderás a pensar en clave de IA, transformando tu relación con la inteligencia artificial de herramienta a colaboradora estratégica.",
      points: [
        "**Fundamentos:** Comprenderás qué es realmente la IA Generativa, los LLMs y los modelos agénticos, y cómo cada uno se adapta a diferentes necesidades creativas y profesionales.",
        "**Arquitectura de datos:** Descubrirás por qué la organización de tu información es el 50% del éxito con IA. Aprenderás a estructurar tu conocimiento para que la IA acceda exactamente a lo que necesita, cuando lo necesita.",
        "**Decisión estratégica:** Dominarás los diferentes niveles de adopción de IA (desde búsquedas simples hasta agentes autónomos) para elegir la herramienta exacta según si tu tarea es puntual, recurrente o requiere autonomía completa.",
      ],
    },
    {
      title: "Módulo 2: Interactuar en clave de IA",
      description: "En este módulo, tus conversaciones con la IA pasarán de funcionales a extraordinarias. Aprenderás las técnicas de Impact Prompt Engineering de LabnoLab para crear outputs que realmente impactan.",
      points: [
        "**Técnicas avanzadas:** Dominarás técnicas como Inmersión Narrativa, Desconexión de Familiaridad o Inversión de Perspectiva para obligar a la IA a pensar diferente y generar resultados innovadores, sensibles y profundamente humanos.",
        "**Estructura del prompt:** Crearás prompts profesionales que incluyen rol, contexto estratégico, instrucciones precisas, formato de output, ejemplos de calidad y criterios de evaluación, logrando control total sobre cada respuesta.",
        "**Personalización avanzada:** Configurarás tu perfil personalizado en tu plataforma de IA, crearás shortcuts para agilizar tareas recurrentes, y diseñarás proyectos donde cada chat comparte memoria, construyendo conocimiento acumulativo en cada interacción.",
      ],
    },
    {
      title: "Módulo 3: Investigar en clave de IA",
      description: "En este módulo, convertirás la curiosidad en insights accionables, dominando los diferentes niveles de investigación con IA desde búsquedas básicas hasta agentes investigadores autónomos.",
      points: [
        "**Niveles de investigación:** Comprenderás las diferencias críticas entre buscadores tradicionales, LLMs con búsqueda web, modelos de Deep Research y agentes investigadores autónomos, sabiendo cuándo usar cada uno.",
        "**Deep research agéntico:** Utilizarás Deep Research para investigaciones que requieren razonamiento complejo y seguimiento de múltiples hilos informativos, y Tareas programadas y Navegadores agénticos para investigaciones programadas y navegación web autónoma.",
        "**Procesamiento y transformación:** Dominarás herramientas como NotebookLM para procesar grandes volúmenes de información específica y transformarla en formatos compartibles (podcasts, mapas mentales, informes), y aprenderás a usar otras plataformas como tu biblioteca digital permanente que alimenta todos tus proyectos.",
      ],
    },
    {
      title: "Módulo 4: Innovar en clave de IA",
      description: "Este módulo transforma cómo diseñas procesos completos, creando equipos virtuales especializados y workflows que operan como sistemas profesionales integrados.",
      points: [
        "**Equipos de asistentes en cascada:** Crearás equipos multi-perfil (estratega, creativa, copywriter, diseñadora, desarrolladora) donde cada asistente domina su especialidad y el output de uno alimenta al siguiente, replicando la profundidad de equipos profesionales reales.",
        "**Diseño de flows metodológicos:** Aprenderás a diseñar flujos de trabajo completos donde diferentes herramientas y asistentes se encadenan estratégicamente, desde la investigación inicial hasta el producto final, manteniendo coherencia narrativa y visual en todo el proceso.",
        "**De personas a productos:** Descubrirás por qué establecer primero la identidad humana y visual de un proyecto (las personas que lo representan) antes que los productos o elementos técnicos, crearás universos coherentes donde cada pieza dialoga naturalmente con las demás.",
      ],
    },
    {
      title: "Módulo 5: Comunicar en clave de IA",
      description: "En este módulo, dominarás la creación de contenido visual y audiovisual con IA, desde el prompting técnico hasta el montaje final, construyendo narrativas visuales profesionales y cohesivas.",
      points: [
        "**Prompting audiovisual especializado:** Aprenderás que los prompts de imagen y vídeo son radicalmente diferentes al texto, requiriendo vocabulario cinematográfico, parámetros técnicos precisos y, para vídeo, estructuras complejas en formato formatos como JSON.",
        "**Plataformas especializadas vs LLMs:** Comprenderás cuándo usar LLMs multimodales (Gemini, ChatGPT) por velocidad e integración, versus plataformas especializadas (Midjourney, Higgsfield, Weavy) cuando necesitas control granular, features específicas y máxima calidad.",
        "**Ecosistemas de creación:** Descubrirás plataformas all-in-one como Higgsfield o Freepik que centralizan múltiples modelos vía API, y herramientas de automatización como Weavy para crear workflows completos de shooting que se ejecutan automáticamente, transformando horas de producción en minutos.",
      ],
    },
    {
      title: "Módulo 6: Materializar en clave de IA",
      description: "Este módulo final integra todo lo aprendido, transformando estrategia, contenido y diseño en plataformas digitales funcionales donde cada elemento cobra vida operativa.",
      points: [
        "**Vibe coding:** Aprenderás a describir la esencia, estética y funcionalidad deseada de una plataforma (landing page, e-commerce, aplicación) y que la IA la materialice técnicamente con Lovable, convirtiendo conceptos en código operativo.",
        "**Convergencia de outputs:** Comprenderás cómo hacer converger todos los elementos creados (estrategia, textos, identidad visual, fotografías de producto) en un ecosistema digital coherente donde cada pieza encuentra su lugar funcional.",
        "**Iteración activa:** Adoptarás una metodología de mejora continua usando capturas de pantalla o lenguaje natural para señalar ajustes, permitiendo que la IA refine automáticamente el output hasta alcanzar la visión exacta que buscas, sin necesidad de conocimientos técnicos profundos.",
      ],
    },
  ]), []);

  const [current, setCurrent] = useState(0);
  const currentStep = steps[current];


  return (
    <div id="top">
      <Header />

      {/* HERO COUNTDOWN */}
      <section className="min-h-[70vh] grid place-items-center text-center">
        <div className="pad-x-fluid">
          <h1 className="fluid-h1 font-extrabold leading-[0.9] tracking-tight">
            Nuestra formación
            <br /> en Inteligencia Creativa
          </h1>
          <p className="mt-6 text-lg font-extrabold uppercase tracking-wider">PRÓXIMO CURSO: DIC 2025</p>

          <div className="mt-6 grid grid-flow-col gap-4 justify-center">
            <Time value={t.days} label="DAYS" />
            <Time value={t.hours} label="HOURS" />
            <Time value={t.minutes} label="MINUTES" />
            <Time value={t.seconds} label="SECONDS" />
          </div>
        </div>
      </section>

      {/* METHODOLOGY MODULES - INTERACTIVE */}
      <section aria-label="Módulos del curso" className="pad-x-fluid py-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Side nav */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20 rounded-lg bg-primary p-4 text-primary-foreground shadow">
              <p className="mb-4 px-1 text-xs font-bold uppercase tracking-wide">Metodología del Curso</p>
              <div className="space-y-2">
                {steps.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setCurrent(i)}
                    className={
                      "w-full rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors " +
                      (current === i
                        ? "bg-background text-foreground"
                        : "bg-primary text-primary-foreground hover:bg-background/10")
                    }
                  >
                    <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full border text-xs font-bold">{i + 1}</span>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Module content */}
          <article className="lg:col-span-9 rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight mb-3">{currentStep.title}</h2>
            <p className="text-base text-foreground/90 mb-6">
              {currentStep.description}
            </p>
            <div className="space-y-3">
              {currentStep.points.map((point, i) => (
                <div key={i} className="rounded-md bg-secondary/30 p-4">
                  <p className="text-sm text-foreground/85" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* READY CTA */}
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-tight">¿Estás ready?</h2>
        <p className="mt-3 opacity-90">Súmate al curso y domina las 6 etapas de la Inteligencia Creativa</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" variant="outline" className="btn-fluid"><Smile /> APÚNTATE</Button>
          <a href="https://wa.me/34615877069" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="btn-fluid"><MessageCircle /> CONTÁCTANOS</Button>
          </a>
          <Button size="lg" variant="outline" className="btn-fluid"><Download /> VER DOSIER</Button>
        </div>
      </section>

      {/* Footer (same as home) */}
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="pad-x-fluid">
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            <a href="https://wa.me/34615877069" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <MessageCircle className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">+34615877069</span>
            </a>
            <a href="mailto:hola.labnolab@gmail.com" className="flex items-center gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <Smile className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">hola.labnolab@gmail.com</span>
            </a>
            <a href="/" className="flex items-center gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <Download className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">Volver a Home</span>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <Download className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">LabnoLab Page</span>
            </a>
          </div>
          <div className="flex items-center justify-between py-4">
            <p className="text-sm">© {new Date().getFullYear()} LabnoLab — Laboratorio de Inteligencia Creativa</p>
            <a href="#top" className="story-link">Volver arriba</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Time({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="min-w-[88px] rounded-md bg-primary px-4 py-3 text-primary-foreground shadow">
      <div className="text-3xl font-extrabold tabular-nums leading-none">{padded}</div>
      <div className="text-[10px] font-extrabold uppercase tracking-wide opacity-80">{label}</div>
    </div>
  );
}