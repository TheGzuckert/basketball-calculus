"use client";

import { useRef } from "react";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

type ControllableProgressProps = {
  value: number;
  min: number;
  max: number;
  disabled?: boolean;
  label: string;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
};

export function ControllableProgress({
  value,
  min,
  max,
  disabled = false,
  label,
  formatValue,
  onChange,
}: ControllableProgressProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function valueFromClientX(clientX: number): number {
    const track = rootRef.current?.querySelector<HTMLElement>(
      "[data-slot=progress-track]",
    );
    if (!track) return value;

    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return value;

    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(min + ratio * (max - min));
  }

  function startDrag(clientX: number, pointerId: number, target: HTMLElement) {
    if (disabled) return;
    draggingRef.current = true;
    target.setPointerCapture(pointerId);
    onChange(valueFromClientX(clientX));
  }

  function moveDrag(clientX: number) {
    if (!draggingRef.current || disabled) return;
    onChange(valueFromClientX(clientX));
  }

  function endDrag() {
    draggingRef.current = false;
  }

  return (
    <div
      ref={rootRef}
      className={disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        startDrag(event.clientX, event.pointerId, event.currentTarget);
      }}
      onPointerMove={(event) => moveDrag(event.clientX)}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <Progress
        value={value}
        min={min}
        max={max}
        className="w-full [&_[data-slot=progress-track]]:h-2"
      >
        <ProgressLabel>{label}</ProgressLabel>
        <ProgressValue>{() => formatValue(value)}</ProgressValue>
      </Progress>
    </div>
  );
}
