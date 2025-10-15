import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Smile } from "lucide-react";

interface CourseSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CourseSignupDialog({ open, onOpenChange }: CourseSignupDialogProps) {
  const whatsappUrl = "https://wa.me/34615877069/?text=¡Muy buenas equipo LabnoLab! Quiero apuntarme a la próxima edición de vuestro curso, ¿qué datos necesitáis?";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smile className="h-5 w-5" />
            Apúntate al Curso
          </DialogTitle>
          <DialogDescription className="pt-4 text-base leading-relaxed">
            Para apuntarte al curso mándanos un whatsapp y así nos compartes tu info y cerramos el proceso de inscripción. Además, si te queda alguna pregunta por hacer, ¡es el momento perfecto!
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Abrir WhatsApp
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
