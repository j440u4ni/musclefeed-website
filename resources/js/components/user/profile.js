import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';
import { Card, Elevation, Button as BP } from '@blueprintjs/core';
import imageBrand from '../../../images/png/brandv2@2x.png';
import { slugify } from '../../global-tools';
const { Header } = Layout;

import { verification, logout } from '../redux/actions-authentication';

class Profile extends Component {
    constructor(props) { super(props);  this.state = { user: null };
        this.onLogout = this.onLogout.bind(this); 
    }

    componentDidMount() { const { dispatch, history } = this.props;  dispatch(verification(false));
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }
    componentDidUpdate(previous) {
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }
    
    onLogout() { const { dispatch } = this.props; dispatch(logout()); }
    
    render() {
        return(
            <React.Fragment>
                <Layout className="layout-global">
                    <Header className="account-navbar">
                        <div className="container-fluid d-flex flex-column container justify-content-start align-items-center">
                            <div className="row w-100 row-user-header d-flex flex-row">
                                <div className="col-12 col-md-1 col-lg-1"><img src={imageBrand} className="brand-site" /></div>
                                <div className="col-12 col-md-11 col-lg-11 d-flex flex-row justify-content-end align-items-center">
                                    <BP intent="danger" icon="power" onClick={this.onLogout} className="item-bl" />
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Layout className="main-global-page mt-0">
                        <div className="container d-flex flex-csolumn justify-content-center align-items-center account-container">
                            <div className="col-3"><Card elevation={Elevation.TWO} className="w-100"></Card></div>
                            <div className="col-9"><Card elevation={Elevation.TWO} className="w-100"></Card></div>
                        </div>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { user } = state.reducerAuthentication; return { user }; }
const connectRedux = connect(mapStateToProps)(Profile);
export { connectRedux as Profile };