import type { Opcao } from "../types";
import { CartaoEscolha } from "./CartaoEscolha";
import { listaOpcoes } from "../constantes";
import { usePainelJogando } from "../hooks/usePainelJogando";

type PropriedadesPainelJogando = {
  alerta: string;
  minhaOpcao: Opcao;
  aoSelecionar: (opcao: Opcao) => void;
  jaJogou: boolean;
  aoConfirmar: () => void;
};

export function PainelJogando({
  alerta,
  minhaOpcao,
  aoSelecionar,
  jaJogou,
  aoConfirmar,
}: PropriedadesPainelJogando) {
  const { regiaoJogadaId } = usePainelJogando();

  return (
    <section
      className="flex w-full flex-col items-center gap-6"
      aria-labelledby={regiaoJogadaId}
    >
      <p
        id={regiaoJogadaId}
        className="text-center text-lg font-semibold text-slate-900"
      >
        {alerta}
      </p>
      <CartaoEscolha
        titulo="Sua jogada"
        selecionado={minhaOpcao}
        aoSelecionar={(m) => {
          if (!jaJogou) aoSelecionar(m);
        }}
        opcoes={listaOpcoes}
        bloqueado={jaJogou}
      />
      <button
        type="button"
        onClick={aoConfirmar}
        disabled={!minhaOpcao || jaJogou}
        className="mt-2 rounded-lg bg-sky-800 px-12 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-800 disabled:opacity-90"
      >
        {jaJogou ? "Jogada confirmada" : "Confirmar jogada"}
      </button>
    </section>
  );
}
