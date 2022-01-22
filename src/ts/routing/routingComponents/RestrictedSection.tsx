import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
//state
import { State } from '../../store/rootReducer';
//selectors
//replace the following with your own selector
import { getAppUserPermissionsList } from '../../store/app/selectors/AppSelectors';
//interfaces
import { RestrictedRouteInterface } from '../RoutingInterfaces';

const RestrictedSection: FC<RestrictedRouteInterface> = ({
	requiredPermissions,
	children,
}): JSX.Element | null => {
	const userPermissionsList = useSelector((state: State) => getAppUserPermissionsList(state));

	if (Array.isArray(requiredPermissions)) {
		for (let i = 0; i < requiredPermissions.length; i++) {
			for (let j = 0; j < userPermissionsList.length; j++) {
				if (requiredPermissions[i] === userPermissionsList[j]) return <>{children}</>;
			}
		}
	}
	if (typeof requiredPermissions === 'string') {
		if (userPermissionsList.findIndex((permission) => permission === requiredPermissions) > -1)
			return <>{children}</>;
	}
	return null;
};

RestrictedSection.propTypes = {
	requiredPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default RestrictedSection;
