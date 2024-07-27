import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, TRootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
