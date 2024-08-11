import { useRouter } from 'next/router';
import { fromPairs } from 'lodash';

export const useQueryParams = () => {
  const { asPath } = useRouter();
  const url = new URL(asPath, 'http://localhost:3000/');
  const query = fromPairs(Array.from(url.searchParams.entries()));

  return query;
};
