import Link from "next/link";
import {
  Check,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  Handshake,
  Heart,
  MapPin,
  Printer,
  Stethoscope,
  UsersRound,
  Wrench,
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
import PostulacionForm from "./postulacion-form";

export const metadata = {
  title: "Trabajá con nosotros — hunda.",
  description: "Sumá tu impresora 3D a la red de puntos de impresión de Hunda.",
};


const FOTOS: Record<string, string | undefined> = {
  hero: "/trabaja-con-nosotros/hero.png",
  comunidad: "/trabaja-con-nosotros/comunidad.png",
  toby: "/trabaja-con-nosotros/toby.png",
  kira: "/trabaja-con-nosotros/kira.png",
  simon: "/trabaja-con-nosotros/simon.png",
  nala: "/trabaja-con-nosotros/nala.png",
};

const QUIENES = [
  { icono: GraduationCap, titulo: "Universidades", texto: "Laboratorios y carreras de diseño, ingeniería o veterinaria." },
  { icono: Stethoscope, titulo: "Veterinarias", texto: "Clínicas que quieran acompañar a sus pacientes de punta a punta." },
  { icono: Wrench, titulo: "Talleres y makers", texto: "Fab labs, espacios maker y talleres de impresión 3D." },
  { icono: Heart, titulo: "Particulares", texto: "Personas con una impresora 3D en casa y ganas de ayudar." },
];

const PASOS = [
  {
    n: 1,
    titulo: "Te llega el archivo",
    texto: "Recibís el archivo STL de una prótesis diseñada a medida, con todas las indicaciones para imprimirla.",
    chip: { icono: FileText, texto: "protesis_luna.stl" },
  },
  {
    n: 2,
    titulo: "Imprimís la prótesis",
    texto: "Usás tu impresora y tus materiales. Si tenés dudas, nuestro equipo te acompaña en cada paso.",
    chip: { icono: Clock, texto: "Tiempo estimado: 6 h" },
  },
  {
    n: 3,
    titulo: "La familia la retira",
    texto: "Coordinás la entrega desde la plataforma y otro perro vuelve a correr.",
    chip: { icono: Heart, texto: "¡Listo, ya la tiene!" },
  },
];

const COMUNIDAD = [
  { icono: Heart, titulo: "Impacto real", texto: "Cada impresión le devuelve movimiento a un perro." },
  { icono: Eye, titulo: "Visibilidad", texto: "Tu espacio aparece en el mapa y en la comunidad de Hunda." },
  { icono: Handshake, titulo: "Acompañamiento", texto: "Nuestro equipo te guía desde el primer archivo." },
];

const PERROS = [
  { clave: "toby", nombre: "Toby", frase: "vuelve a saltar" },
  { clave: "kira", nombre: "Kira", frase: "ama sus paseos" },
  { clave: "simon", nombre: "Simón", frase: "veterano protésico" },
  { clave: "nala", nombre: "Nala", frase: "corre detrás de todo" },
];

function MapaDemo() {
  const pines = [
    { x: "22%", y: "22%" },
    { x: "74%", y: "34%" },
    { x: "58%", y: "58%" },
    { x: "88%", y: "74%" },
  ];
  return (
    <div className="relative h-[360px] overflow-hidden rounded-3xl border border-white/25 bg-[#17231f]" aria-hidden>
      <svg viewBox="0 0 400 360" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none">
          <path d="M0 80 L400 120" />
          <path d="M0 250 L400 200" />
          <path d="M90 0 L130 360" />
          <path d="M280 0 L250 360" />
        </g>
        <g fill="rgba(65,192,134,0.08)">
          <rect x="140" y="130" width="90" height="50" rx="10" />
          <rect x="300" y="230" width="70" height="60" rx="10" />
          <rect x="20" y="270" width="60" height="50" rx="10" />
        </g>
        <path d="M110 300 Q170 250 220 215 T 235 160" stroke="#00e39a" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <circle cx="110" cy="300" r="6" fill="#4da3ff" stroke="white" strokeWidth="2" />
      </svg>

      {pines.map((p) => (
        <span
          key={p.x}
          className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mint/60 bg-[#1f332d] text-mint"
          style={{ left: p.x, top: p.y }}
        >
          <Printer className="h-4 w-4" />
        </span>
      ))}
      <span
        className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mint text-[#0B0F0D] shadow-[0_0_0_8px_rgba(0,227,154,0.2)]"
        style={{ left: "62%", top: "42%" }}
      >
        <Printer className="h-5 w-5" />
      </span>

      <div className="absolute right-4 top-4 flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-[#0f1a16]/90 px-4 py-3 text-xs">
        <span className="font-semibold text-white">Taller Maker Belgrano</span>
        <span className="text-white/55">1,2 km · Abierto hasta las 18 h</span>
        <span className="flex gap-1.5 pt-0.5">
          {["PLA", "PETG", "TPU"].map((m) => (
            <span key={m} className="rounded bg-mint/15 px-1.5 py-0.5 text-[10px] font-semibold text-mint">
              {m}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export default function TrabajaConNosotrosPage() {
  return (
    <main className="w-full overflow-x-hidden text-white">
      {/* HERO */}
      <div className="relative">
      <Topbar />
      <Seccion className="pt-10">
        <div className="grid items-center gap-12 pt-14 lg:grid-cols-[1.05fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow>Trabajá con Hunda</Eyebrow>
            <Titulo nivel={1} antes="Imprimí prótesis, " acento="cambiá vidas." />
            <p className="max-w-md text-base leading-7 text-white/80">
              Si tenés una impresora 3D, sumate a la red de puntos de impresión de Hunda y ayudá a que más perros
              vuelvan a correr, jugar y explorar.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#postula"
                className="inline-flex h-12 items-center rounded-full bg-mint px-7 text-sm font-semibold text-[#0B0F0D] transition-colors hover:bg-white"
              >
                Quiero sumarme
              </a>
              <a
                href="#como-funciona"
                className="inline-flex h-12 items-center rounded-full border border-white/25 bg-white/5 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Cómo funciona
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
              {[
                { icono: FileText, texto: "Archivo STL listo" },
                { icono: Printer, texto: "Imprimís cuando podés" },
                { icono: MapPin, texto: "Aparecés en el mapa" },
              ].map(({ icono: Icono, texto }) => (
                <li key={texto} className="flex items-center gap-2">
                  <Icono className="h-4 w-4 text-mint" />
                  {texto}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative w-full max-w-[520px] lg:ml-auto">
              <img
                src={FOTOS.hero}
                alt="Perros con prótesis corriendo y jugando"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </Seccion>
      </div>

      {/* QUIÉNES PUEDEN SUMARSE */}
      <Seccion tono="violeta">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>¿Quiénes pueden sumarse?</Eyebrow>
          <Titulo antes="Si tenés una impresora 3D, tenés " acento="un lugar acá." className="max-w-2xl" />
          <p className="max-w-xl text-sm text-white/70">
            Cualquier espacio con ganas de ayudar puede ser parte de la red de Hunda.
          </p>
        </Reveal>

        <div className="grid gap-8 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {QUIENES.map(({ icono: Icono, titulo, texto }, i) => (
            <Reveal key={titulo} delay={i * 0.08} className="flex flex-col items-center gap-3 text-center">
              <IconoRedondo>
                <Icono className="h-6 w-6" />
              </IconoRedondo>
              <h3 className="font-display text-base font-semibold text-white">{titulo}</h3>
              <p className="max-w-[200px] text-xs leading-5 text-white/60">{texto}</p>
            </Reveal>
          ))}
        </div>
      </Seccion>

      {/* CÓMO FUNCIONA */}
      <Seccion id="como-funciona">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Cómo funciona</Eyebrow>
          <Titulo antes="Así de simple es " acento="colaborar." />
          <p className="max-w-xl text-sm text-white/70">
            Nosotros diseñamos, vos imprimís y una familia vuelve a ver a su perro correr.
          </p>
        </Reveal>

        <div className="grid gap-5 pt-12 md:grid-cols-3">
          {PASOS.map(({ n, titulo, texto, chip }, i) => (
            <Reveal key={n} delay={i * 0.08} className="h-full">
              <Tarjeta className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-sm font-bold text-[#0B0F0D]">
                    {n}
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{titulo}</h3>
                </div>
                <p className="flex-1 text-xs leading-5 text-white/65">{texto}</p>
                <div>
                  <Chip icono={<chip.icono className="h-3.5 w-3.5" />}>{chip.texto}</Chip>
                </div>
              </Tarjeta>
            </Reveal>
          ))}
        </div>
      </Seccion>

      {/* MAPA */}
      <Seccion tono="violeta">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Mapa de impresión</Eyebrow>
            <Titulo antes="Tu espacio, " acento="en el mapa de Hunda." />
            <p className="max-w-md text-sm leading-6 text-white/75">
              Las familias buscan el punto más cercano para imprimir la prótesis de su perro. Sumate y aparecé ahí.
            </p>
            <ul className="flex flex-col gap-3 text-sm text-white/90">
              {["Perfil con horarios y materiales", "Pedidos solo cuando vos puedas", "Contacto directo con cada familia"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-[#0B0F0D]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                )
              )}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <MapaDemo />
          </Reveal>
        </div>
      </Seccion>

      {/* COMUNIDAD */}
      <Seccion>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FOTOS.comunidad}
              alt="Una familia con su perro con prótesis"
              className="h-auto w-full"
            />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <Eyebrow>Comunidad</Eyebrow>
            <Titulo antes="No estás solo: " acento="somos una comunidad entera." />
            <p className="max-w-md text-sm leading-6 text-white/75">
              Detrás de cada prótesis hay familias, veterinarios, makers y estudiantes que se juntan por la misma
              causa.
            </p>
            <ul className="flex flex-col gap-4">
              {COMUNIDAD.map(({ icono: Icono, titulo, texto }) => (
                <li key={titulo} className="flex items-start gap-3">
                  <Icono className="h-5 w-5 shrink-0 text-mint" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-white">{titulo}</span>
                    <span className="text-xs text-white/65">{texto}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Seccion>

      {/* ELLOS TE ESPERAN */}
      <Seccion tono="violeta">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Ellos te esperan</Eyebrow>
          <Titulo antes="Cada impresión es " acento="una nueva aventura." className="max-w-xl" />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 pt-12 lg:grid-cols-4">
          {PERROS.map(({ clave, nombre, frase }, i) => (
            <Reveal key={clave} delay={i * 0.08}>
              <div className="flex flex-col overflow-hidden rounded-3xl border border-mint/50 bg-[#17231f]">
                <FotoSlot
                  src={FOTOS[clave]}
                  alt={`${nombre}, perro con prótesis`}
                  etiqueta={nombre}
                  className="aspect-[3/4] w-full border-0"
                  redondeo="rounded-none"
                />
                <p className="flex flex-wrap items-baseline gap-x-2 px-4 py-3">
                  <span className="text-sm font-semibold text-white">{nombre}</span>
                  <span className={`${script.className} text-base text-mint`}>{frase}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Seccion>

      {/* POSTULACIÓN */}
      <Seccion id="postula">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Postulá tu espacio</Eyebrow>
            <Titulo antes="Sumate " acento="a la red." />
            <p className="max-w-sm text-sm leading-6 text-white/75">
              Completá el formulario y te contactamos para conocer tu espacio y tus impresoras.
            </p>
            <ul className="flex flex-col gap-3 text-sm text-white/90">
              {[
                { icono: Clock, texto: "Te respondemos en menos de 72 h" },
                { icono: Check, texto: "Sin costos ni compromisos fijos" },
                { icono: Printer, texto: "Elegís cuántas prótesis imprimir" },
              ].map(({ icono: Icono, texto }) => (
                <li key={texto} className="flex items-center gap-3">
                  <Icono className="h-4 w-4 text-mint" />
                  {texto}
                </li>
              ))}
            </ul>
            <p className={`${script.className} flex items-center gap-2 text-xl text-mint`}>
              <UsersRound className="h-5 w-5" />
              +10 perros esperan su prótesis
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <PostulacionForm />
          </Reveal>
        </div>

        <p className="pt-10 text-center text-xs text-white/50">
          ¿Preferís escribirnos directo?{" "}
          <Link href="/contact" className="text-mint underline underline-offset-2">
            Ir a contacto
          </Link>
        </p>
      </Seccion>
    </main>
  );
}
