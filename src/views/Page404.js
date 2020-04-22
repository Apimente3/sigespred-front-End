import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Page404 extends Component {
    render() {
        const location = this.props.location;
        return (
            <div>
                <h2>No match found for {location.pathname}</h2>
            </div>
        );
    }
}

Page404.propTypes = {
    location: PropTypes.string
};

export default Page404;