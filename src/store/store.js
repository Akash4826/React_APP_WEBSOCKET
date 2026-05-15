import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./reducers/counterReducer"

export const store = configureStore({
  reducer: {
    counter : counterReducer
  }, // Reducers will be added here later
});