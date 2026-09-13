import {
  ANGLE_MAX,
  ANGLE_MIN,
  FORCE_MAX,
  FORCE_MIN,
  GRAVITY,
  HIT_RADIUS,
  type HoopCheck,
} from "@/domain/basketball";

export {
  ANGLE_MAX,
  ANGLE_MIN,
  FORCE_MAX,
  FORCE_MIN,
  GRAVITY,
  HIT_RADIUS,
};

export type ShotEvaluation = {
  message: string;
  scoreDelta: number;
};

export function evaluateShot(hoop: HoopCheck): ShotEvaluation {
  if (hoop.hit) {
    return { message: "Cesta!", scoreDelta: 100 };
  }

  if (!hoop.reached) {
    return { message: "A bola não chegou na cesta.", scoreDelta: 0 };
  }

  if (hoop.yCalculated > hoop.yHoop) {
    return { message: "Você passou acima da cesta.", scoreDelta: 0 };
  }

  return { message: "A bola passou abaixo da cesta.", scoreDelta: 0 };
}
