import courseImg from "@/assets/course-ecia.jpg";
import { Button } from "@/components/ui/button";
import { Smile, MessageCircle, Download } from "lucide-react";

export default function CourseSection() {
  return (
    <section id="academy" className="border-t border-border bg-background py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 lg:order-1">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="inline-block h-6 w-8 bg-primary"></span>
            <span className="text-sm font-extrabold italic tracking-wide">PRÓXIMO CURSO: SEP 2025</span>
          </div>
          <h2 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            EN CLAVE DE INTELIGENCIA ARTIFICIAL
          </h2>
          <p className="mb-8 max-w-xl text-lg text-foreground/90">
            Por aquí somos fans de la pregunta, así que déjanos hacerte alguna: ¿Sientes que hay un enorme potencial en la IA, pero no sabes cómo aprovecharlo manteniendo tu identidad y propósito? ¿Te interesa no solo obtener respuestas, sino aprender a formular mejores preguntas? ¿Buscas diferenciarte en un mercado saturado donde todos usan la misma tecnología de la misma manera?
          </p>
          <div className="flex max-w-md flex-col gap-3">
            <Button size="lg" className="hover-scale"><Smile /> APÚNTATE</Button>
            <a href="https://wa.me/34615877069" target="_blank" rel="noopener noreferrer"><Button size="lg" className="w-full hover-scale"><MessageCircle /> CONTÁCTANOS</Button></a>
            <Button size="lg" className="hover-scale"><Download /> DESCARGA EL DOSIER</Button>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <img src={courseImg} alt="Manos utilizando un smartphone sobre escritorio, blanco y negro" loading="lazy" className="w-full rounded-lg border-2 border-border shadow-[var(--shadow-elevated)]" />
        </div>
      </div>
    </section>
  );
}
