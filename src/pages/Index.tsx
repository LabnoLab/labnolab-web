import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import ContactBar from "@/components/sections/ContactBar";
import Services from "@/components/sections/Services";
import CourseSection from "@/components/sections/CourseSection";

const Index = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <ContactBar />
        <Services />
        <CourseSection />
        <section id="carrito" className="border-t border-border bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">Carrito</h2>
            <p className="text-foreground/80">Próximamente: integraremos compras y reservas.</p>
          </div>
        </section>
      </main>
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm">© {new Date().getFullYear()} LabnoLab — Laboratorio de Inteligencia Creativa</p>
          <a href="#home" className="story-link">Volver arriba</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
