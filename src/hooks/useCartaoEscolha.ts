import { useId } from "react";

export function useCartaoEscolha(titulo: string) {
  const regiaoId = useId();
  const tituloSlug = titulo.replace(/\s+/g, "-").toLowerCase();
  return { tituloId: `${regiaoId}-${tituloSlug}` };
}
