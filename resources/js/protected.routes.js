import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const RouteUser = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user-bool') !== null 
        ? <Component {...rest} /> 
        : <Redirect to={{ pathname: '/account', from: props.location }} />
    )} />
);

export const RouteAdmin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('admin-bool') !== null 
        ? <Component {...rest} /> 
        : <Redirect to={{ pathname: '/admin', from: props.location }} />
    )} />
);

export const RouteGuestUser = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user-bool') !== null 
        ? <Redirect to={{ pathname: '/profile', from: props.location }} />
        : <Component {...rest} />
    )} />
);

export const RouteGuestAdmin= ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('admin-bool') !== null 
        ? <Redirect to={{ pathname: '/dashboard', from: props.location }} />
        : <Component {...rest} />
    )} />
);