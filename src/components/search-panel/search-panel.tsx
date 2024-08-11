import { useContext, useEffect } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SEARCH_STRING } from '@/utils/const';
import { useRouter } from 'next/router';
import { useQueryParams } from '@/hooks/useQueryParams';
import { ThemeSelector } from '@/components/theme-selector/theme-selector';
import { ThemeContext } from '@/context/theme.context';
import { ErrorButton } from '@/components/error-button/error-button';
import s from './search-panel.module.css';

export const SearchPanel: React.FC = () => {
  const searchParams = useQueryParams();
  const { isDarkTheme } = useContext(ThemeContext);
  const router = useRouter();
  const { search = '' } = searchParams;

  const [requestString, setRequestString] = useLocalStorage(search, SEARCH_STRING);

  useEffect(() => {
    if (!search && search !== requestString) {
      const params = new URLSearchParams(searchParams);

      params.set('search', requestString);
      params.set('page', '1');
      const queryString = params.toString();
      const updatedPath = queryString ? `${router.route}?${queryString}` : router.route;
      router.push(updatedPath);
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
    setRequestString(inputSearch);
    if (inputSearch !== search) {
      const params = new URLSearchParams(searchParams);

      params.set('search', inputSearch);
      params.set('page', '1');
      const queryString = params.toString();
      const updatedPath = queryString ? `${router.route}?${queryString}` : router.route;
      router.push(updatedPath);
    }
  };

  return (
    <>
      <form data-testid="searchForm" className={`${s.form} ${isDarkTheme ? s.dark : ''}`} onSubmit={onSubmit}>
        <ThemeSelector className={s.theme} isChecked={true} handleChange={() => {}} />
        <input
          data-testid="searchInput"
          type="search"
          name="search"
          className={s.input}
          defaultValue={search ?? requestString}
        />
        <button data-testid="searchSubmit" type="submit" className={s.button}>
          Search
        </button>
        <ErrorButton className={s.errorButton} />
      </form>
    </>
  );
};

export default SearchPanel;
