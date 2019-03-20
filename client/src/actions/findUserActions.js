import Axios from 'axios';
import { 
            LOADING_USERS,
            GET_USER,
            GET_SINGLE_USER
        } from './types';

export const getAllUsers = () => dispatch => {
    dispatch(setUsersLoading());
        Axios
        .get('/api/profile/all-info')
        .then( res =>
            dispatch({
                type: GET_USER,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_USER,
                payload: {}
            })
        )
}
export const getSingleUser = (id) => dispatch => {
    dispatch(setUsersLoading());
    Axios
        .get(`/api/profile/${id}`)
        .then( res =>
            dispatch({
                type: GET_SINGLE_USER,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_SINGLE_USER,
                payload: {}
            })
        )
}
export const setUsersLoading = () => {
    return  {
        type: LOADING_USERS
    }
}