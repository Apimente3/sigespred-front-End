import React, {Component} from 'react';

class Puertarios extends Component {
    render() {
        return (
            <div className="col-md-3 ">
                <div className="pricing-widget ">
                    <div className="ribbon-wrapper">

                    </div>
                    <div className="pricing-head center-block">
                        Puertos 
                    </div>
                    <div className="pricing-body">
                        <div className="pricing-cost">
                            <a href="proyectos-search">
                                <img src="img/puerto.svg"></img>
                            </a>
                        </div>

                    </div>
                </div>
               
            </div>
        );
    }
}

export default Puertarios;