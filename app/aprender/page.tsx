import { LightbulbIcon } from "lucide-react";
import { Hero } from "@/components/hero";

function Formula({ children }: { children: string }) {
  return (
    <p className="rounded-lg bg-muted px-3 py-2 font-mono text-foreground">
      {children}
    </p>
  );
}

export default function AprenderPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-4 py-4 xl:px-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Aprenda — Basketball Calculus
        </h1>
        <p className="text-sm text-muted-foreground">
          Como a função quadrática e a derivada explicam a trajetória da bola no
          jogo.
        </p>
      </header>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Hero className="h-full" title="A trajetória da bola">
        <p>
          Quando uma bola de basquete é arremessada, ela sobe, atinge uma altura
          máxima e depois começa a descer em direção à cesta.
        </p>
        <p>
          Essa trajetória pode ser representada matematicamente por uma{" "}
          <strong className="text-foreground">função quadrática</strong>, que
          possui o formato de uma parábola:
        </p>
        <Formula>f(x) = ax² + bx + c</Formula>
        <p>No jogo, essa função representa a trajetória da bola.</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>
            <strong className="text-foreground">x</strong> representa a
            distância horizontal percorrida pela bola;
          </li>
          <li>
            <strong className="text-foreground">f(x)</strong> representa a
            altura da bola naquele ponto;
          </li>
          <li>
            <strong className="text-foreground">a, b e c</strong> são os
            coeficientes que determinam o formato e a posição da parábola.
          </li>
        </ul>
        <p>
          Os valores escolhidos para <strong className="text-foreground">ângulo</strong>{" "}
          (θ) e <strong className="text-foreground">força</strong> (F)
          determinam a velocidade inicial:
        </p>
        <Formula>vx = v · cos(θ)</Formula>
        <Formula>vy = v · sin(θ)</Formula>
        <p>Eliminando o tempo, esses valores viram os coeficientes:</p>
        <Formula>a = -g / (2 vx²)</Formula>
        <Formula>b = vy/vx - 2a x₀</Formula>
        <Formula>c = y₀ - a x₀² - b x₀</Formula>
        <p>
          Ao alterar ângulo e força, a parábola muda. Consequentemente, a bola
          pode passar acima, abaixo ou diretamente pela cesta.
        </p>
      </Hero>

      <Hero className="h-full" title="Onde entra a derivada?">
        <p>
          A derivada permite analisar{" "}
          <strong className="text-foreground">
            como a trajetória da bola está mudando em cada ponto
          </strong>
          .
        </p>
        <p>Se a trajetória for:</p>
        <Formula>f(x) = ax² + bx + c</Formula>
        <p>sua derivada será:</p>
        <Formula>f'(x) = 2ax + b</Formula>
        <p>
          A derivada representa a{" "}
          <strong className="text-foreground">inclinação da trajetória</strong>.
        </p>
        <p>
          <strong className="text-foreground">O que isso significa no jogo?</strong>
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>
            Quando <span className="font-mono text-foreground">f'(x) &gt; 0</span>,
            a bola está <strong className="text-foreground">subindo</strong>;
          </li>
          <li>
            Quando <span className="font-mono text-foreground">f'(x) = 0</span>, a
            trajetória atingiu seu{" "}
            <strong className="text-foreground">ponto máximo</strong>;
          </li>
          <li>
            Quando <span className="font-mono text-foreground">f'(x) &lt; 0</span>,
            a bola está <strong className="text-foreground">descendo</strong>.
          </li>
        </ul>
        <p>
          Podemos utilizar a derivada para encontrar o{" "}
          <strong className="text-foreground">ponto crítico da trajetória</strong>.
        </p>
        <p>Para encontrar esse ponto, igualamos a derivada a zero:</p>
        <Formula>f'(x) = 0 → x = -b / (2a)</Formula>
        <p>A segunda derivada classifica o ponto crítico:</p>
        <Formula>f''(x) = 2a</Formula>
        <p>
          Se <span className="font-mono text-foreground">a &lt; 0</span>, então{" "}
          <span className="font-mono text-foreground">f''(x) &lt; 0</span> e o
          ponto é um <strong className="text-foreground">máximo</strong> — a
          altura máxima da bola.
        </p>
      </Hero>

      <Hero className="h-full" title="Do cálculo para o jogo">
        <p>No jogo, você controla dois valores principais:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>
            <strong className="text-foreground">Ângulo</strong> do lançamento;
          </li>
          <li>
            <strong className="text-foreground">Força</strong> aplicada à bola.
          </li>
        </ul>
        <p>
          Ao modificar esses valores, o sistema calcula uma nova trajetória e
          atualiza automaticamente sua função matemática.
        </p>
        <p>
          Função, derivada, vértice e verificação da cesta saem dos{" "}
          <strong className="text-foreground">mesmos coeficientes</strong>{" "}
          a, b e c. A cesta é conferida com{" "}
          <span className="font-mono text-foreground">f(xCesta)</span>.
        </p>
        <p>
          O objetivo é encontrar uma combinação adequada de{" "}
          <strong className="text-foreground">ângulo e força</strong> para que a
          trajetória da bola passe pela cesta.
        </p>
        <p>
          Dessa forma, cada arremesso representa um pequeno problema de cálculo:
        </p>
        <p className="text-foreground">
          Você modifica os valores de entrada, observa a mudança na função e
          utiliza os resultados matemáticos para melhorar seu próximo
          lançamento.
        </p>
      </Hero>

      <Hero
        className="h-full"
        title="A ideia principal"
        icon={<LightbulbIcon className="size-4" />}
      >
        <p>
          O objetivo do Basketball Calculus é transformar conceitos matemáticos
          em movimento:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>
            <strong className="text-foreground">Função</strong> — representa a
            trajetória da bola
          </li>
          <li>
            <strong className="text-foreground">Derivada</strong> — mostra como a
            trajetória está se comportando
          </li>
          <li>
            <strong className="text-foreground">Ponto crítico</strong> — indica a
            altura máxima
          </li>
          <li>
            <strong className="text-foreground">Ângulo + Força</strong> —
            modificam a trajetória
          </li>
          <li>
            <strong className="text-foreground">Resultado</strong> — indica se o
            lançamento conseguiu atingir a cesta
          </li>
        </ul>
        <p>
          Assim, o cálculo deixa de ser apenas uma fórmula no papel e passa a
          fazer parte diretamente da mecânica do jogo.
        </p>
      </Hero>
      </div>
    </div>
  );
}
