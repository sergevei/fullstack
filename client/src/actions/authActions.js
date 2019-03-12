import { GET_ERRORS,SET_CURRENT_USER } from "./types";
import Axios from 'axios';
import SetAuthToken from '../utils/setAuthToken';
import JWTdecode from 'jwt-decode';

//Register
export const registerUser = (userData, history) => dispatch => {
    Axios
    .post("/api/users/register" , userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }) 
    );
} 
//Login
export const loginUser = (userData) => dispatch => {
    Axios
    .post("/api/users/login" , userData)
    .then(res => {
        //Save to LocalStorage
        const { token } = res.data;
        //Set token
        localStorage.setItem('jwtToken', token);
        //Set token to authHeader
        SetAuthToken(token);
        //Decoded
        const decode = JWTdecode(token);
        //Set Current user
        dispatch(setCurrentUser(decode));
    })
    .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }) 
    );
} 

export const setCurrentUser = (decode) => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}