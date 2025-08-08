// Image provided externally via /lovable-uploads
import { Button } from "@/components/ui/button";
import { Smile, MessageCircle, Download } from "lucide-react";

export default function CourseSection() {
  return (
    <section id="academy" className="border-t border-border bg-background py-14">
      <div className="grid grid-cols-1 gap-0 pad-x-fluid lg:grid-cols-2 lg:min-h-[85vh]">
        <div className="order-2 lg:order-1">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="inline-block h-6 w-8 bg-primary"></span>
            <span className="text-sm font-extrabold italic tracking-wide">PRÓXIMO CURSO: SEP 2025</span>
          </div>
          <h2 className="mb-6 font-extrabold leading-tight tracking-tight text-[clamp(2.25rem,5vw,5rem)]">
            EN CLAVE DE INTELIGENCIA ARTIFICIAL
          </h2>
          <p className="mb-10 max-w-4xl text-foreground/90 fluid-body">
            Por aquí somos fans de la pregunta, así que déjanos hacerte alguna: ¿Sientes que hay un enorme potencial en la IA, pero no sabes cómo aprovecharlo manteniendo tu identidad y propósito? ¿Te interesa no solo obtener respuestas, sino aprender a formular mejores preguntas? ¿Buscas diferenciarte en un mercado saturado donde todos usan la misma tecnología de la misma manera?
          </p>
          <div className="flex max-w-none flex-col gap-4">
            <Button size="lg" className="hover-scale btn-fluid"><Smile /> APÚNTATE</Button>
            <a href="https://wa.me/34615877069" target="_blank" rel="noopener noreferrer"><Button size="lg" className="w-full hover-scale btn-fluid"><MessageCircle /> CONTÁCTANOS</Button></a>
            <Button size="lg" className="hover-scale btn-fluid"><Download /> DESCARGA EL DOSIER</Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative min-h-[45vh] lg:min-h-[85vh]">
          <img src="/lovable-uploads/85bf3b27-094c-4788-9339-f0a29eff805c.png" alt="Smiley neon LabnoLab" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
