import { configureStore } from '@reduxjs/toolkit';

import { DeepPartial } from '@/jest/interfaces/JestInterfaces';

import { reduxSlices } from '@/store/reduxSlices';
import { RootState } from '@/store/store';

// Create a replica of the actual store without redux dev tools
const setupStore = (preloadedState?: DeepPartial<RootState>) =>
  configureStore({
    reducer: reduxSlices,
    devTools: false,
    preloadedState,
  });

export default setupStore;
