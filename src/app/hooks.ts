import {
	TypedUseSelectorHook,
	useDispatch as useDis,
	useSelector as useSel,
} from 'react-redux';
import { RootState, AppDispatch } from './store-types';

export const useDispatch = () => useDis<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSel;
