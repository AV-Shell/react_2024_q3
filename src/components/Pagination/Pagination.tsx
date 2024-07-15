import { ReactNode } from 'react';
import './Pagination.css';

interface IProps {
  onChange: (page: number) => void;
  value: number;
  maxValues: number;
  maxPerPage: number;
  isLoading: boolean;
}

interface IBProps {
  onChange: (page: number) => void;
  num: number;
  active: boolean;
  disabled: boolean;
}

function PaginationButton(props: IBProps) {
  const { active, disabled, num, onChange } = props;

  return (
    <button
      disabled={disabled || active}
      onClick={() => onChange(num)}
      className={`${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`}>
      <span>{num}</span>
    </button>
  );
}

export function Pagination(props: IProps): ReactNode {
  const { onChange, value, maxPerPage, maxValues, isLoading } = props;

  return (
    <div className="container">
      {Array(Math.ceil(maxValues / maxPerPage))
        .fill('')
        .map((_, index) => {
          return (
            <PaginationButton
              disabled={isLoading}
              num={index + 1}
              key={index}
              onChange={onChange}
              active={value === index + 1}
            />
          );
        })}
    </div>
  );
}
