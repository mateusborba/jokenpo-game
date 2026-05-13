# Jokenpô multiplayer

Jogo **Pedra, Papel, Tesoura, Lagarto e Spock** em tempo real com React (Vite), TypeScript, Tailwind CSS e Socket.IO. Dois jogadores entram na mesma fila no servidor; quando há par, jogam na mesma sala até alguém desconectar.

## Como rodar

Precisa de **dois processos**: o backend WebSocket e o front-end Vite.

1. Instale dependências (na raiz do repositório):

```bash
npm install
```

2. Em um terminal, suba o servidor de jogos (porta **3001**):

```bash
npm run server
```

3. Em outro terminal, suba o cliente:

```bash
npm run dev
```

4. Abra o endereço que o Vite mostrar (em geral `http://localhost:5173`). Para testar o multiplayer, use **duas abas** ou dois navegadores, cada um clicando em **Encontrar oponente**.

### Variável de ambiente (opcional)

Se o servidor não estiver em `localhost:3001`, crie um ficheiro `.env` na raiz:

```env
VITE_SOCKET_URL=http://seu-host:3001
```

O cliente lê `import.meta.env.VITE_SOCKET_URL` em [`src/servicos/socket.ts`](src/servicos/socket.ts).

## Scripts

| Comando           | Descrição                        |
| ----------------- | -------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento Vite |
| `npm run build`   | Typecheck + build de produção    |
| `npm run preview` | Servir pasta `dist` (após build) |
| `npm run server`  | Node + Express + Socket.IO       |
| `npm run lint`    | ESLint em ficheiros TS/TSX       |

## Como funciona o multiplayer

O fluxo usa **Socket.IO** sobre HTTP (servidor em [`server.js`](server.js)).

- **Fila:** o primeiro `iniciar_busca` fica guardado em `jogadorAguardando`. O segundo emparelha com ele.
- **Sala:** nome `sala_<idPrimeiro>_<idSegundo>`. Ambos entram na mesma room do Socket.IO.
- **Papéis:** o primeiro da fila é `jogador1` (jogada enviada como `jogadaJ1`); o segundo é `jogador2` (`jogadaJ2`). O cliente usa isso para saber qual mão é a sua e qual é a do adversário.
- **Rodada:** cada um emite `enviar_jogada` com `{ idSala, jogada }`. Quando existem duas jogadas, o servidor emite `ambos_jogaram` para a sala e **limpa** as jogadas para a próxima rodada.
- **Jogar novamente:** hoje é só no cliente (nova escolha na mesma sala); não há novo matchmaking até desconectar.
- **Desconexão:** se um socket cai, o outro recebe `oponente_desconectado` e a sala é removida.

A regra de quem vence está em [`src/dominio/jokenpo.ts`](src/dominio/jokenpo.ts) (`calcularVencedor` e mensagens para o jogador).

## Estrutura principal

- `src/App.tsx` — composição das telas.
- `src/hooks/useJogoMultiplayer.ts` — estado e eventos Socket.IO.
- `src/dominio/jokenpo.ts` — lógica pura do jogo.
- `src/componentes/` — painéis de UI e cartão de escolhas.
- `server.js` — Express + Socket.IO (matchmaking e salas).

Licença: uso pessoal / projeto de exemplo.
