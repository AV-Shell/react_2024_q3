import { ReactNode, useEffect } from 'react';
import style from './PersonPage.module.css';
import { LoaderFunctionArgs, NavLink, useLoaderData, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { SEARCH_STRING } from '../../utils/const';
import { useGetPersonByIdQuery } from '../../store/swapiApi';
import { useAppDispatch } from '../../store/storeHooks';
import { setIsLoadingDetails, setPersonDetails } from '../../store/personsResultsSlice';

export async function PersonPageLoader({ params }: LoaderFunctionArgs) {
  return { personId: params.personId };
}

export function PersonPage(): ReactNode {
  const { personId } = useLoaderData() as { personId: string };
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { data: person, isLoading, isFetching } = useGetPersonByIdQuery(personId);
  const loading = isLoading || isFetching;

  useEffect(() => {
    dispatch(setIsLoadingDetails(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    if (person) {
      dispatch(setPersonDetails(person));
    }
  }, [person, dispatch]);

  const page = searchParams.get('page');
  const search = searchParams.get(SEARCH_STRING);
  const navigateTo = `/${page ? `?page=${page}` : ''}${search ? `&${SEARCH_STRING}=${search}` : ''}`;

  return (
    <div className={style.rightSide}>
      <NavLink to={navigateTo} className={style.close} children={'Close'} />
      {loading && <Loader />}
      {!loading && person && (
        <>
          {Object.entries(person)
            .filter(x => typeof x[1] === 'string')
            .map(x => {
              return (
                <div className={style.detailsContainer} key={x[0] + x[1]}>
                  <span className={style.title}>{x[0]}:</span>
                  <span className={style.value}>{x[1]}</span>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}
