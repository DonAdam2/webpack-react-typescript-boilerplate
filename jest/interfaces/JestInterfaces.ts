import { RenderOptions } from '@testing-library/react';
import { PreloadedState } from '@reduxjs/toolkit';
//root state
import { RootState } from '@/ts/store/store';

/* This type interface extends the default options for render from RTL, as well
as allows the user to specify other things such as initialState, store. */
export interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: any;
  locale?: string;
}
