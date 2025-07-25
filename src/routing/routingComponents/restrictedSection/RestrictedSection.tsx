import { JSX } from 'react';
// interfaces
import { RestrictedRouteInterface } from '@/routing/RoutingInterfaces';
// components
import RestrictedWrapper from '@/routing/routingComponents/restrictedWrapper/RestrictedWrapper';

const RestrictedSection = ({
  requiredPermissions,
  children,
}: RestrictedRouteInterface): JSX.Element | null => (
  <RestrictedWrapper requiredPermissions={requiredPermissions}>{children}</RestrictedWrapper>
);

export default RestrictedSection;
