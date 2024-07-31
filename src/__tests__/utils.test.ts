import { describe, expect, it } from 'vitest';
import { convertPersonsToCSV, IdFromUrlConverter } from '../utils/converters';
import { results, csvs, consts } from './testdata';
import * as testedConsts from '../utils/const';

describe.each([
  { input: 'sdfsf/sdf/', output: 'sdf' },
  { input: 'http://link.com/2/', output: '2' },
  { input: '', output: '0' },
])('Helper Tests', ({ input, output }) => {
  it('IdFromUrlConverter', () => {
    expect(IdFromUrlConverter(input)).toEqual(output);
  });
});

describe.each([{ input: results, output: csvs }])('Helper Tests', ({ input, output }) => {
  it('convertPersonsToCSV', () => {
    expect(convertPersonsToCSV(input[0])).toEqual(output[0]);
    expect(convertPersonsToCSV(input[1])).toEqual(output[1]);
    expect(convertPersonsToCSV(input[2])).toEqual(output[2]);
  });
});

describe.each([{ input: testedConsts, output: consts }])('Consts Tests', ({ input, output }) => {
  it('convertPersonsToCSV', () => {
    expect(input.API_LINK).toEqual(output.API_LINK);
    expect(input.SEARCH_LINK).toEqual(output.SEARCH_LINK);
    expect(input.SEARCH_STRING).toEqual(output.SEARCH_STRING);
    expect(input.maxPersonsPerPage).toEqual(output.maxPersonsPerPage);
  });
});
