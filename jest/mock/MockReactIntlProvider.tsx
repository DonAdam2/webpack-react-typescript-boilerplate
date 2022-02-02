import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';

interface MockReactIntlProviderInterface {
	locale: string;
}

const MockReactIntlProvider: FC<MockReactIntlProviderInterface> = ({ children, locale = 'en' }) => (
	<IntlProvider locale={locale}>{children}</IntlProvider>
);

export default MockReactIntlProvider;
