import { useApp } from "./hooks/useApp";
import { PainelMenu } from "./componentes/PainelMenu";
import { PainelBuscando } from "./componentes/PainelBuscando";
import { PainelJogando } from "./componentes/PainelJogando";
import { PainelContagem } from "./componentes/PainelContagem";
import { PainelResultado } from "./componentes/PainelResultado";
import { AvisoDesconexao } from "./componentes/AvisoDesconexao";

function App() {
  const {
    meuNome,
    setMeuNome,
    nomeExibicaoCabecalho,
    iniciarBusca,
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
    confirmarEscolha,
    gerarTextoFinal,
    reiniciarPartida,
  } = useApp();

  const subtitulo = papel
    ? `Batalha: ${nomeExibicaoCabecalho} vs ${nomeAdversario}`
    : "Conecte-se ao servidor e encontre um adversário na fila.";

  return (
    <div className="min-h-screen w-full bg-slate-100 font-sans text-slate-900">
      {avisoDesconexao ? (
        <AvisoDesconexao
          mensagem={avisoDesconexao}
          aoFechar={fecharAvisoDesconexao}
        />
      ) : null}

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10 md:py-12">
        <header className="text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Jokenpô multiplayer
          </h1>
          <p className="text-base font-medium text-slate-700 md:text-lg">
            {subtitulo}
          </p>
        </header>

        {tela === "menu" && (
          <PainelMenu
            meuNome={meuNome}
            aoAlterarNome={setMeuNome}
            aoBuscarOponente={iniciarBusca}
          />
        )}

        {tela === "buscando" && <PainelBuscando mensagem={alerta} />}

        {tela === "jogando" && (
          <PainelJogando
            alerta={alerta}
            minhaOpcao={minhaOpcao}
            aoSelecionar={setMinhaOpcao}
            jaJogou={jaJogou}
            aoConfirmar={confirmarEscolha}
          />
        )}

        {tela === "contagem" && <PainelContagem valor={tempoEspera} />}

        {tela === "resultado" && (
          <PainelResultado
            meuNome={nomeExibicaoCabecalho}
            nomeAdversario={nomeAdversario}
            minhaOpcao={minhaOpcao}
            opcaoAdversario={opcaoAdversario}
            textoResultado={gerarTextoFinal()}
            aoJogarNovamente={reiniciarPartida}
          />
        )}
      </main>
    </div>
  );
}

export default App;
