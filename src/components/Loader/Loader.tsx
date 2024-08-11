'use client';
import { ReactNode } from 'react';
import s from './loader.module.css';

export function Loader(): ReactNode {
  return (
    <div className={s.loaderWrapper}>
      <div className={s.loader}></div>
    </div>
  );
}
