"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "cn";

type ProgressButtonProps = {
  value: number;
  min: number;
  max: number;
  disabled?: boolean;
  label: string;
  icon?: ReactNode;
  displayMin?: number;
  displayMax?: number;
  formatValue: (value: number) => string;
  formatMin?: (value: number) => string;
  formatMax?: (value: number) => string;
  onChange: (value: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ProgressButton({
  value,
  min,
  max,
  disabled = false,
  label,
  icon,
  displayMin = min,
  displayMax = max,
  formatValue,
  formatMin,
  formatMax,
  onChange,
}: ProgressButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const range = Math.max(displayMax - displayMin, 1);
  const ratio = clamp((value - displayMin) / range, 0, 1);

  function valueFromClientX(clientX: number): number {
    const track = trackRef.current;
    if (!track) return value;

    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return value;

    const nextRatio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = displayMin + nextRatio * range;
    return Math.round(clamp(raw, min, max));
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
      className={cn(
        "flex h-full flex-col justify-center gap-2 rounded-2xl bg-card px-4 py-3 ring-1 ring-zinc-200/80 select-none",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-1.5 font-medium text-zinc-800">
          {icon ? (
            <span className="text-orange-500 [&_svg]:size-3.5">{icon}</span>
          ) : null}
          {label}
        </span>
        <span className="tabular-nums text-zinc-500">{formatValue(value)}</span>
      </div>

      <div
        className="cursor-pointer py-1.5"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          startDrag(event.clientX, event.pointerId, event.currentTarget);
        }}
        onPointerMove={(event) => moveDrag(event.clientX)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="relative h-1.5 w-full rounded-full bg-zinc-200"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-orange-500"
            style={{ width: `${ratio * 100}%` }}
          />
          <div
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-orange-500 bg-white shadow-sm"
            style={{ left: `${ratio * 100}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-xs text-zinc-400">
        <span>{formatMin ? formatMin(displayMin) : String(displayMin)}</span>
        <span>{formatMax ? formatMax(displayMax) : String(displayMax)}</span>
      </div>
    </div>
  );
}
