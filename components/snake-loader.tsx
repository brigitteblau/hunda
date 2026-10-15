"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  TriangleAlert,
  Trophy,
} from "lucide-react";

export type GenerationStage = "waking" | "saving" | "generating" | "fallback" | "done";

// ─── Juego ─────────────────────────────────────────────────────────────────

const GRID = 18;
const CANVAS_PX = 360;
const CELL = CANVAS_PX / GRID;
const BASE_TICK_MS = 145;
const MIN_TICK_MS = 72;
const BONUS_LIFETIME_MS = 6000;
const BEST_KEY = "hunda:snake-best";

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type GameStatus = "idle" | "playing" | "paused" | "over";

const DELTA: Record<Direction, Point> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  s: "DOWN",
  a: "LEFT",
  d: "RIGHT",
  W: "UP",
  S: "DOWN",
  A: "LEFT",
  D: "RIGHT",
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface GameState {
  snake: Point[];
  prevSnake: Point[];
  dir: Direction;
  queue: Direction[];
  food: Point;
  bonus: { p: Point; expiresAt: number } | null;
  tickMs: number;
  acc: number;
  score: number;
  particles: Particle[];
  shake: number;
}

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

function randomCell(exclude: Point[]): Point {
  let cell: Point;
  do {
    cell = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (exclude.some((p) => samePoint(p, cell)));
  return cell;
}

function freshState(): GameState {
  const mid = Math.floor(GRID / 2);
  const snake = [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
  return {
    snake,
    prevSnake: snake.map((p) => ({ ...p })),
    dir: "RIGHT",
    queue: [],
    food: randomCell(snake),
    bonus: null,
    tickMs: BASE_TICK_MS,
    acc: 0,
    score: 0,
    particles: [],
    shake: 0,
  };
}

function readBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeBest(value: number) {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // localStorage no disponible: el récord vive solo en esta sesión
  }
}

function burst(state: GameState, at: Point, color: string, count: number) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 90;
    state.particles.push({
      x: (at.x + 0.5) * CELL,
      y: (at.y + 0.5) * CELL,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color,
    });
  }
}

// ─── Dibujo ────────────────────────────────────────────────────────────────

