import { Component, ReactNode } from 'react';
import './App.css';
import { storage } from './services/localstorage.service';
import { Loader } from './components/Loader/Loader';
import { IAPIResp } from './models/api';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { PersonCardsList } from './components/PersonCardsList/PersonCardsList';
import { SearchPanel } from './components/SearchPanel/SearchPanel';

interface AppState {
  searchString: string;
  requestString: string;
  loading: boolean;
  error: string | null;
  searchResult: IAPIResp;
}

const SEARCH_STRING: string = 'search';
const SEARCH_LINK: string = 'https://swapi.dev/api/people';

interface AppProps {}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const search: string = storage.getItem<string>(SEARCH_STRING) ?? '';
    this.state = {
      searchString: search,
      requestString: search,
      loading: false,
      error: null,
      searchResult: {
        count: 0,
        next: null,
        previous: null,
        results: [],
      },
    };
  }

  componentDidMount(): void {
    this.fetchData(this.state.searchString, true);
  }

  fetchData = async (searchString: string, forse: boolean = false): Promise<void> => {
    const trimmedSearchString = searchString.trim();

    const { requestString } = this.state;
    if (requestString === trimmedSearchString && !forse) {
      return;
    }

    const link = `${SEARCH_LINK}${trimmedSearchString ? `/?search=${trimmedSearchString}` : ''}`;
    try {
      this.setState({ loading: true });

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
        this.setErrorData(data, searchString);
      } else {
        this.setState({ searchResult: data, error: null, requestString: searchString });
      }
    } catch (error) {
      this.setErrorData(error instanceof Error ? error.message : 'Unknown error', searchString);
    } finally {
      this.setState({ loading: false });
    }
  };

  setErrorData(data: string | number, searchString: string) {
    this.setState({
      error: data === 'string' ? data : `Network error, status core: ${data}`,
      searchResult: {
        count: 0,
        next: null,
        previous: null,
        results: [],
      },
      requestString: searchString,
    });
  }

  handleChange = (e: React.SyntheticEvent): void => {
    const target = e.target as typeof e.target & {
      value: string;
    };

    this.setState({ searchString: target.value });
  };

  handleSearchSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    const search = target.search.value;

    this.setState({ searchString: search });
    this.fetchData(search);
    storage.setItem(SEARCH_STRING, search);
  };

  render(): ReactNode {
    const { searchString, loading, error, searchResult } = this.state;

    return (
      <>
        <header>
          <SearchPanel onSubmit={this.handleSearchSubmit} onChange={this.handleChange} value={searchString} />
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
}

export { App };
