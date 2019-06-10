import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import imageBrand from '../../../images/png/brand@2x.png';
import visaLogo from '../../../images/png/001-visa-logo.png';
import masterLogo from '../../../images/png/002-mastercard.png';
import amexLogo from '../../../images/png/003-american-express-sign.png';

import { Layout, Progress, Menu, Empty, Button, Divider, Dropdown, Input, Icon as AI } from 'antd';
import { Card, Elevation, Icon, Button as BP } from '@blueprintjs/core';

import { slugify } from '../../global-tools';
import { productSpecifics } from '../redux/actions-products';
const { Header } = Layout;

class Category extends Component {
    constructor(props) { super(props); 
        this.state = { categories: [], products: [], slideshow: [], cart: [], user: [], lookup: [], category: [] };
    }
    
    componentDidMount() { const { dispatch } = this.props; dispatch(productSpecifics()); 
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories)}); }
        if(this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products)}); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images)}); }
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
            const category = JSON.parse(this.props.categories).filter((item) => { return slugify(item.name) === this.props.match.params.id }); this.setState({ category: category[0] });
            const lookup = JSON.parse(this.props.products).filter((item) => { return item.category_id === category[0].id }); this.setState({ lookup: lookup });
    }
    componentDidUpdate(previous) {
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(previous.products !== this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products) }); }
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images) }); }
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }

    render() {
        return (
            <React.Fragment>
            <Layout className="layout-global">
                <Card className="cart-box d-flex flex-column align-items-center justify-content-center text-cart px-1" elevation={Elevation.FOUR}>
                        <Link to="/cart" className="d-flex flex-row align-items-center justify-content-center"><Icon icon="shopping-cart" className="icon-cart" />&nbsp;<span>Mon panier</span></Link></Card>
                <Header className="user-header">
                    <div className="container-fluid d-flex flex-column container justify-content-start align-items-center">
                        <div className="row w-100 row-user-information d-flex flex-row justify-content-end container">
                            <span className="info-text"><strong className="mr-2">Service client:</strong> +33 7 66 16 36 22</span>
                        </div>
                        <div className="row w-100 row-user-header d-flex flex-row">
                            <div className="col-12 col-md-1 col-lg-1"><Link to="/"><img src={imageBrand} className="brand-site" /></Link></div>
                            <div className="col-12 col-md-11 col-lg-11 d-flex flex-row justify-content-end align-items-center">
                                <Card interactive={false} elevation={Elevation.THREE} className="shadow-box">
                                    { Array.isArray(this.state.categories) && this.state.categories.length >= 1 && this.state.categories.slice(0, 6).map((item) => {
                                        if(item.category_id === 0 && this.state.categories.filter((i) => { return i.category_id === item.id }).length > 0 ) { return( 
                                            <Dropdown key={item.id} className="menu-link" overlay={<Menu>{this.state.categories.filter((i) => { return i.category_id === item.id; }).map((a) => { return <Menu.Item key={a.id} className="menu-link-hover-text"><Link to={`/categories/${slugify(a.name)}`}>{a.name}</Link></Menu.Item>}) }</Menu>}>
                                                <Button type="link"><span>{item.name}</span></Button>
                                            </Dropdown>); }
                                    }) }
                                </Card>
                                <Divider type="vertical" className="divider-main" />
                                <Link to="/account" className="dashboard-link home-link"><span className="home-link button-link"><Icon icon="user" className="mr-1 mt-2 icon-home" />&nbsp;Mon Compte</span></Link>
                            </div>
                        </div>
                    </div>
                </Header>
                <Layout className="main-global-page mt-0">
                        <div className="container d-flex flex-column justify-content-start category-products">
                            <h4 className="category-title">{this.state.category && this.state.category.name}</h4>
                            <div className="row d-flex flex-row box-products justify-content-start">
                                { Array.isArray(this.state.lookup) && this.state.lookup.slice(0, 15).map((a) => { const image = this.state.slideshow.filter((b) => { return b.id === a.image_id; }); let details = JSON.parse(a.details); const minimum = (details[details.length-1]).reduce((x, y) => { return x.price > y.price ? y : x; });
                                    return (
                                        <Link to={`/product/${slugify(a.name)}`} className="w-100 product-link col-12 col-md-3 col-lg-2 ml-4 mt-2 p-0 product-box-home product-home-box" key={a.id}>
                                        <Card key={a.id} className="w-100 d-flex flex-column align-items-center p-2" interactive={false} elevation={Elevation.FOUR}>
                                            <img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="image-thumbnail product-bottom-image mt-0" />
                                            <h6 className="text-center product-bottom-identifier-title mt-1">{a.name}</h6>
                                            <h6 className="text-center product-bottom-description-title mt-1">{a.description_title}</h6>
                                            <p className="product-bottom-description">{a.description.slice(0, 120)}...</p>
                                            <div className="row d-flex flex-row p-0 w-100 mt-1">
                                                <div className="col-12 col-md-10 col-lg-10 fredoka-bottom-police flex-row justify-content-start p-0 px-1">Prix: {minimum.price}&euro;</div>
                                                <div className="col-12 col-md-2 col-lg-2 d-flex flex-row justify-content-end p-0">
                                                    { /* <Button className="product-home-bottom-button p-0 px-3"><Icon icon="heart" iconSize={10} className="product-home-icon" /></Button> */}
                                                    <Link to={`/product/${slugify(a.name)}`}><Button className="product-home-bottom-button ml-1 p-0 px-3"><span className="button-text card-button-text">Lire Plus</span>&nbsp;<Icon icon="shopping-cart" iconSize={10} className="product-home-icon" /></Button></Link>
                                                </div>
                                            </div>
                                        </Card>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="container d-flex flex-row arrow-container"></div>
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
                </Layout>
            </Layout>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { categories, products, images, cart } = state.reducerProducts; const { logged, user } = state.reducerAuthentication; return { categories, products, images, cart, logged, user }; }
const connectRedux = connect(mapStateToProps)(Category);
export { connectRedux as Category }; 