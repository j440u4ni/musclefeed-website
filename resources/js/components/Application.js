import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Dashboard } from './admin/dashboard';
import { Merchandise } from './admin/merchandise';
import { Guard } from './admin/guard';
import { Gallery } from './admin/gallery';

import { Account } from './user/account';
import { Profile } from './user/profile';
import { Home } from './user/home';
import { Cart } from './user/cart';
import { Product } from './user/product';
import { Terms } from './user/terms';

import { Category } from './user/category';
import { runnerStore } from './redux/store.application.js';

import { RouteAdmin, RouteUser, 
    RouteGuestUser, RouteGuestAdmin } from '../protected.routes';

export default class Application extends Component {
    render() {
        return (
        <Provider store={runnerStore}>
            <BrowserRouter forceRefresh={true}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/categories/:id" component={Category} />
                    <Route exact path="/product/:id" component={Product} />
                    <Route exact path="/terms" component={Terms} />

                    <Route exact path="/cart" component={Cart} />
                    <RouteGuestAdmin exact path="/admin" component={Guard} />
                    <RouteAdmin exact path="/dashboard" component={Dashboard} />
                    <RouteAdmin exact path="/merchandise" component={Merchandise} />
                    <RouteAdmin exact path="/gallery" component={Gallery} />
                    
                    <RouteGuestUser exact path="/account" component={Account} />
                    <RouteUser exact path="/profile" component={Profile} />
                </Switch>
            </BrowserRouter>
        </Provider>
        );
    }
}

if (document.getElementById('runner')) {
    ReactDOM.render(<Application />, document.getElementById('runner'));
}
