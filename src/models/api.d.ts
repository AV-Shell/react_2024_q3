export type Link = string;
export type DateString = string;

export interface IResult {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: Link;
  films: Array<Link>;
  species: Array<Link>;
  vehicles: Array<Link>;
  starships: Array<Link>;
  created: DateString;
  edited: DateString;
  url: Link;
}

export interface IAPIResp {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<IResult>;
}
