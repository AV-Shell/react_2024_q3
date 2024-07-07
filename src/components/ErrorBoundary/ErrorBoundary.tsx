import { ErrorInfo, PureComponent, ReactNode } from 'react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('ErrorBoundary catch Error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  onResetButtonClick = () => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    return this.state.hasError ? (
      <div className="errorMessageWrapper">
        <h1>Something went wrong</h1>
        <button onClick={this.onResetButtonClick}>Reset error</button>
      </div>
    ) : (
      this.props.children
    );
  }
}
