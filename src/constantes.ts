import type { Opcao } from "./types";

export const acoes: Record<string, Record<string, string>> = {
  tesoura: { papel: "corta", lagarto: "decapita" },
  papel: { pedra: "cobre", spock: "refuta" },
  pedra: { lagarto: "esmaga", tesoura: "quebra" },
  lagarto: { spock: "envenena", papel: "come" },
  spock: { tesoura: "esmaga", pedra: "vaporiza" },
};

export const iconesOpcoes: Record<string, string> = {
  pedra: "🪨",
  papel: "📄",
  tesoura: "✂️",
  lagarto: "🦎",
  spock: "🖖",
};

export const listaOpcoes: Opcao[] = [
  "pedra",
  "papel",
  "tesoura",
  "lagarto",
  "spock",
];
