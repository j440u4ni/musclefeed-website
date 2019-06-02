import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Drawer, InputGroup, Button } from '@blueprintjs/core';
import { addWeight } from '../../redux/actions-products';

class WeightFragment extends Component {
    constructor(props) { super(props);       
        this.state = { name: '', weight: 0, loading: false };
        this.onName = this.onName.bind(this); this.onWeight = this.onWeight.bind(this);
        this.onStop = this.onStop.bind(this); this.onWeightAdd = this.onWeightAdd.bind(this);
    }

    onName(event) { this.setState({ name: event.target.value }); }
    onWeight(event) { this.setState({ weight: parseInt(event.target.value) }); }
    onStop() { this.setState({ loading: false }); }

    onWeightAdd() { const { dispatch } = this.props; this.setState({ loading: true });
        dispatch(addWeight(this.state.name, this.state.weight, this.onStop));
    }

    render() { 
        return(
            <React.Fragment>
                <Drawer isOpen={this.props.isOpen} onClose={this.props.onClose} className="admin-drawer p-1 d-flex flex-column justify-content-center" canEscapeKeyClose={true}>
                    <InputGroup placeholder="Nom" leftIcon="text-highlight" className="admin-input" onChange={this.onName} />
                    <InputGroup placeholder="Valeur" className="mt-1 admin-input" leftIcon="id-number" type="number" onChange={this.onDescription} />
                    <Button intent={"danger"} onClick={this.onWeightAdd} fill={true} loading={this.state.loading} className="mt-1" text={<span className="select-text">Confirmer</span>} />
                </Drawer>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { weights, perfumes, categories } = state.reducerProducts; return { weights, perfumes, categories }; }
const connectRedux = connect(mapStateToProps)(WeightFragment);
export { connectRedux as WeightFragment };