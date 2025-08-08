import React from "react";

const TEXT = "(Personas + Creatividad + Impacto)^IA = Inteligencia Creativa";

export default function MovingBanner() {
  return (
    <section aria-label="Personas Creatividad Impacto IA" className="border-t border-b border-border bg-primary text-accent">
      <div className="marquee">
        <div className="marquee-track reverse py-4 sm:py-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-6 italic font-semibold tracking-tight text-[clamp(2rem,6vw,4rem)]">
              {TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
