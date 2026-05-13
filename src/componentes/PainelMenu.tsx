import { usePainelMenu } from "../hooks/usePainelMenu";

type PropriedadesPainelMenu = {
  meuNome: string;
  aoAlterarNome: (valor: string) => void;
  aoBuscarOponente: () => void;
};

export function PainelMenu({
  meuNome,
  aoAlterarNome,
  aoBuscarOponente,
}: PropriedadesPainelMenu) {
  const { tituloId, nomeFieldId } = usePainelMenu();

  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm md:p-12"
      aria-labelledby={tituloId}
    >
      <h2 id={tituloId} className="mb-4 text-2xl font-bold text-slate-900">
        Pronto para iniciar?
      </h2>
      <p className="mb-6 text-base text-slate-700">
        Informe um nome para o adversário ver (ou deixe em branco para jogar
        como anônimo).
      </p>
      <label htmlFor={nomeFieldId} className="sr-only">
        Seu nome
      </label>
      <input
        id={nomeFieldId}
        type="text"
        placeholder="Qual o seu nome?"
        value={meuNome}
        onChange={(e) => aoAlterarNome(e.target.value)}
        className="mb-6 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-lg text-slate-900 placeholder:text-slate-500 focus:border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600/30"
      />
      <button
        type="button"
        onClick={aoBuscarOponente}
        className="rounded-lg bg-sky-800 px-10 py-3 text-lg font-semibold text-white transition-colors hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
      >
        Encontrar oponente
      </button>
    </section>
  );
}
