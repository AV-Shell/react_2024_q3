import { useEffect } from 'react';
import './App.css';
import { Loader } from './components/Loader/Loader';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { PersonCardsList } from './components/PersonCardsList/PersonCardsList';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { Pagination } from './components/Pagination/Pagination';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { SEARCH_STRING } from './utils/const';
import { SelectionPanel } from './components/SelectionPanel/SelectionPanex';
import { useGetPersonsQuery } from './store/swapiApi';
import { useAppDispatch } from './store/storeHooks';
import { setIsLoading, setPersons } from './store/personsResultsSlice';

const App: React.FC = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const page: number = +(searchParams.get(`page`) ?? 1);
  const search: string = searchParams.get(SEARCH_STRING) ?? '';
  const leftSideNavigateLink: string = `/?page=${page}${search ? `&${SEARCH_STRING}=${search}` : ''}`;
  const { data: personsResult, isLoading, isFetching, isError } = useGetPersonsQuery({ search, page });
  const loading = isLoading || isFetching;

  useEffect(() => {
    dispatch(setIsLoading(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    if (personsResult) {
      dispatch(setPersons(personsResult));
    }
  }, [personsResult, dispatch]);

  const navigate = useNavigate();

  return (
    <>
      <div className="page">
        <div
          className="leftside"
          onClick={() => {
            navigate(leftSideNavigateLink);
          }}>
          <header>
            <SearchPanel />
            <ErrorButton />
          </header>
          <main>
            {loading && <Loader />}
            {isError && <span>{'Something went wrong'}</span>}
            {!loading && !isError && <PersonCardsList results={personsResult?.results ?? []} />}
            <Pagination />
          </main>
        </div>
        <Outlet />
      </div>
      <SelectionPanel />
    </>
  );
};

export { App };
