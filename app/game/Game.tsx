"use client";

import { useEffect, useRef, useState } from "react";
import { ChallengeComplete } from "@/components/challenge-complete";
import { GameHeader } from "@/components/game-header";
import { Informations } from "@/components/informations";
import { BALL_RADIUS, HEIGHT, TIME_SCALE, WIDTH, ballOrigin, drawScene, hoopCenter, loadBackgroundImage, loadBallImage, loadPlayerImage } from "./draw";
import { GameActions } from "./GameActions";
import { gerarTrajetoria, type TrajectoryAnalysis } from "@/src/domain/basketball";
import { evaluateShot, GRAVITY } from "./mock";
import { positionAtTime, type Point } from "./physics";
import { ShotControls } from "./ShotControls";

const DEFAULT_TIP = "Ajuste o ângulo e a força para a bola passar pela cesta. A trajetória segue uma função quadrática.";
const REPEAT_TIP = "Mude o ângulo ou a força para avançar. Não vale repetir a jogada anterior.";
const FREE_MODE_TIP = "Modo livre: arremesse como quiser.";
const MAX_ATTEMPTS = 5;
const SCORE_GOAL = 300;

type LastShot = {
  angle: number;
  force: number;
};

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const origin = ballOrigin();
  const [angle, setAngle] = useState(40);
  const [force, setForce] = useState(42);
  const [flying, setFlying] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hits, setHits] = useState(0);
  const [message, setMessage] = useState(DEFAULT_TIP);
  const [shotInfo, setShotInfo] = useState<TrajectoryAnalysis | null>(null);
  const [lastShot, setLastShot] = useState<LastShot | null>(null);
  const [freeMode, setFreeMode] = useState(false);

  const ballRef = useRef<Point>({ ...origin });
  const trailRef = useRef<Point[]>([]);
  const rafRef = useRef(0);
  const flyingRef = useRef(false);

  function setIsFlying(next: boolean) {
    flyingRef.current = next;
    setFlying(next);
  }

  function paint() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    drawScene(ctx, ballRef.current, trailRef.current);
  }

  useEffect(() => {
    paint();
    let cancelled = false;

    Promise.all([
      loadBackgroundImage(),
      loadBallImage(),
      loadPlayerImage(),
    ]).then(() => {
      if (!cancelled) paint();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function finishShot(analysis: TrajectoryAnalysis) {
    cancelAnimationFrame(rafRef.current);
    setIsFlying(false);

    const result = evaluateShot(analysis.hoop);

    if (freeMode) {
      if (result.scoreDelta) {
        setScore((s) => s + result.scoreDelta);
      }
      setMessage(result.message);
      return;
    }

    setAttempts((current) => Math.min(current + 1, MAX_ATTEMPTS));
    if (analysis.hoop.hit) {
      setHits((current) => current + 1);
    }

    if (result.scoreDelta) {
      setScore((s) => s + result.scoreDelta);
    }

    setMessage(result.message);
  }

  const isRepeatShot =
    !freeMode &&
    lastShot !== null &&
    lastShot.angle === angle &&
    lastShot.force === force;
  const challengeWon = !freeMode && score >= SCORE_GOAL;
  const challengeFailed = !freeMode && attempts >= MAX_ATTEMPTS && score < SCORE_GOAL;
  const canShoot = !challengeWon && !challengeFailed && !isRepeatShot;
  const tip = isRepeatShot ? REPEAT_TIP : message;

  function shoot() {
    if (flyingRef.current || !canShoot) return;
    if (!freeMode) {
      setLastShot({ angle, force });
    }

    const hoop = hoopCenter();
    const generated = gerarTrajetoria({
      angulo: angle,
      forca: force,
      origin,
      hoop,
    });

    if (!generated.ok) {
      setMessage(generated.message);
      setShotInfo(null);
      return;
    }

    const analysis = generated.analysis;
    const shotOrigin = { ...origin };

    ballRef.current = { ...shotOrigin };
    trailRef.current = [{ ...shotOrigin }];
    setIsFlying(true);
    setMessage("A bola está no ar...");
    setShotInfo(analysis);
    paint();

    const canvas = canvasRef.current;
    let t = 0;
    let last = 0;

    const tick = (now: number) => {
      const drawCtx = canvas?.getContext("2d") ?? canvasRef.current?.getContext("2d");
      if (!drawCtx) return;

      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.032) * TIME_SCALE;
      last = now;
      t += dt;

      const pos = positionAtTime(shotOrigin, analysis.velocity, GRAVITY, t);
      ballRef.current = pos;
      trailRef.current.push(pos);

      const reachedHoopX = pos.x >= hoop.x;
      const onGround = pos.y <= BALL_RADIUS;
      const offScreen = pos.x > WIDTH + 40 || pos.y > HEIGHT;

      drawScene(drawCtx, pos, trailRef.current);

      if ((analysis.hoop.hit && reachedHoopX) || onGround || offScreen) {
        finishShot(analysis);
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
    setMessage(DEFAULT_TIP);
    setShotInfo(null);
    paint();
  }

  function restartGame() {
    cancelAnimationFrame(rafRef.current);
    setIsFlying(false);
    setAttempts(0);
    setHits(0);
    setScore(0);
    setLastShot(null);
    setFreeMode(false);
    resetBall();
  }

  function enterFreeMode() {
    setFreeMode(true);
    setLastShot(null);
    setMessage(FREE_MODE_TIP);
  }

  return (
    <main className="flex w-full max-w-6xl flex-col gap-3">
      <GameHeader score={score} />

      <ChallengeComplete
        open={challengeWon || challengeFailed}
        variant={challengeWon ? "win" : "retry"}
        onFreeMode={enterFreeMode}
        onRestart={restartGame}
      />

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="h-auto w-full max-h-[48vh] rounded-2xl bg-sky-100 object-contain"
      />

      <ShotControls
        angle={angle}
        force={force}
        disabled={flying}
        onAngleChange={setAngle}
        onForceChange={setForce}
        actions={
          <GameActions
            flying={flying}
            canShoot={canShoot}
            onShoot={shoot}
            onReset={resetBall}
          />
        }
      />

      <Informations analysis={shotInfo} tip={tip} />
    </main>
  );
}
