import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPersonsState } from './types.d';
import { IAPIRespWithId, IResWithID } from '../models/api';

export const initialPersonsState: TPersonsState = {
  persons: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  personDetails: null,
  isLoading: false,
  isLoadingDetails: false,
};

const personsSlice = createSlice({
  name: 'persons',
  initialState: initialPersonsState,
  reducers: {
    setPersons(state, action: PayloadAction<IAPIRespWithId>) {
      state.persons = action.payload;
    },
    setPersonDetails(state, action: PayloadAction<IResWithID>) {
      state.personDetails = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsLoadingDetails(state, action: PayloadAction<boolean>) {
      state.isLoadingDetails = action.payload;
    },
  },
});

export const { setPersons, setPersonDetails, setIsLoading, setIsLoadingDetails } = personsSlice.actions;

export const personsReducer = personsSlice.reducer;
