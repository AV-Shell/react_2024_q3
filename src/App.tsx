import { ReactNode, useCallback, useEffect, useState } from 'react';
import './App.css';
// import { storage } from './services/localstorage.service';
import { Loader } from './components/Loader/Loader';
import { IAPIResp } from './models/api';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { PersonCardsList } from './components/PersonCardsList/PersonCardsList';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { useLocalStorage } from './hooks/useLocalStorage';

const SEARCH_STRING: string = 'search';
const SEARCH_LINK: string = 'https://swapi.dev/api/people';

function App(): ReactNode {
  const [requestString, setRequestString] = useLocalStorage('', SEARCH_STRING);
  const [searchString, setSearchString] = useState(requestString);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<IAPIResp>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

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
    async (searchString: string, forse: boolean = false): Promise<void> => {
      const trimmedSearchString = searchString.trim();
      if (requestString === trimmedSearchString && !forse) {
        return;
      }

      const link = `${SEARCH_LINK}${trimmedSearchString ? `/?search=${trimmedSearchString}` : ''}`;
      try {
        setLoading(true);
        setRequestString(searchString);
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
      }
    },
    [requestString, setRequestString],
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
      fetchData(search);
      // storage.setItem(SEARCH_STRING, search);
    },
    [setSearchString, fetchData],
  );

  useEffect(() => {
    fetchData(searchString, true);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
          <PersonCardsList results={searchResult.results} />
        )}
      </main>
    </>
  );
}

export { App };
