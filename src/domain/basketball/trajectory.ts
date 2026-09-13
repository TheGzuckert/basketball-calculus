import { calcularDerivadaQuadratica, formatDerivative } from "./derivative";
import type {
  GerarTrajetoriaInput,
  HoopCheck,
  Point,
  Quadratic,
  TrajectoryResult,
  Velocity,
} from "./types";
import {
  calcularVertice,
  classificationReason,
  classificarPontoCritico,
  segundaDerivada,
} from "./vertex";

export const GRAVITY = 350;
export const MIN_SPEED = 280;
export const MAX_SPEED = 800;
export const HIT_RADIUS = 26;

export const ANGLE_MIN = 15;
export const ANGLE_MAX = 80;
export const FORCE_MIN = 20;
export const FORCE_MAX = 100;

export const ANGLE_VALID_MIN = 0;
export const ANGLE_VALID_MAX = 90;
export const FORCE_VALID_MIN = 0;
export const FORCE_VALID_MAX = 100;

export function velocityFromShot(speed: number, angleDeg: number): Velocity {
  const theta = (angleDeg * Math.PI) / 180;
  return {
    vx: speed * Math.cos(theta),
    vy: speed * Math.sin(theta),
  };
}

export function speedFromForce(forcePct: number): number {
  return MIN_SPEED + ((MAX_SPEED - MIN_SPEED) * forcePct) / 100;
}

export function validateShotInputs(angulo: number, forca: number): string | null {
  if (angulo < ANGLE_VALID_MIN || angulo > ANGLE_VALID_MAX) {
    return "O ângulo deve estar entre 0° e 90°.";
  }

  if (forca < FORCE_VALID_MIN || forca > FORCE_VALID_MAX) {
    return "A força deve estar entre 0% e 100%.";
  }

  return null;
}

/** Coeficientes de y(x) = ax² + bx + c no eixo do jogo (Y para cima). */
export function parabolaCoefficients(
  origin: Point,
  velocity: Velocity,
  gravity: number,
): Quadratic | null {
  if (Math.abs(velocity.vx) < 1e-6) {
    return null;
  }

  const a = -gravity / (2 * velocity.vx * velocity.vx);
  const b = velocity.vy / velocity.vx - 2 * a * origin.x;
  const c = origin.y - a * origin.x * origin.x - b * origin.x;

  if (Math.abs(a) < 1e-9) {
    return null;
  }

  return { a, b, c };
}

export function evaluateQuadratic(q: Quadratic, x: number): number {
  return q.a * x * x + q.b * x + q.c;
}

export function quadraticRoots(q: Quadratic): { x1: number; x2: number } | null {
  if (Math.abs(q.a) < 1e-9) {
    return null;
  }

  const discriminant = q.b * q.b - 4 * q.a * q.c;
  if (discriminant < 0) {
    return null;
  }

  const sqrt = Math.sqrt(discriminant);
  const x1 = (-q.b - sqrt) / (2 * q.a);
  const x2 = (-q.b + sqrt) / (2 * q.a);

  return {
    x1: Math.min(x1, x2),
    x2: Math.max(x1, x2),
  };
}

export function formatFunction(q: Quadratic): string {
  const a = Number(q.a.toFixed(6));
  return `f(x) = ${a}x² ${formatSigned(q.b, 4)}x ${formatSigned(q.c, 2)}`;
}

export function checkHoop(
  q: Quadratic,
  hoop: Point,
  origin: Point,
  tolerance: number,
): HoopCheck {
  const yCalculated = evaluateQuadratic(q, hoop.x);
  const roots = quadraticRoots(q);
  const landingX = roots?.x2 ?? Number.POSITIVE_INFINITY;
  const reached = origin.x < hoop.x && hoop.x <= landingX;
  const hit = reached && Math.abs(yCalculated - hoop.y) <= tolerance;

  return {
    x: hoop.x,
    yCalculated,
    yHoop: hoop.y,
    hit,
    reached,
  };
}

export function gerarTrajetoria(input: GerarTrajetoriaInput): TrajectoryResult {
  const invalid = validateShotInputs(input.angulo, input.forca);
  if (invalid) {
    return { ok: false, message: invalid };
  }

  const gravity = input.gravity ?? GRAVITY;
  const tolerance = input.tolerance ?? HIT_RADIUS;
  const velocity = velocityFromShot(speedFromForce(input.forca), input.angulo);
  const quadratic = parabolaCoefficients(input.origin, velocity, gravity);

  if (!quadratic) {
    return {
      ok: false,
      message: "Não foi possível gerar uma trajetória quadrática válida.",
    };
  }

  const derivative = calcularDerivadaQuadratica(quadratic);
  const vertex = calcularVertice(quadratic);
  const classification = classificarPontoCritico(quadratic);

  return {
    ok: true,
    analysis: {
      origin: input.origin,
      velocity,
      quadratic,
      formula: formatFunction(quadratic),
      derivative,
      derivativeFormula: formatDerivative(derivative),
      secondDerivative: segundaDerivada(quadratic),
      vertex,
      classification,
      classificationReason: classificationReason(quadratic),
      roots: quadraticRoots(quadratic),
      hoop: checkHoop(quadratic, input.hoop, input.origin, tolerance),
    },
  };
}

function formatSigned(value: number, digits: number): string {
  const abs = Number(Math.abs(value).toFixed(digits));
  return value >= 0 ? `+ ${abs}` : `- ${abs}`;
}
