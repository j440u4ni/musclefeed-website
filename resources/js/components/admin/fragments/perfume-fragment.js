import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Drawer, InputGroup, Button } from '@blueprintjs/core';
import { addPerfume} from '../../redux/actions-products';

class PerfumeFragment extends Component {
    constructor(props) { super(props);        
        this.state = { name: '', description: '', parent: 0, loading: false };
        this.onName = this.onName.bind(this); this.onDescription = this.onDescription.bind(this);
        this.onStop = this.onStop.bind(this); this.onPerfumeAdd = this.onPerfumeAdd.bind(this);
    }

    onName(event) { this.setState({ name: event.target.value }); }
    onDescription(event) { this.setState({ description: event.target.value }); }
    onStop() { this.setState({ loading: false }); }
    
    onPerfumeAdd() { const { dispatch } = this.props; this.setState({ loading: true });
        dispatch(addPerfume(this.state.name, this.state.description, this.onStop));
    }
    render() {
        return(
            <React.Fragment>
                <Drawer isOpen={this.props.isOpen} onClose={this.props.onClose} className="admin-drawer p-1 d-flex flex-column justify-content-center" canEscapeKeyClose={true}>
                    <InputGroup placeholder="Nom" leftIcon="text-highlight" className="admin-input" onChange={this.onName} />
                    <InputGroup placeholder="Description" className="mt-1 admin-input" leftIcon="text-highlight" onChange={this.onDescription} />
                    <Button intent={"danger"} onClick={this.onPerfumeAdd} fill={true} loading={this.state.loading} className="mt-1" text={<span className="select-text">Confirmer</span>} />
                </Drawer>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { const { weights, perfumes, categories } = state.reducerProducts; return { weights, perfumes, categories }; }
const connectRedux = connect(mapStateToProps)(PerfumeFragment);
export { connectRedux as PerfumeFragment };