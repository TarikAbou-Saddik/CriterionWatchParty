export const connectToServer = async () => {
  const ws = new WebSocket('ws://localhost:8000');
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (ws.readyState === 1) {
        clearInterval(timer);
        resolve(ws);
      }
    }, 10);
  });
};
