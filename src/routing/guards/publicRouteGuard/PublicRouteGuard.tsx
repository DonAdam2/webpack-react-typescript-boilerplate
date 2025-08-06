import { Navigate, useLocation } from 'react-router-dom';

import { getHomePageUrl } from '@/routing/routingConstants/AppUrls';
import { PublicRouteInterface } from '@/routing/RoutingInterfaces';

import { isAuthenticated } from '@/constants/Helpers';

//used to load authentication routes (ex: login, signup, ...etc) and public routes
const PublicRouteGuard = ({ restricted, children, redirect }: PublicRouteInterface) => {
  const location = useLocation();

  if (redirect) {
    return <Navigate replace to={redirect} />;
  } else if (isAuthenticated() && restricted) {
    return <Navigate replace to={getHomePageUrl()} state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};

export default PublicRouteGuard;
