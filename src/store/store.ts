import { configureStore } from '@reduxjs/toolkit';
import { checkboxesReducer } from './checkboxSlice';
import { swapiApi } from './swapiApi';
import { personsReducer } from './personsResultsSlice';

export const configuredStore = configureStore({
  reducer: {
    checkboxState: checkboxesReducer,
    personsResult: personsReducer,
    [swapiApi.reducerPath]: swapiApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiApi.middleware),
});

export type AppDispatch = typeof configuredStore.dispatch;
export type TRootState = ReturnType<typeof configuredStore.getState>;

export const checkboxesSelector = (state: TRootState) => state.checkboxState.checkboxes;
