import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import MovingBanner from "@/components/sections/MovingBanner";
import Services from "@/components/sections/Services";
import CourseSection from "@/components/sections/CourseSection";
import { Mail, MessageCircle, MapPin, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hola.labnolab@gmail.com");
      toast({
        title: "¡Dirección de mail copiada!",
        description: "Pégalo en tu plataforma de mailing y escríbenos lo que quieras 😉",
      });
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <MovingBanner />
        <CourseSection />
        <Services />
      </main>
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="pad-x-fluid">
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            <a href="https://wa.me/34615877069" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <MessageCircle className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">+34615877069</span>
            </a>
            <button onClick={handleCopyEmail} className="flex items-center gap-4 p-6 text-left">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <Mail className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">hola.labnolab@gmail.com</span>
            </button>
            <a href="#map" className="flex items-center gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <MapPin className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">Barcelona, Spain.</span>
            </a>
            <a href="https://www.linkedin.com/company/labnolab/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                <Linkedin className="size-5" />
              </span>
              <span className="font-semibold underline underline-offset-4">LabnoLab Page</span>
            </a>
          </div>
          <div className="flex items-center justify-between py-4">
            <p className="text-sm">© {new Date().getFullYear()} LabnoLab — Laboratorio de Inteligencia Creativa</p>
            <a href="#home" className="story-link">Volver arriba</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
