import { useContext } from 'react';
import cn from 'classnames';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { ThemeContext } from '@/context/theme.context';
import { Provider } from 'react-redux';
import { configuredStore } from '@/store/store';
import { Pagination } from '@/components/pagination/pagination';
import { ResultsPage } from '@/components/results/results';
import { SelectionPanel } from '@/components/selection-panel/selection-panex';
import PersonPage from '@/components/person-page/person-page';
import { ErrorBoundary } from '@/components/error-boundary/error-boundary';
import s from './persons-page.module.css';
const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
});

const SearchPanel = dynamic(() => import('../search-panel/search-panel'), { ssr: false });

const PersonsPage: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      <ErrorBoundary>
        <Provider store={configuredStore}>
          <div className={cn(s.wrapper, inter.className)} data-testid="personsPage">
            <header className={cn(s.header, { [s.dark]: isDarkTheme })}>
              <SearchPanel />
            </header>
            <ResultsPage
              className={cn({
                [s.main]: true,
                [s.dark]: isDarkTheme,
              })}
            />
            <PersonPage className={cn(s.details, { [s.dark]: isDarkTheme })} />
            <div className={cn(s.pagination, { [s.dark]: isDarkTheme })}>
              <Pagination />
            </div>
            <footer className={cn(s.footer, { [s.dark]: isDarkTheme })}>
              <span>Next.js Pages Router</span>
              <SelectionPanel />
            </footer>
          </div>
        </Provider>
      </ErrorBoundary>
    </>
  );
};

export default PersonsPage;
