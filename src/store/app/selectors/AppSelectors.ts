import { RootState } from '@/store/store';

export const getTestAction = (state: RootState) => state.app.testString;

//replace the following with your own selector
export const getAppUserPermissionsList = (state: RootState) => state.app.permissions;
