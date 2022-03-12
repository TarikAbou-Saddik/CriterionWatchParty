const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const PartyMethods = {
  CREATE_PARTY: 0,
  RESTRICT_CONTROL: 1,
  JOIN_PARTY: 2,
  LEAVE_PARTY: 3,
  SEND_MESSAGE: 4,
};

let partyState = {
  id: null,
  users: [],
  messages: [],
  restrictPartyControl: false,
};

// Create our WebSocketServer
const wss = new WebSocket.Server({ port: 5000, clientTracking: true });

// Listen for any connection and handle client requests.
wss.on('connection', ws => {
  const partyId = uuidv4();
  ws.id = uuidv4();

  ws.on('message', rawData => handleMessage(rawData, partyId, ws));
});

const handleMessage = (rawData, partyId, ws) => {
  const { type, payload } = JSON.parse(rawData);

  switch (type) {
    case PartyMethods.CREATE_PARTY:
      ws.send(buildCreatePartyResponse(partyId, ws.id));
    case PartyMethods.RESTRICT_CONTROL:
      handlePartyRestriction(data.payload);
    default:
      ws.send(payload);
  }
};

const buildCreatePartyResponse = (id, userId) => {
  const payload = {
    ...partyState,
    id,
    users: [buildNewUser(userId)],
  };
  return JSON.stringify({ type: PartyMethods.CREATE_PARTY, payload });
};

const buildNewUser = id => ({
  id,
  dateCreated: new Date(),
  name: '',
  userIcon: null,
});

const handlePartyRestriction = value => {
  partyState.restrictPartyControl = value;
};
