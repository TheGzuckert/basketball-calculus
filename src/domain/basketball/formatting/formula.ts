import type { Linear, Quadratic } from "../types";

export function formatFunction(q: Quadratic): string {
  const a = Number(q.a.toFixed(6));
  return `f(x) = ${a}x² ${formatSigned(q.b, 4)}x ${formatSigned(q.c, 2)}`;
}

export function formatDerivative(d: Linear): string {
  const slope = Number(d.slope.toFixed(6));
  return `f'(x) = ${slope}x ${formatSigned(d.intercept, 4)}`;
}

export function formatSigned(value: number, digits: number): string {
  const abs = Number(Math.abs(value).toFixed(digits));
  return value >= 0 ? `+ ${abs}` : `- ${abs}`;
}
