import { PureComponent, ReactNode } from 'react';
import './PersonCardsList.css';
import { IResult } from '../../models/api';
import { PersonCard } from '../PersonCard/PersonCard';

interface IProps {
  results: Array<IResult>;
}
interface IState {}

export class PersonCardsList extends PureComponent<IProps, IState> {
  render(): ReactNode {
    const { results } = this.props;

    return (
      <div className="results">
        {results.length ? (
          results.map((x: IResult) => {
            return <PersonCard person={x} key={x.name} />;
          })
        ) : (
          <div>No results</div>
        )}
      </div>
    );
  }
}
