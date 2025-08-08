import { useEffect, useState } from "react";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ACADEMY", href: "#academy" },
  { label: "CARRITO", href: "#carrito" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b bg-primary text-primary-foreground transition-shadow ${isScrolled ? "shadow-lg" : "shadow-none"}`}> 
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" aria-label="LabnoLab" className="block transition-opacity hover:opacity-90">
          <img src="/lovable-uploads/adbd4699-2f9d-4e4f-8234-2454cddb1c6a.png" alt="LabnoLab" className="h-8 w-auto" />
        </a>
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="story-link text-background font-semibold">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
