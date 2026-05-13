import { useId } from "react";

export function usePainelContagem() {
  const tituloId = useId();
  return { tituloId };
}
