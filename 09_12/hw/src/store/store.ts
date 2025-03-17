import { configureStore } from '@reduxjs/toolkit';
import dogsReducer from './dogSlice';

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
  },
});