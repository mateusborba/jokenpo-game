import { usePainelContagem } from "../hooks/usePainelContagem";

type PropriedadesPainelContagem = {
  valor: number;
};

export function PainelContagem({ valor }: PropriedadesPainelContagem) {
  const { tituloId } = usePainelContagem();

  return (
    <section
      className="flex flex-col items-center justify-center py-16 md:py-20"
      aria-labelledby={tituloId}
      aria-live="assertive"
    >
      <h2
        id={tituloId}
        className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl"
      >
        Preparar…
      </h2>
      <div
        className="text-8xl font-black tabular-nums text-sky-900 md:text-9xl"
        aria-label={`Contagem ${valor}`}
      >
        {valor}
      </div>
    </section>
  );
}
