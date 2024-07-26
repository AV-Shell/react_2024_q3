import { configureStore } from '@reduxjs/toolkit';
import { checkboxesReducer } from './checkboxSlice';

export const configuredStore = configureStore({
  reducer: {
    checkboxState: checkboxesReducer,
  },
});

export type AppDispatch = typeof configuredStore.dispatch;
export type TRootState = ReturnType<typeof configuredStore.getState>;

export const checkboxesSelector = (state: TRootState) => state.checkboxState.checkboxes;
