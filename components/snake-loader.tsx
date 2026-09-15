"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";

const GRID_SIZE = 16;
const CELL_PX = 18;
const TICK_MS = 130;

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const OPPOSITE: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

function randomCell(exclude: Point[]): Point {
  let cell: Point;
  do {
    cell = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (exclude.some((p) => p.x === cell.x && p.y === cell.y));
  return cell;
}

interface SnakeLoaderProps {
  message?: string;
}

export default function SnakeLoader({ message = "Generando tu prótesis..." }: SnakeLoaderProps) {
  const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 8 }]);
  const [food, setFood] = useState<Point>(() => randomCell([{ x: 8, y: 8 }]));
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const directionRef = useRef(direction);
  const queuedDirectionRef = useRef<Direction | null>(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const reset = useCallback(() => {
    const start = { x: 8, y: 8 };
    setSnake([start]);
    setFood(randomCell([start]));
    setDirection("RIGHT");
    queuedDirectionRef.current = null;
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const map: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
      };
      const next = map[e.key];
      if (!next) return;
      e.preventDefault();

      if (!started) {
        setStarted(true);
        return;
      }
      if (gameOver) return;
      if (next === OPPOSITE[directionRef.current]) return;
      queuedDirectionRef.current = next;
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [started, gameOver]);

  useEffect(() => {
    if (!started || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const dir = queuedDirectionRef.current ?? directionRef.current;
        if (queuedDirectionRef.current) {
          setDirection(queuedDirectionRef.current);
          queuedDirectionRef.current = null;
        }

        const head = prev[0];
        const delta: Record<Direction, Point> = {
          UP: { x: 0, y: -1 },
          DOWN: { x: 0, y: 1 },
          LEFT: { x: -1, y: 0 },
          RIGHT: { x: 1, y: 0 },
        };
        const newHead = { x: head.x + delta[dir].x, y: head.y + delta[dir].y };

        const hitsWall =
          newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE;
        const hitsSelf = prev.some((p) => p.x === newHead.x && p.y === newHead.y);

        if (hitsWall || hitsSelf) {
          setGameOver(true);
          setBest((b) => Math.max(b, prev.length - 1));
          return prev;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const nextSnake = [newHead, ...prev];

        if (ateFood) {
          setScore((s) => s + 1);
          setFood(randomCell(nextSnake));
        } else {
          nextSnake.pop();
        }

        return nextSnake;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [started, gameOver, food]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#0B0F0D]/95 backdrop-blur-sm px-4">
      <div className="flex items-center gap-2 text-white/70">
        <Loader2 size={16} className="animate-spin text-[#41C086]" />
        <p className="text-sm font-medium">{message}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 text-xs text-white/40">
          <span>
            Puntos: <span className="text-white/80 font-semibold">{score}</span>
          </span>
          <span>
            Mejor: <span className="text-white/80 font-semibold">{best}</span>
          </span>
        </div>

        <div
          className="relative rounded-2xl border border-white/10 bg-white/3 p-2"
          style={{ width: GRID_SIZE * CELL_PX + 16, height: GRID_SIZE * CELL_PX + 16 }}
        >
          <div
            className="relative overflow-hidden rounded-lg bg-[#0d130f]"
            style={{
              width: GRID_SIZE * CELL_PX,
              height: GRID_SIZE * CELL_PX,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: `${CELL_PX}px ${CELL_PX}px`,
            }}
          >
            {snake.map((segment, i) => (
              <div
                key={i}
                className="absolute rounded-[3px]"
                style={{
                  left: segment.x * CELL_PX + 1,
                  top: segment.y * CELL_PX + 1,
                  width: CELL_PX - 2,
                  height: CELL_PX - 2,
                  background: i === 0 ? "#41C086" : "rgba(65, 192, 134, 0.55)",
                }}
              />
            ))}

            <div
              className="absolute rounded-full"
              style={{
                left: food.x * CELL_PX + 3,
                top: food.y * CELL_PX + 3,
                width: CELL_PX - 6,
                height: CELL_PX - 6,
                background: "#f97066",
              }}
            />

            {!started && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0B0F0D]/80 text-center px-4">
                <p className="text-xs text-white/70 font-medium">
                  Mientras esperás, jugá una partida
                </p>
                <p className="text-[11px] text-white/40">Presioná una flecha para empezar</p>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0B0F0D]/85 text-center px-4">
                <p className="text-sm text-white/80 font-semibold">Perdiste! Puntos: {score}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1.5 rounded-full bg-[#41C086] px-4 py-1.5 text-xs font-semibold text-[#0B0F0D] hover:bg-white transition"
                >
                  <RotateCcw size={12} />
                  Jugar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-[11px] text-white/30">Usá las flechas o WASD para moverte</p>
      </div>
    </div>
  );
}
