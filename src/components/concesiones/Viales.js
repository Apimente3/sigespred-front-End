import React, {Component} from 'react';

class Viales extends Component {

    state = {
        cantidad: 15
    };
    
    render() {
        return (
            <div className="col-md-3 ">
                <a href=""></a>
                <div className="pricing-widget ">
                    <div className="ribbon-wrapper">

                    </div>
                    <div className="pricing-head " >
                        Carreteras ({this.state.cantidad})
                    </div>
                    <div className="pricing-body">
                        <div className="pricing-cost">
                            <a href="proyectos-search">
                                <img src="img/vial.svg"></img>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Viales;