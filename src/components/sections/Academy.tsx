import { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  const target = useMemo(() => new Date("2025-09-09T19:00:00"), []);
  const { days, hours, minutes, seconds, done } = useCountdown(target);

  const blocks = useMemo(
    () => [
      {
        title: "Explora",
        desc:
          "Observamos tu contexto y necesidades reales. Identificamos oportunidades concretas para que la IA aporte valor a tu identidad y propósito.",
        faqs: [
          {
            q: "¿Qué entregables hay en esta fase?",
            a: "Un mapa de oportunidades y un diagnóstico de madurez para priorizar acciones de alto impacto.",
          },
          {
            q: "¿Quién participa?",
            a: "Equipo clave de negocio y una persona facilitadora del LabnoLab.",
          },
        ],
      },
      {
        title: "Pregunta",
        desc:
          "No buscamos solo respuestas: diseñamos mejores preguntas. Definimos retos útiles y medibles.",
        faqs: [
          { q: "¿Cómo se formulan los retos?", a: "Mediante marcos de definición claros (How Might We, JTBD) y criterios de éxito." },
          { q: "¿Cuánto dura?", a: "Suele resolverse en una o dos sesiones de trabajo enfocadas." },
        ],
      },
      {
        title: "Prototipa",
        desc:
          "Creamos prototipos funcionales combinando herramientas de IA y tu flujo actual para validar rápido.",
        faqs: [
          { q: "¿Qué prototipos hacéis?", a: "Automatizaciones, prompts avanzados, plantillas y pequeños agentes según el caso." },
          { q: "¿Se testean con usuarios?", a: "Siempre que el caso lo requiera, con criterios de éxito definidos." },
        ],
      },
      {
        title: "Itera",
        desc:
          "Medimos, aprendemos y afinamos. La mejora continua es parte del método, no un añadido.",
        faqs: [
          { q: "¿Qué se mide?", a: "Tiempo ahorrado, calidad del output, satisfacción, tasa de adopción, entre otros KPIs." },
          { q: "¿Con qué frecuencia?", a: "Ciclos semanales o quincenales, según el ritmo del proyecto." },
        ],
      },
      {
        title: "Implementa",
        desc:
          "Escalamos lo que funciona e integramos la solución en tu operación con formación y soporte.",
        faqs: [
          { q: "¿Incluye formación?", a: "Sí, formamos al equipo en el uso y mantenimiento de la solución." },
          { q: "¿Qué pasa después?", a: "Definimos un plan de mantenimiento y evolución acorde a tus objetivos." },
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
            Finaliza el 09/09/2025 a las 19:00 (hora local)
          </p>
        </div>
      </div>

      {/* Methodology blocks */}
      <div className="pad-x-fluid py-12 lg:py-16">
        <header className="mb-10 max-w-3xl">
          <p className="mb-2 inline-block rounded-sm bg-secondary px-2 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            Metodología LabnoLab
          </p>
          <h3 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
            De la pregunta a la implementación
          </h3>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {blocks.map((block, idx) => (
            <article key={block.title} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h4 className="text-xl font-extrabold tracking-tight">{String(idx + 1).padStart(2, "0")}. {block.title}</h4>
              <p className="mt-2 text-foreground/90">
                {block.desc}
              </p>

              <Accordion type="multiple" className="mt-4">
                {block.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${idx}-${i}`}>
                    <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-foreground/80">{f.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
