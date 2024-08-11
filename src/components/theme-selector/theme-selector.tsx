import { useContext } from 'react';
import s from './theme-selector.module.css';
import cn from 'classnames';
import { ThemeContext } from '@/context/theme.context';

interface IProps {
  handleChange: () => void;
  isChecked: boolean;
  className: string;
}

export const ThemeSelector: React.FC<IProps> = ({ className }) => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  return (
    <div className={cn(s.checkboxWrapper, className)}>
      <input
        data-testid="themeCheckbox"
        type="checkbox"
        id="switch"
        onChange={() => {
          setIsDarkTheme(s => !s);
        }}
        checked={isDarkTheme}
      />
      <label htmlFor="switch"></label>
    </div>
  );
};
