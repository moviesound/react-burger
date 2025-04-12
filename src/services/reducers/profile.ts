import {
	PROFILE_CHANGE_FAILED,
	PROFILE_CHANGE_SUCCESS,
	PROFILE_CHANGE_PROCESSING,
} from '../actions/profile';
import { TProfileActions, TProfileInitialState } from '../../utils/types';

const profileInitialState: TProfileInitialState = {
	requestProcess: false,
	requestFailed: false,
	errorText: undefined,
};

export const profileReducer = (
	state = profileInitialState,
	action: TProfileActions
): TProfileInitialState => {
	switch (action.type) {
		case PROFILE_CHANGE_PROCESSING: {
			return {
				...state,
				requestProcess: true,
				requestFailed: false,
			};
		}
		case PROFILE_CHANGE_SUCCESS: {
			return {
				...state,
				requestProcess: false,
				requestFailed: false,
			};
		}
		case PROFILE_CHANGE_FAILED: {
			return {
				...state,
				requestProcess: false,
				requestFailed: true,
				errorText: action.error,
			};
		}
		default: {
			return state;
		}
	}
};
