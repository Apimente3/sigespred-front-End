import React, {Component} from 'react';

class FilterBrigada extends Component {
    render() {
        return (
            <div className="panel-group" id="accordion1">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a className="accordion-toggle" data-toggle="collapse"
                               data-parent="#accordion1" href="#collapseOne1">
                                BRIGADA - PROFESIONAL
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne1" className="panel-collapse collapse in" >
                        <div className="panel-body">
                            
                            <select name="" id="" className="form-control input-sm mtop-5">
                                <option value="">BRIGADA</option>
                                <option value="">BG-001</option>
                                <option value="">BG-002</option>
                                <option value="">BG-003</option>
                                <option value="">BG-004</option>
                              
                            </select>
                            <div className="form-group mtop-5">
                                <div className="input-group">
                                    <span
                                        className="input-group-btn">
                                    <button className="btn btn-default btn-sm"
                                            type="button"><i className="fa fa-search"></i></button></span>
                                    <input type="text" className="form-control input-sm" placeholder="Nombre del Profesional"></input>
                                    </div>
                            </div>
                           
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FilterBrigada;