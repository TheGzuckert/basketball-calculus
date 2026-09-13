"use client";

import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  classificationLabel,
  classifyVariation,
  evaluateDerivative,
  type TrajectoryAnalysis,
} from "@/src/domain/basketball";
import { Copy, Spline } from "lucide-react";
import Image from "next/image";

type InformationsProps = {
  analysis: TrajectoryAnalysis | null;
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

export function Informations({ analysis, tip }: InformationsProps) {
  const [copied, setCopied] = useState(false);
  const displayFormula = analysis?.formula ?? "f(x) = —";
  const vertex = analysis?.vertex ?? null;
  const roots = analysis?.roots ?? null;
  const fPrimeAtStart = analysis
    ? evaluateDerivative(analysis.derivative, analysis.origin.x)
    : null;
  const variation =
    fPrimeAtStart == null ? null : classifyVariation(fPrimeAtStart);

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
          <span className="size-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-medium text-zinc-900">
            Análise da derivada
          </h2>
        </div>

        <p className="mb-2 text-xs text-zinc-500">
          f'(x) é a inclinação instantânea da trajetória.
        </p>
        <p className="font-mono text-xs font-semibold break-all text-zinc-800">
          {analysis?.derivativeFormula ?? "f'(x) = —"}
        </p>
        <p className="mt-2 font-mono text-xs text-zinc-600">
          Ponto crítico: x = -b / 2a
          {vertex ? ` = ${formatCoord(vertex.x)}` : ""}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600">
          {variation === "subindo"
            ? "f'(x) > 0 no início: a bola está subindo."
            : variation === "descendo"
              ? "f'(x) < 0 no início: a bola está descendo."
              : analysis
                ? "f'(x) = 0: a bola está no ponto de altura máxima."
                : "f'(x) > 0 sobe · f'(x) = 0 máximo · f'(x) < 0 desce"}
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200/80">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-orange-500" />
          <h2 className="text-sm font-medium text-zinc-900">
            Ponto máximo
          </h2>
        </div>

        <p className="text-xs text-zinc-500 mb-2">Vértice e classificação</p>
        <p className="font-mono text-sm font-semibold text-zinc-800">
          {vertex
            ? `(${formatCoord(vertex.x)}, ${formatCoord(vertex.y)})`
            : "—"}
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          Altura máxima:{" "}
          <span className="font-mono font-semibold text-zinc-800">
            {vertex ? formatCoord(vertex.y) : "—"}
          </span>
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          Classificação:{" "}
          <span className="font-semibold text-zinc-800">
            {analysis ? classificationLabel(analysis.classification) : "—"}
          </span>
        </p>
        {analysis ? (
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            {analysis.classificationReason}
          </p>
        ) : null}
        {roots ? (
          <p className="mt-2 font-mono text-xs text-zinc-500">
            Raízes: x₁={formatCoord(roots.x1)}, x₂={formatCoord(roots.x2)}
          </p>
        ) : null}
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200/80">
        <div className="mb-3 flex items-center gap-2">
          <Image
            src="/assets/info.png"
            alt="Resultado"
            width={16}
            height={16}
            className="size-4"
          />
          <h2 className="text-sm font-medium text-zinc-900">
            Análise do arremesso
          </h2>
        </div>
        <p className="text-xs font-semibold text-zinc-800">
          Resultado:{" "}
          {analysis
            ? analysis.hoop.hit
              ? "Cesta"
              : "Erro"
            : "—"}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600">{tip}</p>
      </div>
    </div>
  );
}
