import { useId } from "react";

export function useAvisoDesconexao() {
  const tituloId = useId();
  return { tituloId };
}
