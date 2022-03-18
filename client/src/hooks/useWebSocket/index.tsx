import { useEffect, useRef } from 'react';

interface Data {
  type: string;
  payload: any;
}

const socketCodes = {
  NORMAL_CLOSE: 1000,
};

const useWebSocket = () => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5000');

    // Event listeners
    (socket.current as WebSocket).addEventListener('open', e => {
      console.log('Socket client connection has opened!');
    });

    (socket.current as WebSocket).addEventListener('error', e => {
      console.log('Socket client connection error:', e);
    });

    (socket.current as WebSocket).addEventListener('message', e => {
      console.log('Message from server:', e.data);
    });

    return () => {
      (socket.current as WebSocket).close(
        socketCodes.NORMAL_CLOSE,
        'Socket client connection closed normally.',
      );
    };
  }, []);

  const sendData = (data: Data) =>
    (socket.current as WebSocket).send(JSON.stringify(data));

  return { sendData };
};

export default useWebSocket;
