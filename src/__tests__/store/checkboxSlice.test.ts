import * as slice from '../../store/checkboxSlice';
import { describe, expect, it } from 'vitest';
import { checkbox1, checkbox2, checkbox3 } from '../testdata';
import { ICheckbox } from '../../store/types';

describe('CheckBoxSlice Tests', () => {
  it('should return default state when passed an empty action', () => {
    const result = slice.checkboxesReducer(undefined, { type: '' });

    expect(result).toEqual(slice.initialCheckboxesState);
  });

  it('should set new checkbox on action', () => {
    const checkbox: ICheckbox = checkbox1;
    const action = { type: slice.addCheckbox.type, payload: checkbox };

    const result = slice.checkboxesReducer(
      {
        checkboxes: {},
      },
      action,
    );

    expect(result.checkboxes[checkbox.id]).toEqual(checkbox);
  });
  it('should delete checkbox on action', () => {
    const action = { type: slice.removeCheckbox.type, payload: { id: checkbox1.id } };

    const state = {
      checkboxes: {
        [checkbox1.id]: checkbox1,
        [checkbox2.id]: checkbox2,
        [checkbox3.id]: checkbox3,
      },
    };

    const result = slice.checkboxesReducer(state, action);

    expect(result.checkboxes[checkbox1.id]).toEqual(undefined);
    expect(result.checkboxes[checkbox2.id]).toEqual(checkbox2);
    expect(result.checkboxes[checkbox3.id]).toEqual(checkbox3);
  });
  it('should delete all checkbox on action', () => {
    const action = { type: slice.removeAllCheckboxes.type };

    const state = {
      checkboxes: {
        [checkbox1.id]: checkbox1,
        [checkbox2.id]: checkbox2,
        [checkbox3.id]: checkbox3,
      },
    };

    const result = slice.checkboxesReducer(state, action);

    expect(Object.keys(result.checkboxes).length).toEqual(0);
  });
});
