import { useState } from "react";
import { useJogoMultiplayer } from "./useJogoMultiplayer";

export function useApp() {
  const [meuNome, setMeuNome] = useState("");
  const multiplayer = useJogoMultiplayer();

  const nomeJogador = meuNome.trim() || "Anônimo";
  const nomeExibicaoCabecalho = meuNome.trim() || "Você";

  const iniciarBusca = () => {
    multiplayer.buscarOponente(nomeJogador);
  };

  return {
    meuNome,
    setMeuNome,
    nomeExibicaoCabecalho,
    iniciarBusca,
    ...multiplayer,
  };
}
