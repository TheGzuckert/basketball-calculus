"use client";

import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Quadratic } from "@/app/game/physics";
import {
  formatFunction,
  quadraticRoots,
  quadraticVertex,
} from "@/app/game/physics";
import { Copy, Spline } from "lucide-react";
import Image from "next/image";

type InformationsProps = {
  quadratic: Quadratic | null;
  formula: string | null;
  tip: string;
};

function formatCoord(value: number) {
  return value.toFixed(1);
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  }
}

export function Informations({ quadratic, formula, tip }: InformationsProps) {
  const [copied, setCopied] = useState(false);
  const displayFormula =
    formula ?? (quadratic ? formatFunction(quadratic) : "f(x) = —");
  const vertex = quadratic ? quadraticVertex(quadratic) : null;
  const roots = quadratic ? quadraticRoots(quadratic) : null;

  async function handleCopy() {
    const ok = await copyText(displayFormula);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200/80">
        <div className="mb-3 flex items-center gap-2">
          <Spline className="size-4 text-orange-500" />
          <h2 className="text-sm font-medium text-zinc-900">
            Função da trajetória
          </h2>
        </div>

        <p className="mb-3 text-xs text-zinc-500">
          A trajetória da bola é uma parábola.
        </p>

        <ContextMenu>
          <ContextMenuTrigger className="block">
            <div className="flex items-center justify-between gap-2 rounded-lg bg-zinc-50 px-3 py-2">
              <p className="min-w-0 font-mono text-xs break-all text-zinc-700">
                {displayFormula}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-white hover:text-zinc-800 flex-shrink-0"
                aria-label="Copiar função"
              >
                <Copy className="size-3.5" />
              </button>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={handleCopy}>
              <Copy />
              Copiar função
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {copied ? (
          <p className="mt-2 text-xs text-orange-500">Função copiada.</p>
        ) : null}
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200/80">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-orange-500" />
          <h2 className="text-sm font-medium text-zinc-900">
            Vértice
          </h2>
        </div>

        <p className="text-xs text-zinc-500 mb-2">Ponto máximo da trajetória</p>
        <p className="font-mono text-sm font-semibold text-zinc-800">
          {vertex
            ? `(${formatCoord(vertex.x)}, ${formatCoord(vertex.y)})`
            : "—"}
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200/80">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-medium text-zinc-900">
            Raízes
          </h2>
        </div>

        <p className="text-xs text-zinc-500 mb-2">Interseções com o solo</p>
        <p className="font-mono text-sm font-semibold text-zinc-800">
          {roots
            ? `x₁=${formatCoord(roots.x1)}, x₂=${formatCoord(roots.x2)}`
            : "—"}
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200/80">
        <div className="mb-3 flex items-center gap-2">
          <Image
            src="/assets/info.png"
            alt="Dica"
            width={16}
            height={16}
            className="size-4"
          />
          <h2 className="text-sm font-medium text-zinc-900">
            Dica
          </h2>
        </div>
        <p className="text-xs leading-relaxed text-zinc-600">{tip}</p>
      </div>
    </div>
  );
}
