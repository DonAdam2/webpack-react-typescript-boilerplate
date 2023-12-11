import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { reduxSlices } from '@/ts/store/reduxSlices';
//root state
import { RootState } from '@/ts/store/store';
//interfaces
import { DeepPartial } from '@/jest/interfaces/JestInterfaces';

// Create a replica of the actual store without redux dev tools
const setupStore = (preloadedState?: DeepPartial<RootState>) =>
  configureStore({
    reducer: reduxSlices,
    devTools: false,
    preloadedState,
  });

export default setupStore;
