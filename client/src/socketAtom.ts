import { atom } from 'jotai';

export type SocketState = {
  isConnected: boolean;
  isConnectionError: boolean;
  isSessionEstablished: boolean;
  sessionId: string | null;
  userId: string | null;
  username: string | null;
};

export const socketAtom = atom<SocketState>({
  isConnected: false,
  isConnectionError: false,
  isSessionEstablished: false,
  sessionId: null,
  userId: null,
  username: null,
})
