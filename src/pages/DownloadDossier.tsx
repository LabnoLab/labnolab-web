import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import DossierDownloadDialog from "@/components/forms/DossierDownloadDialog";
import { Mail, MessageCircle, MapPin, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DownloadDossier = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Abrir el dialog automáticamente cuando se monta el componente
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    // Si el usuario cierra el dialog, redirigir a la home
    if (!open) {
      navigate("/");
    }
  };

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pad-x-fluid py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Descarga el Dossier del Curso</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Completa el formulario para recibir información detallada sobre nuestro curso de Inteligencia Creativa.
          </p>
        </div>
      </main>
      
      <DossierDownloadDialog open={isDialogOpen} onOpenChange={handleDialogClose} />
      
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
            <a href="/" className="story-link">Ir a inicio</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DownloadDossier;
