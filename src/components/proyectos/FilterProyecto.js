import React, {Component} from 'react';

class FilterProyecto extends Component {
    render() {
        return (
            <div className="panel-group" id="accordion1">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a className="accordion-toggle" data-toggle="collapse"
                               data-parent="#accordion1" href="#collapseOne1">
                                PROYECTO
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne1" className="panel-collapse collapse in" >
                        <div className="panel-body">
                            <select name="" id="" className="form-control input-sm">
                                <option value="">TODOS</option>
                                <option value="">AERO PUERTO DE TUMBRES "CAP FAP PEDRO CANGA RODRIGUEZ"</option>
                             
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FilterProyecto;