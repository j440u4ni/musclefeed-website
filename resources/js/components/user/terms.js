import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import brand from '../../../images/png/brand@2x.png';
import visaLogo from '../../../images/png/001-visa-logo.png';
import masterLogo from '../../../images/png/002-mastercard.png';
import amexLogo from '../../../images/png/003-american-express-sign.png';

import { Layout, Tabs, Input } from 'antd';
import { Button as BP, Card, Elevation, Icon } from '@blueprintjs/core';
const { Header } = Layout;

import { slugify } from '../../global-tools';
import { productSpecifics } from '../redux/actions-products';

class Terms extends Component {
    constructor(props) { super(props); 
        this.state = { categories: [], products: [], slideshow: [], email: '' };
    }
    
    componentDidMount() { const { dispatch } = this.props; dispatch(productSpecifics()); 
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories)}); }
        if(this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products)}); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images)}); }
    }
    componentDidUpdate(previous) {
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(previous.products !== this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products) }); }
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images) }); }
    }

    render() {
        return(
            <React.Fragment>
                <div className="background-default"></div>
                <Layout className="layout-global">
                    <Card className="cart-box d-flex flex-column align-items-center justify-content-center text-cart px-1" elevation={Elevation.FOUR}>
                        <Link to="/cart" className="d-flex flex-row align-items-center justify-content-center"><Icon icon="shopping-cart" className="icon-cart" />&nbsp;<span>Mon panier</span></Link></Card>
                    <Header className="user-header">
                        <div className="d-flex flex-column container justify-content-start align-items-center">
                            <div className="container-fluid">
                            <div className="row w-100 row-user-information d-flex flex-row justify-content-end container">
                            </div>
                            <div className="row w-100 row-user-header d-flex flex-row">
                                <div className="col-12 col-md-1 col-lg-1"><img src={brand} className="brand-site" /></div>
                                <div className="col-12 col-md-11 col-lg-11 d-flex flex-row justify-content-end align-items-center">
                                    <div className="shadow-box">
                                        { Array.isArray(this.state.categories) && this.state.categories.length >= 1 && this.state.categories.slice(0, 6).map((item) => {
                                            if(item.category_id === 0 && this.state.categories.filter((i) => { return i.category_id === item.id }).length > 0 ) { return( 
                                                <Dropdown key={item.id} className="menu-link" overlay={<Menu>{this.state.categories.filter((i) => { return i.category_id === item.id; }).map((a) => { return <Menu.Item key={a.id} className="menu-link-hover-text"><Link to={`/categories/${slugify(a.name)}`}>{a.name}</Link></Menu.Item>}) }</Menu>}>
                                                    <Button type="link"><span>{item.name}</span></Button>
                                                </Dropdown>); }
                                        }) }
                                    </div>
                                    <Link to="/account" className="dashboard-link home-link home-mobile-button account-hover-link"><span className="home-link button-link account-hover-link"><Icon icon="user" className="mr-1 mt-2 icon-home" />&nbsp;Mon Compte</span></Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Header>
                    <Layout>
                        <div className="main-global-page mt-3">
                            <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-5">
                                <Tabs defaultActiveKey="1" tabPosition="left" className="w-100" style={{ height: 'calc(100vh - 250px)', overflow: 'hidden' }}>
                                    <Tabs.TabPane tab={<span className="button-text tab-pane-text">Conditions de vente</span>} className="d-flex flex-column" key={1}>
                                        <p className="text-terms">Muscle Feed Nutrition, se réserve le droit de modifier la page, et vous invite en tant qu'utilisateur et personne concernée à venir consulter la page constamment, pour rester informer des évolutions.</p>
                                        <h4 className="title-terms">Données personnelles</h4>
                                        <p className="text-terms">Pour pouvoir commander ou créer un simple compte, Muscle Feed Nutrition vous demandera les informations nécessaires, et il est nécessaire de cocher la case
                                        avant toute création de compte pour pouvoir créer un compte.</p>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab={<span className="button-text tab-pane-text">Gestion de cookies</span>} key={2}>
                                        Gestion de Cookies
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                            <div className="container d-flex flex-row justify-content-center align-items-center mt-2 ad-boxes-row w-100">
                            <div className="row w-100">
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4 d-flex flex-row justify-content-center align-items-center"></div>
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4 d-flex flex-row justify-content-center align-items-center"></div>
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4 d-flex flex-row justify-content-center align-items-center"></div>
                            </div>
                        </div>
                            <div className="d-flex flex-column justify-content-center align-items-center mt-3 footer-row footer-other-row">
                                <div className="container h-100 p-2">
                                    <div className="row w-100 d-flex flex-row justify-content-center align-items-center">
                                        <div className="col-12 col-md-4 col-xl-4 col-lg-4 d-flex flex-column justify-content-center">
                                        <h4 className="newsletter-title">Newsletter</h4>
                                            <div className="row d-flex flex-row justify-content-center align-items-center p-0">
                                                <div className="col-12 col-md-8 col-xl-8 col-lg-8"><Input placeholder="E-mail" /></div>
                                                <div className="col-12 col-md-4 col-xl-4 col-lg-4 px-1"><BP intent="none" icon="envelope" className="bp3-dark button-newsletter-confirm" fill={true} /></div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-8 col-xl-8 col-lg-8 d-flex flex-row justify-content-center align-items-start">
                                         <img className="payment-logo mt-4" src={visaLogo} />
                                         <img className="payment-logo ml-4 mt-4" src={amexLogo} />
                                         <img className="payment-logo ml-4 mt-4" src={masterLogo} />
                                        </div>
                                    </div>
                                <div className="row w-100 d-flex flex-row justify-content-center align-items-end">
                                    <span className="button-text terms-text-footer" style={{ color: '#FFFFFF' }}>&copy;{ new Date().getFullYear() }. Tous droits reservés.</span>
                                    <Link to="/terms" className="button-text terms-text-footer ml-5">Termes & Conditions</Link>
                                    <Link to="/legal" className="button-text terms-text-footer ml-2">Mentions Légales</Link>
                                </div>
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
const connectRedux = connect(mapStateToProps)(Terms);
export { connectRedux as Terms };