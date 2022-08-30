import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//import meta image
import './assets/images/metaImage.jpg';
// required for babel polyfills
import 'regenerator-runtime/runtime';
//store configuration
import store from '@/ts/store/store';
//root component
import App from './App';
//styles
import './scss/global.scss';

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
