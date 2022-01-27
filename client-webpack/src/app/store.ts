import { configureStore } from '@reduxjs/toolkit';
import partyReducer from '../redux/partySlice/partySlice';
import userReducer from '../redux/userSlice';

const store = configureStore({
  reducer: {
    party: partyReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
