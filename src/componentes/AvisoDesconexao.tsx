import { useAvisoDesconexao } from "../hooks/useAvisoDesconexao";

type PropriedadesAvisoDesconexao = {
  mensagem: string;
  aoFechar: () => void;
};

export function AvisoDesconexao({
  mensagem,
  aoFechar,
}: PropriedadesAvisoDesconexao) {
  const { tituloId } = useAvisoDesconexao();

  return (
    <div
      role="alert"
      aria-labelledby={tituloId}
      className="fixed inset-x-4 top-4 z-50 mx-auto max-w-lg rounded-lg border border-amber-700 bg-amber-50 p-4 text-amber-950 shadow-lg md:inset-x-auto"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id={tituloId} className="text-sm font-medium sm:text-base">
          {mensagem}
        </p>
        <button
          type="button"
          onClick={aoFechar}
          className="shrink-0 rounded-md bg-amber-900 px-3 py-2 text-sm font-semibold text-amber-50 hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
