import { IResult } from '../models/api';

export interface ICheckbox extends IResult {
  id: string;
}

export type TCheckboxesState = {
  checkboxes: {
    [key: string]: ICheckbox;
  };
};
