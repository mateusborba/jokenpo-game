import type { Opcao } from "../types";
import { iconesOpcoes } from "../constantes";
import { useCartaoEscolha } from "../hooks/useCartaoEscolha";

interface PropriedadesCartao {
  titulo: string;
  selecionado: Opcao;
  aoSelecionar: (opcao: Opcao) => void;
  opcoes: Opcao[];
  bloqueado: boolean;
}

export const CartaoEscolha = ({
  titulo,
  selecionado,
  aoSelecionar,
  opcoes,
  bloqueado,
}: PropriedadesCartao) => {
  const { tituloId } = useCartaoEscolha(titulo);

  return (
    <div
      className={`w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${bloqueado ? "opacity-90" : ""}`}
      role="group"
      aria-labelledby={tituloId}
    >
      <h2
        id={tituloId}
        className="mb-6 border-b border-slate-100 pb-3 text-center text-xl font-semibold text-slate-900"
      >
        {titulo}
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            type="button"
            onClick={() => aoSelecionar(opcao)}
            disabled={bloqueado}
            aria-pressed={selecionado === opcao}
            className={`flex flex-col items-center justify-center rounded-lg p-4 transition-colors ${
              selecionado === opcao
                ? "border-2 border-sky-800 bg-sky-50 text-sky-950 shadow-inner ring-1 ring-sky-700/20"
                : "border border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100"
            } ${bloqueado ? "cursor-not-allowed" : ""}`}
          >
            <span className="mb-2 text-3xl" aria-hidden>
              {iconesOpcoes[opcao]}
            </span>
            <span className="text-sm font-semibold capitalize">{opcao}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
