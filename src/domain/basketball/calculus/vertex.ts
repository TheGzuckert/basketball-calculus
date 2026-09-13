import type { CriticalClassification, Point, Quadratic } from "../types";

export function calcularVertice(q: Quadratic): Point {
  if (Math.abs(q.a) < 1e-9) {
    throw new Error("A função não é quadrática.");
  }

  const x = -q.b / (2 * q.a);
  const y = q.a * x ** 2 + q.b * x + q.c;

  return { x, y };
}

export function segundaDerivada(q: Quadratic): number {
  return 2 * q.a;
}

export function classificarPontoCritico(q: Quadratic): CriticalClassification {
  return q.a < 0 ? "maximo" : "minimo";
}

export function classificationLabel(kind: CriticalClassification): string {
  return kind === "maximo" ? "Máximo" : "Mínimo";
}

export function classificationReason(q: Quadratic): string {
  const f2 = segundaDerivada(q);
  if (q.a < 0) {
    return `f''(x) = ${formatPlain(f2)} < 0, porque a < 0. O ponto crítico é um máximo.`;
  }

  return `f''(x) = ${formatPlain(f2)} > 0, porque a > 0. O ponto crítico é um mínimo.`;
}

function formatPlain(value: number): string {
  return String(Number(value.toFixed(6)));
}
