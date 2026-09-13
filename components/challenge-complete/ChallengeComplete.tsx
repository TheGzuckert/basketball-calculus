"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ChallengeCompleteProps = {
  open: boolean;
  variant: "win" | "retry";
  onFreeMode: () => void;
  onRestart: () => void;
};

export function ChallengeComplete({
  open,
  variant,
  onFreeMode,
  onRestart,
}: ChallengeCompleteProps) {
  const isWin = variant === "win";

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {isWin ? "PARABÉNS" : "Tentar Novamente?"}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            {isWin ? (
              <>
                <span>Você concluiu o desafio das funções</span>
                <span>Deseja entrar no modo livre?</span>
              </>
            ) : (
              <span>
                Você não alcançou 300 pontos em 5 tentativas.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isWin ? (
            <>
              <Button type="button" variant="outline" onClick={onRestart}>
                Não
              </Button>
              <Button type="button" onClick={onFreeMode}>
                Sim
              </Button>
            </>
          ) : (
            <Button type="button" onClick={onRestart}>
              Tentar novamente
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
