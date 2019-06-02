import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Checkbox, InputGroup, Icon as BI, Button as BP, FileInput } from '@blueprintjs/core';
import { Layout, Button, Icon, Select, Menu, Dropdown, Input } from 'antd';
const { Header } = Layout;

import { PerfumeFragment } from './fragments/perfume-fragment';
import { CategoryFragment } from './fragments/category-fragment';
import { WeightFragment } from './fragments/weight-fragment';

import { productSpecifics, addProduct } from '../redux/actions-products';
import { verification, logout } from '../redux/actions-authentication';


const menuMerchandise = (<Menu>
    <Menu.Item key="2"><Link to="/merchandise-all" className="dashboard-link"><span className="button-text-dashboard"><BI icon="list-detail-view" className="mr-2" />&nbsp;Produits</span></Link></Menu.Item>
    <Menu.Item key="1"><Link to="/merchandise" className="dashboard-link"><span className="button-text-dashboard"><BI icon="add-to-folder" className="mr-2" />&nbsp;Marchandise</span></Link></Menu.Item>
</Menu>);
const menuGallery = (<Menu> <Menu.Item key="1"><Link to="/gallery" className="dashboard-link"><span className="button-text-dashboard"><BI icon="new-grid-item" className="mr-2" />&nbsp;Tous</span></Link></Menu.Item></Menu>);

class Merchandise extends Component {
    constructor(props) { super(props); 
        this.state = { isCategoryOpen: false, isWeightOpen: false, isPerfumeOpen: false, weights: [], perfumes: [], categories: [], images: [], loaded: false,
            selectedCategory: 1, selectedPerfumes: [], selectedWeights: [], selectedPrices: [], user: null, productDescription: '',
            productName: '', productTitle: '', productProvider: '', productQuantity: 0, productImage: 0, loading: false
        };
        this.onPerfumeClose = this.onPerfumeClose.bind(this); this.onWeightClose = this.onWeightClose.bind(this); this.onCategoryClose = this.onCategoryClose.bind(this);
        this.onPerfumeOpen = this.onPerfumeOpen.bind(this); this.onWeightOpen = this.onWeightOpen.bind(this); this.onCategoryOpen = this.onCategoryOpen.bind(this);
        this.onCategory = this.onCategory.bind(this); this.onPerfume = this.onPerfume.bind(this); this.onLogout = this.onLogout.bind(this); this.onPrice = this.onPrice.bind(this);
        this.onWeight = this.onWeight.bind(this); this.onDescription = this.onDescription.bind(this); this.onName = this.onName.bind(this); this.onTitle = this.onTitle.bind(this);
        this.onProvider = this.onProvider.bind(this); this.onQuantity = this.onQuantity.bind(this); this.onImage = this.onImage.bind(this);
        this.onConfirm = this.onConfirm.bind(this); this.onStop = this.onStop.bind(this);
    }

