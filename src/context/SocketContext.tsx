import React from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io(import.meta.env.VITE_API_URL || 'http://localhost:10000');

export const SocketContext = React.createContext<Socket>(socket);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

export const useSocket = () => React.useContext(SocketContext);
