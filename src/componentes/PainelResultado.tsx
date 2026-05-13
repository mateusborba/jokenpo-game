import type { Opcao } from "../types";
import { iconesOpcoes } from "../constantes";
import { usePainelResultado } from "../hooks/usePainelResultado";

type PropriedadesPainelResultado = {
  meuNome: string;
  nomeAdversario: string;
  minhaOpcao: Opcao;
  opcaoAdversario: Opcao;
  textoResultado: string;
  aoJogarNovamente: () => void;
};

export function PainelResultado({
  meuNome,
  nomeAdversario,
  minhaOpcao,
  opcaoAdversario,
  textoResultado,
  aoJogarNovamente,
}: PropriedadesPainelResultado) {
  const { resultadoId } = usePainelResultado();

  return (
    <section
      className="flex animate-in flex-col items-center gap-8 border-t border-slate-200 pt-8 duration-500 fade-in zoom-in"
      aria-labelledby={resultadoId}
    >
      <h2 id={resultadoId} className="sr-only">
        Resultado da rodada
      </h2>
      <div className="flex w-full flex-col items-stretch justify-center gap-8 md:flex-row md:items-center md:gap-12">
        <article className="flex flex-col items-center rounded-xl border-2 border-sky-800 bg-white p-8 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            {meuNome || "Você"}
          </h3>
          <span className="text-7xl md:text-8xl" aria-hidden>
            {iconesOpcoes[minhaOpcao]}
          </span>
          <p className="mt-4 text-lg capitalize text-slate-800">{minhaOpcao}</p>
        </article>
        <div className="flex items-center justify-center" aria-hidden>
          <span className="text-3xl font-bold text-slate-600 md:text-4xl">
            VS
          </span>
        </div>
        <article className="flex flex-col items-center rounded-xl border-2 border-rose-800 bg-white p-8 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            {nomeAdversario || "Adversário"}
          </h3>
          <span className="text-7xl md:text-8xl" aria-hidden>
            {iconesOpcoes[opcaoAdversario]}
          </span>
          <p className="mt-4 text-lg capitalize text-slate-800">
            {opcaoAdversario}
          </p>
        </article>
      </div>

      <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white px-6 py-6 text-center shadow-sm md:px-8">
        <p className="text-xl font-bold text-slate-900 md:text-2xl">
          {textoResultado}
        </p>
      </div>

      <button
        type="button"
        onClick={aoJogarNovamente}
        className="rounded-lg bg-sky-800 px-12 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
      >
        Jogar novamente
      </button>
    </section>
  );
}
