import { usePainelBuscando } from "../hooks/usePainelBuscando";

type PropriedadesPainelBuscando = {
  mensagem: string;
};

export function PainelBuscando({ mensagem }: PropriedadesPainelBuscando) {
  const { statusId } = usePainelBuscando();

  return (
    <section
      className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm md:p-12"
      aria-busy="true"
      aria-live="polite"
      aria-labelledby={statusId}
    >
      <div
        className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-sky-800"
        aria-hidden
      />
      <h2
        id={statusId}
        className="text-xl font-bold text-slate-900 md:text-2xl"
      >
        {mensagem}
      </h2>
    </section>
  );
}
