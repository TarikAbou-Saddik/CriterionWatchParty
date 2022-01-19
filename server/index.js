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
const wss = new WebSocket.Server({ port: 8000, clientTracking: true });

// Listen for any connection and handle client requests.
wss.on('connection', ws => {
  const partyId = uuidv4();
  ws.id = uuidv4();

  // Handles messages sent.
  ws.on('message', rawData => {
    const data = JSON.parse(rawData);
    if (data.type === PartyMethods.CREATE_PARTY) {
      ws.send(buildCreatePartyResponse(partyId, ws.id));
    }
    if (data.type === PartyMethods.RESTRICT_CONTROL) {
      console.log(data);
      handlePartyRestriction(data.payload);
    }
  });
});

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
