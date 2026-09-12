export type Velocity = {
  vx: number;
  vy: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Quadratic = {
  a: number;
  b: number;
  c: number;
};

export function velocityFromShot(speed: number, angleDeg: number): Velocity {
  const theta = (angleDeg * Math.PI) / 180;
  return {
    vx: speed * Math.cos(theta),
    vy: speed * Math.sin(theta),
  };
}

export function positionAtTime(
  origin: Point,
  velocity: Velocity,
  gravity: number,
  t: number,
): Point {
  return {
    x: origin.x + velocity.vx * t,
    y: origin.y + velocity.vy * t - (gravity * t * t) / 2,
  };
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

  return { a, b, c };
}

export function formatFunction(q: Quadratic | null): string {
  if (!q) {
    return "Trajetória vertical (sem f(x) único)";
  }

  const a = q.a.toFixed(3);
  const b = formatSigned(q.b, 2);
  const c = formatSigned(q.c, 1);

  return `f(x) = ${a}x² ${b}x ${c}`;
}

function formatSigned(value: number, digits: number): string {
  const abs = Math.abs(value).toFixed(digits);
  return value >= 0 ? `+ ${abs}` : `- ${abs}`;
}
