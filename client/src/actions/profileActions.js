import Axios from 'axios';
import { 
            GET_PROFILE,
            PROFILE_LOADING, 
            GET_ERRORS, 
            CLEAR_CURRENT_PROFILE, 
            SET_CURRENT_USER,
            GET_NEWS,LOADING_NEWS,
            GET_SINGLE_NEWS,
            GET_POPULAR_NEWS,
            GET_WORLD_NEWS
        } from './types';

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
//NEWSES loading
export const getAllNews = () => dispatch => {
    dispatch(setNewsLoading());
    Axios
        .get('/api/news/all')
        .then( res =>
            dispatch({
                type: GET_NEWS,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_NEWS,
                payload: {}
            })
        )
}
//NEWSES loading
export const getWorldNews = () => dispatch => {
    dispatch(setNewsLoading());
    Axios
        .get('/api/news/world')
        .then( res =>
            dispatch({
                type: GET_WORLD_NEWS,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_WORLD_NEWS,
                payload: {}
            })
        )
}
export const getSingleNews = (id) => dispatch => {
    //dispatch(setNewsLoading());
    dispatch(getPopularNews());
    Axios
        .get(`/api/news/${id}`)
        .then( res =>
            dispatch({
                type: GET_SINGLE_NEWS,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_SINGLE_NEWS,
                payload: {}
            })
        )
}
export const setNewsLoading = () => {
    return  {
        type: LOADING_NEWS
    }
}
//DELETE news 
export const deleteNews = (id) => dispatch => {
    Axios
        .post(`/api/profile/news/${id}`)
        .then( res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_NEWS,
                payload: {}
            })
        )
}
//Like news
export const likeNews = (id) => dispatch => {
    Axios
        .post(`/api/news/like/${id}`)
        .then( res => {
            dispatch(getAllNews());
            dispatch(getPopularNews());
            dispatch(getWorldNews());
        })
        .catch( err =>
            dispatch({
                type: GET_NEWS,
                payload: {}
            })
        )
}
//Like news single
export const likeNewsSingle = (id , newsId) => dispatch => {
    Axios
        .post(`/api/news/like/${id}`)
        .then( res => {
            dispatch(getSingleNews(newsId));
        })
        .catch( err =>
            dispatch({
                type: GET_SINGLE_NEWS,
                payload: {}
            })
        )
}
//Like news single
export const commentNewsSingle = (id, newsId, newComment) => dispatch => {
    Axios
        .post(`/api/news/comments/${id}`,newComment)
        .then( res => {
            dispatch(getSingleNews(newsId));
        })
        .catch( err =>
            dispatch({
                type: GET_SINGLE_NEWS,
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

export const createNews = ( profileDATA, history ) => dispatch => {
    Axios
        .post('/api/profile/news', profileDATA)
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


//GET popular news
export const getPopularNews = () => dispatch => {
    dispatch(setNewsLoading());
    Axios
        .get('/api/news/popular')
        .then( res =>
            dispatch({
                type: GET_POPULAR_NEWS,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type: GET_POPULAR_NEWS,
                payload: {}
            })
        )
}