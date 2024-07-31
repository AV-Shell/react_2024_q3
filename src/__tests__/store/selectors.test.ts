import { checkboxesSelector, personsResultSelector } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { describe, expect, it, vi } from 'vitest';
import { results } from '../testdata';
import { ICheckbox, TCheckboxesState, TPersonsState } from '../../store/types';
import { IdFromUrlConverter } from '../../utils/converters';
import { IAPIRespWithId } from '../../models/api';
import { TRootState } from '../../store/store';

describe('Redux Selectors Tests', () => {
  it('can get from state', () => {
    const iresult = results[0][0];
    const id = IdFromUrlConverter(iresult.url);
    const checkbox: ICheckbox = { ...iresult, id };
    const checkboxState: TCheckboxesState = {
      checkboxes: {
        id: checkbox,
      },
    };
    const persons: IAPIRespWithId = {
      count: 1,
      next: null,
      previous: null,
      results: [checkbox],
    };

    const personsResult: TPersonsState = {
      persons,
      personDetails: checkbox,
      isLoading: false,
      isLoadingDetails: false,
    };
    type TPersonsApi = TRootState['personsApi'];
    const fakePersonsApi = {} as TPersonsApi;

    const result = checkboxesSelector({ checkboxState, personsResult, personsApi: fakePersonsApi });
    const result2 = personsResultSelector({
      checkboxState,
      personsResult,
      personsApi: fakePersonsApi,
    });
    expect(result).toEqual(checkboxState.checkboxes);
    expect(result2).toEqual(personsResult);
  });
});

describe('Redux Hooks Tests', () => {
  it('can be', () => {
    expect(useAppDispatch).toBeDefined();
    expect(useAppSelector).toBeDefined();

    vi.mock('react-redux', async () => {
      const mod = await vi.importActual('react-redux');
      return {
        ...mod,
        useDispatch: () => 'UseDispatchCalled',
        useSelector: () => 'UseSelectorCalled',
      };
    });
    const newUseAppSelector = useAppSelector as never as () => string;
    expect(useAppDispatch()).toBe('UseDispatchCalled');
    expect(newUseAppSelector()).toBe('UseSelectorCalled');

    vi.clearAllMocks();
  });
});
