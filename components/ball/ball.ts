"use client";

export const BALL_SRC = "/assets/ball.png";

let ballImage: HTMLImageElement | null = null;
let ballPromise: Promise<HTMLImageElement | null> | null = null;

export function loadBallImage(): Promise<HTMLImageElement | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (ballImage?.complete && ballImage.naturalWidth > 0) {
    return Promise.resolve(ballImage);
  }

  if (ballPromise) {
    return ballPromise;
  }

  ballPromise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      ballImage = image;
      resolve(image);
    };
    image.onerror = () => resolve(null);
    image.src = BALL_SRC;
  });

  return ballPromise;
}

export function getBallImage(): HTMLImageElement | null {
  return ballImage;
}
