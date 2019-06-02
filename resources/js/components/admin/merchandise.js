import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Elevation, Checkbox, InputGroup, Icon as BI, Button as BP } from '@blueprintjs/core';
import { Layout, Button, Icon, Empty, Select, Menu, Dropdown } from 'antd';
const { Header } = Layout;

import { PerfumeFragment } from './fragments/perfume-fragment';
import { CategoryFragment } from './fragments/category-fragment';
import { WeightFragment } from './fragments/weight-fragment';

import { productSpecifics } from '../redux/actions-products';
import { verification, logout } from '../redux/actions-authentication';


const menuMerchandise = (<Menu>
    <Menu.Item key="2"><Link to="/merchandise-all" className="dashboard-link"><span className="button-text-dashboard"><BI icon="list-detail-view" className="mr-2" />&nbsp;Produits</span></Link></Menu.Item>
    <Menu.Item key="1"><Link to="/merchandise" className="dashboard-link"><span className="button-text-dashboard"><BI icon="add-to-folder" className="mr-2" />&nbsp;Marchandise</span></Link></Menu.Item>
</Menu>);
const menuGallery = (<Menu>
    <Menu.Item key="1"><Link to="/gallery" className="dashboard-link"><span className="button-text-dashboard"><BI icon="new-grid-item" className="mr-2" />&nbsp;Tous</span></Link></Menu.Item>
</Menu>);

class Merchandise extends Component {
    constructor(props) { super(props); 
        this.state = { isCategoryOpen: false, isWeightOpen: false, isPerfumeOpen: false, weights: [], perfumes: [], categories: [],
            selectedCategory: 1, selectedPerfumes: [], selectedWeights: [], selectedPrices: [], user: null
        };
        this.onPerfumeClose = this.onPerfumeClose.bind(this); this.onWeightClose = this.onWeightClose.bind(this); this.onCategoryClose = this.onCategoryClose.bind(this);
        this.onPerfumeOpen = this.onPerfumeOpen.bind(this); this.onWeightOpen = this.onWeightOpen.bind(this); this.onCategoryOpen = this.onCategoryOpen.bind(this);
        this.onCategory = this.onCategory.bind(this); this.onPerfume = this.onPerfume.bind(this); this.onLogout = this.onLogout.bind(this); this.onPrice = this.onPrice.bind(this);
        this.onWeight = this.onWeight.bind(this);
    }

    componentDidMount() { const { dispatch, history } = this.props; 
        dispatch(verification(true)); dispatch(productSpecifics());
        if(this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(this.props.user && typeof this.props.user === "string") { this.setState({ user: JSON.parse(this.props.user)[0] }); }
    }

    componentDidUpdate(previous) {
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
    onLogout() { const { dispatch } = this.props; dispatch(logout()); }
    
    render() {
        return(
            <React.Fragment>
                <Layout>
                    <Header className="admin-header py-2">
                        <div className="container-fluid d-flex flex-row align-items-center justify-content-center header-container">
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
                        <div className="container-fluid d-flex flex-row justify-content-center mt-5">
                            <div className="col-2 col-sm-12 col-md-3 col-lg-2 d-flex flex-column align-items-center justify-content-center">
                                <Card interactive={true} className="bp3-dark p-1 d-flex flex-row w-100 align-items-center" elevation={Elevation.TWO}>
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
                                </Card>
                                <Card interactive={true} className="bp3-dark p-1 mt-1 d-flex flex-row w-100" elevation={Elevation.TWO}>
                                    <div className="col-9 p-0 d-flex flex-column justify-content-center">
                                        { ((!Array.isArray(this.state.perfumes) && this.state.perfumes.length === 0) || (Array.isArray(this.state.perfumes) && this.state.perfumes.length === 0)) ? <span className="button-text px-2" style={{ textTransform: 'uppercase', fontSize: 11, fontFamily: 'DIN Pro Condensed Bold' }}>Pas de parfums</span> 
                                        : this.state.perfumes.map((item) => { return(<Checkbox onChange={this.onPerfume} id={item.id} key={item.id} className="mt-0 perfume-b"><span className="select-perfume-box">{item.name}</span></Checkbox>); }) }
                                    </div>
                                    <div className="col-3 p-0"><BP intent="danger"  onClick={this.onPerfumeOpen} size="small" className="ml-1 w-100 button-shadow button-add-perfume"><Icon type="folder-add" className="button-icon" /></BP></div>
                                </Card>
                                <Card interactive={true} className="bp3-dark p-1 mt-1 d-flex flex-column w-100" elevation={Elevation.TWO}>
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
                                </Card>
                            </div>
                            <div className="col-10 col-sm-12 col-md-9 col-lg-10">
                                <Card interactive={true} className="bp3-dark d-flex flex-column w-100 p-1 mt-1" elevation={Elevation.TWO}></Card>
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

function mapStateToProps(state) { const { user } = state.reducerAuthentication; const { weights, perfumes, categories } = state.reducerProducts; return { weights, perfumes, categories, user }; }
const connectRedux = connect(mapStateToProps)(Merchandise);
export { connectRedux as Merchandise };