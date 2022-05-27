//component
import App from './App';
// all providers mock
import { render, screen } from '@/jest/mocks/OverrideRenderOfRTL';

describe('App Component', () => {
  test('renders webpack react boilerplate', async () => {
    render(<App />);
    const title = await screen.findByRole('heading', { name: /webpack react boilerplate/i });
    expect(title).toBeInTheDocument();
  });
});