    componentDidMount() { const { dispatch, history } = this.props; 
        dispatch(verification(true)); dispatch(productSpecifics());
        if(this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ images : JSON.parse(this.props.images) }); }
        this.setState({ loaded: true });
    }

    componentDidUpdate(previous) {
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ images : JSON.parse(this.props.images) }); }
        if(previous.weights !== this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(previous.perfumes !== this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(previous.user !== this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }

    onPerfumeClose() { this.setState({ isPerfumeOpen: false }); }
    onWeightClose() { this.setState({ isWeightOpen: false }); }
    onCategoryClose() { this.setState({ isCategoryOpen: false }); }

    onPerfumeOpen() { this.setState({ isPerfumeOpen: true }); }
    onCategoryOpen() { this.setState({ isCategoryOpen: true }); }
    onWeightOpen() {  this.setState({ isWeightOpen: true }); }

    onCategory(value) { this.setState({ selectedCategory: value }); }
    onPerfume(event) { if((this.state.selectedPerfumes.length === 0 || this.state.selectedPerfumes.indexOf(parseInt(event.target.id)) === -1) && event.target.checked) {
        this.setState({ selectedPerfumes: [...this.state.selectedPerfumes, parseInt(event.target.id)]}); } 
        else if((this.state.selectedPerfumes.length !== 0 && this.state.selectedPerfumes.indexOf(parseInt(event.target.id)) !== -1) && !event.target.checked) 
        { this.setState({ selectPerfumes: this.state.selectedPerfumes.splice(this.state.selectedPerfumes.indexOf(parseInt(event.target.id)), 1) }); } 
    }
    onWeight(event) { if((this.state.selectedWeights.length === 0 || this.state.selectedWeights.indexOf(parseInt(event.target.id)) === -1) && event.target.checked) {
        this.setState({ selectedWeights: [...this.state.selectedWeights, parseInt(event.target.id)]}); } 
        else if((this.state.selectedWeights.length !== 0 && this.state.selectedWeights.indexOf(parseInt(event.target.id)) !== -1) && !event.target.checked) 
        { this.setState({ selectedWeights: this.state.selectedWeights.splice(this.state.selectedWeights.indexOf(parseInt(event.target.id)), 1) }); } 
    }
    onPrice(event) {
        if(this.state.selectedPrices.indexOf(parseInt(event.target.id)) === -1) { const id = event.target.id; const prices = { id: id, price: parseFloat(event.target.value) };
        this.setState({ selectedPrices: [...this.state.selectedPrices.filter((element) => { return element.id != id }), prices] }); }
    }
    onDescription(event) { this.setState({ productDescription: event.target.value }); }
    onName(event) { this.setState({ productName: event.target.value }); }
    onTitle(event) { this.setState({ productTitle: event.target.value }); }
    onProvider(event) { this.setState({ productProvider: event.target.value }); }
    onQuantity(event) { this.setState({ productQuantity: parseInt(event.target.value) }); }
    onImage(value) { this.setState({ productImage: parseInt(value) }); }
    onStop() { this.setState({ loading: false }); }

    onLogout() { const { dispatch } = this.props; dispatch(logout()); }

    onConfirm() { const { dispatch } = this.props; this.setState({ loading: true });
         dispatch(addProduct(this.state.selectedCategory, JSON.stringify([...this.state.selectedPerfumes, this.state.selectedPrices]), 
            this.state.productName, this.state.productProvider, 
            this.state.productTitle, this.state.productTitle, 
            this.state.productImage, this.state.productDescription, this.onStop));
    }

    render() { console.log(this.state.productName);
        return(
            <React.Fragment>
                <Layout>
                    <Header className="admin-header py-2">
                        <div className="container d-flex flex-row align-items-center justify-content-center header-container">
                            <div className="col-2"></div>
                            <div className="col-10 justify-content-end d-flex flex-row py-1 align-items-center justify-content-center mobile-menu">
                                <Link to="/dashboard" className="dashboard-link mr-2 item-bl"><Button className="button-shadow-link"><span className="button-text-dashboard">Panneau de contrôle</span></Button></Link>
                                <Dropdown overlay={menuGallery} className="mr-2 item-bl"><Button className="button-shadow-link"><span className="button-text-dashboard">Paramètres Images</span></Button></Dropdown>
                                <Dropdown overlay={menuMerchandise} className="mr-2 item-bl"><Button className="button-shadow-link"><span className="button-text-dashboard">Paramètres Marchandises</span></Button></Dropdown>
                                <span className="home-link mr-1 ml-2 item-bl">{this.state.user && this.state.user.name}</span>
                                <BP intent="danger" icon="power" onClick={this.onLogout} className="item-bl" />
                            </div>
                        </div>
                    </Header>
                    <Layout className="admin-global-page mt-0">
                        <div className="container d-flex flex-row justify-content-center mt-5">
                        <div className="row w-100">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 d-flex flex-column align-items-center justify-content-center w-100">
                                <div className=" p-1 d-flex flex-row w-100 align-items-center">
                                    <div className="col-9 p-0">
                                        { ((!Array.isArray(this.state.categories) && this.state.categories.length === 0) || (Array.isArray(this.state.categories) && this.state.categories.length === 0)) ? <span className="button-text px-2" style={{ textTransform: 'uppercase', fontSize: 11, fontFamily: 'DIN Pro Condensed Bold' }}>Pas de catégories</span>
                                           : <Select defaultValue="Séléctionnez Catégorie" className="w-100 select-input mt-1" onChange={this.onCategory}>
                                               { this.state.categories.map((a) => { 
                                                   if(a.category_id === 0) {
                                                       return (<Select.OptGroup key={a.id} label={<span className="select-option-input">{a.name}</span>}>
                                                           { this.state.categories.map((item) => { if(item.category_id === a.id) { return(<Select.Option className="select-option-input" key={item.id} value={item.id}>{item.name}</Select.Option>); } })}
                                                       </Select.OptGroup>);
                                                   }
                                               })}
                                            </Select>
                                        }
                                    </div>
                                    <div className="col-3 p-0"><BP intent="danger" onClick={this.onCategoryOpen} size="small" className="ml-2 mt-0 align-items-center button-shadow button-add"><Icon type="folder-add" className="button-icon" /></BP></div>
                                </div>
                                <div className=" p-1 mt-1 d-flex flex-row w-100">
                                    <div className="col-9 p-0 d-flex flex-column justify-content-center">
                                        { ((!Array.isArray(this.state.perfumes) && this.state.perfumes.length === 0) || (Array.isArray(this.state.perfumes) && this.state.perfumes.length === 0)) ? <span className="button-text px-2" style={{ textTransform: 'uppercase', fontSize: 11, fontFamily: 'DIN Pro Condensed Bold' }}>Pas de parfums</span> 
                                        : this.state.perfumes.map((item) => { return(<Checkbox onChange={this.onPerfume} id={item.id} key={item.id} className="mt-0 perfume-b"><span className="select-perfume-box">{item.name}</span></Checkbox>); }) }
                                    </div>
                                    <div className="col-3 p-0"><BP intent="danger"  onClick={this.onPerfumeOpen} size="small" className="ml-2 mt-0 w-80 align-items-center button-shadow button-add"><Icon type="folder-add" className="button-icon" /></BP></div>
                                </div>
                                <div className=" p-1 mt-1 d-flex flex-column w-100">
                                    <div className="d-flex flex-row px-1"><BP intent="danger" fill={true} onClick={this.onWeightOpen} size="small" className="w-100 align-items-center button-shadow button-add-weight"><Icon type="folder-add" className="button-icon" /></BP></div>
                                    <div className="d-flex flex-column justify-content-center">
                                        { ((!Array.isArray(this.state.weights) && this.state.weights.length === 0) || (Array.isArray(this.state.weights) && this.state.weights.length === 0)) ? <span className="button-text px-2 text-center mt-1" style={{ textTransform: 'uppercase', fontSize: 11, fontFamily: 'DIN Pro Condensed Bold' }}>Pas de poids</span>
                                            : this.state.weights.map((item) => {
                                            return (<div className="row mt-2" key={item.id}>
                                                <div className="col-6"><Checkbox onChange={this.onWeight} id={item.id} key={item.id} className="mt-0 perfume-b"><span className="select-perfume-box">{item.name}</span></Checkbox></div>
                                                <div className="col-6"><InputGroup type="number" leftIcon={<BI icon="dollar" iconSize={10} style={{ marginTop: 8 }} />} ref={item.id} id={item.id} placeholder="Prix" size="small" className={"w-100 price-input "+ item.id + "-price"}  onChange={this.onPrice} /></div>
                                            </div>);
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                                <div className=" d-flex flex-row w-100 p-1 mt-1">
                                    <div className="row d-flex flex-row w-100">
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column">
                                            <Input type="text" className="account-input" placeholder="Nom du produit" onChange={this.onName} />
                                            <Input type="text" className="account-input mt-1" placeholder="Fournisseur" onChange={this.onProvider} />
                                            <Input type="text" className="account-input mt-1" placeholder="Titre description" onChange={this.onTitle} />
                                            <Input type="text" className="account-input mt-1" placeholder="Quantité" onChange={this.onQuantity} />
                                            <Select defaultValue="Séléctionnez Image" className="w-100 select-input mt-1" onChange={this.onImage}>
                                                { this.state.images.map((item) => { return(<Select.Option className="select-option-input" key={item.id} value={item.id}><img src={'https://musclefeed.co/storage/'+item.url.split('/')[2]} style={{ width: 12, position: 'relative', top: -2 }} className="mr-2" />&nbsp;<span className="button-text">{item.name}</span></Select.Option>); }) }
                                            </Select>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 mt-1">
                                            <Input.TextArea rows={8} onChange={this.onDescription} className="select-input editor-box" />
                                            <div className="d-flex flex-column align-items-center justify-content-center">
                                                <BP fill={true} onClick={this.onConfirm} loading={this.state.loading} text={<span className="button-text">Confirmer</span>} icon="confirm" className="mt-2" intent="primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </Layout>
                </Layout>
                <PerfumeFragment isOpen={this.state.isPerfumeOpen} onClose={this.onPerfumeClose} />
                <CategoryFragment isOpen={this.state.isCategoryOpen} onClose={this.onCategoryClose} categories={this.props.categories} />
                <WeightFragment isOpen={this.state.isWeightOpen} onClose={this.onWeightClose} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { user } = state.reducerAuthentication; const { weights, perfumes, categories, images } = state.reducerProducts; return { weights, perfumes, categories, user, images }; }
const connectRedux = connect(mapStateToProps)(Merchandise);
export { connectRedux as Merchandise };