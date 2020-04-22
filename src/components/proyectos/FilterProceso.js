import React, {Component} from 'react';

class FilterProceso extends Component {
    render() {
        return (
            <div className="panel-group" id="accordion1">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a className="accordion-toggle" data-toggle="collapse"
                               data-parent="#accordion1" href="#collapseOne1">
                                PROCESO
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne1" className="panel-collapse collapse in" >
                        <div className="panel-body">
                            <select name="" id="" className="form-control input-sm">
                                <option value="">TODOS</option>
                                <option value="">PROCESO 01: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 02: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 03: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 04: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 05: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 06: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 07: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 08: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 09: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 10: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 11: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 12: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                                <option value="">PROCESO 13: CERTIFICADO DE BUSQUEDA CATASTRAL</option>
                               
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FilterProceso;