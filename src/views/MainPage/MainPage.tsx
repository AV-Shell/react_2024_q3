import { ReactNode } from 'react';
import style from './MainPage.module.css';
import { NavLink } from 'react-router-dom';
import { formsSelector } from '../../store/selectors';
import { useAppSelector } from '../../store/storeHooks';
import classNames from 'classnames';

export function MainPage(): ReactNode {
  const formsList = useAppSelector(formsSelector);

  const formsData = [];
  for (let i = formsList.length - 1; i >= 0; i--) {
    const formData = formsList[i];
    formsData.push(
      <div className={classNames(style.form, { [style.last]: i === formsList.length - 1 })}>
        <div className={style.imgContainer}>
          <img src={`data:image/jpeg;base64,${formData.pictureFile}`} />
        </div>
        <div className={style.dataContainer}>
          <div className={style.plashka}>
            <span className={style.title}>Name:</span>
            <span className={style.field}>{formData.name}</span>
          </div>
          <div className={style.plashka}>
            <span className={style.title}>Age:</span>
            <span className={style.field}>{formData.age}</span>
          </div>
          <div className={style.plashka}>
            <span className={style.title}>Email:</span>
            <span className={style.field}>{formData.email}</span>
          </div>
          <div className={style.plashka}>
            <span className={style.title}>Password:</span>
            <span className={style.field}>{formData.password}</span>
          </div>
          <div className={style.plashka}>
            <span className={style.title}>Password Confurm:</span>
            <span className={style.field}>{formData.confirmPassword}</span>
          </div>
          <div className={style.plashka}>
            <span className={style.title}>Gender:</span>
            <span className={style.field}>{formData.gender}</span>
          </div>
          <div className={style.plashka}>
            <span className={style.title}>accept Terms and Conditions agreement: </span>
            <span className={style.field}>{`${formData.ataca}`}</span>
          </div>
          <div className={style.plashka}>
            <span className={style.title}>Country</span>
            <span className={style.field}>{formData.country}</span>
          </div>
        </div>
      </div>,
    );
  }

  return (
    <div>
      <header>
        <NavLink to={`/controlled`} className={style.link} children={'Controlled form'} />
        <NavLink to={`/uncontrolled`} className={style.link} children={'Uncontrolled form'} />
      </header>
      <main>{...formsData}</main>
    </div>
  );
}
