import { IAPIRespWithId, IResult, IResWithID } from '../models/api';

export interface ICheckbox extends IResult {
  id: string;
}

export type TCheckboxesState = {
  checkboxes: {
    [key: string]: ICheckbox;
  };
};

export type TPersonsState = {
  persons: IAPIRespWithId;
  personDetails: IResWithID | null;
  isLoading: boolean;
  isLoadingDetails: boolean;
};
