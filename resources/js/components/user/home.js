import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon, Card, Elevation } from '@blueprintjs/core';
import { Layout, Divider, Dropdown, Button, Menu, Carousel } from 'antd';
import imageBrand from '../../../images/png/brand@2x.png';

import { slugify } from '../../global-tools';
import { productSpecifics } from '../redux/actions-products';
const { Header } = Layout;

class Home extends Component {
    constructor(props) { super(props); 
        this.state = { categories: [], products: [], slideshow: [] };
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
                <Layout className="layout-global">
                    <Header className="user-header">
                        <div className="container-fluid d-flex flex-column container justify-content-start align-items-center">
                            <div className="row w-100 row-user-information d-flex flex-row justify-content-end container">
                                <span className="info-text"><strong className="mr-2">Service client:</strong> +33 7 66 16 36 22</span>
                            </div>
                            <div className="row w-100 row-user-header d-flex flex-row">
                                <div className="col-12 col-md-1 col-lg-1"><img src={imageBrand} className="brand-site" /></div>
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
                    <div className="special-background d-flex flex-row"><div className="col-12 col-md-5 col-lg-5"></div><div className="col-12 col-md-7 col-lg-7 second-row"></div></div>
                    <Layout className="main-global-page mt-0">
                        <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
                            <Card interactive={false} elevation={Elevation.THREE} className="row w-100 d-flex flex-row p-1 justify-content-end">
                                <div className="col-12 col-md-2 col-lg-2 d-flex flex-column p-0 w-100 align-items-center">
                                        { Array.isArray(this.state.products) && this.state.products.filter((i) => { return i.top === 1; }).length > 0 && this.state.products.filter((i) => { return i.top === 1; }).map((a) => {  const image = this.state.slideshow.filter((b) => { return b.id === a.image_id; });
                                            let details = JSON.parse(a.details); const minimum = (details[details.length-1]).reduce((x, y) => { return x.price > y.price ? y : x; });
                                            return (
                                                <div key={a.id} className="w-100 d-flex flex-column align-items-center p-0 top-product-section">
                                                    <h4 className="text-center product-identifier mt-1">Top Produits</h4>
                                                    <img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="image-thumbnail product-top-image mt-0" />
                                                    <h6 className="text-center product-identifier-title mt-1">{a.name}</h6>
                                                    <div className="row d-flex flex-row px-1 w-100 mt-1">
                                                        <div className="col-12 col-md-6 col-lg-6 fredoka-police p-0 d-flex flex-row justify-content-center">Prix: {minimum.price}&euro;</div>
                                                        <div className="col-12 col-md-6 col-lg-6 d-flex flex-row justify-content-end p-0">
                                                            <Button className="product-home-button p-0 px-3"><Icon icon="heart" iconSize={10} className="product-home-icon" /></Button>
                                                            <Button className="product-home-button ml-1 p-0 px-3"><Icon icon="shopping-cart" iconSize={10} className="product-home-icon" /></Button>
                                                        </div>
                                                    </div>
                                                </div>
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
                                <div className="d-flex flex-row w-100 mt-2 justify-content-start">
                                { Array.isArray(this.state.products) && this.state.products.slice(0, 5).map((a) => { const image = this.state.slideshow.filter((b) => { return b.id === a.image_id; }); let details = JSON.parse(a.details); const minimum = (details[details.length-1]).reduce((x, y) => { return x.price > y.price ? y : x; });
                                    return (
                                        <Card key={a.id} className="col-12 col-md-3 col-lg-2 d-flex flex-column align-items-center ml-4 product-box-home p-2" interactive={false} elevation={Elevation.FOUR}>
                                            <img src={`https://musclefeed.co/storage/${image[0].url.split('/')[2]}`} className="image-thumbnail product-bottom-image mt-0" />
                                            <h6 className="text-center product-bottom-identifier-title mt-1">{a.name}</h6>
                                            <h6 className="text-center product-bottom-description-title mt-1">{a.description_title}</h6>
                                            <p className="product-bottom-description">{a.description.slice(0, 120)}...</p>
                                            <div className="row d-flex flex-row p-0 w-100 mt-1">
                                                <div className="col-12 col-md-10 col-lg-10 fredoka-bottom-police flex-row justify-content-start p-0 px-1">Prix: {minimum.price}&euro;</div>
                                                <div className="col-12 col-md-2 col-lg-2 d-flex flex-row justify-content-end p-0">
                                                    <Button className="product-home-bottom-button p-0 px-3"><Icon icon="heart" iconSize={10} className="product-home-icon" /></Button>
                                                    <Button className="product-home-bottom-button ml-1 p-0 px-3"><Icon icon="shopping-cart" iconSize={10} className="product-home-icon" /></Button>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
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