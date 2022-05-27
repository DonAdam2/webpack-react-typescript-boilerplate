import { render, screen, cleanup } from '@testing-library/react';
//component
import App from './App';
// mock store provider
import MockReduxProvider from '@/jest/mocks/MockReduxProvider';

afterEach(cleanup);

describe('App Component', () => {
  test('renders webpack react boilerplate', async () => {
    render(
      <MockReduxProvider>
        <App />
      </MockReduxProvider>
    );
    const title = await screen.findByRole('heading', { name: /webpack react boilerplate/i });
    expect(title).toBeInTheDocument();
  });
});
