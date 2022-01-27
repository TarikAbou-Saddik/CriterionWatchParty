import { createSlice } from '@reduxjs/toolkit';
import { iconsList } from '../utils';

const initialState = {
  id: null,
  dateCreated: null,
  name: '',
  // TODO: Remove this. This is only to test out the type for the userIcon.
  userIcon: iconsList[0],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.name = action.payload;
    },
    setUserIcon: (state, action) => {
      state.userIcon = action.payload;
    },
    resetUser: state => {
      state.user = initialState;
    },
  },
});

// Selectors
export const userNameSelect = state => state.user.name;
export const userIconSelect = state => state.user.userIcon;

// Actions
export const { setUserIcon, setUsername, resetUser } = userSlice.actions;

// Our 'user' Reducer
export default userSlice.reducer;
