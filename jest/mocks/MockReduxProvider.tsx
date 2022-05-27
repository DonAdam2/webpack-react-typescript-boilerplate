import React, { FC } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
// default store
import store from './store';

interface MockProviderInterface {
  mockStore?: Store;
}

const MockReduxProvider: FC<MockProviderInterface> = ({ children, mockStore = store }) => (
  <Provider store={mockStore}>{children}</Provider>
);

export default MockReduxProvider;
