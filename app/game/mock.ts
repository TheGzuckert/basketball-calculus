import {
  formatFunction,
  parabolaCoefficients,
  velocityFromShot,
  type Point,
  type Quadratic,
  type Velocity,
} from "./physics";

export const GRAVITY = 350;
export const MIN_SPEED = 280;
export const MAX_SPEED = 800;
export const HIT_RADIUS = 26;

export const ANGLE_MIN = 15;
export const ANGLE_MAX = 80;
export const FORCE_MIN = 20;
export const FORCE_MAX = 100;

export type ShotEvaluation = {
  message: string;
  scoreDelta: number;
};

export type PreparedShot = {
  velocity: Velocity;
  quadratic: Quadratic | null;
  formula: string;
};

export function speedFromForce(forcePct: number): number {
  return MIN_SPEED + ((MAX_SPEED - MIN_SPEED) * forcePct) / 100;
}

export function prepareShot(
  origin: Point,
  angle: number,
  force: number,
): PreparedShot {
  const velocity = velocityFromShot(speedFromForce(force), angle);
  const quadratic = parabolaCoefficients(origin, velocity, GRAVITY);

  return {
    velocity,
    quadratic,
    formula: formatFunction(quadratic),
  };
}

export function evaluateShot(input: {
  hit: boolean;
  yAtHoop: number | null;
  hoopY: number;
  endX: number;
  hoopX: number;
}): ShotEvaluation {
  if (input.hit) {
    return { message: "Cesta!", scoreDelta: 100 };
  }

  if (input.yAtHoop == null && input.endX < input.hoopX) {
    return { message: "A bola não chegou na cesta.", scoreDelta: 0 };
  }

  if (input.yAtHoop != null && input.yAtHoop > input.hoopY + HIT_RADIUS) {
    return { message: "Você passou acima da cesta.", scoreDelta: 0 };
  }

  return { message: "A bola passou abaixo da cesta.", scoreDelta: 0 };
}
