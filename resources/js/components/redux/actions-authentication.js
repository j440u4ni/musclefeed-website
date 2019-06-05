import React from 'react';
import { constantsAuthentication } from './constants-authentication';
import { createBrowserHistory} from 'history';
import { message } from 'antd';

const history = createBrowserHistory(); 

export function authentication(email, password, admin, stop) {
    return (dispatch) => {
        fetch('https://musclefeed.co/api/v1/account/login', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, is_admin: admin }) }).then((first) => { return first.json(); })
            .then((response) => { dispatch(request());
                if(!response.hasOwnProperty('success')) { dispatch(failure()); stop(); message.warn(<span className="button-text">Authentification échoué.</span>); }
                else { localStorage.setItem('user-data', JSON.stringify(response.user)); localStorage.setItem('user-token', response.access);
                       if(admin === true) { stop(); localStorage.setItem('admin-bool', true); history.push('/dashboard'); dispatch(success(JSON.stringify(response.user))); window.location.reload();} 
                       else if(admin === false) { stop(); localStorage.setItem('user-bool', true); history.push('/profile'); dispatch(success(JSON.stringify(response.user))); window.location.reload(); }
                }
            });
    }

    function request() { return { type: constantsAuthentication.authenticationRequest }; }
    function success(user) { return { type: constantsAuthentication.authenticationSuccess, user: user }; }
    function failure() { return { type: constantsAuthentication.authenticationFailure }; }
}

export function verification(admin) {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/account/token-verification', { method: 'GET', headers: { 'Accept' : 'application/json', 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token } }).then((first) => { return first.json(); })
            .then((response) => { dispatch(request());
                if(!response.hasOwnProperty('success')) { dispatch(failure()); localStorage.clear(); history.push('/'); window.location.reload(); } 
                else { dispatch(success()); }
            }).catch((error) => { localStorage.clear(); dispatch(failure()); history.push('/'); window.location.reload(); })
    }

    function request() { return { type: constantsAuthentication.tokenVerificationRequest }; }
    function success() { return { type: constantsAuthentication.tokenVerificationSuccess }; }
    function failure() { return { type: constantsAuthentication.tokenVerificationFailure }; }
}

export function logout() {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/account/logout', { method: 'GET', headers: { 'Accept' : 'application/json', 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token } }).then((first) => { return first.json(); })
            .then((response) => { dispatch(request()); 
                if(!response.hasOwnProperty('success')) { localStorage.clear(); dispatch(failure()); history.push('/'); window.location.reload();
                } else { localStorage.clear(); dispatch(success()); history.push('/'); window.location.reload(); }
            });
    }

    function request() { return { type: constantsAuthentication.logoutRequest }; }
    function success() { return { type: constantsAuthentication.logoutSuccess }; }
    function failure() { return { type: constantsAuthentication.logoutFailure }; }
}

export function register(civility, name, email, password, phone, stop) {
    return (dispatch) => {
        fetch('https://musclefeed.co/api/v1/account/register', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, civility, name, phone }) }).then((first) => { return first.json(); })
            .then((response) => { dispatch(request()); console.log(response);
                if(!response.hasOwnProperty('success')) { dispatch(failure()); stop(); message.warn(<span className="button-text">Vérifier vos données.</span>); }
                else { 
                    localStorage.setItem('user-data', JSON.stringify(response.user)); localStorage.setItem('user-token', response.access);
                    dispatch(success(JSON.stringify(response.user))); localStorage.setItem('user-bool', true); history.push('/profile'); window.location.reload(); }
            });
        
        function request() { return { type: constantsAuthentication.registerRequest }; }
        function success(user) { return { type: constantsAuthentication.registerSuccess, user: user }; }
        function failure() { return { type: constantsAuthentication.registerFailure }; }
    }
}