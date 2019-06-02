import { constantsAuthentication } from './constants-authentication';

const initial = localStorage.getItem('user-data') ? { user: localStorage.getItem('user-data'), logged: true } : { logged: false, user: null };
export function reducerAuthentication(state = initial, action) {
    switch(action.type) {
        case constantsAuthentication.authenticationFailure: return { logged: false, user: null };
        case constantsAuthentication.authenticationRequest: return { logged: false, user: null };
        case constantsAuthentication.authenticationSuccess: return { logged: true, user: action.user};

        case constantsAuthentication.tokenVerificationRequest: return { ...state };
        case constantsAuthentication.tokenVerificationFailure: return { logged: false, user: null };
        case constantsAuthentication.tokenVerificationSuccess: return { ...state };

        case constantsAuthentication.logoutRequest: return { ...state };
        case constantsAuthentication.logoutFailure: return { ...state };
        case constantsAuthentication.logoutSuccess: return { logged: false, user: null };

        case constantsAuthentication.registerRequest: return { ...state };
        case constantsAuthentication.registerFailure: return { ...state };
        case constantsAuthentication.registerSuccess: return { logged: true, user: action.user };
        
        default: return state;
    }
}