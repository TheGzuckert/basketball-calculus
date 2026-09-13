export const ANGLE_VALID_MIN = 0;
export const ANGLE_VALID_MAX = 90;
export const FORCE_VALID_MIN = 0;
export const FORCE_VALID_MAX = 100;

export function validateShotInputs(angulo: number, forca: number): string | null {
  if (!Number.isFinite(angulo) || angulo < ANGLE_VALID_MIN || angulo > ANGLE_VALID_MAX) {
    return "O ângulo deve estar entre 0° e 90°.";
  }

  if (!Number.isFinite(forca) || forca < FORCE_VALID_MIN || forca > FORCE_VALID_MAX) {
    return "A força deve estar entre 0% e 100%.";
  }

  return null;
}
