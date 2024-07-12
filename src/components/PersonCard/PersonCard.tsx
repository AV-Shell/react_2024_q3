import { ReactNode } from 'react';
import './PersonCard.css';
import { IResult } from '../../models/api';

interface IProps {
  person: IResult;
  key: string;
}

export function PersonCard(props: IProps): ReactNode {
  const { person, key } = props;
  return (
    <article key={key}>
      <div className="field">
        <span className="title">name: </span>
        <span className="description">{person.name}</span>
      </div>
      <div className="other">
        <div className="field">
          <span className="title">height: </span>
          <span className="description">{person.height}</span>
        </div>
        <div className="field">
          <span className="title">mass: </span>
          <span className="description">{person.mass}</span>
        </div>
        <div className="field">
          <span className="title">skin color: </span>
          <span className="description">{person.skin_color}</span>
        </div>
        <div className="field">
          <span className="title">hair color: </span>
          <span className="description">{person.hair_color}</span>
        </div>
        <div className="field">
          <span className="title">eye color: </span>
          <span className="description">{person.eye_color}</span>
        </div>
        <div className="field">
          <span className="title">gender: </span>
          <span className="description">{person.gender}</span>
        </div>
      </div>
    </article>
  );
}
