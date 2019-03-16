import {GET_NEWS, LOADING_NEWS ,GET_SINGLE_NEWS} from '../actions/types';

const initialState = {
    singlenews : {},
    news : {},
    loading : true
}

export default function( state = initialState, action){
    switch(action.type){
        case LOADING_NEWS:
            return {
                ...state,
                loading: true
            }
        case GET_NEWS:
            return {
                ...state,
                news: action.payload,
                loading: false
            }
        case GET_SINGLE_NEWS:
            return {
                ...state,
                singlenews: action.payload,
                loading: false
            }
        default:
            return state;
    }
}