var React = require('react');
var ReactDOM = require('react-dom');

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../public/styles/style.css'

import Main from "./components/layouts/Main.js";

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
