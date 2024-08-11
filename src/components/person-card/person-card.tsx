'use client';
import { ReactNode, useContext } from 'react';
import s from './person-card.module.css';
import cn from 'classnames';
import { IResWithID } from '@/models/api';
import { SEARCH_STRING } from '../../utils/const';
import { checkboxesSelector } from '../../store/selectors';
import { addCheckbox, removeCheckbox } from '../../store/checkboxSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { ThemeContext } from '@/context/theme.context';
import Link from 'next/link';
import { useQueryParams } from '@/hooks/useQueryParams';

interface IProps {
  person: IResWithID;
}

export function PersonCard(props: IProps): ReactNode {
  const { person } = props;
  const personId: string = person.url.split('/').slice(-2)[0];
  const searchParams = useQueryParams();
  const { personId: searchParamsPersonId = '', page = '1', search = '' } = searchParams;

  const dispatch = useAppDispatch();
  const checkboxes = useAppSelector(checkboxesSelector);
  const isChecked = Boolean(checkboxes[personId]);
  const { isDarkTheme } = useContext(ThemeContext);

  const isActive = searchParamsPersonId === person.id;

  function onClick(e: React.SyntheticEvent) {
    e.stopPropagation();
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      dispatch(addCheckbox({ ...person, id: personId }));
    } else {
      dispatch(removeCheckbox({ id: personId }));
    }
  };

  return (
    <div className={cn(s.card, { [s.dark]: isDarkTheme })}>
      <label htmlFor="" className={s.label}>
        <input type="checkbox" checked={isChecked} onChange={onChange} className={s.input} />
      </label>
      <Link
        data-testid="navlink"
        onClick={onClick}
        href={`?personId=${personId}${page ? `&page=${page}` : ''}${search ? `&${SEARCH_STRING}=${search}` : ''}`}
        className={cn({ [s.active]: isActive })}>
        <article className={s.article}>
          <div className={s.field}>
            <span className={s.title}>name: </span>
            <span className={s.description}>{person.name}</span>
          </div>
          <div className={s.other}>
            <div className={s.field}>
              <span className={s.title}>height: </span>
              <span className={s.description}>{person.height}</span>
            </div>
            <div className={s.field}>
              <span className={s.title}>mass: </span>
              <span className={s.description}>{person.mass}</span>
            </div>
            <div className={s.field}>
              <span className={s.title}>skin color: </span>
              <span className={s.description}>{person.skin_color}</span>
            </div>
            <div className={s.field}>
              <span className={s.title}>hair color: </span>
              <span className={s.description}>{person.hair_color}</span>
            </div>
            <div className={s.field}>
              <span className={s.title}>eye color: </span>
              <span className={s.description}>{person.eye_color}</span>
            </div>
            <div className={s.field}>
              <span className={s.title}>gender: </span>
              <span className={s.description}>{person.gender}</span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
