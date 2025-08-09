import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  const target = useMemo(() => new Date("2025-09-09T19:00:00"), []);
  const t = useCountdown(target);

  const steps = useMemo(() => ([
    {
      title: "Pensar",
      description:
        "Construye los fundamentos mentales para colaborar inteligentemente con la IA. Evalúa críticamente qué herramientas usar y cómo utilizarlas para pensar mejor.",
      theme: "light" as const,
      faqs: [
        "¿Está la IA aquí para reemplazarnos o para potenciarnos?",
        "¿Por qué Claude me da respuestas diferentes a ChatGPT?",
        "¿Es realmente segura la IA? ¿Es sostenible?",
        "¿Cómo puede destacar cuando 'todo el mundo' usa IA?",
      ],
    },
    {
      title: "Interactuar",
      description:
        "Domina el arte de comunicarte efectivamente con sistemas de IA. Conversaciones productivas, resultados consistentes y personalización de outputs.",
      theme: "dark" as const,
      faqs: [
        "¿Cómo puedo conseguir resultados consistentes?",
        "¿Existe una forma 'correcta' de hablar con la IA?",
        "¿Cómo evito que me dé respuestas genéricas?",
        "¿Puedo crear una biblioteca de prompts reutilizables?",
      ],
    },
    {
      title: "Investigar",
      description:
        "Revoluciona tu forma de investigar combinando herramientas de IA con metodología crítica para construir sistemas de gestión de conocimiento.",
      theme: "light" as const,
      faqs: [
        "¿Cómo puedo confiar en la información que me da la IA?",
        "¿Cómo busco información específica?",
        "¿Puedo organizar mi biblioteca informativa?",
        "¿Puedo automatizar mi investigación?",
      ],
    },
    {
      title: "Innovar",
      description:
        "Materializa ideas creando asistentes y herramientas personalizadas de IA que se adapten a tus necesidades específicas.",
      theme: "dark" as const,
      faqs: [
        "¿Puedo realmente tener mi propio equipo virtual de GPTs?",
        "¿Cómo automatizo las tareas repetitivas?",
        "¿Puedo crear prototipos profesionales sin saber programación?",
        "¿Cómo organizo toda mi información?",
      ],
    },
    {
      title: "Comunicar",
      description:
        "Conecta auténticamente con diferentes audiencias usando la IA como amplificador de tu mensaje personal, manteniendo la esencia humana.",
      theme: "light" as const,
      faqs: [
        "¿Puedo crear contenido auténtico sin perder horas en ello?",
        "¿Cómo personalizo la comunicación efectivamente?",
        "¿Cómo genero narrativas que realmente impacten?",
        "¿Cómo paso de ideas a formatos múltiples?",
      ],
    },
    {
      title: "Analizar",
      description:
        "Desarrolla sistemas de evaluación que midan el rendimiento cuantitativo y el impacto cualitativo. Cierra el ciclo con mejora continua.",
      theme: "dark" as const,
      faqs: [
        "¿Cómo puedo medir el verdadero impacto de mi trabajo?",
        "¿Qué métricas necesito más allá de las tradicionales?",
        "¿Cómo transformo datos en decisiones acertadas?",
        "¿Cómo creo dashboards inteligentes?",
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
          <p className="mt-6 text-lg font-extrabold uppercase tracking-wider">PRÓXIMO CURSO: SEP 2025</p>

          <div className="mt-6 grid grid-flow-col gap-4 justify-center">
            <Time value={t.days} label="DAYS" />
            <Time value={t.hours} label="HOURS" />
            <Time value={t.minutes} label="MINUTES" />
            <Time value={t.seconds} label="SECONDS" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="btn-fluid shadow" variant="default"><Smile /> APÚNTATE</Button>
            <a href="https://wa.me/34615877069" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-fluid shadow" variant="default"><MessageCircle /> CONTÁCTANOS</Button>
            </a>
            <Button size="lg" className="btn-fluid shadow" variant="default"><Download /> VER DOSIER</Button>
          </div>
        </div>
      </section>

      {/* METHODOLOGY WITH SIDE NAV */}
      <section aria-label="Metodología LabnoLab" className="pad-x-fluid py-10 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Side nav */}
          <aside className="lg:col-span-2">
            <div className="sticky top-20 rounded-lg bg-primary p-3 text-primary-foreground shadow">
              <p className="mb-3 px-1 text-xs font-bold uppercase tracking-wide">Metodología LabnoLab</p>
              <div className="space-y-3">
                {steps.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setCurrent(i)}
                    className={
                      "w-full rounded-lg border px-4 py-3 text-left font-semibold transition-colors " +
                      (current === i
                        ? "bg-background text-foreground"
                        : "bg-primary text-primary-foreground hover:bg-secondary/10")
                    }
                  >
                    <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full border font-bold">{i + 1}</span>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Step content */}
          <article className={`lg:col-span-6 rounded-lg border p-8 ${currentStep.theme === "dark" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tight">
              {current + 1} | {currentStep.title}
              <span className="block text-foreground/70 text-[clamp(1.25rem,3vw,2.25rem)] font-[800] tracking-tight">en clave de IA</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-90">
              {currentStep.description}
            </p>
          </article>

          {/* FAQs */}
          <div className="lg:col-span-4">
            <h3 className="mb-3 text-xl font-extrabold">Preguntas clave que resolverás:</h3>
            <div className="space-y-3">
              <Accordion type="single" collapsible>
                {currentStep.faqs.map((q, idx) => (
                  <AccordionItem key={idx} value={`q-${idx}`} className="rounded-md border bg-secondary text-secondary-foreground">
                    <AccordionTrigger className="px-4">{q}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p>Te mostraremos cómo resolverlo durante el módulo.</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
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