import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import reducer from './Reducers'
import {Provider} from 'react-redux'
import middlewaree from './Middlewares'

const store = createStore(reducer, middlewaree)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
