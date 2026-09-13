"use client";

import Image from "next/image";

type GameHeaderProps = {
  score: number;
};

export function GameHeader({ score }: GameHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3 px-1">
      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Acerte a cesta
        </h1>
        <p className="text-sm text-muted-foreground">
          A trajetória é uma parábola. Ajuste o ângulo e a força para acertar a
          cesta.
        </p>
      </div>

      <div className="flex shrink-0 flex-col justify-center rounded-2xl bg-card px-3 py-2 shadow-sm sm:px-4 sm:py-3">
        <div className="flex items-center gap-1.5">
          <Image
            src="/assets/trofeu.png"
            alt="Troféu"
            width={16}
            height={16}
            className="size-3.5 sm:size-4"
          />
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wide sm:text-xs">
            Pontuação
          </p>
        </div>
        <p className="text-lg font-bold leading-tight text-foreground sm:text-2xl">
          {score}
        </p>
      </div>
    </header>
  );
}
