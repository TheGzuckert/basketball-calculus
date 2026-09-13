# 🏀 Basketball Calculus

> Um pequeno jogo desenvolvido para aplicar **funções, derivadas e otimização** em uma situação prática: o lançamento de uma bola de basquete.

## Sobre o projeto

O **Basketball Calculus** transforma um problema de Cálculo em uma experiência interativa.

O jogador escolhe o **ângulo** e a **força** do arremesso e a aplicação calcula automaticamente a trajetória da bola, representada por uma função quadrática.

A proposta é mostrar, de forma visual e simples, como conceitos matemáticos podem ser utilizados para analisar um problema do mundo real.

---

##  Matemática utilizada

A trajetória da bola é representada por uma função quadrática:

$$
f(x) = ax^2 + bx + c
$$

Onde:

- `x` representa a posição horizontal da bola;
- `f(x)` representa a altura da bola;
- `a`, `b` e `c` determinam o formato da trajetória.

A partir do ângulo e da força escolhidos pelo jogador, o sistema calcula a velocidade inicial e constrói a trajetória da bola.

### Derivada

A derivada da função é:

$$
f'(x) = 2ax + b
$$

Ela permite analisar a variação da trajetória:

- `f'(x) > 0` → a bola está subindo;
- `f'(x) = 0` → ponto crítico;
- `f'(x) < 0` → a bola está descendo.

Para encontrar o ponto máximo da trajetória, fazemos:

$$
f'(x) = 0$$

resultando em:

$$
x = -\frac{b}{2a}
$$

Depois, esse valor é aplicado na função original para encontrar a altura máxima.

A segunda derivada também é utilizada para confirmar a classificação do ponto crítico:

$$
f''(x) = 2a
$$

Como a trajetória possui `a < 0`, temos `f''(x) < 0`, indicando que o ponto crítico é um **máximo**.

---

## O que o projeto demonstra

O projeto foi desenvolvido para aplicar, na prática, as seguintes etapas:

1. Definição de um problema real;
2. Modelagem matemática da trajetória;
3. Construção da função quadrática;
4. Aplicação da derivada;
5. Identificação do ponto crítico;
6. Determinação da altura máxima;
7. Automatização dos cálculos;
8. Teste de diferentes valores de entrada;
9. Interpretação dos resultados.

Dessa forma, o projeto conecta **matemática + programação + interação** em uma única aplicação.

---

## Como funciona

O jogador pode alterar:

- **Ângulo** do lançamento;
- **Força** aplicada à bola.

A aplicação recalcula automaticamente:

- a velocidade inicial;
- a função da trajetória;
- a derivada;
- o ponto crítico;
- a altura máxima;
- as raízes da função;
- o resultado do arremesso.

O jogador pode então testar diferentes cenários e tentar encontrar uma combinação que faça a bola atingir a cesta.

---

##  Aplicação

###  Deploy

O projeto está publicado na **Vercel** e pode ser acessado diretamente pelo navegador:

**[Acessar Basketball Calculus](https://basketball-calculus.vercel.app/)**

O deploy utiliza a integração da Vercel com o repositório do projeto, permitindo disponibilizar a aplicação em produção a partir das alterações realizadas no código.

---

##  Demonstração

Vídeo de apresentação e demonstração do projeto:

**[Assistir ao vídeo no Vimeo](https://vimeo.com/1226432323)**

---

##  Tecnologias

- [Next.js](https://nextjs.org/)
- React
- TypeScript
- Vercel
- CSS

A lógica matemática foi organizada em uma camada de domínio própria para manter os cálculos separados da interface.

---

##  Organização da lógica

A lógica principal do problema fica dentro do domínio de **Basketball**, separando responsabilidades como:

```text
src/
└── domain/
    └── basketball/
        ├── calculus/
        │   ├── derivative.ts
        │   ├── vertex.ts
        │   └── roots.ts
        ├── physics/
        │   ├── velocity.ts
        │   └── trajectory.ts
        ├── gameplay/
        │   ├── hoop.ts
        │   └── shot.ts
        ├── validation/
        │   └── shot-validation.ts
        ├── formatting/
        │   └── formula.ts
        ├── types.ts
        └── index.ts
```

Essa separação permite manter a interface, a física do lançamento, os cálculos de Cálculo Diferencial e as regras do jogo organizados de forma independente.

---

##  Executando localmente

Clone o repositório:

```bash
git clone https://github.com/TheGzuckert/basketball-calculus.git
cd basketball-calculus
```

Instale as dependências:

```bash
npm install
```

Execute o projeto em desenvolvimento:

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```
