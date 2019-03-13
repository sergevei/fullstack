import Axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE} from './types';

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
}