import { createSlice } from '@reduxjs/toolkit';

import { AppSliceInitialState } from '@/store/app/AppEntityInterfaces';

const initialState: AppSliceInitialState = {
  testString: 'Initial test',
  permissions: ['search', 'createUser', 'updateSubscription'],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTestString: (state) => {
      state.testString = 'Final test';
    },
  },
});

export const { updateTestString } = appSlice.actions;
export default appSlice.reducer;
