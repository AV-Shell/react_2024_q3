import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/storeHooks';
import { maxPersonsPerPage } from '../../utils/const';
import './Pagination.css';

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
      className={`${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`}>
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
  };

  const {
    isLoading,
    persons: { count },
  } = useAppSelector(state => state.personsResult);

  return (
    <div className="container" onClick={e => e.stopPropagation()}>
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
