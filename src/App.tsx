import { useEffect } from 'react';
import s from './App.module.css';
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
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeSelector } from './components/ThemeSelector/ThemeSelector';
import { ThemeContext } from './context/context';

const App: React.FC = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const page: number = +(searchParams.get(`page`) ?? 1);
  const search: string = searchParams.get(SEARCH_STRING) ?? '';
  const leftSideNavigateLink: string = `/?page=${page}${search ? `&${SEARCH_STRING}=${search}` : ''}`;
  const { data: personsResult, isLoading, isFetching, isError } = useGetPersonsQuery({ search, page });
  const loading = isLoading || isFetching;
  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>(preference, 'isDark');

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
    <ThemeContext.Provider value={isDark}>
      <div className={`${s.page} ${isDark ? s.dark : ''}`}>
        <div
          className={s.leftside}
          onClick={() => {
            navigate(leftSideNavigateLink);
          }}>
          <header className={s.header}>
            <ThemeSelector isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
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
    </ThemeContext.Provider>
  );
};

export { App };
