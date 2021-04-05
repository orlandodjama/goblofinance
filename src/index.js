import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Grid} from '@material-ui/core';


import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'


import reducer from './store/reducers/auth'
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,composeEnhances(
  applyMiddleware(thunk)
));

const app=(
  <Provider store={store}>
    <React.StrictMode>
    
    <Grid><App /></Grid>   
    </React.StrictMode>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();