import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SEARCH_STRING } from '../../utils/const';
import s from './SearchPanel.module.css';
import { ThemeContext } from '../../context/context';

export const SearchPanel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestString, setRequestString] = useLocalStorage(searchParams.get(SEARCH_STRING) ?? '', SEARCH_STRING);
  const isDartTheme = useContext(ThemeContext);

  const search = searchParams.get('search') ?? '';

  useEffect(() => {
    if (search !== requestString) {
      searchParams.set(SEARCH_STRING, requestString);
      setSearchParams(searchParams);
    }
    //this.is to get default priority value from localstorage only on first load
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    const inputSearch = target.search.value.trim();
    if (inputSearch !== search) {
      setRequestString(inputSearch);
      setSearchParams(params => {
        params.set('search', inputSearch);
        params.set('page', '1');
        return params;
      });
    }
  };

  return (
    <form data-testid="searchForm" className={`${s.form} ${isDartTheme ? s.dark : ''}`} onSubmit={onSubmit}>
      <input data-testid="searchInput" type="search" name="search" defaultValue={requestString} />
      <button data-testid="searchSubmit" type="submit">
        Search
      </button>
    </form>
  );
};
