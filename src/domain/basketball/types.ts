export type Point = {
  x: number;
  y: number;
};

export type Velocity = {
  vx: number;
  vy: number;
};

export type Quadratic = {
  a: number;
  b: number;
  c: number;
};

/** f'(x) = slope · x + intercept, com slope = 2a e intercept = b. */
export type Linear = {
  slope: number;
  intercept: number;
};

export type CriticalClassification = "maximo" | "minimo";

export type VariationRate = "subindo" | "maximo" | "descendo";

export type HoopCheck = {
  x: number;
  yCalculated: number;
  yHoop: number;
  hit: boolean;
  reached: boolean;
};

export type TrajectoryAnalysis = {
  origin: Point;
  velocity: Velocity;
  quadratic: Quadratic;
  formula: string;
  derivative: Linear;
  derivativeFormula: string;
  secondDerivative: number;
  vertex: Point;
  classification: CriticalClassification;
  classificationReason: string;
  roots: { x1: number; x2: number } | null;
  hoop: HoopCheck;
};

export type TrajectoryResult =
  | { ok: true; analysis: TrajectoryAnalysis }
  | { ok: false; message: string };

export type GerarTrajetoriaInput = {
  angulo: number;
  forca: number;
  origin: Point;
  hoop: Point;
  gravity?: number;
  tolerance?: number;
};
