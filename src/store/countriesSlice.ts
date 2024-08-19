import { createSlice } from '@reduxjs/toolkit';
import { TCountries } from './types.d';
import { COUNTRYLIST } from '../utils/const';

export const initialCountriesState: TCountries = { countries: [...COUNTRYLIST] };

const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialCountriesState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
