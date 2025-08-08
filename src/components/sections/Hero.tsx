import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const sliderImages = [
  "/lovable-uploads/d956b2b7-faab-4326-a179-00dc413bc5b4.png",
  "/lovable-uploads/c4b0b97b-2051-48e4-94aa-14a873e66725.png",
  "/lovable-uploads/84b3ab41-31ab-4142-8c7b-6a5e008cf84e.png",
  "/lovable-uploads/6302b291-05e3-435f-8e1a-82ddee386fcd.png",
  "/lovable-uploads/13385a4c-e0f0-4a25-80cd-111455f08308.png",
  "/lovable-uploads/df481572-cba7-432b-bd42-53ac80ae2537.png",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="bg-background">
      <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
        {/* Left: text + CTAs */}
        <div className="flex items-center">
          <div className="w-full px-4 py-12 sm:px-6 lg:px-16">
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
          </div>
        </div>

        {/* Right: full-height crossfade slider */}
        <div className="relative min-h-[50vh] lg:min-h-[80vh] overflow-hidden">
          {sliderImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Actividades de LabnoLab"
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}


          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-opacity ${i === index ? "bg-primary-foreground opacity-100" : "bg-primary-foreground/60 opacity-60"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
