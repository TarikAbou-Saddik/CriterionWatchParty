import { createSlice } from '@reduxjs/toolkit';
import { getBotUser, getShortTime } from '../utils';

const welcomeMessage = {
  id: null,
  user: getBotUser(),
  data: 'Welcome to the party! Copy your party link above and share away!',
  timestamp: getShortTime(),
  isUserMessage: false,
};

const initialState = {
  id: null,
  restrictPartyControlToLeader: false,
  // TODO: need to implement logic for creating a partyUrl server-side.
  partyUrl: '',
  dateCreated: new Date().toLocaleTimeString(),
  users: [],
  messages: [welcomeMessage],
  isPartyActive: false,
  isChatActive: false,
  showAudience: false,
};

export const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    setPartyControlRestriction: (state, action) => {
      state.restrictPartyControlToLeader = action.payload;
    },
    setPartyId: (state, action) => {
      state.id = action.payload;
    },
    setPartyUrl: (state, action) => {
      state.partyUrl = action.payload;
    },
    setPartyStatus: state => {
      state.isPartyActive = !state.isPartyActive;
    },
    setChatStatus: (state, action) => {
      state.isChatActive = action.payload;
    },
    toggleShowAudience: state => {
      state.showAudience = !state.showAudience;
    },
    addMember: (state, action) => {
      state.users.push(action.payload);
    },
    removeMember: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessageById: (state, action) => {
      state.messages = state.messages.filter(
        message => message.id !== action.payload,
      );
    },
  },
});

// Selectors
export const restrictPartyControlSelect = state =>
  state.party.restrictPartyControlToLeader;
export const partyUrlSelect = state => state.party.partyUrl;
export const isPartyActiveSelect = state => state.party.isPartyActive;
export const isChatActiveSelect = state => state.party.isChatActive;
export const usersSelect = state => state.party.users;
export const messagesSelect = state => state.party.messages;

// Exported action
export const {
  setPartyControlRestriction,
  setPartyUrl,
  setPartyId,
  setPartyStatus,
  setChatStatus,
  addMember,
  removeMember,
  addMessage,
  removeMessageById,
  toggleShowAudience,
} = partySlice.actions;

// Our 'party' reducer
export default partySlice.reducer;
