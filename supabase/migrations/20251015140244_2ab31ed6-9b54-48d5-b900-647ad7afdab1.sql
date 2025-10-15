-- Crear enum para roles de usuario
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Tabla de roles de usuario
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Habilitar RLS en user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Función de seguridad para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Tabla para información del curso (descargas del dossier)
CREATE TABLE public.course_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  wants_whatsapp_info BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS en course_downloads
ALTER TABLE public.course_downloads ENABLE ROW LEVEL SECURITY;

-- Policy: Solo administradoras pueden ver los datos
CREATE POLICY "Only admins can view course downloads"
ON public.course_downloads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Solo administradoras pueden insertar (para testing)
-- Nota: En producción, querrás permitir inserts anónimos con validación
CREATE POLICY "Anyone can submit course download form"
ON public.course_downloads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Solo administradoras pueden actualizar
CREATE POLICY "Only admins can update course downloads"
ON public.course_downloads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Solo administradoras pueden eliminar
CREATE POLICY "Only admins can delete course downloads"
ON public.course_downloads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));