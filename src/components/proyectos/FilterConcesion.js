import React, {Component} from 'react';

class FilterConcesion extends Component {
    render() {
        return (
            <div className="panel-group" id="accordion1">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a className="accordion-toggle" data-toggle="collapse"
                               data-parent="#accordion1" href="#collapConcesion">
                                CONCESION - PROYECTO - OBRA
                            </a>
                        </h4>
                    </div>
                    <div id="collapConcesion" className="panel-collapse  in" >
                        <div className="panel-body">
                            <select name="" id="" className="form-control input-sm">
                                <option value="">CONCESION</option>
                                <option value="">AEROPUERTO DE TUMBES</option>
                               
                            </select>
                            <select name="" id="" className="form-control input-sm mtop-5">
                                <option value="">PROYECTO</option>
                                <option value="">AERO PUERTO DE TUMBRES "CAP FAP PEDRO CANGA RODRIGUEZ"</option>

                            </select>
                            <select name="" id="" className="form-control input-sm mtop-5">
                                <option value="">OBRA</option>

                            </select>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FilterConcesion;