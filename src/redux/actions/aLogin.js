import axios from 'axios';
export const FETCH_LOGIN = 'FETCH_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const FETCH_LOGOUT = 'FETCH_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'
export const FETCH_CHECK_AUTH = 'FETCH_CHECK_AUTH'
export const RECEIVE_CHECK_AUTH = 'RECEIVE_CHECK_AUTH'

export function fetchLogin(_username,_password){

    return (dispatch) => {
        dispatch({
            type: FETCH_LOGIN
        })
        axios({
            method:'post',
            url:"http://172.105.119.140:8086/api/user/login", //For API
            data: {
                user_name: _username,
                password: _password,
            }
        })
        .then((response) => {
            console.log(response.data.result)
             if(response.status === 200) {
                if (response.data.status === 'success') {
                    dispatch( {
                        type: RECEIVE_LOGIN,
                        payload: response.data.result
                    })
                } else {
                    dispatch({
                        type: FAILED_LOGIN
                    })
                    // return toast.error(response.data.message);
                }
            } else {
                dispatch({
                    type: FAILED_LOGIN
                })
            }
        })
        .catch(function(error){
            console.log(error.response)
            if(error.response.status === 401) {
                dispatch({
                    type: FAILED_LOGIN
                })
            } else if (error.response.status === 404 || error.response.status === 500) {
                dispatch({
                    type: FAILED_LOGIN
                })
            } else if (error.response.data) {
                dispatch({
                    type: FAILED_LOGIN
                })
            } else {
                dispatch({
                    type: FAILED_LOGIN
                })
            }
        })
    }
}

export function checkAuth() {
    return (dispatch) => {
        dispatch({
            type: FETCH_CHECK_AUTH
        })
        dispatch({
            type: RECEIVE_CHECK_AUTH
        })
    }
}

export function clearAuth() {
    sessionStorage.clear();
    return (dispatch) => {
        dispatch({
            type: FETCH_LOGOUT
        })
        dispatch({
            type: RECEIVE_LOGOUT
        })
    }
}
