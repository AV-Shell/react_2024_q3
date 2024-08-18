import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countriesSlice';
import { formsReducer } from './formsSlice';

export const configuredStore = configureStore({
  reducer: {
    countriesState: countriesReducer,
    formsState: formsReducer,
  },
});

export type AppDispatch = typeof configuredStore.dispatch;
export type TRootState = ReturnType<typeof configuredStore.getState>;
