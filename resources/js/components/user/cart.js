import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import imageBrand from '../../../images/png/brand@2x.png';

import { Layout, Progress, Menu, Empty, Button, Divider, Dropdown, Input, Icon as AI } from 'antd';
import { Card, Elevation, Icon, Button as BP } from '@blueprintjs/core';

import { slugify } from '../../global-tools';
import { productSpecifics, deleteFromCart } from '../redux/actions-products';
const { Header } = Layout;

class Cart extends Component {
    constructor(props) { super(props); 
        this.state = { categories: [], products: [], slideshow: [], cart: [], user: [],
            name: '', email: '', main_address: '', secondary_address: '', city: '', country: '', phone: '',
            total: 0, coupon: ''
        };
        this.onName = this.onName.bind(this); this.onMain = this.onMain.bind(this);
        this.onSecondary = this.onSecondary.bind(this); this.onCity = this.onCity.bind(this);
        this.onPhone= this.onPhone.bind(this); this.onDelete = this.onDelete.bind(this);
    }
    
    componentDidMount() { const { dispatch } = this.props; dispatch(productSpecifics()); let total = 0;
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories)}); }
        if(this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products)}); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images)}); }
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
        if(this.props.cart && typeof this.props.cart === "string") { 
            this.setState({ cart: JSON.parse(this.props.cart) }); 
            JSON.parse(this.props.cart).map((item) => { total += item.price });
            this.setState({ total: total });
        }
    }
    componentDidUpdate(previous) {
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(previous.products !== this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products) }); }
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images) }); }
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
        if(previous.cart !== this.props.cart && typeof this.props.cart === "string") { this.setState({ cart: JSON.parse(this.props.cart) }); }
    }

    onName(event) { this.setState({ name: event.target.value }); }
    onMain(event) { this.setState({ main_address: event.target.value }); }
    onSecondary(event) { this.setState({ secondary_address: event.target.value }); }
    onCity(event) { this.setState({ city: event.target.value }); }
    onPhone(event) { this.setState({ phone: event.target.value }); }

    onDelete(id) { const { dispatch } = this.props;
        const cart = this.state.cart.filter((i) => { return parseInt(i.id) !== parseInt(id) });
        dispatch(deleteFromCart(this.props.logged, cart));
    }

    render() {
        return (
            <React.Fragment>
            <Layout className="layout-global">
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
                        <div className="container d-flex flex-row justify-content-center mt-5 cart-container">
                            <div className="row w-100">
                                <div className="col-12 col-md-9 col-xl-9 col-lg-9">
                                    <div elevation={Elevation.TWO} className="h-100 p-1 d-flex flex-row justify-content-center align-items-center">
                                        <div className="col-12 col-md-9 col-lg-9 h-100 d-flex flex-row justify-content-end align-items-center">
                                            <div className="d-flex flex-column justify-content-start align-items-start w-100">
                                                {this.state.cart.slice(0, 5).map((item) => { const image = this.state.slideshow.filter((b) => { return b.id === item.image; });
                                                    return(
                                                        <div className="col-12 col-md-12 col-lg-12 d-flex flex-row mt-3" key={item.id}>
                                                            <div className="col-12 col-md-2 col-sm-2 col-lg-2"><img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="product-cart-image mt-0 mr-1" /></div>
                                                            <div className="col-12 col-md-4 col-sm-4 col-lg-4 d-flex flex-column justify-content-start align-items-start">
                                                                <span className="product-cart-title">{item.name}</span>
                                                                <span className="product-quantity-title">Quantité: {item.quantity}</span>
                                                            </div>
                                                            <div className="col-12 col-md-6 col-sm-6 col-lg-6 d-flex flex-row justify-content-end align-items-start">
                                                                <BP icon="minus" intent="danger" style={{ position: 'relative' }} onClick={() => { this.onDelete(item.id) }} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <Divider type="vertical" style={{ height: '97%', color: '#888888' }} />
                                        </div>
                                        <div className="col-12 col-md-2 col-lg-2 h-100 p-0 d-flex flex-column justify-content-center align-items-start">
                                            <div className="row w-100 d-flex flex-row justify-content-center">
                                                <span className="cart-text-delivery">Frais de livraison: <span className="ml-2">{ this.state.total < 59 ? 8.90 : 0 }&euro;</span></span>
                                            </div>
                                            <div className="row w-100"><span className="cart-total ml-auto mt-2">Total: {this.state.total < 59 ? this.state.total + 8.9 : this.state.total}&euro;</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                    <Card elevation={Elevation.TWO} className="h-100 d-flex flex-column justify-content-start align-items-center p-1">
                                        <div className="row w-100 d-flex flex-column p-1">
                                            { this.props.logged === false ?
                                                <React.Fragment>
                                                    <Link to="/account" className="account-link"><BP text={<span className="button-text">Se Connecter</span>} fill={true}/></Link>
                                                    <Divider className="divider-cart mb-0">Ou</Divider>
                                                    <h4 className="user-bold-title mt-0 profile-edit-title mb-1 text-center">Adresse de livraison</h4>
                                                    <Input prefix={<AI type="user" style={{ color: 'rgba(0, 0, 0, 0.1)'}} />} placeholder={this.state.user.name ? this.state.user.name : 'Nom Complet'} className="cart-input" onChange={this.onName} />
                                                    <Input placeholder={this.state.user.main_address ? this.state.user.main_address : 'Addresse de livraison'} className="cart-input mt-1" onChange={this.onMain} />
                                                    <Input placeholder={this.state.user.secondary_address ? this.state.user.secondary_address : 'Complément addresse & Code Postal' } className="cart-input mt-1" onChange={this.onSecondary} />
                                                    <Input placeholder={this.state.user.city ? this.state.user.city : 'Ville' } className="cart-input mt-1" onChange={this.onCity} />
                                                    <Input placeholder={this.state.user.phone ? this.state.user.phone : 'Téléphone' } className="cart-input mt-1" onChange={this.onPhone} />
                                                </React.Fragment> : 
                                                <React.Fragment>
                                                    <h4 className="user-bold-title mt-3 profile-edit-title mb-1 text-center">Adresse de livraison</h4>
                                                    <Divider className="mt-0" />
                                                    <Input prefix={<AI type="user" style={{ color: 'rgba(0, 0, 0, 0.1)'}} />} placeholder={this.state.user.name} className="cart-input" onChange={this.onName} />
                                                    <Input placeholder={this.state.user.main_address ? this.state.user.main_address : 'Addresse de livraison'} className="cart-input mt-1" onChange={this.onMain} />
                                                    <Input placeholder={this.state.user.secondary_address ? this.state.user.secondary_address : 'Complément addresse & Code Postal' } className="cart-input mt-1" onChange={this.onSecondary} />
                                                    <Input placeholder={this.state.user.city ? this.state.user.city : 'Ville' } className="cart-input mt-1" onChange={this.onCity} />
                                                    <Input placeholder={this.state.user.phone ? this.state.user.phone : 'Téléphone' } className="cart-input mt-1" onChange={this.onPhone} />
                                                </React.Fragment>
                                            }
                                        </div>
                                        <div className={this.props.logged ? "row w-100 d-flex flex-row mt-5 coupon-box" : "row w-100 d-flex flex-row mt-5 coupon-box-off"}> 
                                            <div className="col-9 p-1"><Input placeholder="Coupon" className="coupon-input" /></div>
                                            <div className="col-3 p-1"><BP icon="confirm" fill={true} intent="danger" style={{ marginTop: 0.5 }} /></div>
                                        </div>
                                        <div className={this.props.logged ? "row w-100 flex-row p-1 coupon-box" : "row w-100 flex-row p-1 coupon-box-off"}>
                                            <BP icon="send-to" text={<span className="button-text">Confirmer</span>} intent="primary" fill={true} />
                                        </div>
                                    </Card>
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
const connectRedux = connect(mapStateToProps)(Cart);
export { connectRedux as Cart }; 