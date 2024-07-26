import { removeAllCheckboxes } from '../../store/checkboxSlice';
import { checkboxesSelector } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/storeHoocs';
import s from './SelectionPanel.module.css';

export const SelectionPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const checkboxes = useAppSelector(checkboxesSelector);
  const selectedCount = Object.values(checkboxes).length;

  return (
    <div className={s.container}>
      <div className={`${s.content} ${s.fixed} ${selectedCount > 0 ? s.visible : ''}`}>
        {selectedCount > 0 && <span>{`${selectedCount} item${selectedCount > 1 ? 's are' : ' is'} selected`}</span>}
        <button onClick={() => dispatch(removeAllCheckboxes())}>Unselect all</button>
        <button>Download</button>
      </div>
      <div className={`${s.content} ${s.fake} ${selectedCount > 0 ? s.visible : ''}`}>
        {selectedCount > 0 && <span>{`${selectedCount} item${selectedCount > 1 ? 's are' : ' is'} selected`}</span>}
        <button onClick={() => dispatch(removeAllCheckboxes())}>Unselect all</button>
        <button>Download</button>
      </div>
    </div>
  );
};
