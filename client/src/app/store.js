import { configureStore } from '@reduxjs/toolkit';
import partyReducer from '../redux/partySlice';
import userReducer from '../redux/userSlice';

export default configureStore({
  reducer: {
    party: partyReducer,
    user: userReducer,
  },
});
