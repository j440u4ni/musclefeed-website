import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import imageBrand from '../../../images/png/brand@2x.png';
import visaLogo from '../../../images/png/001-visa-logo.png';
import masterLogo from '../../../images/png/002-mastercard.png';
import amexLogo from '../../../images/png/003-american-express-sign.png';

import { Layout, Progress, Menu, Empty, Button, Divider, Dropdown, Input, Icon as AI, Select, message } from 'antd';
import { Card, Elevation, Icon, Button as BP, InputGroup as BI } from '@blueprintjs/core';

import { slugify } from '../../global-tools';
import { productSpecifics } from '../redux/actions-products';
import { addToCart } from '../redux/actions-products';
const { Header } = Layout;

class Product extends Component {
    constructor(props) { super(props); 
        this.state = { categories: [], products: [], slideshow: [], cart: [], user: [], weights: null, product: null,
            perfumes: null, minimum: 0, perfume: '', weight: '', price: 0, quantity: 1, cart: null
        };
        this.onWeight = this.onWeight.bind(this); this.onPerfume = this.onPerfume.bind(this);
        this.onQuantity = this.onQuantity.bind(this); this.onCart = this.onCart.bind(this);
    }
    
    componentDidMount() { const { dispatch } = this.props; dispatch(productSpecifics()); 
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories)}); }
        if(this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products)}); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images)}); }
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
        if(this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(this.props.cart && typeof this.props.cart === "string") { this.setState({ cart: JSON.parse(this.props.cart) }); }

            const product = JSON.parse(this.props.products).filter((item) => { return slugify(item.name) === this.props.match.params.id }); 
            const details = JSON.parse(product[0].details); this.setState({ minimum: details[details.length-1].reduce((x, y) => { return x.price > y.price ? y : x; }).price });
            this.setState({ product: product[0], price: details[details.length-1].reduce((x, y) => { return x.price > y.price ? y : x; }).price });
    }
    componentDidUpdate(previous) {
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(previous.products !== this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products) }); }
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images) }); }
        if(previous.weights !== this.props.weights && typeof this.props.weights === "string") { this.setState({ weightsw: JSON.parse(this.props.weights) }); }
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
        if(previous.perfumes !== this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(previous.cart !== this.props.cart && typeof this.props.cart === "string") { this.setState({ cart: JSON.parse(this.props.cart) }); }
    }

    onWeight(value) { const details =  JSON.parse(this.state.product.details); const price = details[details.length - 1].filter((p) => { return parseInt(p.id) === parseInt(value) })[0].price; this.setState({ weight: parseInt(value), price: parseInt(price) }); }
    onPerfume(value) { this.setState({ perfume: value }); }
    onQuantity(event) { event.target.value > 1 ? this.setState({ quantity: parseInt(event.target.value), price: parseFloat(this.state.minimum * event.target.value) }) : this.setState({ quantity: 1, price: parseFloat(this.state.minimum) }); }

    onCart() { const { dispatch } = this.props; let cart = Array();
        if(this.state.perfume === '' || this.state.weight === '') { message.warn(<span className="button-text">Choisir un parfum et un poids.</span>); }
        else { this.state.cart === null ? 
              cart.push({id: this.state.product.id, image: this.state.product.image_id, name: this.state.product.name, weight: this.state.weight, perfume: this.state.perfume, price: this.state.price, quantity: this.state.quantity })
            : cart.push(...this.state.cart, {id: this.state.product.id, image: this.state.product.image_id, name: this.state.product.name, weight: this.state.weight, perfume: this.state.perfume, price: this.state.price, quantity: this.state.quantity });
            console.log(cart);
        dispatch(addToCart(this.props.logged, cart)); }
    }

    render() { let image, details, minimum = 0, weights = Array(), perfumes = Array();
        if(this.state.product) { image = this.state.slideshow.filter((b) => { return b.id === this.state.product.image_id; }); }
        if(this.state.product) { details = JSON.parse(this.state.product.details); minimum = (details[details.length-1]).reduce((x, y) => { return x.price > y.price ? y : x; });  } 
        if(this.state.weights) { details[details.length-1].map((a) => { weights.push(...this.state.weights.filter((i) => { return parseInt(i.id) === parseInt(a.id) })); }); }
 
        return(
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
                                <Link to="/account" className="dashboard-link home-link home-mobile-button"><span className="home-link button-link"><Icon icon="user" className="mr-1 mt-2 icon-home" />&nbsp;Mon Compte</span></Link>
                            </div>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Layout className="main-global-page mt-0">
                        <div className="container d-flex flex-row justify-content-center align-items-center mt-5 product-show">
                            <div className="row w-100">
                                <div className="col-12 col-md-3 col-sm-12 col-xl-3 col-lg-3">
                                    { this.state.product && <img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="product-page-image product-mobile-image" /> }
                                </div>
                                <div className="col-12 col-md-9 col-sm-12 col-xl-9 col-lg-9 d-flex flex-column align-items-center">
                                    <h1 className="text-center product-page-title">{this.state.product && this.state.product.name}</h1>
                                    <h5 className="text-center product-page-description-title">{this.state.product && this.state.product.description_title}</h5>
                                    <p className="product-page-description">{this.state.product && this.state.product.description}</p>
                                    <div className="w-100 d-flex flex-row product-price-box mb-2">
                                        <span>Prix: {minimum !== 0 && this.state.price === 0 ? minimum.price.toFixed(2) : this.state.price.toFixed(2) }&euro;</span>
                                    </div>
                                    <div className="w-100 row d-flex flex-row product-details product-details-mobile">
                                        <div className="col-12 col-md-4 col-lg-4 col-xl-4 px-1">
                                            <Select defaultValue="Poids" className="select-input mt-4 w-100" onChange={this.onWeight}>
                                                {weights.length > 0 && weights.map((i) => {
                                                    return(<Select.Option value={i.id} className="select-input" key={1}><span className="select-input">{i.name}</span></Select.Option>);
                                                })}
                                            </Select>
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-4 col-xl-4 px-1">
                                            <Select defaultValue="Parfum" className="select-input mt-4 w-100" onChange={this.onPerfume}>
                                                { this.state.perfumes && this.state.perfumes.map((i) => {
                                                    return(<Select.Option value={i.name} className="select-input" key={1}><span className="select-input">{i.name}</span></Select.Option>);
                                                })}
                                            </Select>
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-4 col-xl-4 px-1">
                                            <BI placeholder="Quantité" className="quantity-input" type="number" value={this.state.quantity} onChange={this.onQuantity} />
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex flex-row product-page-buttons justify-content-end">
                                        <div className="col-12 col-md-2 col-lg-2 d-flex flex-row justify-content-end p-0 mt-1 mobile-cart-button">
                                           { /* <Button className="product-page-bottom-button p-0 px-3" type="danger"><Icon icon="heart" iconSize={10} className="product-home-icon" /></Button> */}
                                            <Button className="product-page-bottom-button product-page-bottom-button-second ml-1 p-0 px-3 button-text mobile-cart" onClick={this.onCart} type="primary"><Icon icon="shopping-cart" iconSize={10} className="product-home-icon mr-2" />&nbsp;Ajouter au panier</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                    </Layout>
                </Layout>
            </Layout>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) { const { categories, products, images, cart, weights, perfumes } = state.reducerProducts; const { logged, user } = state.reducerAuthentication; return { categories, products, weights, images, cart, logged, user, perfumes }; }
const connectRedux = connect(mapStateToProps)(Product);
export { connectRedux as Product }; 