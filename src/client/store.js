import { createStore } from 'redux';
import reducers from '../common/store/reducers.js';

const state = window.__STORE__ || {};
delete window.__STORE__;

const store = createStore(reducers, state);

export default store;
