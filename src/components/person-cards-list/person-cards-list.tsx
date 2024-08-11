'use client';
import { ReactNode } from 'react';
import s from './person-cards-list.module.css';
import { IResWithID } from '@/models/api';
import { PersonCard } from '@/components/person-card/person-card';

interface IProps {
  results: Array<IResWithID>;
}

export function PersonCardsList(props: IProps): ReactNode {
  return (
    <div className={s.results}>
      {props.results.length ? (
        props.results.map((x: IResWithID) => {
          return <PersonCard person={x} key={x.name} />;
        })
      ) : (
        <div>No results</div>
      )}
    </div>
  );
}
