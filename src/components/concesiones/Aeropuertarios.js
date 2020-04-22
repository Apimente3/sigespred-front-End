import React, {Component} from 'react';

class Aeropuertarios extends Component {

    state = {
        cantidad: 5
    };

    render() {
        return (
            <div className="col-md-3 ">
                <div className="pricing-widget ">
                    <div className="ribbon-wrapper">

                    </div>
                    <div className="pricing-head " >
                        Aeropuertos ({this.state.cantidad})
                    </div>
                    <div className="pricing-body">
                        <div className="pricing-cost">
                            <a href="proyectos-search">
                                <img src="img/aeroportario.svg"></img>
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Aeropuertarios;