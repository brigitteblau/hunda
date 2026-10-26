import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Heart,
  HeartHandshake,
  House,
  Mail,
  MapPin,
  MessageCircle,
  Rocket,
  Stethoscope,
  AtSign,
} from "lucide-react";
import Reveal from "@/components/marketing/reveal";
import {
  Chip,
  Eyebrow,
  FotoSlot,
  IconoRedondo,
  Seccion,
  Tarjeta,
  Titulo,
  Topbar,
  script,
} from "@/components/marketing/ui";
import ContactoForm from "./contacto-form";

export const metadata = {
  title: "Sobre nosotros — hunda.",
  description: "Somos Benja, Brigitte y Maite: tres estudiantes con una misión.",
};

// Fotos de Figma: bajalas a /public/sobre-nosotros/ y completá la ruta
// (ej. "/sobre-nosotros/equipo.jpg"). Mientras sea undefined se ve un recuadro.
const FOTOS: Record<string, string | undefined> = {
  equipo: "/sobre-nosotros/equipo.png",
  historia: "/sobre-nosotros/historia.png",
  benja: "/sobre-nosotros/benja.png",
  brigitte: "/sobre-nosotros/brigitte.png",
  maite: "/sobre-nosotros/maite.png",
};

const EQUIPO = [
  { clave: "benja", nombre: "Benja", rol: "UX/UI", frase: "fan de los golden" },
  { clave: "brigitte", nombre: "Brigitte", rol: "Back-End Developer", frase: "tiene una perra" },
  { clave: "maite", nombre: "Maite", rol: "Front-End Developer", frase: "ama los resultados" },
];

const ACOMPANAN = [
  { icono: Stethoscope, titulo: "Veterinarios", texto: "Validan las medidas y nos guían en cada caso clínico." },
  { icono: HeartHandshake, titulo: "Médicos y especialistas", texto: "Comparten su experiencia en prótesis y rehabilitación." },
  { icono: House, titulo: "Refugios", texto: "Nos acercan a perros rescatados que necesitan una segunda oportunidad." },
];

const HISTORIA = [
  { cuando: "primero", texto: "Hablamos con veterinarios y entendimos que cada perro necesita una prótesis única." },
  { cuando: "después", texto: "Diseñamos Hunda para unir medir, diseñar y fabricar en un solo lugar." },
  { cuando: "ahora", texto: "Estamos probando Hunda con familias reales y sumando puntos de impresión." },
];

const CONTACTO = [
  { icono: Mail, etiqueta: "Mail", valor: "betterbm26@gmail.com", href: "mailto:betterbm26@gmail.com" },
  { icono: MessageCircle, etiqueta: "WhatsApp", valor: "+54 9 11 7366 7824", href: "https://wa.me/5491173667824" },
  // TODO: reemplazar por el usuario real de Instagram de Hunda
  { icono: AtSign, etiqueta: "Instagram", valor: "@hunda_ok", href: undefined },
  { icono: MapPin, etiqueta: "Dónde estamos", valor: "ORT Belgrano, CABA", href: undefined },
];

