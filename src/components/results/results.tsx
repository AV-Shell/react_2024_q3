import cn from 'classnames';
import { omit } from 'lodash';
import { DetailedHTMLProps, HTMLAttributes, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader } from '@/components/loader/loader';
import { PersonCardsList } from '@/components/person-cards-list/person-cards-list';
import { SEARCH_STRING } from '@/utils/const';
// import { SelectionPanel } from '@/components/selectionpanel/selectionpanex';
import { useGetPersonsQuery } from '@/store/swapiApi';
import { useAppDispatch } from '@/store/storeHooks';
import { setIsLoading, setPersons } from '@/store/personsResultsSlice';
import { ThemeContext } from '@/context/theme.context';
import { useQueryParams } from '@/hooks/useQueryParams';
import s from './results.module.css';

export interface ResultsPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ResultsPage: React.FC<ResultsPageProps> = ({ className, ...props }) => {
  const searchParams = useQueryParams();
  const router = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const page: number = +(searchParams?.page ?? 1);
  const search: string = searchParams?.[SEARCH_STRING] ?? '';
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

  const closeDetails = () => {
    const params = new URLSearchParams(omit(searchParams, 'personId'));
    const queryString = params.toString();
    const updatedPath = queryString ? `${router.route}?${queryString}` : router.route;
    router.push(updatedPath);
  };

  return (
    <main
      data-testid="resultPage"
      className={cn(className, s.main, { [s.dark]: isDarkTheme })}
      onClick={closeDetails}
      {...props}>
      {loading && <Loader />}
      {isError && <span>{'Something went wrong'}</span>}
      {!loading && !isError && <PersonCardsList results={personsResult?.results ?? []} />}
    </main>
  );
};

export { ResultsPage };
