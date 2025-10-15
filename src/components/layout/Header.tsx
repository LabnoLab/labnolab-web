import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ACADEMY", href: "/academy" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return (
    <header className={`sticky top-0 z-50 border-b bg-primary text-primary-foreground transition-shadow ${isScrolled ? "shadow-lg" : "shadow-none"}`}> 
      <nav className="flex h-16 w-full items-center justify-between pad-x-fluid">
        <a href="/" aria-label="LabnoLab" className="block transition-opacity hover:opacity-90">
          <img src="/lovable-uploads/adbd4699-2f9d-4e4f-8234-2454cddb1c6a.png" alt="LabnoLab" className="h-12 sm:h-14 lg:h-16 w-auto" />
        </a>
        <ul className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="story-link text-background font-semibold">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            {user ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-background text-primary hover:bg-background/90"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <a href="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background text-primary hover:bg-background/90"
                >
                  <LogIn className="h-4 w-4" />
                </Button>
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