export default function SobreNosotrosPage() {
  return (
    <main className="w-full overflow-x-hidden text-white">
      {/* HERO */}
      <div className="relative">
        <Topbar />
        <Seccion className="pt-10">
          <div className="grid items-center gap-12 pt-14 lg:grid-cols-[1fr_1fr]">
            <Reveal className="flex flex-col gap-6">
              <Eyebrow>Sobre nosotros</Eyebrow>
              <Titulo nivel={1} antes="Tres estudiantes, " acento="una misión." />
              <p className="max-w-md text-base leading-7 text-white/80">
                Somos Benja, Brigitte y Maite, alumnos de la secundaria ORT Belgrano. Lo que empezó como un proyecto
                escolar hoy es Hunda: una plataforma para que cualquier perro pueda volver a moverse de forma
                rápida, fácil y sostenible.
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip icono={<Building2 className="h-3.5 w-3.5" />}>ORT Belgrano</Chip>
                <Chip icono={<Rocket className="h-3.5 w-3.5" />}>Proyecto estudiantil</Chip>
                <Chip icono={<Heart className="h-3.5 w-3.5" />}>Hecho con amor</Chip>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative">
              <img
                src={FOTOS.equipo}
                alt="Benja, Brigitte y Maite con un perro"
                className="aspect-[4/3] w-full"
              />
              <span className={`${script.className} absolute -bottom-9 right-2 flex items-center gap-2 text-xl text-mint`}>
                el equipo detrás de cada huella
                <Heart className="h-4 w-4" />
              </span>
            </Reveal>
          </div>
        </Seccion>
      </div>

      {/* NUESTRA HISTORIA */}
      <Seccion>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <FotoSlot
              src={FOTOS.historia}
              alt="Perro con prótesis jugando con una pelota"
              etiqueta="perro con prótesis"
              className="aspect-[4/5] w-full max-w-sm"
              redondeo="rounded-[48px]"
            />
            <span
              className={`${script.className} absolute -bottom-4 left-6 flex items-center gap-2 rounded-full bg-[#0f1a16]/90 px-5 py-2 text-lg text-white/90`}
            >
              <Heart className="h-4 w-4 text-mint" />
              todo empezó con una pregunta
            </span>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5">
            <Eyebrow>Nuestra historia</Eyebrow>
            <Titulo antes="De una idea en el aula a algo que ayuda a " acento="perros de verdad." />
            <p className="max-w-lg text-sm leading-6 text-white/75">
              Todo arrancó con una pregunta en clase: si a mi perra le pasara algo, ¿cómo podría volver a caminar?
              Descubrimos que conseguir una prótesis era caro, lento y confuso, así que decidimos hacer algo al
              respecto.
            </p>
            <ul className="flex flex-col gap-4">
              {HISTORIA.map(({ cuando, texto }) => (
                <li key={cuando} className="flex flex-col gap-0.5">
                  <span className={`${script.className} text-lg text-mint`}>{cuando}</span>
                  <span className="max-w-lg text-xs leading-5 text-white/70">{texto}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Seccion>

      {/* LO QUE NOS MUEVE */}
      <Seccion tono="violeta">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Eyebrow>Lo que nos mueve</Eyebrow>
          <Titulo antes="Queremos que conseguir una prótesis sea " acento="rápido, fácil" despues=" y sostenible." />
          <p className="max-w-xl text-sm leading-6 text-white/75">
            <strong className="text-white">Rápido</strong>, porque un perro no puede esperar meses para volver a
            moverse. <strong className="text-white">Fácil</strong>, porque ninguna familia debería perderse buscando
            especialistas, medidas e impresoras por separado. Y <strong className="text-white">sostenible</strong>,
            porque imprimir cerca de casa ahorra viajes, costos y material.
          </p>
          <span className={`${script.className} flex items-center gap-2 text-xl text-mint`}>
            <Heart className="h-4 w-4" />
            ninguna huella debería detenerse
            <Heart className="h-4 w-4" />
          </span>
        </Reveal>
      </Seccion>

      {/* EL EQUIPO */}
      <Seccion>
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>El equipo</Eyebrow>
          <Titulo antes="Somos " acento="Benja, Brigitte y Maite." />
          <p className="max-w-lg text-sm text-white/70">
            Estudiantes de ORT apasionados por la tecnología, el diseño y el bienestar animal.
          </p>
        </Reveal>

        <div className="grid gap-10 pt-14 sm:grid-cols-3">
          {EQUIPO.map(({ clave, nombre, rol, frase }, i) => (
            <Reveal key={clave} delay={i * 0.08} className="flex flex-col items-center gap-3 text-center">
              <FotoSlot
                src={FOTOS[clave]}
                alt={`Foto de ${nombre}`}
                etiqueta={nombre}
                className="h-40 w-40 bg-white/5"
                redondeo="rounded-full"
              />
              <h3 className="font-display text-lg font-semibold text-white">{nombre}</h3>
              <p className="text-xs text-white/65">{rol}</p>
              <p className={`${script.className} text-lg text-mint`}>{frase}</p>
            </Reveal>
          ))}
        </div>
      </Seccion>

      {/* NOS ACOMPAÑAN */}
      <Seccion tono="violeta">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Nos acompañan</Eyebrow>
          <Titulo antes="No lo hacemos " acento="solos." />
          <p className="max-w-xl text-sm text-white/70">
            Veterinarios, médicos y refugios nos ayudan a que cada prótesis sea segura y llegue a quien la necesita.
          </p>
        </Reveal>

        <div className="grid gap-5 pt-12 md:grid-cols-3">
          {ACOMPANAN.map(({ icono: Icono, titulo, texto }, i) => (
            <Reveal key={titulo} delay={i * 0.08} className="h-full">
              <Tarjeta className="flex h-full items-start gap-4 p-5">
                <IconoRedondo>
                  <Icono className="h-6 w-6" />
                </IconoRedondo>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-base font-semibold text-white">{titulo}</h3>
                  <p className="text-xs leading-5 text-white/65">{texto}</p>
                </div>
              </Tarjeta>
            </Reveal>
          ))}
        </div>
      </Seccion>

      {/* AUSPICIANTES */}
      <Seccion>
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Auspiciantes</Eyebrow>
          <Titulo antes="Gracias a quienes " acento="confían en Hunda." />
        </Reveal>

        {/* Reemplazar cada recuadro por el logo real cuando haya auspiciantes */}
        <div className="grid grid-cols-2 gap-4 pt-12 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03] text-xs text-white/40"
            >
              Logo auspiciante
            </div>
          ))}
        </div>

        <Reveal className="flex flex-col items-center justify-center gap-4 pt-12 sm:flex-row">
          <p className="text-base font-medium text-white">¿Querés auspiciar a Hunda?</p>
          <Link
            href="#contacto"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Escribinos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Seccion>

      {/* CONTACTO */}
      <Seccion id="contacto" tono="violeta">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Contactanos</Eyebrow>
            <Titulo acento="Hablemos." />
            <p className="max-w-sm text-sm leading-6 text-white/75">
              ¿Tenés una consulta, querés colaborar o contarnos la historia de tu perro? Te respondemos en menos de
              72 h.
            </p>
            <ul className="flex flex-col gap-4">
              {CONTACTO.map(({ icono: Icono, etiqueta, valor, href }) => {
                const contenido = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mint/50 bg-mint/10 text-mint">
                      <Icono className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] text-white/50">{etiqueta}</span>
                      <span className="text-sm font-medium text-white">{valor}</span>
                    </span>
                  </>
                );
                return (
                  <li key={etiqueta}>
                    {href ? (
                      <a href={href} className="flex items-center gap-3 transition-opacity hover:opacity-80">
                        {contenido}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">{contenido}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactoForm />
          </Reveal>
        </div>
      </Seccion>
    </main>
  );
}
