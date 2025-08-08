import heroImage from "@/assets/hero-woman-bw.jpg";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="animate-enter">
          <p className="mb-3 inline-block rounded-sm bg-primary px-2 py-1 text-sm font-semibold text-primary-foreground">Laboratorio de Inteligencia Creativa</p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            LABORATORIO DE INTELIGENCIA CREATIVA
          </h1>
          <p className="mb-8 max-w-xl text-lg text-foreground/90">
            Eficiencia, productividad y automatización son solo el resultado de colaborar con la Inteligencia Artificial para potenciar a las personas, la creatividad y el impacto.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#servicios">
              <Button size="lg" className="hover-scale">
                ¿QUÉ HACEMOS?
              </Button>
            </a>
            <a href="mailto:hola.labnolab@gmail.com">
              <Button size="lg" className="hover-scale" variant="default">
                <Mail /> PREGÚNTANOS
              </Button>
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImage}
            alt="Retrato en blanco y negro de mujer sonriente con pelo rizado"
            loading="eager"
            className="w-full rounded-lg border-2 border-border shadow-[var(--shadow-elevated)]"
          />
        </div>
      </div>
    </section>
  );
}
