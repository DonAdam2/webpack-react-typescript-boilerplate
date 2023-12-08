import { configureStore } from '@reduxjs/toolkit';
//root reducer
import { reduxSlices } from './reduxSlices';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: reduxSlices,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => {
    if (isDevelopment) {
      const { logger } = require('redux-logger');

      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
});

const _store = () => store;

//type of your store if you need to use it somewhere
export type ToolkitStore = ReturnType<typeof _store>;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
