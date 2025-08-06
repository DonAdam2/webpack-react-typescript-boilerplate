import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import meta image
import '@/public/assets/images/metaImage.jpg';
// required for babel polyfills
import 'regenerator-runtime/runtime';

import store from '@/store/store';

import App from './App';

import './scss/global.scss';
/* PLOP_INJECT_PWA_IMPORTS */

const container = document.getElementById('root'),
  root = createRoot(container as Element);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

/* PLOP_INJECT_PWA_REGISTERER */
