import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormsState } from './types.d';
import { FormStateValues } from '../models/form';

export const initialFormsState: TFormsState = {
  forms: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState: initialFormsState,
  reducers: {
    setForms(state, action: PayloadAction<FormStateValues>) {
      state.forms.push(action.payload);
    },
  },
});

export const { setForms } = formsSlice.actions;

export const formsReducer = formsSlice.reducer;
