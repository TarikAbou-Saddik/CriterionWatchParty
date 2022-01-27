import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getBotUser, getShortTime } from '../../utils';
import { PartyState, Message } from './types';
import { getChromeState, setPartyRestriction } from './thunks';

const welcomeMessage: Message = {
  id: null,
  user: getBotUser(),
  data: 'Welcome to the party! Copy your party link above and share away!',
  timestamp: getShortTime(),
  isUserMessage: false,
};

const initialState: PartyState = {
  id: null,
  restrictPartyControl: false,
  partyUrl: '',
  dateCreated: new Date().toLocaleTimeString(),
  users: [],
  messages: [welcomeMessage],
  showAudience: false,
  currentPage: 'INIT',
};

export const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    setPartyControlRestriction: state => {
      state.restrictPartyControl = !state.restrictPartyControl;
    },
    setPartyId: (state, action) => {
      state.id = action.payload;
    },
    setPartyUrl: (state, action) => {
      state.partyUrl = action.payload;
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
  extraReducers(builder) {
    builder
      .addCase(getChromeState.fulfilled, (state, action) => {
        state.restrictPartyControl = action.payload;
      })
      .addCase(setPartyRestriction.fulfilled, (state, action) => {
        state.restrictPartyControl = action.payload;
      });
  },
});

// Selectors
export const restrictPartyControlSelect = (state: RootState) =>
  state.party.restrictPartyControl;
export const partyUrlSelect = (state: RootState) => state.party.partyUrl;
export const usersSelect = (state: RootState) => state.party.users;
export const messagesSelect = (state: RootState) => state.party.messages;

// Exported action
export const {
  setPartyControlRestriction,
  setPartyUrl,
  setPartyId,
  addMember,
  removeMember,
  addMessage,
  removeMessageById,
  toggleShowAudience,
} = partySlice.actions;

// Our 'party' reducer
export default partySlice.reducer;
