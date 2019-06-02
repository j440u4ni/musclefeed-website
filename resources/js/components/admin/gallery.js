import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Elevation, Icon as BI, Button as BP, FileInput, ButtonGroup } from '@blueprintjs/core';
import { Layout, Menu, Dropdown, Button, Empty } from 'antd';
const { Header } = Layout;

import { verification, logout } from '../redux/actions-authentication';
import { addImage, deleteImage, slideshowImage, productSpecifics } from '../redux/actions-products';

const menuMerchandise = (
<Menu>
    <Menu.Item key="2"><Link to="/merchandise-all" className="dashboard-link"><span className="button-text-dashboard"><BI icon="list-detail-view" className="mr-2" />&nbsp;Produits</span></Link></Menu.Item>
    <Menu.Item key="1"><Link to="/merchandise" className="dashboard-link"><span className="button-text-dashboard"><BI icon="add-to-folder" className="mr-2" />&nbsp;Marchandise</span></Link></Menu.Item>
</Menu>);
const menuGallery = (
<Menu>
    <Menu.Item key="1"><Link to="/gallery" className="dashboard-link"><span className="button-text-dashboard"><BI icon="new-grid-item" className="mr-2" />&nbsp;Tous</span></Link></Menu.Item>
</Menu>);

class Gallery extends Component {
    constructor(props) { super(props); this.state = { images: [], weights: [], perfumes: [], categories: [], image: null, loading: false, user: null, offset: 0, next: 12 }; 
        this.onImage = this.onImage.bind(this); this.onLogout = this.onLogout.bind(this); this.onDelete = this.onDelete.bind(this);
        this.onStop = this.onStop.bind(this); this.onImageSubmit = this.onImageSubmit.bind(this); this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
    }

    componentDidMount() { const { dispatch, history } = this.props; dispatch(verification(true)); dispatch(productSpecifics());
        if(this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ images : JSON.parse(this.props.images) }); }
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0]}); }
    }
    componentDidUpdate(previous) {
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ images : JSON.parse(this.props.images) }); }
        if(previous.weights !== this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(previous.perfumes !== this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }

    onStop() { this.setState({ loading: !this.state.loading }); }
    onImage(event, file) { const image = event.currentTarget.files[0] || file; this.setState({ loading: true }); let reader = new FileReader(); reader.onload = (e) => { this.setState({ image: e.target.result, loading: false }); }; reader.readAsDataURL(image); }
    onImageSubmit() { const { dispatch } = this.props; dispatch(addImage(this.state.image, this.onStop)); }
    onLogout() { const { dispatch } = this.props; dispatch(logout()); }
    onDelete(id) { const { dispatch } = this.props; dispatch(deleteImage(id)); }
    onSlideshow(id) { const { dispatch } = this.props; dispatch(slideshowImage(id)); }

    onNext() { if(this.state.images.slice(this.state.offset + 12, this.state.next).length !== 0) { this.setState({ offset: this.state.offset + 12 }); } }
    onPrevious() { this.state.offset !== 0 ? this.setState({ offset: this.state.offset - 12 }) : this.setState({ offset: 0 });  }

    render() { 
        return(
            <React.Fragment>
                <Layout>
                    <Header className="admin-header py-2">
                        <div className="container d-flex flex-row align-items-center justify-content-center header-container">
                            <div className="col-3"></div>
                            <div className="col-9 justify-content-end d-flex flex-row py-1 align-items-center justify-content-center">
                                <Link to="/dashboard" className="dashboard-link mr-2"><Button className="button-shadow-link"><span className="button-text-dashboard">Panneau de contrôle</span></Button></Link>
                                <Dropdown overlay={menuGallery} className="mr-2"><Button className="button-shadow-link"><span className="button-text-dashboard">Paramètres Images</span></Button></Dropdown>
                                <Dropdown overlay={menuMerchandise} className="mr-2 mr-auto"><Button className="button-shadow-link"><span className="button-text-dashboard">Paramètres Marchandises</span></Button></Dropdown>
                                <span className="home-link mr-1">{this.state.user && this.state.user.name}</span>
                                <BP intent="danger" icon="power" onClick={this.onLogout} />
                            </div>
                        </div>
                    </Header>
                    <Layout className="admin-global-page mt-0">
                        <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
                            <div className="row d-flex flex-row align-items-center justify-content-center w-100">
                                <FileInput text={<span className="button-text" style={{ color: '#ffffff' }}>Choisissez l'image.</span>} className="file-input mr-2 bp3-dark" onInputChange={this.onImage} />
                                <BP intent="danger" icon="cube-add" loading={this.state.loading} onClick={this.onImageSubmit} text={<span className="button-text">Image</span>} className="" />
                                <ButtonGroup vertical={false} className="ml-2">
                                    <BP icon="circle-arrow-left" intent="primary" onClick={this.onPrevious} className="arrow-button" />
                                    <BP icon="circle-arrow-right" intent="primary" onClick={this.onNext} className="arrow-button" />
                                </ButtonGroup>
                            </div>    
                            <div className="row d-flex flex-row mt-2">
                            { !Array.isArray(this.state.images) && this.state.images.length <= 2 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : 
                                this.state.images.slice(this.state.offset, this.state.next).map((item) => { return (<div className="col-2 mt-1" key={item.id}>
                                    <Card interactive={true} key={item.id} elevation={Elevation.TWO} className="p-1 image-box">
                                        <img src={'https://musclefeed.co/storage/'+item.url.split('/')[2]} className="gallery-image" />
                                        <ButtonGroup className={ item.slideshow !== 1 ? "image-box-button" : "image-box-button-gr8" } vertical={false}>
                                        <BP intent="danger" onClick={() => { this.onDelete(item.id); }} className="image-box-button"><BI icon="trash" className="image-box-icon" /></BP>
                                        { item.slideshow !== 1 && <BP intent="primary" onClick={() => { this.onSlideshow(item.id); }} className="image-box-button"><BI icon="desktop" className="image-box-icon" /></BP> }
                                        </ButtonGroup>
                                    </Card>
                                </div>); })
                            }
                            </div>
                        </div>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { user } = state.reducerAuthentication; const { images, weights, categories, perfumes } = state.reducerProducts; return { images, weights, categories, perfumes, user }; }
const connectRedux = connect(mapStateToProps)(Gallery);
export { connectRedux as Gallery };