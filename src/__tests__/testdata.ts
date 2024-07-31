import { IAPIRespWithId, IResult } from '../models/api';
import { ICheckbox, TPersonsState } from '../store/types';
import { IdFromUrlConverter } from '../utils/converters';

export const results: IResult[][] = [
  [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
      starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
  [
    {
      name: 'C-3PO',
      height: '167',
      mass: '75',
      hair_color: 'n/a',
      skin_color: 'gold',
      eye_color: 'yellow',
      birth_year: '112BBY',
      gender: 'n/a',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      species: ['https://swapi.dev/api/species/2/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:10:51.357000Z',
      edited: '2014-12-20T21:17:50.309000Z',
      url: 'https://swapi.dev/api/people/2/',
    },
    {
      name: 'R2-D2',
      height: '96',
      mass: '32',
      hair_color: 'n/a',
      skin_color: 'white, blue',
      eye_color: 'red',
      birth_year: '33BBY',
      gender: 'n/a',
      homeworld: 'https://swapi.dev/api/planets/8/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      species: ['https://swapi.dev/api/species/2/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:11:50.376000Z',
      edited: '2014-12-20T21:17:50.311000Z',
      url: 'https://swapi.dev/api/people/3/',
    },
  ],
  [
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/13/'],
      created: '2014-12-10T15:18:20.704000Z',
      edited: '2014-12-20T21:17:50.313000Z',
      url: 'https://swapi.dev/api/people/4/',
    },
    {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/2/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/30/'],
      starships: [],
      created: '2014-12-10T15:20:09.791000Z',
      edited: '2014-12-20T21:17:50.315000Z',
      url: 'https://swapi.dev/api/people/5/',
    },
    {
      name: 'Owen Lars',
      height: '178',
      mass: '120',
      hair_color: 'brown, grey',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '52BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/5/', 'https://swapi.dev/api/films/6/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:52:14.024000Z',
      edited: '2014-12-20T21:17:50.317000Z',
      url: 'https://swapi.dev/api/people/6/',
    },
  ],
];

export const csvs = [
  `"name","height","mass","hair_color","skin_color","eye_color","birth_year","gender","homeworld","films","species","vehicles","starships","created","edited","url"\r\n"Luke Skywalker","172","77","blond","fair","blue","19BBY","male","https://swapi.dev/api/planets/1/","https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/6/","","https://swapi.dev/api/vehicles/14/,https://swapi.dev/api/vehicles/30/","https://swapi.dev/api/starships/12/,https://swapi.dev/api/starships/22/","2014-12-09T13:50:51.644000Z","2014-12-20T21:17:56.891000Z","https://swapi.dev/api/people/1/"\r\n`,
  `"name","height","mass","hair_color","skin_color","eye_color","birth_year","gender","homeworld","films","species","vehicles","starships","created","edited","url"\r\n"C-3PO","167","75","n/a","gold","yellow","112BBY","n/a","https://swapi.dev/api/planets/1/","https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/4/,https://swapi.dev/api/films/5/,https://swapi.dev/api/films/6/","https://swapi.dev/api/species/2/","","","2014-12-10T15:10:51.357000Z","2014-12-20T21:17:50.309000Z","https://swapi.dev/api/people/2/"\r\n"R2-D2","96","32","n/a","white, blue","red","33BBY","n/a","https://swapi.dev/api/planets/8/","https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/4/,https://swapi.dev/api/films/5/,https://swapi.dev/api/films/6/","https://swapi.dev/api/species/2/","","","2014-12-10T15:11:50.376000Z","2014-12-20T21:17:50.311000Z","https://swapi.dev/api/people/3/"\r\n`,
  `"name","height","mass","hair_color","skin_color","eye_color","birth_year","gender","homeworld","films","species","vehicles","starships","created","edited","url"\r\n"Darth Vader","202","136","none","white","yellow","41.9BBY","male","https://swapi.dev/api/planets/1/","https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/6/","","","https://swapi.dev/api/starships/13/","2014-12-10T15:18:20.704000Z","2014-12-20T21:17:50.313000Z","https://swapi.dev/api/people/4/"\r\n"Leia Organa","150","49","brown","light","brown","19BBY","female","https://swapi.dev/api/planets/2/","https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/,https://swapi.dev/api/films/6/","","https://swapi.dev/api/vehicles/30/","","2014-12-10T15:20:09.791000Z","2014-12-20T21:17:50.315000Z","https://swapi.dev/api/people/5/"\r\n"Owen Lars","178","120","brown, grey","light","blue","52BBY","male","https://swapi.dev/api/planets/1/","https://swapi.dev/api/films/1/,https://swapi.dev/api/films/5/,https://swapi.dev/api/films/6/","","","","2014-12-10T15:52:14.024000Z","2014-12-20T21:17:50.317000Z","https://swapi.dev/api/people/6/"\r\n`,
];

export const consts = {
  SEARCH_STRING: 'search',
  API_LINK: 'https://swapi.dev/api',
  SEARCH_LINK: 'https://swapi.dev/api/people',
  maxPersonsPerPage: 10,
};

export const checkbox1: ICheckbox = { ...results[2][0], id: IdFromUrlConverter(results[2][0].url) };
export const checkbox2: ICheckbox = { ...results[2][1], id: IdFromUrlConverter(results[2][1].url) };
export const checkbox3: ICheckbox = { ...results[2][2], id: IdFromUrlConverter(results[2][2].url) };

export const persons: IAPIRespWithId = {
  count: 3,
  next: null,
  previous: null,
  results: [checkbox1, checkbox2, checkbox3],
};

export const personsResult: TPersonsState = {
  persons,
  personDetails: checkbox2,
  isLoading: false,
  isLoadingDetails: false,
};
