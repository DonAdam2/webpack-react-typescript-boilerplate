import React, { PropsWithChildren, ReactElement, JSX } from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ExtendedRenderOptionsForRouter } from '../interfaces/JestInterfaces';

function renderWithRouter(
  ui: ReactElement,
  {
    //use it if you want to navigate to a specific route
    initialEntries = ['/'],
    ...renderOptions
  }: ExtendedRenderOptionsForRouter = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
  }

  // Return an object with the all of RTL's query functions
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithRouter;
