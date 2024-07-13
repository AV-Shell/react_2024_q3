import { ReactNode } from 'react';
import './PersonCard.css';
import { IResult } from '../../models/api';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SEARCH_STRING } from '../../utils/const';

interface IProps {
  person: IResult;
}

export function PersonCard(props: IProps): ReactNode {
  const { person } = props;
  const personId: string = person.url.split('/').slice(-2)[0];
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get(SEARCH_STRING);

  function onClick(e: React.SyntheticEvent) {
    e.stopPropagation();
  }

  return (
    <NavLink
      onClick={onClick}
      to={`person/${personId}${page ? `?page=${page}` : ''}${search ? `&${SEARCH_STRING}=${search}` : ''}`}
      className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
      <article>
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
    </NavLink>
  );
}