function drawBone(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const len = size * 0.42;
  const knob = size * 0.17;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 4);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-len, -knob * 0.55, len * 2, knob * 1.1, knob * 0.5);
  ctx.fill();
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(sx * len, sy * knob * 0.6, knob, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function render(ctx: CanvasRenderingContext2D, state: GameState, alpha: number, now: number, dead: boolean) {
  ctx.save();
  ctx.clearRect(0, 0, CANVAS_PX, CANVAS_PX);

  if (state.shake > 0) {
    ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
  }

  // Tablero ajedrezado suave
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? "#0f1712" : "#0c130f";
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }

  // Hueso común (late suave)
  const pulse = 1 + Math.sin(now / 220) * 0.06;
  drawBone(ctx, (state.food.x + 0.5) * CELL, (state.food.y + 0.5) * CELL, CELL * pulse, "#f4ecd8");

  // Hueso dorado con anillo de tiempo restante
  if (state.bonus) {
    const remaining = Math.max(0, (state.bonus.expiresAt - now) / BONUS_LIFETIME_MS);
    const bx = (state.bonus.p.x + 0.5) * CELL;
    const by = (state.bonus.p.y + 0.5) * CELL;
    ctx.save();
    ctx.shadowColor = "#facc15";
    ctx.shadowBlur = 14;
    drawBone(ctx, bx, by, CELL * (1.05 + Math.sin(now / 120) * 0.08), "#facc15");
    ctx.restore();
    ctx.strokeStyle = "rgba(250, 204, 21, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bx, by, CELL * 0.72, -Math.PI / 2, -Math.PI / 2 + remaining * Math.PI * 2);
    ctx.stroke();
  }

  // Posiciones interpoladas entre el tick anterior y el actual
  const pts = state.snake.map((p, i) => {
    const prev = state.prevSnake[i] ?? state.prevSnake[state.prevSnake.length - 1] ?? p;
    return { x: (lerp(prev.x, p.x, alpha) + 0.5) * CELL, y: (lerp(prev.y, p.y, alpha) + 0.5) * CELL };
  });

  // Cuerpo: un trazo continuo, de verde intenso a más oscuro en la cola
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = pts.length - 1; i > 0; i--) {
    const t = i / Math.max(pts.length - 1, 1);
    ctx.strokeStyle = dead ? `rgba(248, 113, 113, ${0.9 - t * 0.4})` : `rgba(65, 192, 134, ${1 - t * 0.55})`;
    ctx.lineWidth = CELL * (0.78 - t * 0.22);
    ctx.beginPath();
    ctx.moveTo(pts[i].x, pts[i].y);
    ctx.lineTo(pts[i - 1].x, pts[i - 1].y);
    ctx.stroke();
  }

  // Cabeza de perro
  const head = pts[0];
  const d = DELTA[state.dir];
  const angle = Math.atan2(d.y, d.x);
  ctx.save();
  ctx.translate(head.x, head.y);
  ctx.rotate(angle);
  const r = CELL * 0.5;
  // orejas
  ctx.fillStyle = dead ? "#b91c1c" : "#2a8a5d";
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(-r * 0.35, side * r * 0.82, r * 0.5, r * 0.28, side * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // cabeza
  ctx.fillStyle = dead ? "#f87171" : "#41c086";
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  // hocico
  ctx.fillStyle = dead ? "#fca5a5" : "#7ad8ab";
  ctx.beginPath();
  ctx.ellipse(r * 0.45, 0, r * 0.45, r * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0b0f0d";
  ctx.beginPath();
  ctx.arc(r * 0.82, 0, r * 0.16, 0, Math.PI * 2);
  ctx.fill();
  // ojos
  for (const side of [-1, 1]) {
    if (dead) {
      ctx.strokeStyle = "#0b0f0d";
      ctx.lineWidth = 1.6;
      const ex = r * 0.05;
      const ey = side * r * 0.42;
      ctx.beginPath();
      ctx.moveTo(ex - 2.5, ey - 2.5);
      ctx.lineTo(ex + 2.5, ey + 2.5);
      ctx.moveTo(ex + 2.5, ey - 2.5);
      ctx.lineTo(ex - 2.5, ey + 2.5);
      ctx.stroke();
    } else {
      ctx.fillStyle = "#0b0f0d";
      ctx.beginPath();
      ctx.arc(r * 0.05, side * r * 0.42, r * 0.14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(r * 0.09, side * r * 0.42 - r * 0.05, r * 0.05, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // Partículas
  for (const p of state.particles) {
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4 * p.life + 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ─── Progreso de la generación ─────────────────────────────────────────────

const STAGE_ORDER: GenerationStage[] = ["waking", "saving", "generating", "done"];

// Rango de la barra para cada etapa y cuánto suele tardar (para la curva).
const STAGE_PROGRESS: Record<GenerationStage, { from: number; to: number; tauMs: number }> = {
  waking: { from: 0, to: 22, tauMs: 15_000 },
  saving: { from: 22, to: 35, tauMs: 1_500 },
  generating: { from: 35, to: 94, tauMs: 8_000 },
  fallback: { from: 94, to: 98, tauMs: 1_500 },
  done: { from: 100, to: 100, tauMs: 1 },
};

function stageIndex(stage: GenerationStage) {
  return stage === "fallback" ? STAGE_ORDER.indexOf("generating") : STAGE_ORDER.indexOf(stage);
}

interface StageRowProps {
  label: string;
  hint?: string;
  state: "pending" | "active" | "done" | "warn";
}

function StageRow({ label, hint, state }: StageRowProps) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          state === "done"
            ? "border-[#41C086] bg-[#41C086] text-[#0B0F0D]"
            : state === "active"
              ? "border-[#41C086]/60 text-[#41C086]"
              : state === "warn"
                ? "border-amber-300/60 bg-amber-300/15 text-amber-300"
                : "border-white/15 text-white/20"
        }`}
      >
        {state === "done" && <Check size={12} strokeWidth={3} />}
        {state === "active" && <Loader2 size={12} className="animate-spin" />}
        {state === "warn" && <TriangleAlert size={11} />}
      </span>
      <div className="flex flex-col">
        <span
          className={`text-sm ${
            state === "pending" ? "text-white/30" : state === "active" ? "text-white" : "text-white/70"
          }`}
        >
          {label}
        </span>
        {hint && state === "active" && <span className="text-[11px] text-white/35">{hint}</span>}
      </div>
    </li>
  );
}

// ─── Componente ────────────────────────────────────────────────────────────

interface SnakeLoaderProps {
  stage: GenerationStage;
  /** Se llama cuando el usuario (o el auto-cierre) pasa a ver el resultado. */
  onFinish: () => void;
}

export default function SnakeLoader({ stage, onFinish }: SnakeLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(freshState());
  const statusRef = useRef<GameStatus>("idle");
  const touchStartRef = useRef<Point | null>(null);

  const [status, setStatusState] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);
  const [newRecord, setNewRecord] = useState(false);

  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  // Recordamos si pasó por "fallback" aunque después llegue a "done"
  const [sawFallback, setSawFallback] = useState(false);
  if (stage === "fallback" && !sawFallback) setSawFallback(true);

  const setStatus = useCallback((next: GameStatus) => {
    statusRef.current = next;
    setStatusState(next);
  }, []);

  const start = useCallback(() => {
    stateRef.current = freshState();
    setScore(0);
    setNewRecord(false);
    setStatus("playing");
  }, [setStatus]);

  const togglePause = useCallback(() => {
    if (statusRef.current === "playing") setStatus("paused");
    else if (statusRef.current === "paused") setStatus("playing");
  }, [setStatus]);

  const steer = useCallback(
    (next: Direction) => {
      const s = stateRef.current;
      if (statusRef.current === "idle" || statusRef.current === "over") {
        start();
        // Arranca yendo a la derecha; no puede girar 180° de entrada
        if (next !== "LEFT") stateRef.current.queue.push(next);
        return;
      }
      if (statusRef.current === "paused") setStatus("playing");
      // Buffer de 2 giros para que los giros rápidos no se pierdan
      const last = s.queue[s.queue.length - 1] ?? s.dir;
      if (next === last || next === OPPOSITE[last] || s.queue.length >= 2) return;
      s.queue.push(next);
    },
    [start, setStatus]
  );

  // Loop del juego: lógica por ticks + dibujo interpolado a 60fps
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CANVAS_PX * dpr;
    canvas.height = CANVAS_PX * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const s = stateRef.current;
      if (s.queue.length) s.dir = s.queue.shift()!;

      const head = s.snake[0];
      const newHead = { x: head.x + DELTA[s.dir].x, y: head.y + DELTA[s.dir].y };
      const eatsFood = samePoint(newHead, s.food);
      const eatsBonus = s.bonus !== null && samePoint(newHead, s.bonus.p);
      const grows = eatsFood || eatsBonus;
      // Si no crece, la cola se mueve: se puede entrar a la celda que deja libre
      const body = grows ? s.snake : s.snake.slice(0, -1);

      const hitsWall = newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID;
      if (hitsWall || body.some((p) => samePoint(p, newHead))) {
        s.prevSnake = s.snake.map((p) => ({ ...p }));
        s.shake = 8;
        burst(s, head, "#f87171", 18);
        const prevBest = readBest();
        if (s.score > prevBest) {
          writeBest(s.score);
          setBest(s.score);
          setNewRecord(true);
        }
        setStatus("over");
        return;
      }

      s.prevSnake = s.snake.map((p) => ({ ...p }));
      s.snake = [newHead, ...body];

      if (eatsFood) {
        s.score += 1;
        burst(s, newHead, "#f4ecd8", 10);
        s.food = randomCell(s.bonus ? [...s.snake, s.bonus.p] : s.snake);
        s.tickMs = Math.max(MIN_TICK_MS, BASE_TICK_MS - s.score * 3.5);
        if (!s.bonus && s.score % 5 === 0) {
          s.bonus = { p: randomCell([...s.snake, s.food]), expiresAt: now + BONUS_LIFETIME_MS };
        }
      }
      if (eatsBonus) {
        s.score += 3;
        burst(s, newHead, "#facc15", 22);
        s.bonus = null;
      }
      if (grows) setScore(s.score);
      if (s.bonus && now > s.bonus.expiresAt) s.bonus = null;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 100);
      last = now;
      const s = stateRef.current;

      if (statusRef.current === "playing") {
        s.acc += dt;
        while (s.acc >= s.tickMs && statusRef.current === "playing") {
          s.acc -= s.tickMs;
          tick(now);
        }
      }

      for (const p of s.particles) {
        p.x += (p.vx * dt) / 1000;
        p.y += (p.vy * dt) / 1000;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.life -= dt / 600;
      }
      s.particles = s.particles.filter((p) => p.life > 0);
      s.shake = Math.max(0, s.shake - dt / 40);

      const alpha = statusRef.current === "playing" ? Math.min(s.acc / s.tickMs, 1) : 1;
      render(ctx, s, alpha, now, statusRef.current === "over");
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [setStatus]);

  // Teclado
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "p" || e.key === "P") {
        e.preventDefault();
        if (statusRef.current === "idle" || statusRef.current === "over") start();
        else togglePause();
        return;
      }
      const next = KEY_MAP[e.key];
      if (!next) return;
      e.preventDefault();
      steer(next);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [start, steer, togglePause]);

  // Si el usuario se va de la pestaña, pausamos
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && statusRef.current === "playing") setStatus("paused");
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [setStatus]);

  // Reloj y barra de progreso estimada por etapa
  const stageStartRef = useRef({ stage, at: 0 });
  const startedAtRef = useRef(0);
  useEffect(() => {
    if (!startedAtRef.current) startedAtRef.current = performance.now();
    stageStartRef.current = { stage, at: performance.now() };
  }, [stage]);

  useEffect(() => {
    const id = setInterval(() => {
      const now = performance.now();
      if (stage !== "done") setElapsed((now - startedAtRef.current) / 1000);
      const { from, to, tauMs } = STAGE_PROGRESS[stage];
      const t = now - stageStartRef.current.at;
      const target = from + (to - from) * (1 - Math.exp(-t / tauMs));
      setProgress((p) => Math.max(p, target));
    }, 100);
    return () => clearInterval(id);
  }, [stage]);

  // Al terminar: si no está jugando, pasamos solos al resultado; si está en
  // medio de una partida, le dejamos terminarla y que toque el botón.
  const [readyBanner, setReadyBanner] = useState(false);
  useEffect(() => {
    if (stage !== "done") return;
    if (statusRef.current === "playing" || statusRef.current === "paused") {
      setReadyBanner(true);
      return;
    }
    const id = setTimeout(onFinish, 1100);
    return () => clearTimeout(id);
  }, [stage, onFinish]);

  const currentIdx = stageIndex(stage);
  const rowState = (target: GenerationStage): StageRowProps["state"] => {
    const idx = STAGE_ORDER.indexOf(target);
    if (target === "generating" && sawFallback) return "warn";
    if (stage === "done") return "done";
    if (idx < currentIdx) return "done";
    if (idx === currentIdx) return "active";
    return "pending";
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const startPt = touchStartRef.current;
    touchStartRef.current = null;
    if (!startPt) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startPt.x;
    const dy = t.clientY - startPt.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "RIGHT" : "LEFT") : dy > 0 ? "DOWN" : "UP");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Generando la prótesis"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0F0D]/95 backdrop-blur-sm"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #41C086, transparent 70%)" }}
      />

      <div className="relative mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 py-8 lg:flex-row lg:items-start lg:gap-8">
        {/* Progreso */}
        <section className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-white/8 bg-white/3 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#41C086]">
              {stage === "done" ? "Listo" : "Generando"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              {stage === "done" ? "¡Tu prótesis está lista!" : "Estamos creando tu prótesis"}
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <div
                className="relative h-full rounded-full bg-[#41C086] transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                {stage !== "done" && (
                  <div className="absolute inset-0 animate-pulse rounded-full bg-white/25" />
                )}
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-white/35 tabular-nums">
              <span>{Math.round(progress)}%</span>
              <span>{elapsed.toFixed(0)} s</span>
            </div>
          </div>

          <ol className="flex flex-col gap-3">
            <StageRow
              label="Conectando con el servidor"
              hint="Si estaba dormido, puede tardar hasta un minuto"
              state={rowState("waking")}
            />
            <StageRow label="Guardando las medidas" state={rowState("saving")} />
            <StageRow
              label={sawFallback ? "Armando el modelo con tus medidas" : "Modelando la pieza en 3D"}
              hint="Ajustamos el socket a la pata de tu perro"
              state={rowState("generating")}
            />
            <StageRow label="¡Lista para imprimir!" state={rowState("done")} />
          </ol>

          {(stage === "done" || readyBanner) && (
            <button
              type="button"
              onClick={onFinish}
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#41C086] px-6 py-3 text-sm font-semibold text-[#0B0F0D] transition hover:bg-white"
            >
              <Sparkles size={16} />
              Ver mi prótesis
            </button>
          )}
        </section>

        {/* Juego */}
        <section className="flex w-full max-w-sm flex-col items-center gap-3 lg:max-w-none lg:flex-1">
          <div className="flex w-full max-w-90 items-center justify-between text-xs text-white/45">
            <span>
              Huesos: <span className="font-semibold text-white tabular-nums">{score}</span>
            </span>
            <span className="flex items-center gap-1">
              <Trophy size={12} className="text-amber-300" />
              Récord: <span className="font-semibold text-white tabular-nums">{best}</span>
            </span>
            <button
              type="button"
              onClick={togglePause}
              disabled={status !== "playing" && status !== "paused"}
              aria-label={status === "paused" ? "Reanudar" : "Pausar"}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 disabled:opacity-30"
            >
              {status === "paused" ? <Play size={12} /> : <Pause size={12} />}
            </button>
          </div>

          <div
            className="relative aspect-square w-full max-w-90 overflow-hidden rounded-2xl border border-white/10 bg-[#0d130f] shadow-[0_0_60px_-20px_rgba(65,192,134,0.5)]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: "none" }}
          >
            <canvas ref={canvasRef} className="block h-full w-full" />

            {status === "idle" && (
              <Overlay>
                <p className="text-sm font-semibold text-white">Mientras esperás, ¡a buscar huesos!</p>
                <p className="text-xs text-white/50">
                  Cada hueso dorado vale 3. Cuanto más comés, más rápido vas.
                </p>
                <PrimaryButton onClick={start}>
                  <Play size={12} /> Jugar
                </PrimaryButton>
                <p className="hidden text-[11px] text-white/35 sm:block">Flechas / WASD · Espacio pausa</p>
                <p className="text-[11px] text-white/35 sm:hidden">Deslizá el dedo para moverte</p>
              </Overlay>
            )}

            {status === "paused" && (
              <Overlay>
                <p className="text-sm font-semibold text-white">Pausa</p>
                <PrimaryButton onClick={togglePause}>
                  <Play size={12} /> Seguir
                </PrimaryButton>
              </Overlay>
            )}

            {status === "over" && (
              <Overlay>
                {newRecord && (
                  <p className="flex items-center gap-1 text-xs font-semibold text-amber-300">
                    <Trophy size={13} /> ¡Nuevo récord!
                  </p>
                )}
                <p className="text-sm font-semibold text-white">
                  {score === 1 ? "1 hueso" : `${score} huesos`}
                </p>
                <PrimaryButton onClick={start}>
                  <RotateCcw size={12} /> Jugar de nuevo
                </PrimaryButton>
              </Overlay>
            )}
          </div>

          {/* D-pad para celular */}
          <div className="grid grid-cols-3 gap-2 sm:hidden" aria-label="Controles">
            <span />
            <PadButton label="Arriba" onPress={() => steer("UP")}>
              <ArrowUp size={18} />
            </PadButton>
            <span />
            <PadButton label="Izquierda" onPress={() => steer("LEFT")}>
              <ArrowLeft size={18} />
            </PadButton>
            <PadButton label="Abajo" onPress={() => steer("DOWN")}>
              <ArrowDown size={18} />
            </PadButton>
            <PadButton label="Derecha" onPress={() => steer("RIGHT")}>
              <ArrowRight size={18} />
            </PadButton>
          </div>
        </section>
      </div>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0B0F0D]/75 px-6 text-center backdrop-blur-[2px]">
      {children}
    </div>
  );
}

function PrimaryButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full bg-[#41C086] px-5 py-2 text-xs font-semibold text-[#0B0F0D] transition hover:bg-white"
    >
      {children}
    </button>
  );
}

function PadButton({
  label,
  onPress,
  children,
}: {
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 active:bg-[#41C086]/25 active:text-[#41C086]"
    >
      {children}
    </button>
  );
}
