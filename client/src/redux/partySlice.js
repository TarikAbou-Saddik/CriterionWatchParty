import { createSlice } from '@reduxjs/toolkit';
import { getBotUser, getShortTime } from '../utils';

const welcomeMessage = {
  id: null,
  user: getBotUser(),
  data: 'Welcome to the party! Copy your party link above and share away!',
  timestamp: getShortTime(),
  isUserMessage: false,
};

export const partySlice = createSlice({
  name: 'party',
  initialState: {
    // TODO: need to implement logic for creating an id for the party server-side.
    id: null,
    restrictPartyControlToLeader: false,
    isPartyActive: false,
    isChatActive: false,
    showAudience: false,
    // TODO: need to implement logic for creating a partyUrl server-side.
    partyUrl: '',
    dateCreated: null,
    // TODO: need a reducer for dealing with new connecting users
    users: [],
    // Server should supply default message at start.
    // Server should also suppy any connection or leave messages.
    messages: [welcomeMessage],
  },
  reducers: {
    togglePartyControlRestriction: state => {
      state.restrictPartyControlToLeader = !state.restrictPartyControlToLeader;
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

// Actions
export const {
  togglePartyControlRestriction,
  setPartyUrl,
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
