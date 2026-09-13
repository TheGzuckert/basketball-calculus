"use client";

import { ResetButton, ShootButton } from "@/components/button";

type GameActionsProps = {
  flying: boolean;
  canShoot?: boolean;
  onShoot: () => void;
  onReset: () => void;
};

export function GameActions({ flying, canShoot = true, onShoot, onReset,}: GameActionsProps) {
  return (
    <div className="contents">
      <ShootButton disabled={flying || !canShoot} onClick={onShoot} />
      <ResetButton disabled={flying} onClick={onReset} />
    </div>
  );
}
