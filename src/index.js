import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp, faChevronDown, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import * as serviceWorker from './serviceWorker';

import store from './store.js';

library.add(fab, faChevronUp, faChevronDown, faShoppingCart, faBars);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();