import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const aplicativo = express();
aplicativo.use(cors());

const servidorHttp = createServer(aplicativo);

const conexoesIo = new Server(servidorHttp, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let jogadorAguardando = null;

const salas = new Map();

conexoesIo.on("connection", (socket) => {
  socket.on("iniciar_busca", ({ nome }) => {
    socket.nome = nome;

    if (jogadorAguardando) {
      const nomeSala = `sala_${jogadorAguardando.id}_${socket.id}`;
      socket.join(nomeSala);
      jogadorAguardando.join(nomeSala);

      salas.set(nomeSala, {
        jogadores: [jogadorAguardando.id, socket.id],
        jogadas: {},
      });

      conexoesIo.to(jogadorAguardando.id).emit("partida_encontrada", {
        mensagem: `Oponente encontrado! Você vai enfrentar ${socket.nome}.`,
        idSala: nomeSala,
        nomeAdversario: socket.nome,
      });

      conexoesIo.to(socket.id).emit("partida_encontrada", {
        mensagem: `Oponente encontrado! Você vai enfrentar ${jogadorAguardando.nome}.`,
        idSala: nomeSala,
        nomeAdversario: jogadorAguardando.nome,
      });

      conexoesIo
        .to(jogadorAguardando.id)
        .emit("papel_definido", { papel: "jogador1" });
      conexoesIo.to(socket.id).emit("papel_definido", { papel: "jogador2" });

      jogadorAguardando = null;
    } else {
      jogadorAguardando = socket;
      socket.emit("aguardando", { mensagem: "Aguardando um oponente..." });
    }
  });

  socket.on("enviar_jogada", (dados) => {
    const { idSala, jogada } = dados;
    const salaAtual = salas.get(idSala);

    if (salaAtual) {
      salaAtual.jogadas[socket.id] = jogada;

      if (Object.keys(salaAtual.jogadas).length === 2) {
        const idJ1 = salaAtual.jogadores[0];
        const idJ2 = salaAtual.jogadores[1];

        const jogada1 = salaAtual.jogadas[idJ1];
        const jogada2 = salaAtual.jogadas[idJ2];

        conexoesIo.to(idSala).emit("ambos_jogaram", {
          jogadaJ1: jogada1,
          jogadaJ2: jogada2,
        });

        salaAtual.jogadas = {};
      }
    }
  });

  socket.on("disconnect", () => {
    if (jogadorAguardando && jogadorAguardando.id === socket.id) {
      jogadorAguardando = null;
    }

    for (const [idSala, salaAtual] of salas.entries()) {
      if (salaAtual.jogadores.includes(socket.id)) {
        conexoesIo.to(idSala).emit("oponente_desconectado", {
          mensagem: "Oponente desconectou.",
        });
        salas.delete(idSala);
        break;
      }
    }
  });
});

const PORTA = 3001;
servidorHttp.listen(PORTA, () => {
  console.log(`Servidor Socket.IO na porta ${PORTA}`);
});
