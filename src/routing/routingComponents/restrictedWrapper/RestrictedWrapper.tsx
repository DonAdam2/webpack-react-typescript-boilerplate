import { useAppSelector } from '@/store/store';
//selectors
import { getAppUserPermissionsList } from '@/store/app/selectors/AppSelectors';
//interfaces
import { RestrictedWrapperInterface } from '@/routing/RoutingInterfaces';

const RestrictedWrapper = ({
  requiredPermissions,
  children,
  notPermittedComponent,
}: RestrictedWrapperInterface) => {
  const userPermissionsList = useAppSelector((state) => getAppUserPermissionsList(state));

  if (Array.isArray(requiredPermissions)) {
    for (let i = 0; i < requiredPermissions.length; i++) {
      for (let j = 0; j < userPermissionsList.length; j++) {
        if (requiredPermissions[i] === userPermissionsList[j]) return <>{children}</>;
      }
    }
  }
  if (typeof requiredPermissions === 'string') {
    if (
      userPermissionsList.findIndex((permission: string) => permission === requiredPermissions) > -1
    )
      return <>{children}</>;
  }
  return <>{notPermittedComponent}</>;
};

export default RestrictedWrapper;
