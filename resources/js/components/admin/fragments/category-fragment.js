import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Select } from 'antd';
import { Drawer, InputGroup, Button } from '@blueprintjs/core';
import { addCategory } from '../../redux/actions-products';
import { productSpecifics } from '../../redux/actions-products';

class CategoryFragment extends Component {
    constructor(props) { super(props);
        this.state = { name: '', description: '', parent: 0, loading: false, weights: [], images: [], categories: [], perfumes: [], image: 0 };
        this.onName = this.onName.bind(this); this.onDescription = this.onDescription.bind(this);
        this.onParent = this.onParent.bind(this); this.onStop = this.onStop.bind(this);
        this.onCategoryAdd = this.onCategoryAdd.bind(this); this.onImage = this.onImage.bind(this);
    }

    onName(event) { this.setState({ name: event.target.value }); }
    onDescription(event) { this.setState({ description: event.target.value }); }
    onParent(value) { this.setState({ parent: parseInt(value) }); }
    onImage(value) { this.setState({ image: parseInt(value) }); }
    onStop() { this.setState({ loading: false }); }

    componentDidMount() { const { dispatch, history } = this.props; 
        dispatch(productSpecifics());
        if(this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
        if(this.props.images && typeof this.props.images === "string") { this.setState({ images : JSON.parse(this.props.images) }); }
    }

    componentDidUpdate(previous) {
        if(previous.images !== this.props.images && typeof this.props.images === "string") { this.setState({ images : JSON.parse(this.props.images) }); }
        if(previous.weights !== this.props.weights && typeof this.props.weights === "string") { this.setState({ weights: JSON.parse(this.props.weights) }); }
        if(previous.perfumes !== this.props.perfumes && typeof this.props.perfumes === "string") { this.setState({ perfumes: JSON.parse(this.props.perfumes) }); }
        if(previous.categories !== this.props.categories && typeof this.props.categories === "string") { this.setState({ categories: JSON.parse(this.props.categories) }); }
    }

    onCategoryAdd() { const { dispatch } = this.props; this.setState({ loading: true });
        dispatch(addCategory(this.state.name, this.state.description, this.state.parent, this.state.image, this.onStop));
    }

    render() {
        return(
            <React.Fragment>
                <Drawer isOpen={this.props.isOpen} onClose={this.props.onClose} className="admin-drawer p-1 d-flex flex-column justify-content-center align-items-center" canEscapeKeyClose={true}>
                    <InputGroup placeholder="Nom" leftIcon="text-highlight" className="admin-input w-100" onChange={this.onName} fill={true} />
                    <InputGroup placeholder="Description" className="mt-1 admin-input w-100" leftIcon="text-highlight" onChange={this.onDescription} fill={true} />
                    <Select className="mt-1 w-100" onChange={this.onParent}>
                        <Select.Option value={0}><span className="select-option-input">Aucun parent</span></Select.Option>
                        { this.props.categories && this.props.categories.length > 3 && JSON.parse(this.props.categories).map((item) => {
                           if(item.category_id === 0) { return( <Select.Option value={item.id} key={item.id}><span className="select-option-input">{item.name}</span></Select.Option> ); }
                        })}
                    </Select>
                    <Select defaultValue="Séléctionnez Image" className="w-100 select-input mt-1" onChange={this.onImage}>
                        { this.state.images.map((item) => { return(<Select.Option className="select-option-input" key={item.id} value={item.id}><img src={'https://musclefeed.co/storage/'+item.url.split('/')[2]} style={{ width: 12, position: 'relative', top: -2 }} className="mr-2" />&nbsp;<span className="button-text">{item.name}</span></Select.Option>); }) }
                    </Select>
                    <Button intent={"danger"} onClick={this.onCategoryAdd} fill={true} loading={this.state.loading} className="mt-1" text={<span className="select-text">Confirmer</span>} />
                </Drawer>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { weights, perfumes, categories, images } = state.reducerProducts; return { weights, perfumes, categories, images }; }
const connectRedux = connect(mapStateToProps)(CategoryFragment);
export { connectRedux as CategoryFragment };