# Análisis Arqueológico: LabnoLab Landing

**Fecha del análisis:** 2026-01-11  
**Analista:** Lovable AI

---

## 1. Ficha Técnica

| Campo | Valor |
|-------|-------|
| **Nombre del proyecto** | LabnoLab - Laboratorio de Inteligencia Creativa |
| **Fecha aprox. de creación** | ~Julio-Agosto 2025 (según historial de mensajes: "22 weeks ago" desde enero 2026) |
| **Stack tecnológico** | React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Supabase |
| **Plataforma de origen** | Lovable (Lovable Cloud con Supabase integrado) |
| **Estado** | Producción activa (promocionando VOL.3 del curso) |

### Dependencias principales
- **UI**: shadcn/ui (Radix primitives), Lucide icons
- **Formularios**: react-hook-form + zod
- **Estado/Data**: @tanstack/react-query, @supabase/supabase-js
- **Routing**: react-router-dom v6
- **Animaciones**: tailwindcss-animate, framer-like custom keyframes

---

## 2. Arquitectura y Estructura

```
src/
├── assets/                    # Imágenes optimizadas (JPG)
├── components/
│   ├── forms/                 # Diálogos de formularios
│   │   ├── CourseSignupDialog.tsx
│   │   └── DossierDownloadDialog.tsx
│   ├── layout/
│   │   └── Header.tsx         # Header con auth state
│   ├── sections/              # Secciones de landing
│   │   ├── Academy.tsx        # Countdown + módulos
│   │   ├── ContactBar.tsx     # Barra de contacto reutilizable
│   │   ├── CourseSection.tsx  # CTA principal del curso
│   │   ├── Hero.tsx           # Hero con slider
│   │   ├── MovingBanner.tsx   # Marquee animado
│   │   └── Services.tsx       # Grid de servicios
│   └── ui/                    # shadcn components (~40 componentes)
├── hooks/
│   └── use-toast.ts           # Sistema de toasts custom
├── integrations/supabase/     # Auto-generado por Lovable Cloud
├── lib/
│   └── utils.ts               # cn() helper
├── pages/
│   ├── Academy.tsx            # Landing del curso
│   ├── Auth.tsx               # Login/Signup
│   ├── DownloadDossier.tsx    # Página standalone de descarga
│   ├── Index.tsx              # Home principal
│   └── NotFound.tsx           # 404
├── App.tsx                    # Router principal
├── index.css                  # Design system completo
└── main.tsx                   # Entry point
```

### Patrón arquitectónico
- **Feature-based organization**: Componentes agrupados por función (forms, sections, layout)
- **Page-section pattern**: Páginas componen secciones reutilizables
- **Colocation**: Lógica de cada feature junto a su UI

---

## 3. Features Funcionales

### ¿Qué hace este proyecto?
Landing page corporativa para LabnoLab, una empresa de formación y consultoría en Inteligencia Artificial creativa. Promociona cursos, servicios y permite captura de leads.

### Features implementadas

| Feature | Estado | Descripción |
|---------|--------|-------------|
| Hero con slider automático | ✅ Completa | Crossfade de 6 imágenes cada 3.5s |
| Marquee animado | ✅ Completa | Banner con fórmula de IC |
| Grid de servicios | ✅ Completa | 6 servicios con hover effects |
| Countdown a próximo curso | ✅ Completa | Timer en tiempo real hasta fecha |
| Módulos del curso interactivos | ✅ Completa | 6 módulos navegables con sidebar |
| Descarga de dossier con lead capture | ✅ Completa | Formulario → Supabase → descarga PDF |
| Inscripción vía WhatsApp | ✅ Completa | Diálogo que redirige a WhatsApp |
| Autenticación | ✅ Completa | Login/Signup con Supabase Auth |
| Header con estado de sesión | ✅ Completa | Muestra login/logout según auth |
| Footer con contactos | ✅ Completa | WhatsApp, Email (copy), LinkedIn |
| Responsive design | ✅ Completa | Mobile-first con breakpoints |
| Dark mode ready | ✅ Parcial | Variables CSS definidas, no toggle |

### Features únicas/innovadoras
1. **Tipografía fluida con clamp()**: `fluid-h1`, `fluid-body`, `btn-fluid`
2. **Story-link hover effect**: Underline animado con transform-origin
3. **Copy email to clipboard con toast feedback**
4. **Lead capture + descarga automática de PDF en un solo flow**

---

## 4. Integraciones y Configuraciones

### APIs/Servicios externos
| Servicio | Uso |
|----------|-----|
| **Lovable Cloud (Supabase)** | Auth, Database (course_downloads) |
| **WhatsApp Business** | CTAs de contacto/inscripción (vía wa.me) |
| **LinkedIn** | Link a página corporativa |

### Variables de entorno (.env)
```
VITE_SUPABASE_PROJECT_ID
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL
```

