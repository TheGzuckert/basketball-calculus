"use client";

import { useEffect, useRef, useState } from "react";
import {
  BALL_RADIUS,
  HEIGHT,
  TIME_SCALE,
  WIDTH,
  ballOrigin,
  drawScene,
  hoopCenter,
} from "./draw";
import { GameActions } from "./GameActions";
import { evaluateShot, GRAVITY, HIT_RADIUS, prepareShot } from "./mock";
import { positionAtTime, type Point } from "./physics";
import { ShotControls } from "./ShotControls";

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const origin = ballOrigin();

  const [angle, setAngle] = useState(40);
  const [force, setForce] = useState(42);
  const [flying, setFlying] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Escolha o ângulo e a força.");
  const [formula, setFormula] = useState<string | null>(null);

  const ballRef = useRef<Point>({ ...origin });
  const trailRef = useRef<Point[]>([]);
  const rafRef = useRef(0);
  const flyingRef = useRef(false);

  function setIsFlying(next: boolean) {
    flyingRef.current = next;
    setFlying(next);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawScene(ctx, ballRef.current, trailRef.current);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function finishShot(
    hit: boolean,
    yAtHoop: number | null,
    hoopY: number,
    endX: number,
    hoopX: number,
  ) {
    cancelAnimationFrame(rafRef.current);
    setIsFlying(false);

    const result = evaluateShot({ hit, yAtHoop, hoopY, endX, hoopX });
    setMessage(result.message);
    if (result.scoreDelta) {
      setScore((s) => s + result.scoreDelta);
    }
  }

  function shoot() {
    if (flyingRef.current) return;

    const shot = prepareShot(origin, angle, force);
    const shotOrigin = { ...origin };
    const hoop = hoopCenter();

    ballRef.current = { ...shotOrigin };
    trailRef.current = [{ ...shotOrigin }];
    setIsFlying(true);
    setMessage("A bola está no ar...");
    setFormula(shot.formula);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      drawScene(ctx, ballRef.current, trailRef.current);
    }

    let t = 0;
    let last = 0;
    let crossedHoop = false;
    let yAtHoop: number | null = null;

    const tick = (now: number) => {
      const drawCtx = canvasRef.current?.getContext("2d");
      if (!drawCtx) return;

      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.032) * TIME_SCALE;
      last = now;
      t += dt;

      const pos = positionAtTime(shotOrigin, shot.velocity, GRAVITY, t);
      ballRef.current = pos;
      trailRef.current.push(pos);

      const dist = Math.hypot(pos.x - hoop.x, pos.y - hoop.y);

      if (!crossedHoop && pos.x >= hoop.x) {
        crossedHoop = true;
        yAtHoop = pos.y;
      }

      const hit = dist <= HIT_RADIUS;
      const onGround = pos.y <= BALL_RADIUS;
      const offScreen = pos.x > WIDTH + 40 || pos.y > HEIGHT;

      drawScene(drawCtx, pos, trailRef.current);

      if (hit || onGround || offScreen) {
        finishShot(hit, yAtHoop, hoop.y, pos.x, hoop.x);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }

  function resetBall() {
    if (flyingRef.current) return;
    ballRef.current = { ...origin };
    trailRef.current = [];
    setMessage("Escolha o ângulo e a força.");
    setFormula(null);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      drawScene(ctx, ballRef.current, trailRef.current);
    }
  }

  return (
    <main className="flex w-full max-w-4xl flex-col gap-4">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Basketball Calculus
          </h1>
          <p className="text-sm text-zinc-600">
            Acerte a cesta. A trajetória é uma parábola.
          </p>
        </div>
        <p className="text-lg font-medium text-zinc-900">Pontuação: {score}</p>
      </header>

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="w-full rounded border border-zinc-300 bg-sky-200"
      />

      <ShotControls
        angle={angle}
        force={force}
        disabled={flying}
        onAngleChange={setAngle}
        onForceChange={setForce}
      />

      <GameActions flying={flying} onShoot={shoot} onReset={resetBall} />

      <p className="text-base font-medium text-zinc-900">{message}</p>
      {formula ? (
        <p className="font-mono text-sm text-zinc-700">{formula}</p>
      ) : null}
    </main>
  );
}
