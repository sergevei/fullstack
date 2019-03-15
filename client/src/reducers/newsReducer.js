import {GET_NEWS, LOADING_NEWS} from '../actions/types';

const initialState = {
    allnews : [],
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
        default:
            return state;
    }
}