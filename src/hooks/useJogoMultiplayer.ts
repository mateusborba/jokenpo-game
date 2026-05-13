import { useCallback, useEffect, useRef, useState } from "react";
import { conexao } from "../servicos/socket";
import type { Opcao, Tela, PapelJogador } from "../types";
import {
  jogadaDoOponente,
  mensagemResultadoParaJogador,
} from "../dominio/jokenpo";

type DadosAguardando = { mensagem: string };
type DadosPartida = {
  mensagem: string;
  idSala: string;
  nomeAdversario: string;
};
type DadosPapel = { papel: PapelJogador };
type DadosAmbos = { jogadaJ1: Opcao; jogadaJ2: Opcao };
type DadosDesconexao = { mensagem: string };

export function useJogoMultiplayer() {
  const [tela, setTela] = useState<Tela>("menu");
  const [idSala, setIdSala] = useState<string | null>(null);
  const [papel, setPapel] = useState<PapelJogador>(null);
  const [minhaOpcao, setMinhaOpcao] = useState<Opcao>("");
  const [opcaoAdversario, setOpcaoAdversario] = useState<Opcao>("");
  const [nomeAdversario, setNomeAdversario] = useState<string>("Adversário");
  const [jaJogou, setJaJogou] = useState<boolean>(false);
  const [tempoEspera, setTempoEspera] = useState<number>(3);
  const [alerta, setAlerta] = useState<string>("");
  const [avisoDesconexao, setAvisoDesconexao] = useState<string | null>(null);

  const papelRef = useRef<PapelJogador>(null);
  useEffect(() => {
    papelRef.current = papel;
  }, [papel]);

  useEffect(() => {
    let intervaloContagem: ReturnType<typeof setInterval> | null = null;

    const limparContagem = () => {
      if (intervaloContagem !== null) {
        clearInterval(intervaloContagem);
        intervaloContagem = null;
      }
    };

    const onAguardando = (dados: DadosAguardando) => {
      setTela("buscando");
      setAlerta(dados.mensagem);
    };

    const onPartidaEncontrada = (dados: DadosPartida) => {
      setIdSala(dados.idSala);
      setTela("jogando");
      setAlerta(dados.mensagem);
      setNomeAdversario(dados.nomeAdversario);
      setMinhaOpcao("");
      setOpcaoAdversario("");
      setJaJogou(false);
      setAvisoDesconexao(null);
    };

    const onPapelDefinido = (dados: DadosPapel) => {
      setPapel(dados.papel);
    };

    const onOponenteDesconectado = (dados: DadosDesconexao) => {
      limparContagem();
      setIdSala(null);
      setPapel(null);
      setTela("menu");
      setAlerta(dados.mensagem);
      setAvisoDesconexao(dados.mensagem);
      conexao.disconnect();
    };

    const onAmbosJogaram = (dados: DadosAmbos) => {
      limparContagem();
      setTela("contagem");
      let t = 3;
      setTempoEspera(t);

      intervaloContagem = setInterval(() => {
        t -= 1;
        setTempoEspera(t);
        if (t <= 0) {
          limparContagem();
          const adv = jogadaDoOponente(
            papelRef.current,
            dados.jogadaJ1,
            dados.jogadaJ2,
          );
          setOpcaoAdversario(adv);
          setTela("resultado");
        }
      }, 1000);
    };

    conexao.on("aguardando", onAguardando);
    conexao.on("partida_encontrada", onPartidaEncontrada);
    conexao.on("papel_definido", onPapelDefinido);
    conexao.on("oponente_desconectado", onOponenteDesconectado);
    conexao.on("ambos_jogaram", onAmbosJogaram);

    return () => {
      limparContagem();
      conexao.off("aguardando", onAguardando);
      conexao.off("partida_encontrada", onPartidaEncontrada);
      conexao.off("papel_definido", onPapelDefinido);
      conexao.off("oponente_desconectado", onOponenteDesconectado);
      conexao.off("ambos_jogaram", onAmbosJogaram);
    };
  }, []);

  const buscarOponente = useCallback((nome: string) => {
    setAvisoDesconexao(null);
    conexao.connect();
    conexao.emit("iniciar_busca", { nome });
  }, []);

  const confirmarEscolha = useCallback(() => {
    if (minhaOpcao && idSala) {
      conexao.emit("enviar_jogada", { idSala, jogada: minhaOpcao });
      setJaJogou(true);
      setAlerta("Aguardando oponente...");
    }
  }, [minhaOpcao, idSala]);

  const reiniciarPartida = useCallback(() => {
    setTela("jogando");
    setMinhaOpcao("");
    setOpcaoAdversario("");
    setJaJogou(false);
    setAlerta("Nova rodada! Faça sua escolha.");
  }, []);

  const fecharAvisoDesconexao = useCallback(() => {
    setAvisoDesconexao(null);
  }, []);

  const gerarTextoFinal = useCallback(() => {
    return mensagemResultadoParaJogador(papel, minhaOpcao, opcaoAdversario);
  }, [papel, minhaOpcao, opcaoAdversario]);

  return {
    tela,
    papel,
    minhaOpcao,
    setMinhaOpcao,
    opcaoAdversario,
    nomeAdversario,
    jaJogou,
    tempoEspera,
    alerta,
    avisoDesconexao,
    fecharAvisoDesconexao,
    buscarOponente,
    confirmarEscolha,
    gerarTextoFinal,
    reiniciarPartida,
  };
}
