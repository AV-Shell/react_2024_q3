import { ReactNode } from 'react';
import './PersonCardsList.css';
import { IResult } from '../../models/api';
import { PersonCard } from '../PersonCard/PersonCard';

interface IProps {
  results: Array<IResult>;
}

export function PersonCardsList(props: IProps): ReactNode {
  return (
    <div className="results">
      {props.results.length ? (
        props.results.map((x: IResult) => {
          return <PersonCard person={x} key={x.name} />;
        })
      ) : (
        <div>No results</div>
      )}
    </div>
  );
}
