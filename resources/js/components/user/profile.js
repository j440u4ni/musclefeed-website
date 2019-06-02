import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) { super(props); }
    
    render() {
        return(
            <React.Fragment>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { return state; }
const connectRedux = connect(mapStateToProps)(Profile);
export { connectRedux as Profile };