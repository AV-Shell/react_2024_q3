import { ReactNode, useCallback, useEffect, useState } from 'react';
import './App.css';
import { Loader } from './components/Loader/Loader';
import { IAPIResp } from './models/api';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { PersonCardsList } from './components/PersonCardsList/PersonCardsList';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Pagination } from './components/Pagination/Pagination';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { SEARCH_LINK, SEARCH_STRING } from './utils/const';
import { SelectionPanel } from './components/SelectionPanel/SelectionPanex';

interface IFetchData {
  searchString: string;
  forse?: boolean;
  page?: number;
}

function App(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestString, setRequestString] = useLocalStorage(searchParams.get(SEARCH_STRING) ?? '', SEARCH_STRING);
  const [searchString, setSearchString] = useState(requestString);
  const page: number = +(searchParams.get(`page`) ?? 1);

  const [paginationPage, setPaginationPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchResult, setSearchResult] = useState<IAPIResp>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const navigate = useNavigate();

  function setErrorData(data: string | number) {
    setError(typeof data === 'string' ? data : `Network error, status core: ${data}`);
    setSearchResult({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });
  }

  const fetchData = useCallback(
    async ({ searchString, forse = false, page }: IFetchData): Promise<void> => {
      const trimmedSearchString = searchString.trim();
      if (requestString === trimmedSearchString && !forse) {
        return;
      }

      const queryPage = page ? `page=${page}` : '';
      const searchParamsString = trimmedSearchString ? `search=${trimmedSearchString}` : '';
      const paramString = [searchParamsString, queryPage].filter(x => x).join('&');
      const link = `${SEARCH_LINK}${paramString ? `/?${paramString}` : ''}`;

      try {
        setLoading(true);
        setRequestString(trimmedSearchString);
        const data: IAPIResp | string | number = await fetch(link).then(
          (data: Response): Promise<IAPIResp | string | number> => {
            if (!data.ok) {
              return Promise.resolve(data.statusText || data.status);
            } else {
              return data.json() as Promise<IAPIResp>;
            }
          },
        );
        if (typeof data === 'string' || typeof data === 'number') {
          setErrorData(data);
        } else {
          setSearchResult(data);
          setError(null);
        }
      } catch (error) {
        setErrorData(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
        setSearchParams({
          page: `${page ? page : 1}`,
          ...(trimmedSearchString ? { [SEARCH_STRING]: trimmedSearchString } : {}),
        });
      }
    },
    [requestString, setRequestString, setSearchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setPaginationPage(page);
      fetchData({ searchString: requestString, forse: true, page });
    },
    [fetchData, setPaginationPage, requestString],
  );

  const handleChange = useCallback(
    (e: React.SyntheticEvent) => {
      const target = e.target as typeof e.target & {
        value: string;
      };

      setSearchString(target.value);
    },
    [setSearchString],
  );

  const handleSearchSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        search: { value: string };
      };
      const search = target.search.value;

      setSearchString(search);
      fetchData({ searchString: search }).finally(() => setPaginationPage(1));
    },
    [setSearchString, fetchData, setPaginationPage],
  );

  useEffect(() => {
    const page = searchParams.get(`page`);

    fetchData({ searchString, forse: true, ...(page ? { page: +page } : {}) });
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="page">
        <div
          className="leftside"
          onClick={() => {
            navigate(`/?page=${page}${requestString ? `&${SEARCH_STRING}=${requestString}` : ''}`);
          }}>
          <header>
            <SearchPanel onSubmit={handleSearchSubmit} onChange={handleChange} value={searchString} />
            <ErrorButton />
          </header>
          <main>
            {loading && <Loader />}
            {error ? (
              <>
                <span>{error}</span>
              </>
            ) : (
              <>
                <PersonCardsList results={searchResult.results} />
                {!loading && (
                  <Pagination
                    isLoading={loading}
                    onChange={handlePageChange}
                    value={paginationPage}
                    maxPerPage={10}
                    maxValues={searchResult.count}
                  />
                )}
              </>
            )}
          </main>
        </div>
        <Outlet />
      </div>
      <SelectionPanel />
    </>
  );
}

export { App };
