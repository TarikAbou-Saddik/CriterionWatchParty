import { createSlice } from '@reduxjs/toolkit';

export const partySlice = createSlice({
  name: 'party',
  initialState: {
    id: null,
    restrictPartyControlToLeader: false,
    isPartyActive: false,
    isChatActive: false,
    partyUrl: '',
    dateCreated: null,
    members: [],
  },
  reducers: {
    togglePartyControlRestriction: state => {
      state.restrictPartyControlToLeader = !state.restrictPartyControlToLeader;
    },
    setPartyUrl: (state, action) => {
      state.partyUrl = action.payload;
    },
    togglePartyStatus: state => {
      state.isPartyActive = !state.isPartyActive;
    },
    toggleChatStatus: state => {
      state.isChatActive = !state.isChatActive;
    },
  },
});

// Selectors
export const restrictPartyControlSelect = state =>
  state.party.restrictPartyControlToLeader;
export const partyUrlSelect = state => state.party.partyUrl;
export const isPartyActiveSelect = state => state.party.isPartyActive;
export const isChatActiveSelect = state => state.party.isChatActive;

// Actions
export const {
  togglePartyControlRestriction,
  setPartyUrl,
  togglePartyStatus,
  toggleChatStatus,
} = partySlice.actions;

// Our 'party' reducer
export default partySlice.reducer;
