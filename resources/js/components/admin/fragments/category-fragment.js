import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Select } from 'antd';
import { Drawer, InputGroup, Button } from '@blueprintjs/core';
import { addCategory } from '../../redux/actions-products';

class CategoryFragment extends Component {
    constructor(props) { super(props);
        this.state = { name: '', description: '', parent: 0, loading: false };
        this.onName = this.onName.bind(this); this.onDescription = this.onDescription.bind(this);
        this.onParent = this.onParent.bind(this); this.onStop = this.onStop.bind(this);
        this.onCategoryAdd = this.onCategoryAdd.bind(this);
    }

    onName(event) { this.setState({ name: event.target.value }); }
    onDescription(event) { this.setState({ description: event.target.value }); }
    onParent(value) { this.setState({ parent: parseInt(value) }); }
    onStop() { this.setState({ loading: false }); }

    onCategoryAdd() { const { dispatch } = this.props; this.setState({ loading: true });
        dispatch(addCategory(this.state.name, this.state.description, this.state.parent));
    }

    render() {
        return(
            <React.Fragment>
                <Drawer isOpen={this.props.isOpen} onClose={this.props.onClose} className="admin-drawer p-1 d-flex flex-column justify-content-center" canEscapeKeyClose={true}>
                    <InputGroup placeholder="Nom" leftIcon="text-highlight" className="admin-input" onChange={this.onName} />
                    <InputGroup placeholder="Description" className="mt-1 admin-input" leftIcon="text-highlight" onChange={this.onDescription} />
                    <Select className="mt-1 w-100" onChange={this.onParent}>
                        <Select.Option value={0}><span className="select-option-input">Aucun parent</span></Select.Option>
                        { this.props.categories && this.props.categories.length > 3 && JSON.parse(this.props.categories).map((item) => {
                           if(item.category_id === 0) { return( <Select.Option value={item.id} key={item.id}><span className="select-option-input">{item.name}</span></Select.Option> ); }
                        })}
                    </Select>
                    <Button intent={"danger"} onClick={this.onCategoryAdd} fill={true} loading={this.state.loading} className="mt-1" text={<span className="select-text">Confirmer</span>} />
                </Drawer>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { weights, perfumes, categories } = state.reducerProducts; return { weights, perfumes, categories }; }
const connectRedux = connect(mapStateToProps)(CategoryFragment);
export { connectRedux as CategoryFragment };