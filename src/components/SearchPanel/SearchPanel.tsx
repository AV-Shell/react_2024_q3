import { PureComponent, ReactNode } from 'react';

interface IProps {
  onSubmit: (e: React.SyntheticEvent) => void;
  onChange: (e: React.SyntheticEvent) => void;
  value: string;
}
interface IState {}

export class SearchPanel extends PureComponent<IProps, IState> {
  render(): ReactNode {
    const { onSubmit, onChange, value } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="search" name="search" value={value} />
        <button type="submit">Search</button>
      </form>
    );
  }
}
