import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.pexels.com/photos/32551745/pexels-photo-32551745.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1000";

/** Marca Prisma (prisma/diamante) dibujada a medida. */
function PrismaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path
        d="M24 3 L43 17 L35 44 L13 44 L5 17 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M24 3 L24 44 M5 17 L43 17 M24 3 L13 44 M24 3 L35 44" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: sin autenticación real. Entra directamente al panel.
    navigate("/inicio");
  };

  return (
    <div
      data-testid="page-login"
      className="flex min-h-screen w-full flex-col bg-background text-foreground md:flex-row"
    >
      {/* IZQUIERDA · foto + logo Prisma abajo y centrado */}
      <div className="relative hidden overflow-hidden bg-zinc-950 md:flex md:w-[55%] lg:w-[58%]">
        <img
          src={HERO_IMAGE}
          alt="Escultura contemporánea en un espacio abierto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Veladuras para profundidad y legibilidad del logo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

        <div className="relative z-10 flex w-full flex-col items-center justify-end pb-16 text-center text-white">
          <PrismaMark className="h-12 w-12 text-white/95" />
          <div className="mt-5 text-2xl font-light tracking-[0.42em] text-white/95">
            PRISMA
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.62em] text-white/55">
            Studio
          </div>
          <div className="mt-8 h-px w-12 bg-white/25" />
          <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-white/65">
            Plataforma de gestión para tu presencia online.
          </p>
        </div>
      </div>

      {/* DERECHA · formulario, más estrecho y proporcionado */}
      <div className="flex w-full items-center justify-center px-6 py-12 md:w-[45%] md:px-10 lg:w-[42%]">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Identidad */}
          <div className="flex flex-col items-center text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground">
              <PrismaMark className="h-6 w-6" />
            </span>
            <div className="mt-4 text-[13px] font-bold uppercase tracking-[0.34em] text-foreground">
              Alejandro Martínez
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.42em] text-muted-foreground">
              Escultor
            </div>
            <div className="my-6 h-px w-10 bg-border" />
          </div>

          {/* Encabezado */}
          <div className="text-center">
            <h1 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
              Bienvenido de nuevo
            </h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Inicia sesión para acceder a tu panel de administración
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="login-email" className="text-sm font-semibold">
                Correo electrónico
              </Label>
              <div className="relative">
                <Icon
                  name="Mail"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="login-email"
                  data-testid="login-email-input"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  className="h-12 rounded-md pl-11 text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="login-password" className="text-sm font-semibold">
                Contraseña
              </Label>
              <div className="relative">
                <Icon
                  name="Lock"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="login-password"
                  data-testid="login-password-input"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="h-12 rounded-md pl-11 pr-11 text-base"
                />
                <button
                  type="button"
                  data-testid="login-password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <Checkbox
                  data-testid="login-remember-checkbox"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(Boolean(v))}
                />
                Recordarme
              </label>
              <button
                type="button"
                data-testid="login-forgot-password-link"
                className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              type="submit"
              data-testid="login-submit-btn"
              className="mt-1 h-12 w-full rounded-md bg-primary text-base font-bold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 active:scale-[0.99]"
            >
              Iniciar sesión
            </Button>
          </form>

          {/* Divisor + ayuda */}
          <div
            className={cn(
              "my-7 flex items-center gap-4 text-xs text-muted-foreground",
              "before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
            )}
          >
            <span className="shrink-0">o</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              data-testid="login-contact-link"
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Contacta con tu administrador.
            </button>
          </p>

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            Desarrollado por <span className="font-semibold text-foreground/80">Novatedi</span>
          </p>
        </div>
      </div>
    </div>
  );
}
