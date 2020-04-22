import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Proyectos from "./Proyectos";
import items from "../../data/proyestos";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.goTo = this.goTo.bind(this);
    }

    goTo(path) {
        this.props.history.push(path);
    }

    render() {
        const {
            items,
        } = this.props;

        console.log(this.props)
        return (
            <Proyectos
                results={items}
                goTo={this.goTo}
            />
        );
    }
}

const mapStateToProps = state => {
    return{
        suggestions:state.suggestions
    }
}


export default connect(mapStateToProps)(Results); 