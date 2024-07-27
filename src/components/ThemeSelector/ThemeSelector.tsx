import s from './ThemeSelector.module.css';

interface IProps {
  handleChange: () => void;
  isChecked: boolean;
}

export const ThemeSelector: React.FC<IProps> = ({ handleChange, isChecked }) => {
  return (
    <div className={s.checkboxWrapper}>
      <input type="checkbox" id="switch" onChange={handleChange} checked={isChecked} />
      <label htmlFor="switch"></label>
    </div>
  );
};
