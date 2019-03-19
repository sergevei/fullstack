import {GET_NEWS, LOADING_NEWS ,GET_SINGLE_NEWS, GET_POPULAR_NEWS, GET_WORLD_NEWS} from '../actions/types';

const initialState = {
    singlenews : {},
    news : {},
    popular : {},
    world : {},
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
        case GET_POPULAR_NEWS:
            return {
                ...state,
                popular: action.payload,
                loading: false
            }
        case GET_WORLD_NEWS:
            return {
                ...state,
                world: action.payload,
                loading: false
            }
        default:
            return state;
    }
}