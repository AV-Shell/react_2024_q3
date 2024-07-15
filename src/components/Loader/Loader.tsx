import { ReactNode } from 'react';
import './Loader.css';

export function Loader(): ReactNode {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
}
