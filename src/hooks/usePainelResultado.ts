import { useId } from "react";

export function usePainelResultado() {
  const resultadoId = useId();
  return { resultadoId };
}
