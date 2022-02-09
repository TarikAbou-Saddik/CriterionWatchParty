import { createContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isPartyActiveSelect, setPartyId } from '../redux/partySlice';

const PartyMethods = {
  CREATE_PARTY: 0,
  RESTRICT_CONTROL: 1,
  JOIN_PARTY: 2,
  LEAVE_PARTY: 3,
  SEND_MESSAGE: 4,
};

const WebSocketContext = createContext(null);
let ws;

const SocketProvider = ({ children }) => {
  const isPartyActive = useSelector(isPartyActiveSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ws) {
      ws = new WebSocket('ws://localhost:8000');
      ws.onmessage = ({ data }) => {
        const { type, payload } = JSON.parse(data);
        switch (type) {
          case PartyMethods.CREATE_PARTY:
            dispatch(setPartyId(payload.id));
            break;
          default:
            break;
        }
      };
    }
  }, [isPartyActive, dispatch]);

  const createParty = () => send({ type: PartyMethods.CREATE_PARTY });
  const restrictControl = value =>
    send({ type: PartyMethods.RESTRICT_CONTROL, payload: value });

  const send = data => ws.send(JSON.stringify(data));

  return (
    <WebSocketContext.Provider value={{ ws, createParty, restrictControl }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default SocketProvider;
export { WebSocketContext };
