import { FETCH_LOGIN, FAILED_LOGIN, RECEIVE_LOGIN, FETCH_LOGOUT, RECEIVE_LOGOUT, FETCH_CHECK_AUTH, RECEIVE_CHECK_AUTH } from '../actions/aLogin';

const defaultAuthState = {
    authData: [],
    isAuthenticated: false,
}
var newAuthState;

export function fetchAuth(state = defaultAuthState, action) {
    switch (action.type) {
        case FETCH_LOGIN:
            return ({
                authData: null,
                inProgress: true,
                isAuthenticated: false
            });
        case RECEIVE_LOGIN:
            newAuthState = action.payload;
            return Object.assign(
                {},
                state,
                newAuthState,
                {
                    authData: newAuthState,
                    inProgress: false,
                    isAuthenticated: true
                }
            );
        case FAILED_LOGIN:
            return ({
                authData: null,
                inProgress: false,
                isAuthenticated: false
            });
        case FETCH_LOGOUT:
            return ({
                ...state,
                inProgress: true
            })
        case RECEIVE_LOGOUT:
            newAuthState = null
            return ({
                authData: null,
                inProgress: false,
                isAuthenticated: false
            })
        case FETCH_CHECK_AUTH:
            return ({
                ...state,
                inProgress: true,
                isAuthenticated: false
            })
        case RECEIVE_CHECK_AUTH:
            // console.log(newAuthState);
            if(newAuthState === '[]') {
                return ({
                    authData: null,
                    inProgress: false,
                    isAuthenticated: true
                })
            } else if(newAuthState == null) {
                return({
                    ...state,
                    inProgress: false,
                    isAuthenticated: false
                });
            } else if(newAuthState != null) {
                return({
                    ...state,
                    inProgress: false,
                    isAuthenticated: true
                });
            } else {
                return({
                    ...state,
                    inProgress: false,
                    isAuthenticated: true
                });
            }
        default:
            return state;
    }
}
