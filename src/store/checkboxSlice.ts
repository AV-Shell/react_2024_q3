import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCheckboxesState, ICheckbox } from './types.d';

export const initialCheckboxesState: TCheckboxesState = { checkboxes: {} };

const checkboxSlice = createSlice({
  name: 'checkboxes',
  initialState: initialCheckboxesState,
  reducers: {
    addCheckbox(state, action: PayloadAction<ICheckbox>) {
      state.checkboxes[action.payload.id] = action.payload;
    },
    removeCheckbox(state, action: PayloadAction<{ id: string }>) {
      delete state.checkboxes[action.payload.id];
    },
    removeAllCheckboxes(state) {
      state.checkboxes = {};
    },
  },
});

export const { addCheckbox, removeAllCheckboxes, removeCheckbox } = checkboxSlice.actions;

export const checkboxesReducer = checkboxSlice.reducer;
