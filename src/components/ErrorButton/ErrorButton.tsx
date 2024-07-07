import { PureComponent, ReactNode } from 'react';
import './ErrorButton.css';

interface EButtonProps {}
interface EButtonState {
  error: boolean;
}

export class ErrorButton extends PureComponent<EButtonProps, EButtonState> {
  constructor(props: EButtonProps) {
    super(props);

    this.state = {
      error: false,
    };
  }

  handleClick = (): void => {
    this.setState({ error: true });
  };

  render(): ReactNode {
    const { error } = this.state;

    if (error) {
      throw new Error('pu pu pu...');
    }

    return (
      <button onClick={this.handleClick} className="errorButton">
        Error Button
      </button>
    );
  }
}
