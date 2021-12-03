import {CONNECT_USER, LOGOUT_USER} from './actions-type';

export const connectUser = (user)=>{
    return function(dispatch) {
        dispatch({
            type: CONNECT_USER,
            payload: user
        })
    }
}

export const logoutUser = (user)=>{
    console.log('declenchement logout action')
    return function(dispatch) {
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
    }
}