import Axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, CREATE_PROFILE, SET_CURRENT_USER} from './types';

//GET current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    Axios
        .get('/api/profile')
        .then( res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}

//PROFILE loading
export const setProfileLoading = () => {
    return  {
        type: PROFILE_LOADING
    }
}

//Clear Profile
export const clearCurrentProfile = () => {
    return  {
        type: CLEAR_CURRENT_PROFILE
    }
};

//Create Profile 
export const createCurrentProfile = ( profileDATA, history ) => dispatch => {
    Axios
        .post('/api/profile', profileDATA)
        .then(res => history.push("/profile"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Delete Account
export const deleteAccount = () => dispatch => {
    Axios
        .delete('/api/profile')
        .then(res=>
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })    
        )
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}