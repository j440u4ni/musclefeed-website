import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Layout, Progress, Icon, Empty, Button, Modal, Input } from 'antd';
import { Card, Elevation, Button as BP } from '@blueprintjs/core';
import imageBrand from '../../../images/png/brandv2@2x.png';

import { slugify } from '../../global-tools';
const { Header } = Layout;

import { verification, logout } from '../redux/actions-authentication';

class Profile extends Component {
    constructor(props) { super(props);  this.state = { user: null, visibleConfiguration: false };
        this.onLogout = this.onLogout.bind(this); 
        this.onConfiguration = this.onConfiguration.bind(this);
    }

    componentDidMount() { const { dispatch, history } = this.props;  dispatch(verification(false));
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }
    componentDidUpdate(previous) {
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }
    
    onLogout() { const { dispatch } = this.props; dispatch(logout()); }
    onConfiguration() { this.setState({ visibleConfiguration: !this.state.visibleConfiguration }); }

    render() { console.log(this.state.user);
        return(
            <React.Fragment>
                <Layout className="layout-global">
                    <Header className="account-navbar">
                        <div className="container-fluid d-flex flex-column container justify-content-start align-items-center">
                            <div className="row w-100 row-user-header d-flex flex-row">
                                <div className="col-12 col-md-1 col-lg-1"><Link to="/"><img src={imageBrand} className="brand-site" /></Link></div>
                                <div className="col-12 col-md-11 col-lg-11 d-flex flex-row justify-content-end align-items-center">
                                    <span className="user-name mr-1">{this.state.user && this.state.user.name}</span>
                                    <BP intent="danger" icon="power" onClick={this.onLogout} className="item-bl" />
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Layout className="account-global-page mt-0">
                        <div className="container d-flex flex-row justify-content-center account-container">
                            <div className="row w-100">
                            <div className="col-12 col-lg-3 col-md-3"><Card elevation={Elevation.TWO} className="w-100 p-2 px-3 d-flex flex-column align-items-center">
                                <span className="user-bold">Bienvenue, {this.state.user && this.state.user.civility === 1 ? 'Mr' : 'Mme'} {this.state.user && this.state.user.name}</span> 
                                {this.state.user && <Progress type={"circle"} percent={this.state.user.fidelity} className="mt-2 align-self-center ml-4 circle-fidelity" /> }
                                <p className="terms-text text-center mt-1 mb-0">Une fois la jauge pleine, nous vous offrons 10% de remise sur votre prochaine commande.</p>
                            </Card></div>
                            <div className="col-12 col-lg-9 col-md-9">
                            <Card elevation={Elevation.TWO} className="w-100 p-2 d-flex flex-column align-items-start px-3 mt-1">
                                <h4 className="user-bold-title mt-0 profile-edit-title mb-0">Vos informations personnelles&nbsp;<Button onClick={this.onConfiguration} type="link"><Icon type="edit" className="profile-edit-icon" /></Button></h4>
                                <div className="d-flex flex-row align-items-center justify-content-center w-100 block-item">
                                    <div className="col-12 col-md-4 col-lg-4 d-flex flex-column align-items-start w-100">
                                        <span className="user-information-span w-100 d-flex flex-row"><span className="mr-2">Nom Complet: </span>&nbsp;{this.state.user && this.state.user.name}</span>
                                        <span className="user-information-span w-100 d-flex flex-row"><span className="mr-2">E-mail: </span>&nbsp;{this.state.user && this.state.user.email}</span>
                                        <div className="mt-2"></div>
                                    </div>
                                    <div className="col-12 col-md-8 col-lg-8 d-flex flex-column align-items-start w-100">
                                        <span className="user-information-span w-100 d-flex flex-row"><span className="mr-2">Adresse: </span>&nbsp;{this.state.user && this.state.user.main_address ? this.state.user.main_address : 'Non renseigné'}</span>
                                        <span className="user-information-span w-100 d-flex flex-row"><span className="mr-2">Complément: </span>&nbsp;{this.state.user && this.state.user.secondary_address ? this.state.user.secondary_address : 'Non renseigné'}</span>
                                    </div>
                                </div>
                            </Card>
                            <Card elevation={Elevation.TWO} className="w-100 p-2 d-flex flex-column align-items-start px-3 mt-1">
                                <h4 className="user-box-title mt-1"><Icon type="code-sandbox" />&nbsp;<span>Mes Commandes</span></h4>
                                <div className="d-flex flex-row align-items-center justify-content-center w-100">
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="mb-2" />
                                </div>
                            </Card>                           
                            </div>
                            </div>
                        </div>
                    </Layout>
                </Layout>
                <Modal title={<span className="modal-title" className="p-1"><Icon type="setting" className="setting-icon" />&nbsp;Configuration</span>} onCancel={this.onConfiguration} visible={this.state.visibleConfiguration}>
                    <Input placeholder="Adresse E-mail" prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.1)' }} />}/>
                </Modal>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { user } = state.reducerAuthentication; return { user }; }
const connectRedux = connect(mapStateToProps)(Profile);
export { connectRedux as Profile };
