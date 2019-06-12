import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon, Card, Elevation, Button as BP } from '@blueprintjs/core';
import { Layout, Divider, Dropdown, Button, Menu, Carousel, Input } from 'antd';
import imageBrand from '../../../images/png/brand@2x.png';
import visaLogo from '../../../images/png/001-visa-logo.png';
import masterLogo from '../../../images/png/002-mastercard.png';
import amexLogo from '../../../images/png/003-american-express-sign.png';

import delivery from '../../../images/png/002-shipped.png';
import payment from '../../../images/png/001-hand.png';
import quality from '../../../images/png/003-shield.png';

import { slugify } from '../../global-tools';
import { productSpecifics } from '../redux/actions-products';

const { Header } = Layout;

class Home extends Component {
    constructor(props) { super(props); 
        this.state = { categories: [], products: [], slideshow: [], email: '' };
        this.onNewsletter = this.onNewsletter.bind(this); this.onEmail = this.onEmail.bind(this);
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

    onEmail(event) { this.setState({ email: event.target.value }); }
    onNewsletter() { const { dispatch } = this.props; }

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
                                <div className="col-12 col-md-1 col-lg-1"><img src={imageBrand} className="brand-site" /></div>
                                <div className="col-12 col-md-11 col-lg-11 d-flex flex-row justify-content-end align-items-center">
                                    <div className="shadow-box">
                                        { Array.isArray(this.state.categories) && this.state.categories.length >= 1 && this.state.categories.slice(0, 6).map((item) => {
                                            if(item.category_id === 0 && this.state.categories.filter((i) => { return i.category_id === item.id }).length > 0 ) { return( 
                                                <Dropdown key={item.id} className="menu-link" overlay={<Menu>{this.state.categories.filter((i) => { return i.category_id === item.id; }).map((a) => { return <Menu.Item key={a.id} className="menu-link-hover-text"><Link to={`/categories/${slugify(a.name)}`}>{a.name}</Link></Menu.Item>}) }</Menu>}>
                                                    <Button type="link"><span>{item.name}</span></Button>
                                                </Dropdown>); }
                                        }) }
                                    </div>
                                    <Link to="/account" className="dashboard-link home-link home-mobile-button account-hover-link"><span className="home-link button-link account-hover-link"><Icon icon="user" className="mr-1 icon-home" />&nbsp;Mon Compte</span></Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Header>
                    <Layout className="main-global-page mt-3">
                        <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
                            <Card interactive={false} elevation={Elevation.THREE} className="row w-100 d-flex flex-row p-1 justify-content-end">
                                <div className="col-12 col-md-2 col-lg-2 d-flex flex-column p-0 w-100 align-items-center product-top-mobile">
                                        { Array.isArray(this.state.products) && this.state.products.filter((i) => { return i.top === 1; }).length > 0 && this.state.products.filter((i) => { return i.top === 1; }).map((a) => {  const image = this.state.slideshow.filter((b) => { return b.id === a.image_id; });
                                            let details = JSON.parse(a.details); const minimum = (details[details.length-1]).reduce((x, y) => { return x.price > y.price ? y : x; });
                                            return (
                                                <Link to={`/product/${slugify(a.name)}`} className="product-link"><div key={a.id} className="w-100 d-flex flex-column align-items-center p-0 top-product-section">
                                                    <h4 className="text-center product-identifier mt-1">Top Produits</h4>
                                                    <img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="image-thumbnail product-top-image product-top-mobile-image mt-0" />
                                                    <h6 className="text-center product-identifier-title mt-1">{a.name}</h6>
                                                    <div className="row d-flex flex-row px-1 w-100 mt-1 product-row-mobile">
                                                        <div className="col-12 col-md-6 col-lg-6 fredoka-police p-0 d-flex flex-row justify-content-center">Prix: {minimum.price}&euro;</div>
                                                        <div className="col-12 col-md-6 col-lg-6 d-flex flex-row justify-content-end p-0">
                                                            {/*<Button className="product-home-button p-0 px-3"><Icon icon="heart" iconSize={10} className="product-home-icon" /></Button> */}
                                                           <Link to={`/product/${slugify(a.name)}`}><Button className="product-home-button ml-1 p-0 px-3 product-mobile-button" type="danger"><span className="button-text card-button-text">Acheter</span>&nbsp;<Icon icon="arrow-right" iconSize={10} className="product-home-icon" /></Button></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            );
                                        })}
                                </div>
                                <div className="col-12 col-md-10 col-lg-10 p-0 slideshow-box">
                                    <Carousel autoplay>
                                     { Array.isArray(this.state.slideshow) && this.state.slideshow.length > 0 && this.state.slideshow.map((item) => {
                                         if(item.slideshow === 1) { return (<div className="col-12" key={item.id}><img src={`https://musclefeed.co/storage/${item.url.split('/')[2]}`} className="slideshow-image img-fluid rounded" /></div>); }
                                     })}
                                    </Carousel>
                                </div>
                            </Card>
                            <div className="row w-100 d-flex flex-column p-1 align-items-start">
                                <h4 className="title-second-part text-center">Nouveautés</h4>
                                <div className="d-flex flex-row w-100 mt-2 justify-content-start box-products">
                                { Array.isArray(this.state.products) && this.state.products.slice(0, 10).map((a) => { const image = this.state.slideshow.filter((b) => { return b.id === a.image_id; }); let details = JSON.parse(a.details); const minimum = (details[details.length-1]).reduce((x, y) => { return x.price > y.price ? y : x; });
                                    return (
                                        <Link to={`/product/${slugify(a.name)}`} className="w-100 product-link col-12 col-md-3 col-lg-2 ml-4 mt-2 p-0 product-mobile-box" key={a.id}>
                                        <Card key={a.id} className="col-12 d-flex flex-column align-items-center product-box-home p-2" interactive={false} elevation={Elevation.FOUR}>
                                            <img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="image-thumbnail product-bottom-image mt-0" />
                                            <h6 className="text-center product-bottom-identifier-title mt-1">{a.name}</h6>
                                            <h6 className="text-center product-bottom-description-title mt-1">{a.description_title}</h6>
                                            <p className="product-bottom-description">{a.description.slice(0, 120)}...</p>
                                            <div className="row d-flex flex-row p-0 w-100 mt-1">
                                                <div className="col-12 col-md-10 col-lg-10 fredoka-bottom-police flex-row justify-content-start p-0 px-1">Prix: {minimum.price}&euro;</div>
                                                <div className="col-12 col-md-2 col-lg-2 d-flex flex-row justify-content-end p-0">
                                                   {/* <Button className="product-home-bottom-button p-0 px-3"><Icon icon="heart" iconSize={10} className="product-home-icon" /></Button> ¨*/}
                                                   <Link to={`/product/${slugify(a.name)}`}><Button className="product-home-bottom-button ml-1 p-0 px-3" type="danger"><span className="button-text card-button-text">Acheter</span>&nbsp;<Icon icon="arrow-right" iconSize={10} className="product-home-icon" /></Button></Link>
                                                </div>
                                            </div>
                                        </Card>
                                        </Link>
                                    );
                                })}
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex flex-row justify-content-center align-items-center mt-2 ad-boxes-row w-100">
                            <div className="row w-100">
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4 d-flex flex-column justify-content-start align-items-center">
                                    {/* <img src={delivery} className="logo-home" /> */}
                                    {/* <span className="logo-subtext"></span> */}
                                </div>
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4 d-flex flex-row justify-content-start align-items-center"></div>
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4 d-flex flex-row justify-content-center align-items-center"></div>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center mt-3 footer-row">
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
        )
    }
}

function mapStateToProps(state) { const { categories, products, images} = state.reducerProducts; return { categories, products, images }; }
const connectRedux = connect(mapStateToProps)(Home);
export { connectRedux as Home };