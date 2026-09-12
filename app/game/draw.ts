import type { Point } from "./physics";

export const WIDTH = 800;
export const HEIGHT = 420;
export const GROUND = 48;
export const BALL_RADIUS = 12;
export const TIME_SCALE = 1;

export const PLAYER = { x: 70, bodyW: 28, bodyH: 70, head: 22 };
export const HOOP = { x: 620, y: 180, w: 46, h: 10, postW: 8, backboardH: 70 };

export function toCanvasY(gameY: number): number {
  return HEIGHT - GROUND - gameY;
}

export function ballOrigin(): Point {
  return {
    x: PLAYER.x + PLAYER.bodyW + 8,
    y: PLAYER.bodyH + 8,
  };
}

export function hoopCenter(): Point {
  return { x: HOOP.x + HOOP.w / 2, y: HOOP.y };
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  ball: Point,
  trail: Point[],
) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(0, 0, WIDTH, HEIGHT - GROUND);
  ctx.fillStyle = "#c4a574";
  ctx.fillRect(0, HEIGHT - GROUND, WIDTH, GROUND);
  ctx.fillStyle = "#8b6914";
  ctx.fillRect(0, HEIGHT - GROUND, WIDTH, 4);

  const playerBottom = HEIGHT - GROUND;
  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect(
    PLAYER.x,
    playerBottom - PLAYER.bodyH,
    PLAYER.bodyW,
    PLAYER.bodyH,
  );
  ctx.fillStyle = "#f1c27d";
  ctx.fillRect(
    PLAYER.x + (PLAYER.bodyW - PLAYER.head) / 2,
    playerBottom - PLAYER.bodyH - PLAYER.head,
    PLAYER.head,
    PLAYER.head,
  );

  const hoopCanvasY = toCanvasY(HOOP.y);
  ctx.fillStyle = "#6b7280";
  ctx.fillRect(
    HOOP.x + HOOP.w,
    hoopCanvasY,
    HOOP.postW,
    playerBottom - hoopCanvasY,
  );
  ctx.fillStyle = "#e5e7eb";
  ctx.fillRect(
    HOOP.x + HOOP.w,
    hoopCanvasY - HOOP.backboardH + HOOP.h,
    6,
    HOOP.backboardH,
  );
  ctx.fillStyle = "#ea580c";
  ctx.fillRect(HOOP.x, hoopCanvasY, HOOP.w, HOOP.h);

  if (trail.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(15, 23, 42, 0.55)";
    ctx.lineWidth = 2;
    ctx.moveTo(trail[0].x, toCanvasY(trail[0].y));
    for (let i = 1; i < trail.length; i++) {
      ctx.lineTo(trail[i].x, toCanvasY(trail[i].y));
    }
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = "#f97316";
  ctx.arc(ball.x, toCanvasY(ball.y), BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#9a3412";
  ctx.lineWidth = 2;
  ctx.stroke();
}
