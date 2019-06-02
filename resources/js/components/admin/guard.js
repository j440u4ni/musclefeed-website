import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '@blueprintjs/core';
import { Layout, Input } from 'antd';
const { Header } = Layout;

import { authentication } from '../redux/actions-authentication';

class Guard extends Component {
    constructor(props) { super(props); 
        this.state = { email: '', password: '', loading: false };
        this.onEmail = this.onEmail.bind(this); this.onPassword = this.onPassword.bind(this);
        this.onStop = this.onStop.bind(this); this.onConfirm = this.onConfirm.bind(this);
    }
    
    onEmail(event) { this.setState({ email: event.target.value }); }
    onPassword(event) { this.setState({ password: event.target.value }); }
    onStop(event) { this.setState({ loading: false }); }

    onConfirm(event) { const { dispatch } = this.props; this.setState({ loading: true });
        dispatch(authentication(this.state.email, this.state.password, true, this.onStop))
    }

    render() {
        return(
            <React.Fragment>
                 <Layout className="layout-container">
                    <Header className="user-header"></Header>
                    <Layout className="user-global-page mt-0">
                        <div className="container-fluid d-flex flex-row justify-content-center align-items-center mt-2">
                            <div className="row w-100">
                                <div className="col-2 col-lg-2 col-sm-12 col-md-3 mx-auto d-flex flex-column login-form">
                                    <Input type="text" placeholder="E-mail" className="account-input" onChange={this.onEmail} />
                                    <Input.Password size="default" placeholder="Mot de passe" className="account-input mt-1" onChange={this.onPassword} />
                                    <Button intent="primary" loading={this.state.loading} onClick={this.onConfirm} fill={true} text={<span className="button-text">Se connecter</span>} icon="send-to-graph" className="mt-4" />
                                </div>
                            </div>
                        </div>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { return state; }
const connectRedux = connect(mapStateToProps)(Guard);
export { connectRedux as Guard };