import { ReactNode } from 'react';
import style from './UncontrolledFormPage.module.css';
import { NavLink } from 'react-router-dom';

export function UncontrolledFormPage(): ReactNode {
  return (
    <>
      <NavLink to={`/`} className={style.link} children={'main'} />
      <NavLink to={`/controlled`} className={style.link} children={'controlled'} />
    </>
  );
}
