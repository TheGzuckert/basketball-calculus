"use client";

import type { ReactNode } from "react";
import { ProgressButton } from "@/components/progress-button";
import { Triangle, Zap } from "lucide-react";
import { ANGLE_MAX, ANGLE_MIN, FORCE_MAX, FORCE_MIN } from "./mock";

type ShotControlsProps = {
  angle: number;
  force: number;
  disabled: boolean;
  actions?: ReactNode;
  onAngleChange: (value: number) => void;
  onForceChange: (value: number) => void;
};

export function ShotControls({
  angle,
  force,
  disabled,
  actions,
  onAngleChange,
  onForceChange,
}: ShotControlsProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ProgressButton
          label="Ângulo"
          icon={<Triangle className="fill-current" />}
          value={angle}
          min={ANGLE_MIN}
          max={ANGLE_MAX}
          displayMin={ANGLE_MIN}
          displayMax={ANGLE_MAX}
          disabled={disabled}
          formatValue={(v) => `${v}°`}
          formatMin={() => `${ANGLE_MIN}°`}
          formatMax={() => `${ANGLE_MAX}°`}
          onChange={onAngleChange}
        />
        <ProgressButton
          label="Força"
          icon={<Zap className="fill-current" />}
          value={force}
          min={FORCE_MIN}
          max={FORCE_MAX}
          displayMin={FORCE_MIN}
          displayMax={FORCE_MAX}
          disabled={disabled}
          formatValue={(v) => `${v}%`}
          formatMin={() => `${FORCE_MIN}%`}
          formatMax={() => `${FORCE_MAX}%`}
          onChange={onForceChange}
        />
        {actions}
    </div>
  );
}
