import { ReactNode } from 'react';
import './SearchPanel.css';

interface IProps {
  onSubmit: (e: React.SyntheticEvent) => void;
  onChange: (e: React.SyntheticEvent) => void;
  value: string;
}

export function SearchPanel(props: IProps): ReactNode {
  const { onSubmit, onChange, value } = props;
  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} type="search" name="search" value={value} />
      <button type="submit">Search</button>
    </form>
  );
}
