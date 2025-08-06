import { JSX } from 'react';

import RestrictedWrapper from '@/routing/routingComponents/restrictedWrapper/RestrictedWrapper';
import { RestrictedRouteInterface } from '@/routing/RoutingInterfaces';

const RestrictedSection = ({
  requiredPermissions,
  children,
}: RestrictedRouteInterface): JSX.Element | null => (
  <RestrictedWrapper requiredPermissions={requiredPermissions}>{children}</RestrictedWrapper>
);

export default RestrictedSection;
