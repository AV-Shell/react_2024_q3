import { useAppSelector } from '../../store/storeHooks';
import { maxPersonsPerPage } from '../../utils/const';
import s from './Pagination.module.css';
import { useContext } from 'react';
import { personsResultSelector } from '../../store/selectors';
import { ThemeContext } from '@/context/theme.context';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useRouter } from 'next/router';
import cn from 'classnames';

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
      className={cn({ [s.disabled]: disabled, [s.active]: active })}>
      <span>{num}</span>
    </button>
  );
};

export const Pagination: React.FC = () => {
  const searchParams = useQueryParams();
  const router = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    isLoading,
    persons: { count },
  } = useAppSelector(personsResultSelector);
  const { page = 1 } = searchParams;
  const currentPage: number = +page;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${newPage}`);
    const queryString = params.toString();
    const updatedPath = queryString ? `${router.route}?${queryString}` : router.route;
    router.push(updatedPath);
  };

  return (
    <div
      data-testid="paginationContainer"
      className={`${s.container} ${isDarkTheme ? s.dark : ''}`}
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
