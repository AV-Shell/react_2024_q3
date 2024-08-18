import { TRootState } from './store';

export const countriesSelector = (state: TRootState) => state.countriesState.countries;
export const formsSelector = (state: TRootState) => state.formsState.forms;
