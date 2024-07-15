import { ReactNode } from 'react';
import style from './PersonPage.module.css';
import { LoaderFunctionArgs, NavLink, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom';
import { IResult } from '../../models/api';
import { Loader } from '../../components/Loader/Loader';
import { SEARCH_STRING } from '../../utils/const';

export async function PersonPageLoader({ params }: LoaderFunctionArgs) {
  const person: IResult = await fetch(`https://swapi.dev/api/people/${params.personId}`)
    .then(r => r.json())
    .catch(e => console.log(e));

  return { person };
}

export function PersonPage(): ReactNode {
  const { person } = useLoaderData() as { person: IResult };
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const page = searchParams.get('page');
  const search = searchParams.get(SEARCH_STRING);

  return (
    <div className={style.rightSide}>
      <NavLink
        to={`/${page ? `?page=${page}` : ''}${search ? `&${SEARCH_STRING}=${search}` : ''}`}
        className={style.close}>
        Close
      </NavLink>

      {navigation.state === 'loading' ? (
        <Loader />
      ) : (
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
