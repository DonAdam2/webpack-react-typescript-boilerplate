import React, { ReactElement, ReactNode } from 'react';
// import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
// store
import store from '@/jest/mocks/store';

function render(ui: ReactElement, { mockStore = store, locale = 'en', ...renderOptions } = {}) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    // <IntlProvider locale={locale}>
    <Provider store={mockStore}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
    // </IntlProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
