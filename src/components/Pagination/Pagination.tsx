import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/storeHooks';
import { maxPersonsPerPage } from '../../utils/const';
import s from './Pagination.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/context';
import { personsResultSelector } from '../../store/selectors';

interface IBProps {
  onChange: (page: number) => void;
  num: number;
  active: boolean;
  disabled: boolean;
}

const PaginationButton: React.FC<IBProps> = props => {
  const { active, disabled, num, onChange } = props;
  const handleChange = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onChange(num);
  };

  return (
    <button
      disabled={disabled || active}
      onClick={handleChange}
      className={`${disabled ? s.disabled : ''} ${active ? s.active : ''}`}>
      <span>{num}</span>
    </button>
  );
};

export const Pagination: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const currentPage: number = +(params.get('page') ?? 1);
  const handlePageChange = (newPage: number) => {
    params.set('page', String(newPage));
    setParams(params);
    console.log(`\n\n\n\n\n\n`, params);
  };
  const isDark = useContext(ThemeContext);

  const {
    isLoading,
    persons: { count },
  } = useAppSelector(personsResultSelector);

  return (
    <div
      data-testid="paginationContainer"
      className={`${s.container} ${isDark ? s.dark : ''}`}
      onClick={e => e.stopPropagation()}>
      {Array(Math.ceil(count / maxPersonsPerPage))
        .fill('')
        .map((_, index) => {
          return (
            <PaginationButton
              disabled={isLoading}
              num={index + 1}
              key={index}
              onChange={handlePageChange}
              active={currentPage === index + 1}
            />
          );
        })}
    </div>
  );
};
