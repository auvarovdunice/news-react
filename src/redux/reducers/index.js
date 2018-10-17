import { combineReducers } from 'redux';
import auth from './auth';
import registration from './registration';
import getNews from './newsfeed';

const reducer = combineReducers({ auth: auth, registration: registration, getNews: getNews });

export default reducer;
