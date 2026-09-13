import { describe, expect, it } from "vitest";
import {
  calcularDerivadaQuadratica,
  classifyVariation,
  evaluateDerivative,
  formatDerivative,
} from "./derivative";

const sample = { a: -0.003, b: 3.12, c: -369 };

describe("calcularDerivadaQuadratica", () => {
  it("devolve f'(x) = 2ax + b", () => {
    const derivative = calcularDerivadaQuadratica(sample);

    expect(derivative.slope).toBeCloseTo(-0.006, 10);
    expect(derivative.intercept).toBeCloseTo(3.12, 10);
    expect(formatDerivative(derivative)).toBe("f'(x) = -0.006x + 3.12");
  });

  it("é zero no ponto crítico", () => {
    const derivative = calcularDerivadaQuadratica(sample);
    const x = -sample.b / (2 * sample.a);

    expect(evaluateDerivative(derivative, x)).toBeCloseTo(0, 10);
    expect(classifyVariation(0)).toBe("maximo");
    expect(classifyVariation(1)).toBe("subindo");
    expect(classifyVariation(-1)).toBe("descendo");
  });
});
