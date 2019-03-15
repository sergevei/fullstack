import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
import newsReducer from './newsReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profile: profileReducer,
    news: newsReducer
});