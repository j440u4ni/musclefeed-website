import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon } from '@blueprintjs/core';
import { Layout, Divider } from 'antd';
import imageBrand from '../../../images/png/brand@2x.png';

import { productSpecifics } from '../redux/actions-products';
const { Header } = Layout;

class Home extends Component {
    constructor(props) { super(props); }
    
    componentDidMount() { const { dispatch } = this.props; dispatch(productSpecifics()); }
    componentDidUpdate(previous) {}

    render() { 
        return(
            <React.Fragment>
                <Layout className="layout-global">
                    <Header className="user-header">
                        <div className="d-flex flex-row container justify-content-center align-items-center">
                            <div className="col-3"><img src={imageBrand} className="brand-site" /></div>
                            <div className="col-9 d-flex flex-row justify-content-end align-items-center">
                                <Divider type="vertical" className="divider-main" />
                                <Link to="/account" className="dashboard-link home-link"><span className="home-link button-link"><Icon icon="user" className="mr-1 mt-2 icon-home" />&nbsp;Mon Compte</span></Link>
                            </div>
                        </div>
                    </Header>
                    <Layout className="main-global-page mt-0">
                        <div className="container-fluid d-flex flex-row justify-content-center align-items-center mt-2 animated fadeInRight">
                        </div>
                    </Layout>
                </Layout>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) { const { categories } = state.reducerProducts; return { categories }; }
const connectRedux = connect(mapStateToProps)(Home);
export { connectRedux as Home };