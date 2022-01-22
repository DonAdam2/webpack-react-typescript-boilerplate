// action types
import { AppActionTypes } from './AppActionTypes';

interface TestAction {
	type: AppActionTypes.TEST_ACTION;
}

export type Action = TestAction;
