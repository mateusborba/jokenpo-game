import type { Opcao, PapelJogador } from "../types";
import { acoes } from "../constantes";

export function calcularVencedor(j1: Opcao, j2: Opcao): string {
  if (j1 === "" || j2 === "") return "";

  if (j1 === j2) {
    const texto = j1.charAt(0).toUpperCase() + j1.slice(1);
    return `Deu Empate! Ambos escolheram ${texto}.`;
  }

  const acao1 = acoes[j1]?.[j2];
  if (acao1) {
    const textoJ1 = j1.charAt(0).toUpperCase() + j1.slice(1);
    return `🏆 Jogador 1 Venceu! ${textoJ1} ${acao1} ${j2}.`;
  }

  const acao2 = acoes[j2]?.[j1];
  if (acao2) {
    const textoJ2 = j2.charAt(0).toUpperCase() + j2.slice(1);
    return `🏆 Jogador 2 Venceu! ${textoJ2} ${acao2} ${j1}.`;
  }

  return "Jogada inválida";
}

export function jogadaDoOponente(
  papel: PapelJogador,
  jogadaJ1: Opcao,
  jogadaJ2: Opcao,
): Opcao {
  if (!papel) return "";
  return papel === "jogador1" ? jogadaJ2 : jogadaJ1;
}

export function mensagemResultadoParaJogador(
  papel: PapelJogador,
  minhaOpcao: Opcao,
  opcaoAdversario: Opcao,
): string {
  if (!papel || !minhaOpcao || !opcaoAdversario) return "";

  const jogadaJ1 = papel === "jogador1" ? minhaOpcao : opcaoAdversario;
  const jogadaJ2 = papel === "jogador2" ? minhaOpcao : opcaoAdversario;
  const textoFinal = calcularVencedor(jogadaJ1, jogadaJ2);

  if (textoFinal.includes("Deu Empate")) {
    return textoFinal;
  }

  const vitoriaJ1 = textoFinal.includes("Jogador 1 Venceu");
  const vitoriaJ2 = textoFinal.includes("Jogador 2 Venceu");

  const idx = textoFinal.indexOf("!");
  const sufixo = idx >= 0 ? textoFinal.substring(idx + 2) : textoFinal;

  if (
    (papel === "jogador1" && vitoriaJ1) ||
    (papel === "jogador2" && vitoriaJ2)
  ) {
    return `🎉 VOCÊ VENCEU! - ${sufixo}`;
  }

  return `💀 VOCÊ FOI DERROTADO! - ${sufixo}`;
}
