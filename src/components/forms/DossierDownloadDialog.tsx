import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "Por favor, introduce un email válido" })
    .max(255, { message: "El email debe tener menos de 255 caracteres" }),
  phone: z.string()
    .trim()
    .max(20, { message: "El teléfono debe tener menos de 20 caracteres" })
    .optional(),
  wants_whatsapp_info: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface DossierDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DossierDownloadDialog({ open, onOpenChange }: DossierDownloadDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      wants_whatsapp_info: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("course_downloads")
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          wants_whatsapp_info: values.wants_whatsapp_info,
        });

      if (error) throw error;

      toast.success("¡Gracias por tu interés!", {
        description: "El dossier se abrirá en una nueva pestaña.",
      });

      // Open the dossier link in a new tab
      window.open("https://www.canva.com/design/DAGkUx9SHiw/_ArJAngHQjixmadWG5J8Cg/view?utm_content=DAGkUx9SHiw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he7303be4bb", "_blank", "noopener,noreferrer");

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al enviar el formulario", {
        description: "Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Descarga el Dossier del Curso
          </DialogTitle>
          <DialogDescription>
            Rellena el formulario para recibir toda la información del curso "En Clave de Inteligencia Artificial"
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono (opcional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+34 600 000 000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wants_whatsapp_info"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Quiero recibir información por WhatsApp
                    </FormLabel>
                    <FormDescription>
                      Te enviaremos detalles adicionales y podrás hacer preguntas directamente
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Dossier
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
