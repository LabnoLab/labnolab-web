
const services = [
  { name: "Mentorías", description: "Acompañamiento one-to-one para emprendedoras/es que buscan potenciar su proyecto colaborando con la Inteligencia Artificial.", image: "/lovable-uploads/c81562c3-800f-4d99-ace4-923ba81f95b0.png" },
  { name: "Consultoría", description: "Transformación integral de procesos y creación de soluciones de IA on-demand, automatizaciones y mejora de la productividad que amplifican el potencial humano sin reemplazarlo.", image: "/lovable-uploads/9bb135f4-8834-46fd-acea-b387fbbcc5f2.png" },
  { name: "Hackathons", description: "Jornadas creativas de co-creación donde colaboramos con la IA para resolver desafíos complejos y generar innovación disruptiva sobre retos concretos de equipos u organizaciones.", image: "/lovable-uploads/2aee0e65-9d0d-4a55-8f08-c56c097f2cd9.png" },
  { name: "Formación", description: "Cursos completos para trabajar las 6 fases de la Metodología LabnoLab: pensar, interactuar, investigar, innovar, comunicar y analizar en clave de IA orientados y adaptados a diferentes perfiles profesionales.", image: "/lovable-uploads/c91014f9-0e9b-4fc7-bdab-753af0555897.png" },
  { name: "Workshops", description: "Sesiones inmersivas de 2-4 horas donde desbloqueamos el pensamiento en clave de IA, colaborando con ella en ejemplos concretos de un proyecto o reto.", image: "/lovable-uploads/6abd6994-2bd3-4bc1-a64d-b13876790893.png" },
  { name: "Capacitación", description: "Adaptamos nuestra metodología para crear programas formativos a medida para equipos con necesidades específicas, integrando la IA en sus flujos de trabajo sin que pierdan su identidad.", image: "/lovable-uploads/114454a7-ce2b-472b-a6f5-8ae705e31f42.png" },
];

export default function Services() {
  return (
    <section id="servicios" className="border-t border-border bg-background py-14">
      <div className="pad-x-fluid">
        <h2 className="mb-10 font-extrabold tracking-tight text-[clamp(2rem,4.5vw,4rem)]">¿QUÉ HACEMOS?</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.name} className="group flex flex-col overflow-hidden rounded-lg border-2 border-border bg-background shadow-[var(--shadow-elevated)] transition-transform hover:-translate-y-1">
              <img src={s.image} alt={`${s.name} — imagen en blanco y negro`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-4 w-6 bg-primary"></span>
                  <h3 className="text-2xl font-extrabold italic tracking-tight">{s.name}</h3>
                </div>
                <p className="text-foreground/90">{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
