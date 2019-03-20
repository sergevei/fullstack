import {LOADING_USERS, GET_USER ,GET_SINGLE_USER} from '../actions/types';

const initialState = {
    singleUser : {},
    users : {},
    loading : true
}
export default function( state = initialState, action){
    switch(action.type){
        case LOADING_USERS:
            return {
                ...state,
                loading: true
            }
        case GET_USER:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_SINGLE_USER:
            return {
                ...state,
                singleUser: action.payload,
                loading: false
            }
        default:
            return state;
    }
}