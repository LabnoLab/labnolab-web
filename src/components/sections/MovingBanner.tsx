import React from "react";

const TEXT = "PERSONAS + CREATIVIDAD + IMPACTO + IA";

export default function MovingBanner() {
  return (
    <section aria-label="Personas Creatividad Impacto IA" className="border-t border-b border-border bg-primary text-primary-foreground">
      <div className="marquee">
        <div className="marquee-track py-3 sm:py-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-6 text-sm font-extrabold uppercase tracking-widest sm:text-base">
              {TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
