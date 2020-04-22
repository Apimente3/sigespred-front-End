import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import './styles.css'

class SelectProcessos extends Component {


    changeProce = (event) => {

        this.props.history.push(`/proce-${event.target.value}/asdasd`);
        // this.context.router.history.push(`/proce-${event.target.value}/asdasd`);
    }


    render() {
        return (
            <div>
                <div className="col-lg-6">
                    <div className="row ">
                        <div className="col-lg-12 pull-right">
                            <button className="btn btn-default pull-right" data-toggle="dropdown">PROC-01
                                INCRIPCION DE ANOTACION PREVENTIVA <span
                                    className="caret"></span></button>
                            <ul className="dropdown-menu">
                                <li><Link to="/proce-1/codigo-pred">PROC-01 CERTIFICADO DE BUSQUEDA CATASTRAL</Link></li>
                                <li><Link to="/proce-2/codigo-pred">PROC-02 OFICIO DE INICIO DE ADQUISICION</Link></li>
                                <li><Link to="/proce-3/codigo-pred">PROC-03 INCRIPCION DE ANOTACION PREVENTIVA</Link></li>
                                <li><Link to="/proce-4/codigo-pred">PROC-04 INFORME DE TASACION</Link></li>
                                <li><Link to="/proce-5/codigo-pred">PROC-05 REQUERIMIENTO PRESUPUESTAL APROBADO</Link></li>
                                <li><Link to="/proce-6/codigo-pred">PROC-06 CERTIFICADO DE REGISTROS INMOBILIARIOS</Link></li>
                                <li><Link to="/proce-7/codigo-pred">PROC-07 OFICIO DE INTENCION DE ACEPTACION</Link></li>
                                <li><Link to="/proce-8/codigo-pred">PROC-08 CARTA DE RESPUESTA</Link></li>
                                <li><Link to="/proce-9/codigo-pred">PROC-09 RESOLUCION PUBLICADA DE EXPROPIEACION Y/O ADQUISICION DIRECTA</Link></li>
                                <li><Link to="/proce-10/codigo-pred">PROC-10 GESTION DE CHEQUE</Link></li>
                    
                                <li><Link to="/proce-13/codigo-pred">PROC-12 ACTA DE ENTREGA DE CHEQUE</Link></li>
                                <li><Link to="/proce-11/codigo-pred">PROC-13 FORMULARIO REGISTRAL</Link></li>
                                <li><Link to="/proce-14/codigo-pred">PROC-14 ACTA DE ENTREGA DE INMUEBLE</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-12">
                            <small className="text-muted text-danger font-7 pull-right text-select-proc">SELECCIONE UN
                                PROCEDIMIENTO
                            </small>
                        </div>
                    </div>


                </div>
                
            </div>

        );
    }
}

export default SelectProcessos;