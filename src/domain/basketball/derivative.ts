import type { Linear, Quadratic, VariationRate } from "./types";

export function calcularDerivadaQuadratica(q: Quadratic): Linear {
  return {
    slope: 2 * q.a,
    intercept: q.b,
  };
}

export function evaluateDerivative(d: Linear, x: number): number {
  return d.slope * x + d.intercept;
}

export function formatDerivative(d: Linear): string {
  const slope = Number(d.slope.toFixed(6));
  return `f'(x) = ${slope}x ${formatSigned(d.intercept, 4)}`;
}

export function classifyVariation(fPrime: number): VariationRate {
  if (Math.abs(fPrime) < 1e-9) {
    return "maximo";
  }

  return fPrime > 0 ? "subindo" : "descendo";
}

export function variationLabel(rate: VariationRate): string {
  if (rate === "subindo") {
    return "Bola subindo";
  }

  if (rate === "descendo") {
    return "Bola descendo";
  }

  return "Altura máxima";
}

function formatSigned(value: number, digits: number): string {
  const abs = Number(Math.abs(value).toFixed(digits));
  return value >= 0 ? `+ ${abs}` : `- ${abs}`;
}
