import React, {Component} from 'react';

class FilterDepartamento extends Component {
    render() {
        return (
            <div className="panel-group" id="accordion1">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a className="accordion-toggle" data-toggle="collapse"
                               data-parent="#accordion1" href="#collapseOne1">
                                UBICACION
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne1" className="panel-collapse collapse in" >
                        <div className="panel-body">
                            
                            <select name="" id="" className="form-control input-sm mtop-5">
                                <option value="">DEPARTAMENTO</option>
                                <option value="">Tacna</option>
                                <option value="">Apurimac</option>
                                <option value="">Lima</option>
                                <option value="">Ayacucho</option>
                                <option value="">Huancayo</option>
                                <option value="">Puno</option>
                                <option value="">Arequipa</option>
                            </select>
                            <select name="" id="" className="form-control input-sm mtop-5">
                                <option value="">PROVINCIA</option>
                                <option value="">Tacna</option>
                                <option value="">Apurimac</option>
                                <option value="">Lima</option>
                                <option value="">Ayacucho</option>
                                <option value="">Huancayo</option>
                                <option value="">Puno</option>
                                <option value="">Arequipa</option>
                            </select>
                            <select name="" id="" className="form-control input-sm mtop-5">
                                <option value="">DISTRITO</option>
                                <option value="">Tacna</option>
                                <option value="">Apurimac</option>
                                <option value="">Lima</option>
                                <option value="">Ayacucho</option>
                                <option value="">Huancayo</option>
                                <option value="">Puno</option>
                                <option value="">Arequipa</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FilterDepartamento;