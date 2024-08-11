'use client';
import cn from 'classnames';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { removeAllCheckboxes } from '@/store/checkboxSlice';
import { checkboxesSelector } from '@/store/selectors';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import s from './selection-panel.module.css';
import { convertPersonsToCSV } from '@/utils/converters';
import { ThemeContext } from '@/context/theme.context';

export const SelectionPanel: React.FC = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const dispatch = useAppDispatch();
  const checkboxesObj = useAppSelector(checkboxesSelector);
  const checkboxes = Object.values(checkboxesObj);
  const selectedCount = checkboxes.length;
  const spanText = `item${selectedCount > 1 ? 's are' : ' is'} selected`;
  const { isDarkTheme } = useContext(ThemeContext);
  const cachedCsvData = useMemo(
    () => new Blob([convertPersonsToCSV(Object.values(checkboxesObj))], { type: 'text/csv' }),
    [checkboxesObj],
  );
  const cachedCsvUrl = useMemo(() => URL.createObjectURL(cachedCsvData), [cachedCsvData]);
  const downloadCSV = useCallback(() => ref.current?.click(), []);

  return (
    <div className={cn(s.content, s.fixed, { [s.visible]: selectedCount > 0, [s.dark]: isDarkTheme })}>
      <span className={cn(s.span, s.spanCount)}>{selectedCount}</span>
      <span className={(s.span, s.spanText)}>{spanText}</span>
      <button className={s.button} onClick={() => dispatch(removeAllCheckboxes())}>
        Unselect all
      </button>
      <button className={s.button} onClick={downloadCSV}>
        Download
      </button>
      <a
        href={cachedCsvUrl}
        ref={ref}
        download={`${`${selectedCount === 1 ? checkboxes[0].name : selectedCount}_person${selectedCount === 1 ? '' : 's'}`}.csv`}
      />
    </div>
  );
};
