import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
//routes
import { getLoginPageUrl } from '../../routingConstants/AppUrls';
//interfaces
import { RestrictedRouteInterface } from '../../RoutingInterfaces';
//constants
import { isAuthenticated } from '@/ts/constants/Helpers';
//components
import PermissionsCannotAccess from '../../routingComponents/permissionsCannotAccess/PermissionsCannotAccess';
import RestrictedWrapper from '@/ts/routing/routingComponents/restrictedWrapper/RestrictedWrapper';

const RestrictedRouteGuard = ({
  children,
  requiredPermissions,
}: RestrictedRouteInterface): JSX.Element => {
  const location = useLocation();

  if (isAuthenticated()) {
    return (
      <RestrictedWrapper
        requiredPermissions={requiredPermissions}
        notPermittedComponent={
          <PermissionsCannotAccess requiredPermissions={requiredPermissions} />
        }
      >
        {children}
      </RestrictedWrapper>
    );
  } else {
    return <Navigate replace to={getLoginPageUrl()} state={{ from: location }} />;
  }
};

export default RestrictedRouteGuard;
