import { useId } from "react";

export function usePainelMenu() {
  const tituloId = useId();
  const nomeFieldId = useId();
  return { tituloId, nomeFieldId };
}
