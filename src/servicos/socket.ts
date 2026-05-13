import { io } from "socket.io-client";

const urlSocket = import.meta.env.VITE_SOCKET_URL;

export const conexao = io(urlSocket, { autoConnect: false });
