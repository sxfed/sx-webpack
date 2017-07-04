import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import Router from 'react-router-dom/Router';
import {history} from './router/History';
import store from './store/store';
import routes  from './router/Routers';

ReactDom.render(
  <Provider store={store()}>
    <Router history={history} >
      {routes}
    </Router>
  </Provider>
, document.getElementById('content'));
