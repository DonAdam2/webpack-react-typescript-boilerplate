import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';

interface MockReactIntlProviderInterface {
	locale: string;
}

const MockReactIntlProvider: FC<MockReactIntlProviderInterface> = ({ children, locale = 'en' }) => (
	<IntlProvider locale={locale}>{children}</IntlProvider>
);

export default MockReactIntlProvider;

// if you would like you can override the render function of RTL as follows
/*import React, { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

function render(ui: ReactElement, { locale = 'en', ...renderOptions } = {}) {
	const Wrapper: FC = ({ children }) => <IntlProvider locale={locale}>{children}</IntlProvider>;
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };*/
