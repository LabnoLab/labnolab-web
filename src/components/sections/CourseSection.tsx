// Image provided externally via /lovable-uploads
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile, MessageCircle, Download } from "lucide-react";
import DossierDownloadDialog from "@/components/forms/DossierDownloadDialog";
import CourseSignupDialog from "@/components/forms/CourseSignupDialog";
export default function CourseSection() {
  const [showDossierDialog, setShowDossierDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  return <section id="course" className="border-t border-border bg-background py-14">
      <div className="grid grid-cols-1 gap-0 pad-x-fluid lg:grid-cols-2 lg:min-h-[85vh]">
        <div className="order-2 lg:order-1 pr-8 lg:pr-12">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="inline-block h-6 w-8 bg-primary"></span>
            <span className="text-sm font-extrabold italic tracking-wide">PRÓXIMO CURSO: VOL.3 — DEL 03/02 AL 18/03 · MARTES 19:00-20:30H (ESP)</span>
          </div>
          <h2 className="mb-6 font-extrabold leading-tight tracking-tight text-[clamp(2.25rem,5vw,5rem)]">
            EN CLAVE DE INTELIGENCIA ARTIFICIAL
          </h2>
          <p className="mb-10 max-w-4xl text-foreground/90 fluid-body">
            Por aquí somos fans de la pregunta, así que déjanos hacerte alguna: ¿Sientes que la IA tiene potencial infinito pero acabas usándola siempre para lo mismo? ¿Te frustra no saber cuándo usar cada herramienta o cómo hacer que todo tenga coherencia? ¿Quieres dejar de copiar prompts de internet y empezar a crear tu propio sistema de trabajo?
            <br /><br />
            Este curso te enseña a pensar en clave de IA: a crear tu propia metodología de trabajo, diseñar flows que conectan herramientas estratégicamente, construir equipos de asistentes especializados, y materializar proyectos desde la investigación hasta plataformas funcionales.
          </p>
          <div className="flex max-w-none flex-col gap-4">
            <Button size="lg" className="hover-scale btn-fluid w-full" onClick={() => setShowSignupDialog(true)}><Smile /> APÚNTATE</Button>
            <a href="https://wa.me/34615877069/?text=Hola equipo *LabnoLab*! 😎 Estaba navegando por vuestra web y quería pediros el dosier del curso, me lo compartís? Me llamo" target="_blank" rel="noopener noreferrer" className="w-full"><Button size="lg" className="hover-scale btn-fluid w-full"><MessageCircle /> CONTÁCTANOS</Button></a>
            <Button size="lg" className="hover-scale btn-fluid w-full" onClick={() => setShowDossierDialog(true)}><Download /> DESCARGA EL DOSIER</Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative min-h-[45vh] lg:min-h-[85vh] bg-black">
          <img src="/lovable-uploads/85bf3b27-094c-4788-9339-f0a29eff805c.png" alt="Smiley neon LabnoLab" loading="lazy" className="absolute inset-0 h-full w-full object-contain p-8" />
        </div>
      </div>
      <DossierDownloadDialog open={showDossierDialog} onOpenChange={setShowDossierDialog} />
      <CourseSignupDialog open={showSignupDialog} onOpenChange={setShowSignupDialog} />
    </section>;
}