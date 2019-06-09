import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import imageBrand from '../../../images/png/brand@2x.png';

import { Layout, Progress, Menu, Empty, Button, Divider, Dropdown, Input, Icon as AI } from 'antd';
import { Card, Elevation, Icon, Button as BP } from '@blueprintjs/core';

import { slugify } from '../../global-tools';
import { productSpecifics } from '../redux/actions-products';
const { Header } = Layout;

class Product extends Component {
    constructor(props) { super(props); 
        this.state = { categories: [], products: [], slideshow: [], cart: [], user: [], product: null };
    }
    
    componentDidMount() { const { dispatch } = this.props; dispatch(productSpecifics()); 
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories)}); }
        if(this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products)}); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images)}); }
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
            const product = JSON.parse(this.props.products).filter((item) => { return slugify(item.name) === this.props.match.params.id }); this.setState({ product: product[0] });
    }
    componentDidUpdate(previous) {
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(previous.products !== this.props.products && typeof this.props.products === "string") { this.setState({ products: JSON.parse(this.props.products) }); }
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ slideshow: JSON.parse(this.props.images) }); }
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }

    render() { let image, details, minimum;
        if(this.state.product) {  image = this.state.slideshow.filter((b) => { return b.id === this.state.product.image_id; }); }
        if(this.state.product) {  details = JSON.parse(this.state.product.details); minimum = (details[details.length-1]).reduce((x, y) => { return x.price > y.price ? y : x; }); } 

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
                                <Link to="/account" className="dashboard-link home-link"><span className="home-link button-link"><Icon icon="user" className="mr-1 mt-2 icon-home" />&nbsp;Mon Compte</span></Link>
                            </div>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Layout className="main-global-page mt-0">
                        <div className="container d-flex flex-row justify-content-center align-items-center mt-5 product-show">
                            <div className="row w-100">
                                <div className="col-12 col-md-4 col-sm-12 col-xl-4 col-lg-3">
                                    { this.state.product && <img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="product-page-image mt-0" /> }
                                </div>
                                <div className="col-12 col-md-4 col-sm-12 col-xl-8 col-lg-9 d-flex flex-column align-items-center">
                                    <h1 className="text-center product-page-title">{this.state.product && this.state.product.name}</h1>
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

function mapStateToProps(state) { const { categories, products, images, cart } = state.reducerProducts; const { logged, user } = state.reducerAuthentication; return { categories, products, images, cart, logged, user }; }
const connectRedux = connect(mapStateToProps)(Product);
export { connectRedux as Product }; 