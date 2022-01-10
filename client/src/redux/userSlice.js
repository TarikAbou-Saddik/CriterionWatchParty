import { createSlice } from '@reduxjs/toolkit';
import { iconsList } from '../utils';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    dateCreated: null,
    userName: '',
    // TODO: Remove this. This is only to test out the type for the userIcon.
    userIcon: iconsList[0],
  },
  reducers: {
    setUsername: (state, action) => {
      state.userName = action.payload;
    },
    setUserIcon: (state, action) => {
      state.userIcon = action.payload;
    },
  },
});

// Selectors
export const userNameSelect = state => state.user.userName;
export const userIconSelect = state => state.user.userIcon;

// Actions
export const { setUserIcon, setUsername } = userSlice.actions;

// Our 'user' Reducer
export default userSlice.reducer;
