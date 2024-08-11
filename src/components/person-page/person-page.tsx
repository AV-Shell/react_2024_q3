'use client';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import Link from 'next/link';
import { Loader } from '@/components/loader/loader';
import { SEARCH_STRING } from '@/utils/const';
import { useGetPersonByIdQuery } from '@/store/swapiApi';
import { useAppDispatch } from '@/store/storeHooks';
import { setIsLoadingDetails, setPersonDetails } from '@/store/personsResultsSlice';
import { useQueryParams } from '@/hooks/useQueryParams';
import s from './person-page.module.css';

export interface ResultsPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const PersonPage: React.FC<ResultsPageProps> = ({ className, ...props }) => {
  const searchParams = useQueryParams();
  const { personId, page, search } = searchParams;

  const dispatch = useAppDispatch();
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

  const navigateTo = `/${page ? `?page=${page}` : ''}${search ? `&${SEARCH_STRING}=${search}` : ''}`;

  return (
    <div className={cn(s.rightSide, className)} {...props}>
      <Link href={navigateTo} className={s.close} data-testid="closeButton">
        Close
      </Link>
      {loading && <Loader />}
      {!loading && person && (
        <>
          {Object.entries(person)
            .filter(x => typeof x[1] === 'string')
            .map(x => {
              return (
                <div className={s.detailsContainer} key={x[0] + x[1]}>
                  <span className={s.title}>{x[0]}:</span>
                  <span className={s.value}>{x[1]}</span>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

const WithPersonId: React.FC<ResultsPageProps> = props => {
  const searchParams = useQueryParams();
  const { personId } = searchParams;
  if (!personId) {
    return <></>;
  }

  return <PersonPage {...props} />;
};

export default WithPersonId;
