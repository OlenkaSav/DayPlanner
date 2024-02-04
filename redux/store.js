import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
  },
});

export default store;