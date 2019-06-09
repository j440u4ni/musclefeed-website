import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Icon as BIcon, Card, Elevation } from '@blueprintjs/core';
import { Layout, Icon, Input, Select, Divider, Dropdown, Button as BA, Menu  } from 'antd';
import imageBrand from '../../../images/png/brand@2x.png';
import colorBrand from '../../../images/svg/undraw-wizard.svg';
import accountBrand from '../../../images/svg/undraw-healthy.svg';

import { slugify } from '../../global-tools';
import { verification, authentication, register } from '../redux/actions-authentication';
const { Header } = Layout;

class Account extends Component {
    constructor(props) { super(props); 
        this.state = { email: '', password: '', loading: false, register: false, name: '', civility: 0, categories: [] };
        this.onEmail = this.onEmail.bind(this); this.onPassword = this.onPassword.bind(this); 
        this.onStop = this.onStop.bind(this); this.onConfirmAuthentication = this.onConfirmAuthentication.bind(this);
        this.onSwitch = this.onSwitch.bind(this); this.onName = this.onName.bind(this); this.onConfirmRegistration = this.onConfirmRegistration.bind(this);
        this.onCivility = this.onCivility.bind(this); this.onPhone = this.onPhone.bind(this);
    }

    componentDidMount() { 
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories)}); }
    }
    componentDidUpdate(previous) {
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
    }
    
    onEmail(event) { this.setState({ email: event.target.value }); }
    onPassword(event) { this.setState({ password: event.target.value }); }
    onSwitch(event) { this.setState({ register: !this.state.register }); }

    onName(event) { this.setState({ name: event.target.value }); }
    onCivility(value) { this.setState({ civility: parseInt(value) }); }
    onPhone(event) { this.setState({ phone: event.target.value }); }

    onStop() { this.setState({ loading: !this.state.loading }); }
    onConfirmAuthentication(event) { const { dispatch } = this.props; this.setState({ loading: true }); dispatch(authentication(this.state.email, this.state.password, false, this.onStop)); }
    onConfirmRegistration(event) { const { dispatch } = this.props; this.setState({ loading: true }); dispatch(register(this.state.civility, this.state.name, this.state.email, this.state.password, this.state.phone, this.onStop)); }

    render() {
        return(
            <React.Fragment>
                 <Layout className="layout-container">
                 <Header className="user-header">
                        <div className="container-fluid d-flex flex-column container justify-content-start align-items-center">
                            <div className="row w-100 row-user-information d-flex flex-row justify-content-end container">
                                <span className="info-text"><strong className="mr-2">Service client:</strong> +33 7 66 16 36 22</span>
                            </div>
                            <div className="row w-100 row-user-header d-flex flex-row">
                                <div className="col-12 col-md-1 col-lg-1"><Link to="/"><img src={imageBrand} className="brand-site" /></Link></div>
                                <div className="col-12 col-md-11 col-lg-11 d-flex flex-row justify-content-end align-items-center">
                                    <Card interactive={false} elevation={Elevation.ONE} className="shadow-box-account">
                                        { Array.isArray(this.state.categories) && this.state.categories.length >= 1 && this.state.categories.slice(0, 6).map((item) => {
                                            if(item.category_id === 0 && this.state.categories.filter((i) => { return i.category_id === item.id }).length > 0 ) { return( 
                                                <Dropdown key={item.id} className="menu-link" overlay={<Menu>{this.state.categories.filter((i) => { return i.category_id === item.id; }).map((a) => { return <Menu.Item key={a.id} className="menu-link-hover-text"><Link to={`/categories/${slugify(a.name)}`}>{a.name}</Link></Menu.Item>}) }</Menu>}>
                                                    <BA type="link"><span>{item.name}</span></BA>
                                                </Dropdown>); }
                                        }) }
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Layout className="user-global-page mt-0">
                        { this.state.register ?
                          <div className="container d-flex flex-row justify-content-center align-items-center mt-2 animated fadeInRight">
                            <div className="col-12 col-md-3 col-lg-3 mx-auto d-flex flex-column register-form">
                                <Button intent="danger" icon="arrow-left" fill={false} onClick={this.onSwitch} />
                                <Select defaultValue="Civilité" className="select-input mt-4" onChange={this.onCivility}>
                                    <Select.Option value="1" className="select-input" key={1}><span className="select-input">Monsieur</span></Select.Option>
                                    <Select.Option value="0" className="select-input" key={2}><span className="select-input">Madame</span></Select.Option>
                                </Select>
                                <Input type="text" placeholder="Nom complet" className="account-input mt-1" onChange={this.onName} />
                                <Input type="email" placeholder="E-mail" className="account-input mt-1" onChange={this.onEmail} />
                                <Input.Password size="default" placeholder="Mot de passe" className="account-input mt-1" onChange={this.onPassword} />
                                <Input className="w-100 mt-1 account-input" placeholder="Téléphone." onChange={this.onPhone} />
                                <Button intent="primary" loading={this.state.loading} onClick={this.onConfirmRegistration} fill={true} text={<span className="button-text">Créer un compte</span>} icon="confirm" className="mt-4" />
                            </div>
                          </div>
                        : <div className="container d-flex flex-row justify-content-center align-items-center mt-2 animated fadeInLeft">
                            <div className="col-12 col-md-3 col-lg-3 mx-auto d-flex flex-column login-form">
                                <Input type="text" placeholder="E-mail" className="account-input" onChange={this.onEmail} />
                                <Input.Password size="default" placeholder="Mot de passe" className="account-input mt-1" onChange={this.onPassword} />
                                <Button intent="primary" loading={this.state.loading} onClick={this.onConfirmAuthentication} fill={true} text={<span className="button-text">Se connecter</span>} icon="send-to-graph" className="mt-4" />
                                <div className="mt-1 d-flex p-0 flex-column justify-content-center align-items-center">
                                    <span className="account-links w-100"><Button intent="danger" onClick={this.onSwitch} fill={true} text={<span className="button-text">Créer un compte</span>} /></span>
                                    <Divider className="divider-account">Ou</Divider>
                                    <Button intent="primary" disabled={true} text={<span className="button-text">Facebook</span>} fill={true} className="account-button" icon={<Icon type="facebook" />} />
                                </div>
                            </div>
                        </div> }
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { categories } = state.reducerProducts; return { categories }; }
const connectRedux = connect(mapStateToProps)(Account);
export { connectRedux as Account };