import { waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
//routing
import PrivateRouteGuard from '@/ts/routing/guards/privateRouteGuard/PrivateRouteGuard';
//constants
import { isAuthenticated } from '@/ts/constants/Helpers';
import { getLoginPageUrl } from '@/ts/routing/routingConstants/AppUrls';
//jest mocks
import renderWithRouter from '@/jest/mocks/RenderWithRouter';

//mock isAuthenticated function
jest.mock('@/ts/constants/Helpers', () => ({
  isAuthenticated: jest.fn(),
}));
const isAuthenticatedMock = isAuthenticated as jest.Mock;

describe('PrivateRouteGuard', () => {
  it('renders children when authenticated', async () => {
    isAuthenticatedMock.mockReturnValue(true);
    const children = <div>Test</div>,
      { container } = renderWithRouter(<PrivateRouteGuard>{children}</PrivateRouteGuard>);

    await waitFor(() => expect(container).toContainHTML('<div>Test</div>'));
  });

  it('redirects to login page when not authenticated', async () => {
    isAuthenticatedMock.mockReturnValue(false);
    const adminRoute = '/admin',
      routesConfig = [
        { path: '/', element: <>Home Page</> },
        { path: getLoginPageUrl(), element: <>Login Page</> },
        {
          path: adminRoute,
          element: (
            <PrivateRouteGuard>
              <div>Admin Page</div>
            </PrivateRouteGuard>
          ),
        },
      ];

    const { container } = renderWithRouter(
      <Routes>
        {routesConfig.map((el, i) => (
          <Route key={i} path={el.path} element={el.element} />
        ))}
      </Routes>,
      { initialEntries: [adminRoute] } //navigate to admin route
    );

    await waitFor(() => expect(container).toContainHTML('<div>Login Page</div>'));
  });
});
