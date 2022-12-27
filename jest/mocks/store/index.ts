import { configureStore, PreloadedState } from '@reduxjs/toolkit';
//root reducer
import { reduxSlices } from '@/ts/store/reduxSlices';
//root state
import { RootState } from '@/ts/store/store';

// Create a replica of the actual store without redux dev tools
const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: reduxSlices,
    devTools: false,
    preloadedState,
  });

export default setupStore;
