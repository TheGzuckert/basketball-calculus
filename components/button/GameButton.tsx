"use client";

import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

type GameButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export function ShootButton({ disabled, onClick }: GameButtonProps) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="h-full min-h-16 w-full rounded-2xl !bg-orange-500 px-5 text-base !text-white hover:!bg-orange-500/90"
    >
      <Play data-icon="inline-start" className="fill-current" />
      Arremessar
    </Button>
  );
}

export function ResetButton({ disabled, onClick }: GameButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="h-full min-h-16 w-full rounded-2xl bg-white px-5 text-base"
    >
      <RotateCcw data-icon="inline-start" />
      Reposicionar
    </Button>
  );
}
