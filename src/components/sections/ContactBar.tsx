import { Mail, MessageCircle, MapPin, Linkedin } from "lucide-react";

const items = [
  { icon: MessageCircle, text: "+34615877069", href: "https://wa.me/34615877069" },
  { icon: Mail, text: "hola.labnolab@gmail.com", href: "mailto:hola.labnolab@gmail.com" },
  { icon: MapPin, text: "Barcelona, Spain.", href: "#map" },
  { icon: Linkedin, text: "LabnoLab Page", href: "https://www.linkedin.com/" },
];

export default function ContactBar() {
  return (
    <aside aria-label="Barra de contacto" className="border-t border-b border-border bg-background">
      <div className="grid grid-cols-1 divide-y divide-border pad-x-fluid sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {items.map(({ icon: Icon, text, href }) => (
          <a
            key={text}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 p-6 transition-colors hover:bg-accent"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon className="size-5" />
            </span>
            <span className="font-semibold underline underline-offset-4">{text}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
