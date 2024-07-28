import { IResult } from '../models/api';

export const convertPersonsToCSV = (objArray: IResult[]) => {
  let str = '';

  if (objArray.length) {
    const titles: Array<keyof IResult> = Object.keys(objArray[0]) as Array<keyof (typeof objArray)[0]>;
    str += titles.map(x => `"${x}"`).join(',') + '\r\n';

    objArray.forEach((el: IResult) => {
      let line = '';
      titles.forEach((key: keyof IResult) => {
        const d = `"${el[key]}"`;
        if (line !== '') line += ',';

        line += d;
      });
      str += line + '\r\n';
    });
  }
  return str;
};

export const IdFromUrlConverter = (url: string) => url.split('/').slice(-2)[0] || '0';
