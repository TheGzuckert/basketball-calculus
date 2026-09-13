import { describe, expect, it } from "vitest";
import { calcularVertice, classificarPontoCritico, segundaDerivada } from "./vertex";

const sample: { a: number; b: number; c: number } = {
  a: -0.003,
  b: 3.12,
  c: -369,
};

describe("calcularVertice", () => {
  it("encontra o ponto crítico por x = -b / (2a)", () => {
    const vertex = calcularVertice(sample);

    expect(vertex.x).toBeCloseTo(520, 10);
    expect(vertex.y).toBeCloseTo(442.2, 10);
  });

  it("rejeita função não quadrática", () => {
    expect(() => calcularVertice({ a: 0, b: 2, c: 1 })).toThrow(
      "A função não é quadrática.",
    );
  });
});

describe("classificarPontoCritico", () => {
  it("classifica máximo quando a < 0", () => {
    expect(classificarPontoCritico(sample)).toBe("maximo");
    expect(segundaDerivada(sample)).toBeCloseTo(-0.006, 10);
  });

  it("classifica mínimo quando a > 0", () => {
    expect(classificarPontoCritico({ a: 0.003, b: 3.12, c: -369 })).toBe(
      "minimo",
    );
  });
});
