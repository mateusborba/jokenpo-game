import { useId } from "react";

export function usePainelBuscando() {
  const statusId = useId();
  return { statusId };
}
