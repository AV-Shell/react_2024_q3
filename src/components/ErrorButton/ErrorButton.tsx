import { ReactNode, useState } from 'react';
import './ErrorButton.css';

export function ErrorButton(): ReactNode {
  {
    const [error, setError] = useState(false);

    if (error) {
      throw new Error('pu pu pu...');
    }

    return (
      <button onClick={() => setError(true)} className="errorButton">
        Error Button
      </button>
    );
  }
}
