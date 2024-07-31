import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { removeAllCheckboxes } from '../../store/checkboxSlice';
import { checkboxesSelector } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import s from './SelectionPanel.module.css';
import { convertPersonsToCSV } from '../../utils/converters';
import { ThemeContext } from '../../context/context';

export const SelectionPanel: React.FC = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const dispatch = useAppDispatch();
  const checkboxesObj = useAppSelector(checkboxesSelector);
  const checkboxes = Object.values(checkboxesObj);
  const selectedCount = checkboxes.length;
  const spanText = `${selectedCount} item${selectedCount > 1 ? 's are' : ' is'} selected`;
  const isDark = useContext(ThemeContext);
  const cachedCsvData = useMemo(
    () => new Blob([convertPersonsToCSV(Object.values(checkboxesObj))], { type: 'text/csv' }),
    [checkboxesObj],
  );
  const cachedCsvUrl = useMemo(() => URL.createObjectURL(cachedCsvData), [cachedCsvData]);
  const downloadCSV = useCallback(() => ref.current?.click(), []);

  return (
    <div className={`${s.container} ${isDark ? s.dark : ''}`}>
      <div className={`${s.content} ${s.fixed} ${selectedCount > 0 ? s.visible : ''}`}>
        <span>{spanText}</span>
        <button onClick={() => dispatch(removeAllCheckboxes())}>Unselect all</button>
        <button onClick={downloadCSV}>Download</button>
        <a
          href={cachedCsvUrl}
          ref={ref}
          download={`${`${selectedCount === 1 ? checkboxes[0].name : selectedCount}_person${selectedCount === 1 ? '' : 's'}`}.csv`}
        />
      </div>
      <div className={`${s.content} ${s.fake} ${selectedCount > 0 ? s.visible : ''}`}>
        <span>{spanText}</span>
        <button>Unselect all</button>
        <button>Download</button>
      </div>
    </div>
  );
};
