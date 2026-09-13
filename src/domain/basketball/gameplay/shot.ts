import { calcularDerivadaQuadratica } from "../calculus/derivative";
import { quadraticRoots } from "../calculus/roots";
import {
  calcularVertice,
  classificationReason,
  classificarPontoCritico,
  segundaDerivada,
} from "../calculus/vertex";
import { formatDerivative, formatFunction } from "../formatting/formula";
import { GRAVITY, parabolaCoefficients } from "../physics/trajectory";
import { speedFromForce, velocityFromShot } from "../physics/velocity";
import type { GerarTrajetoriaInput, TrajectoryResult } from "../types";
import { validateShotInputs } from "../validation/shot-validation";
import { checkHoop, HIT_RADIUS } from "./hoop";

export const ANGLE_MIN = 15;
export const ANGLE_MAX = 80;
export const FORCE_MIN = 20;
export const FORCE_MAX = 100;

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
