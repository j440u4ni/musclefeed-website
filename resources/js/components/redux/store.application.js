import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { reducerAuthentication } from './reducer-authentication';
import { reducerProducts } from './reducer-products';

const store = createStore(combineReducers({ reducerAuthentication, reducerProducts }), 
    applyMiddleware(thunkMiddleware, createLogger() ));
export { store as runnerStore };