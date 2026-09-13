import type { Point } from "../physics";
import { loadBallImage, getBallImage } from "@/components/ball";

export const WIDTH = 800;
export const HEIGHT = 420;
export const GROUND = 48;
export const BALL_RADIUS = 12;
export const TIME_SCALE = 1;
export const BACKGROUND_SRC = "/assets/basket_game_background_.png";

export const PLAYER_SRC = "/assets/player.png";
export const PLAYER = {
  x: 108,
  w: 88,
  h: 132,
  bodyW: 28,
  bodyH: 70,
  head: 22,
  handX: 0.716,
  handY: 0.197,
};
export const HOOP = { x: 645, y: 250, w: 40, h: 10 };

let backgroundImage: HTMLImageElement | null = null;
let backgroundPromise: Promise<HTMLImageElement | null> | null = null;
let playerImage: HTMLImageElement | null = null;
let playerPromise: Promise<HTMLImageElement | null> | null = null;

export function toCanvasY(gameY: number): number {
  return HEIGHT - GROUND - gameY;
}

export function ballOrigin(): Point {
  return {
    x: PLAYER.x + PLAYER.w * PLAYER.handX + 6,
    y: PLAYER.h * (1 - PLAYER.handY) + 2,
  };
}

export function hoopCenter(): Point {
  return { x: HOOP.x + HOOP.w / 2, y: HOOP.y };
}

export function loadBackgroundImage(): Promise<HTMLImageElement | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (backgroundImage?.complete && backgroundImage.naturalWidth > 0) {
    return Promise.resolve(backgroundImage);
  }

  if (backgroundPromise) {
    return backgroundPromise;
  }

  backgroundPromise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      backgroundImage = image;
      resolve(image);
    };
    image.onerror = () => resolve(null);
    image.src = BACKGROUND_SRC;
  });

  return backgroundPromise;
}

export function loadPlayerImage(): Promise<HTMLImageElement | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (playerImage?.complete && playerImage.naturalWidth > 0) {
    return Promise.resolve(playerImage);
  }

  if (playerPromise) {
    return playerPromise;
  }

  playerPromise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      playerImage = image;
      resolve(image);
    };
    image.onerror = () => resolve(null);
    image.src = PLAYER_SRC;
  });

  return playerPromise;
}

function drawCoverBackground( ctx: CanvasRenderingContext2D, image: HTMLImageElement ) {
  const scale = Math.max(WIDTH / image.width, HEIGHT / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = (WIDTH - drawWidth) / 2;
  const offsetY = (HEIGHT - drawHeight) / 2;
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function drawPlayer(ctx: CanvasRenderingContext2D) {
  const playerBottom = HEIGHT - GROUND;
  const playerTop = playerBottom - PLAYER.h;

  if (playerImage?.complete && playerImage.naturalWidth > 0) {
    ctx.drawImage(playerImage, PLAYER.x, playerTop, PLAYER.w, PLAYER.h);
    return;
  }

  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect( PLAYER.x, playerBottom - PLAYER.bodyH, PLAYER.bodyW, PLAYER.bodyH );
  ctx.fillStyle = "#f1c27d";
  ctx.fillRect( PLAYER.x + (PLAYER.bodyW - PLAYER.head) / 2, playerBottom - PLAYER.bodyH - PLAYER.head, PLAYER.head, PLAYER.head );
}

function drawTrail(ctx: CanvasRenderingContext2D, trail: Point[]) {
  if (trail.length < 2) return;

  ctx.beginPath();
  ctx.strokeStyle = "rgba(15, 23, 42, 0.55)";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 8]);
  ctx.moveTo(trail[0].x, toCanvasY(trail[0].y));
  for (let i = 1; i < trail.length; i++) {
    ctx.lineTo(trail[i].x, toCanvasY(trail[i].y));
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawBall(ctx: CanvasRenderingContext2D, ball: Point) {
  const ballImg = getBallImage();
  
  if (ballImg && ballImg.complete && ballImg.naturalWidth > 0) {
    const size = BALL_RADIUS * 2;
    ctx.drawImage(
      ballImg,
      ball.x - BALL_RADIUS,
      toCanvasY(ball.y) - BALL_RADIUS,
      size,
      size
    );
  } else {
    ctx.beginPath();
    ctx.fillStyle = "#f97316";
    ctx.arc(ball.x, toCanvasY(ball.y), BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#9a3412";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  ball: Point,
  trail: Point[],
  background: HTMLImageElement | null = backgroundImage,
) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  if (background && background.complete && background.naturalWidth > 0) {
    drawCoverBackground(ctx, background);
  } else {
    ctx.fillStyle = "#dbeafe";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  drawPlayer(ctx);
  drawTrail(ctx, trail);
  drawBall(ctx, ball);
}

export { loadBallImage };
