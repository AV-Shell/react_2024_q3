import { TRootState } from './store';

export const checkboxesSelector = (state: TRootState) => state.checkboxState.checkboxes;
export const personsResultSelector = (state: TRootState) => state.personsResult;
