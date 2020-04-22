import React, {Component} from 'react';

class FilterTipoProyecto extends Component {
    render() {
        return (
            <div className="panel-group" id="accordion1">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a className="accordion-toggle" data-toggle="collapse"
                               data-parent="#accordion1" href="#collapsetipoProy">
                                TIPO DE PROYECTO
                            </a>
                        </h4>
                    </div>
                    <div id="collapsetipoProy" className="panel-collapse collapse in" >
                        <div className="panel-body">
                            <select name="" id="" className="form-control input-sm">
                                <option value="">VIAL</option>
                                <option value="">PORTUARIO</option>
                                <option value="">AERONAUTICO</option>
                                <option value="">FERROVIARIO</option>
                               
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FilterTipoProyecto;