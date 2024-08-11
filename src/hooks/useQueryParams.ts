import { useSearchParams } from 'next/navigation';
import { fromPairs } from 'lodash';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const query = fromPairs(Array.from(searchParams));

  return query;
};
