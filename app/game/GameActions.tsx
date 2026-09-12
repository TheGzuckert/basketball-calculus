"use client";

import { Button } from "@/components/ui/button";

type GameActionsProps = {
  flying: boolean;
  onShoot: () => void;
  onReset: () => void;
};

export function GameActions({ flying, onShoot, onReset }: GameActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={onShoot} disabled={flying}>
        Arremessar
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={flying}
      >
        Reposicionar bola
      </Button>
    </div>
  );
}