### Base de datos
```sql
-- Tabla: course_downloads
id UUID PRIMARY KEY
name VARCHAR
surname VARCHAR
email VARCHAR
phone VARCHAR
wants_whatsapp_info BOOLEAN
created_at TIMESTAMP

-- Tabla: user_roles (admin/user)
id UUID PRIMARY KEY
user_id UUID
role app_role (enum: admin, user)
```

### Configuraciones destacables

**tailwind.config.ts:**
- Sistema de animaciones custom (fade-in, scale-in, slide-in)
- Border-radius tokenizado
- Container centrado con padding

**index.css:**
- Design system HSL completo
- Variables de marca: `--brand-neon: 73 100% 52%` (#cdff07)
- Utilities custom: `.marquee`, `.story-link`, `.hover-scale`
- Tipografía fluida con clamp()

---

## 5. Código Rescatable

### 5.1 Hook de Countdown

**Archivo:** `src/pages/Academy.tsx` (líneas 9-22) y `src/components/sections/Academy.tsx`

```typescript
function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const { days, hours, minutes, seconds, done } = useMemo(() => {
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, done: false };
  }, [now, target]);

  return { days, hours, minutes, seconds, done };
}
```
**Valor:** Hook limpio y reutilizable para cualquier countdown. Maneja el caso "done".

---

### 5.2 Sistema de Design Tokens con HSL

**Archivo:** `src/index.css` (líneas 8-50)

```css
:root {
  /* Brand */
  --brand-neon: 73 100% 52%; /* #cdff07 approximate */
  --brand-black: 0 0% 0%;
  --brand-white: 0 0% 100%;

  /* App surfaces */
  --background: var(--brand-neon);
  --foreground: var(--brand-black);

  /* Primitives */
  --primary: var(--brand-black);
  --primary-foreground: var(--brand-white);

  /* Extras */
  --shadow-elevated: 0 10px 30px -10px hsl(var(--brand-black) / 0.35);
  --shadow-glow: 0 0 40px hsl(var(--brand-neon) / 0.35);
}
```
**Valor:** Pattern de design tokens con variables que se referencian entre sí. Facilita temas.

---

### 5.3 Tipografía y Spacing Fluido

**Archivo:** `src/index.css` (líneas 111-116)

```css
/* Fluid typography & spacing */
.fluid-h1 { font-size: clamp(3rem, 7vw, 7rem); }
.fluid-body { font-size: clamp(1.0625rem, 1.8vw, 1.75rem); line-height: 1.6; }
.btn-fluid { 
  padding: clamp(0.9rem, 1.6vw, 1.25rem) clamp(1.5rem, 2.5vw, 2.5rem); 
  font-size: clamp(1rem, 1.5vw, 1.25rem); 
  border-radius: var(--radius); 
}
.pad-x-fluid { padding-left: clamp(12px, 3vw, 48px); padding-right: clamp(12px, 3vw, 48px); }
```
**Valor:** Sistema completo de responsive sin media queries usando clamp().

---

### 5.4 Marquee CSS Puro

**Archivo:** `src/index.css` (líneas 119-127) + `src/components/sections/MovingBanner.tsx`

```css
@layer utilities {
  .marquee { overflow: hidden; }
  .marquee-track { 
    display: inline-flex; 
    white-space: nowrap; 
    animation: marquee 22s linear infinite; 
  }
  .marquee-track.reverse { animation-direction: reverse; }
}

@keyframes marquee { 
  from { transform: translateX(0); } 
  to { transform: translateX(-50%); } 
}
```

```tsx
// MovingBanner.tsx
export default function MovingBanner() {
  return (
    <section className="marquee">
      <div className="marquee-track reverse py-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="mx-6 italic font-semibold text-[clamp(2.75rem,8vw,6rem)]">
            {TEXT}
          </span>
        ))}
      </div>
    </section>
  );
}
```
**Valor:** Marquee infinito sin JS, solo CSS. Duplicar contenido 12x para loop seamless.

---

### 5.5 Story-Link Hover Effect

**Archivo:** `src/index.css` (líneas 91-105)

```css
.story-link {
  position: relative;
  display: inline-block;
}
.story-link::after {
  content: "";
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%; height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms ease;
}
.story-link:hover::after { 
  transform: scaleX(1); 
  transform-origin: left; 
}
```
**Valor:** Underline animado elegante que entra desde un lado y sale por el otro.

---

### 5.6 Lead Capture + Descarga Automática

**Archivo:** `src/components/forms/DossierDownloadDialog.tsx` (líneas 55-93)

```typescript
const onSubmit = async (values: FormValues) => {
  setIsSubmitting(true);

  try {
    const { error } = await supabase
      .from("course_downloads")
      .insert({
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        wants_whatsapp_info: values.wants_whatsapp_info,
      });

    if (error) throw error;

    toast.success("¡Gracias por tu interés!");

    // Descarga automática del PDF
    const link = document.createElement('a');
    link.href = '/dossier-curso-ia.pdf';
    link.download = 'Dossier-En-Clave-de-IA-LabnoLab.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    form.reset();
    onOpenChange(false);
  } catch (error) {
    toast.error("Error al enviar el formulario");
  } finally {
    setIsSubmitting(false);
  }
};
```
**Valor:** Pattern de lead capture que guarda en DB y descarga archivo en un solo flow.

---

### 5.7 Header con Auth State

**Archivo:** `src/components/layout/Header.tsx` (líneas 24-38)

```typescript
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
    }
  );

  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
```
**Valor:** Pattern de suscripción a auth state con cleanup correcto.

---

### 5.8 Crossfade Image Slider

**Archivo:** `src/components/sections/Hero.tsx` (líneas 71-80)

```tsx
<div className="relative min-h-screen overflow-hidden">
  {sliderImages.map((src, i) => (
    <img 
      key={src} 
      src={src} 
      loading={i === 0 ? "eager" : "lazy"} 
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 
        ${i === index ? "opacity-100" : "opacity-0"}`} 
    />
  ))}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    {sliderImages.map((_, i) => (
      <span className={`h-2 w-2 rounded-full ${i === index ? "opacity-100" : "opacity-60"}`} />
    ))}
  </div>
