import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Elevation, Icon as BI, Button as BP } from '@blueprintjs/core';
import { Layout, Menu, Dropdown, Button } from 'antd';
const { Header } = Layout;

import { verification, logout } from '../redux/actions-authentication';

const menuMerchandise = (<Menu>
    <Menu.Item key="2"><Link to="/merchandise-all" className="dashboard-link"><span className="button-text-dashboard"><BI icon="list-detail-view" className="mr-2" />&nbsp;Produits</span></Link></Menu.Item>
    <Menu.Item key="1"><Link to="/merchandise" className="dashboard-link"><span className="button-text-dashboard"><BI icon="add-to-folder" className="mr-2" />&nbsp;Marchandise</span></Link></Menu.Item>
</Menu>);
const menuGallery = (<Menu>
    <Menu.Item key="1"><Link to="/gallery" className="dashboard-link"><span className="button-text-dashboard"><BI icon="new-grid-item" className="mr-2" />&nbsp;Tous</span></Link></Menu.Item>
</Menu>);

class Dashboard extends Component {
    constructor(props) { super(props);  this.state = { user: null };
        this.onLogout = this.onLogout.bind(this); 
    }

    componentDidMount() { const { dispatch, history } = this.props;  dispatch(verification(true));
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }
    componentDidUpdate(previous) {
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }
    
    onLogout() { const { dispatch } = this.props; dispatch(logout()); }

    render() {
        return(
            <React.Fragment>
                <Layout>
                    <Header className="admin-header py-2">
                        <div className="container-fluid d-flex flex-row align-items-center justify-content-center header-container">
                            <div className="col-3"></div>
                            <div className="col-9 d-flex flex-row align-items-center justify-content-center">
                                <Link to="/dashboard" className="dashboard-link mr-2"><Button className="button-shadow-link"><span className="button-text-dashboard">Panneau de contrôle</span></Button></Link>
                                <Dropdown overlay={menuGallery} className="mr-2"><Button className="button-shadow-link"><span className="button-text-dashboard">Paramètres Images</span></Button></Dropdown>
                                <Dropdown overlay={menuMerchandise} className="mr-2 mr-auto"><Button className="button-shadow-link"><span className="button-text-dashboard">Paramètres Marchandises</span></Button></Dropdown>
                                <span className="home-link mr-1">{this.state.user && this.state.user.name}</span>
                                <BP intent="danger" icon="power" onClick={this.onLogout} />
                            </div>
                        </div>
                    </Header>
                    <Layout className="admin-global-page mt-0">
                        <div className="container-fluid d-flex flex-row justify-content-center mt-5">
                        </div>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { user } = state.reducerAuthentication; return { user }; }
const connectRedux = connect(mapStateToProps)(Dashboard);
export { connectRedux as Dashboard };