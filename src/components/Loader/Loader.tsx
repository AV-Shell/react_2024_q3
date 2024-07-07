import { PureComponent, ReactNode } from 'react';
import './Loader.css';

export class Loader extends PureComponent {
  render(): ReactNode {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
}