</div>
```
**Valor:** Slider fullscreen con crossfade solo CSS + dots indicator. Simple y efectivo.

---

## 6. Decisiones de Diseño y Aprendizajes

### ¿Por qué se construyó así?
- **Single-page sections pattern**: Maximiza engagement sin navegación
- **WhatsApp como CTA principal**: Target demográfico español prefiere WhatsApp
- **Color neón invertido**: Background neón (#cdff07) con texto negro = máximo contraste
- **Sin dark mode toggle**: Decisión de marca, el neón ES la identidad

### Qué funcionó bien
1. **Fluid typography**: Zero media queries para tipografía
2. **Lead capture integrado**: Conversión directa sin fricciones
3. **Countdown en tiempo real**: Urgencia visual efectiva
4. **Slider automático**: Muestra variedad sin interacción requerida
5. **Copy email con toast**: UX superior a mailto:

### Qué no funcionó o quedó incompleto
1. **Dark mode**: Variables definidas pero sin implementar toggle
2. **ContactBar.tsx**: Componente creado pero no usado (footer duplicado en cada página)
3. **App.css**: Archivo legacy de Vite default, no utilizado
4. **NotFound.tsx**: Hardcoded en inglés y colores directos (bg-gray-100)
5. **Duplicación de footer**: Repetido en Index, Academy y DownloadDossier

### Aprendizajes técnicos
1. **clamp() > media queries** para tipografía responsiva
2. **HSL sin comillas en CSS variables** permite alpha channel con `/`
3. **Marquee: duplicar contenido** para loop seamless, no JS
4. **Auth state: subscription + getSession** para cubrir cold start
5. **Download trigger en JS** más confiable que `<a download>`

---

## 7. Veredicto

### ✅ CONSERVAR (código valioso)

| Elemento | Razón |
|----------|-------|
| `useCountdown` hook | Reutilizable en cualquier proyecto |
| Sistema de design tokens HSL | Pattern replicable |
| `.fluid-h1`, `.fluid-body`, `.btn-fluid` | Fluid typography sin media queries |
| `.marquee` + `.story-link` | Efectos CSS puros elegantes |
| Lead capture + download pattern | Conversión efectiva |
| Auth state subscription pattern | Correcto manejo de Supabase Auth |

### 📝 DOCUMENTAR (ideas sin guardar código)

| Pattern | Descripción |
|---------|-------------|
| Background neón con foreground oscuro | Identidad visual distintiva |
| WhatsApp como CTA primario | Efectivo para mercado hispanohablante |
| Countdown visual con urgencia | Aumenta conversiones |
| Crossfade slider solo CSS | Alternativa ligera a librerías |

### 🗑️ DESCARTAR

| Elemento | Razón |
|----------|-------|
| `src/App.css` | Legacy de Vite, no utilizado |
| `ContactBar.tsx` | No utilizado, footer duplicado |
| Duplicación de footer | Debería ser componente compartido |
| `NotFound.tsx` | Implementación básica, no alineada con diseño |

---

## Puntuación de Valor: 4/5 ⭐⭐⭐⭐

**Justificación:**
- **+1** Design system HSL bien estructurado
- **+1** Fluid typography pattern excelente
- **+1** CSS utilities reutilizables (marquee, story-link)
- **+1** Lead capture + auth patterns funcionales
- **-1** Algo de código duplicado y legacy sin limpiar

**Recomendación:** Extraer los hooks, utilities CSS y patterns de auth a un starter kit o template antes de archivar. El diseño visual y la estructura son sólidos para replicar en otros proyectos de landing.

---

*Generado automáticamente por Lovable AI*
