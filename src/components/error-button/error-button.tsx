'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, useState } from 'react';
import s from './error-button.module.css';
import cn from 'classnames';

export interface ErrorButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
}

export function ErrorButton({ children, className, ...restProps }: ErrorButtonProps): ReactNode {
  {
    const [error, setError] = useState(false);

    if (error) {
      throw new Error('pu pu pu...');
    }

    return (
      <button onClick={() => setError(true)} className={cn(s.errorButton, className)} {...restProps}>
        {children || 'Error Button'}
      </button>
    );
  }
}
