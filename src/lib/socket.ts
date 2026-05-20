import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    // In our deployment, the server runs on the same port 3000
    // so we can connect to root or specify origin
    socket = io({
      autoConnect: true,
      reconnection: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
