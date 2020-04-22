import React from 'react';
import {Link} from "react-router-dom";
import {serverFile} from '../../../config/axios';

const Expediente = ({props}) => {
    console.log(props)
    const {codigo,predio_codigo,proyecto_codigo,resumen_documentos,resumen_titular}=props;
    console.log(props)

    return (
        <div>
            <li className="list-group-item clearfix trabajdorlist">
                <div className="padding-trabajador">
                    <div className="clearfix ">


                        <div>

                            <div className="col-md-1">
                                <div className="pull-left m-left-sm ">
                                    <span> <a href="#" >
                                        <i className="fa fa-paperclip fa-4x"></i></a></span><br></br>
                                    <small
                                        className="text-muted text-danger font-7">  
                                    </small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pull-left m-left-sm" style={{color:'#000'}}>
                                    <span className="font-16">{codigo}</span><br></br>
                                    <small
                                        className="text-muted text-danger font-7">  CODIGO EXPEDIENTE
                                    </small>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="pull-left m-left-sm ">
                                    <span> {resumen_titular}</span><br></br>
                                    <small
                                        className="text-muted text-danger font-7">  SUJETO PASIVO
                                    </small>
                                </div>
                            </div>


                         





                            <div className="col-md-1">
                                <div className="btn-group pull-right  margin-rigth-20">
                                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                        className="caret"></span></button>
                                    <ul className="dropdown-menu">
                                        <li><Link to={`/solicitud-del/${codigo}`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                                        <li className="divider"></li>
                                        <li><Link to={`/adquisicion-expropiacion/${codigo}`} href="#"><i className="fa fa-home" aria-hidden="true"></i> Gestionar</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2">

                            </div>

                        </div>

                    </div>
                    <div className="seperator"></div>

                </div>


            </li>
        </div>
    );
};

export default Expediente;