"use client";

import { ControllableProgress } from "@/components/game/ControllableProgress";
import { Card, CardContent } from "@/components/ui/card";
import { ANGLE_MAX, ANGLE_MIN, FORCE_MAX, FORCE_MIN } from "./mock";

type ShotControlsProps = {
  angle: number;
  force: number;
  disabled: boolean;
  onAngleChange: (value: number) => void;
  onForceChange: (value: number) => void;
};

export function ShotControls({
  angle,
  force,
  disabled,
  onAngleChange,
  onForceChange,
}: ShotControlsProps) {
  return (
    <Card>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <ControllableProgress
          label="Ângulo"
          value={angle}
          min={ANGLE_MIN}
          max={ANGLE_MAX}
          disabled={disabled}
          formatValue={(v) => `${v}°`}
          onChange={onAngleChange}
        />
        <ControllableProgress
          label="Força"
          value={force}
          min={FORCE_MIN}
          max={FORCE_MAX}
          disabled={disabled}
          formatValue={(v) => `${v}%`}
          onChange={onForceChange}
        />
      </CardContent>
    </Card>
  );
}
