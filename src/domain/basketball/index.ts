export {
  calcularDerivadaQuadratica,
  classifyVariation,
  evaluateDerivative,
  variationLabel,
} from "./calculus/derivative";
export { quadraticRoots } from "./calculus/roots";
export {
  calcularVertice,
  classificationLabel,
  classificationReason,
  classificarPontoCritico,
  segundaDerivada,
} from "./calculus/vertex";
export { formatDerivative, formatFunction, formatSigned } from "./formatting/formula";
export { checkHoop, HIT_RADIUS } from "./gameplay/hoop";
export {
  ANGLE_MAX,
  ANGLE_MIN,
  FORCE_MAX,
  FORCE_MIN,
  gerarTrajetoria,
} from "./gameplay/shot";
export { evaluateQuadratic, GRAVITY, parabolaCoefficients } from "./physics/trajectory";
export {
  MAX_SPEED,
  MIN_SPEED,
  speedFromForce,
  velocityFromShot,
} from "./physics/velocity";
export type {
  CriticalClassification,
  GerarTrajetoriaInput,
  HoopCheck,
  Linear,
  Point,
  Quadratic,
  TrajectoryAnalysis,
  TrajectoryResult,
  VariationRate,
  Velocity,
} from "./types";
export {
  ANGLE_VALID_MAX,
  ANGLE_VALID_MIN,
  FORCE_VALID_MAX,
  FORCE_VALID_MIN,
  validateShotInputs,
} from "./validation/shot-validation";
