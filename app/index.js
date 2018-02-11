var React = require('react');
var ReactDOM = require('react-dom');
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../public/styles/style.css'
import Main from "./components/layouts/Main.js";

import hashcashApp from './reducers'
let store = createStore(hashcashApp)


ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('root')
);
