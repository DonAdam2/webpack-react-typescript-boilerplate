import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { rootReducer } from '@/ts/store/rootReducer';

// Create a replica of the actual store without redux dev tools
export default configureStore({
  reducer: rootReducer,
  devTools: false,
});
