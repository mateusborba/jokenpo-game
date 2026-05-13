import { useId } from "react";

export function usePainelJogando() {
  const regiaoJogadaId = useId();
  return { regiaoJogadaId };
}
