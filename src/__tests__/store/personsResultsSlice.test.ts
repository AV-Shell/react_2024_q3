import * as slice from '../../store/personsResultsSlice';
import { describe, expect, it } from 'vitest';
import { personsResult, checkbox3, checkbox1 } from '../testdata';

describe('CheckBoxSlice Tests', () => {
  it('should return default state when passed an empty action', () => {
    const result = slice.personsReducer(undefined, { type: '' });
    expect(result).toEqual(slice.initialPersonsState);
  });

  it('should set loading page state', () => {
    let action = { type: slice.setIsLoading.type, payload: true };
    let result = slice.personsReducer(personsResult, action);
    expect(result.isLoading).toEqual(true);
    action = { type: slice.setIsLoading.type, payload: false };
    result = slice.personsReducer(personsResult, action);
    expect(result.isLoading).toEqual(false);
    action = { type: slice.setIsLoading.type, payload: true };
    result = slice.personsReducer(personsResult, action);
    expect(result.isLoading).toEqual(true);
    action = { type: slice.setIsLoading.type, payload: false };
    result = slice.personsReducer(personsResult, action);
    expect(result.isLoading).toEqual(false);
  });
  it('should set loadingDetails state', () => {
    let action = { type: slice.setIsLoadingDetails.type, payload: true };
    let result = slice.personsReducer(personsResult, action);
    expect(result.isLoadingDetails).toEqual(true);
    action = { type: slice.setIsLoadingDetails.type, payload: false };
    result = slice.personsReducer(personsResult, action);
    expect(result.isLoadingDetails).toEqual(false);
    action = { type: slice.setIsLoadingDetails.type, payload: true };
    result = slice.personsReducer(personsResult, action);
    expect(result.isLoadingDetails).toEqual(true);
    action = { type: slice.setIsLoadingDetails.type, payload: false };
    result = slice.personsReducer(personsResult, action);
    expect(result.isLoadingDetails).toEqual(false);
  });
  it('should set details state', () => {
    let action = { type: slice.setPersonDetails.type, payload: checkbox3 };
    let result = slice.personsReducer(
      {
        persons: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        personDetails: null,
        isLoading: false,
        isLoadingDetails: false,
      },
      action,
    );
    expect(result.personDetails).toEqual(checkbox3);
    action = { type: slice.setPersonDetails.type, payload: checkbox1 };
    result = slice.personsReducer(
      {
        persons: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        personDetails: checkbox3,
        isLoading: false,
        isLoadingDetails: false,
      },
      action,
    );
    expect(result.personDetails).toMatchObject(checkbox1);
  });
  it('should set persons state', () => {
    let payload = {
      count: 3,
      next: null,
      previous: null,
      results: [checkbox3, checkbox3, checkbox3],
    };

    let action = { type: slice.setPersons.type, payload };
    let result = slice.personsReducer(
      {
        persons: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        personDetails: null,
        isLoading: false,
        isLoadingDetails: false,
      },
      action,
    );
    expect(result.persons.count).toEqual(3);
    expect(result.persons).toMatchObject(payload);
    payload = {
      count: 2,
      next: null,
      previous: null,
      results: [checkbox3, checkbox3],
    };

    action = { type: slice.setPersons.type, payload };
    result = slice.personsReducer(
      {
        persons: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        personDetails: checkbox3,
        isLoading: false,
        isLoadingDetails: false,
      },
      action,
    );
    expect(result.persons.count).toEqual(2);
    expect(result.persons).toMatchObject(payload);
  });
});
