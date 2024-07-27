import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAPIResp, IAPIRespWithId, IResult, IResWithID } from '../models/api';
import { API_LINK, SEARCH_STRING } from '../utils/const';
import { IdFromUrlConverter } from '../utils/converters';

export const swapiApi = createApi({
  reducerPath: 'personsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_LINK }),
  endpoints: builder => ({
    getPersons: builder.query<IAPIRespWithId, { search: string; page: number }>({
      query: ({ search, page }) => {
        const queryPage = page ? `page=${page}` : '';
        const searchParamsString = search ? `${SEARCH_STRING}=${search}` : '';
        const paramString = [searchParamsString, queryPage].filter(x => x).join('&');
        return `people/${paramString ? `?${paramString}` : ''}`;
      },
      transformResponse: (data: IAPIResp): IAPIRespWithId => ({
        ...data,
        results: data.results.map(res => ({ ...res, id: IdFromUrlConverter(res.url) })),
      }),
    }),
    getPersonById: builder.query<IResWithID, string>({
      query: (personId: string) => {
        return `people/${personId}`;
      },
      transformResponse: (data: IResult): IResWithID => ({
        ...data,
        id: IdFromUrlConverter(data.url),
      }),
    }),
  }),
});

export const { useGetPersonsQuery, useGetPersonByIdQuery } = swapiApi;
