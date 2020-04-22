import React from 'react';
import {Link} from "react-router-dom";
import {serverFile} from '../../../config/axios'
import moment from 'moment'

const Solicitud = ({props}) => {
    console.log(props)
    const {id,fecha_registro,tipoinfraestructura,tipoproyecto,fechadocumento,createdAt,filesave,originalname,denominacion}=props;
    
    return (
        <div>
            <li className="list-group-item clearfix trabajdorlist">
                <div className="padding-trabajador">
                    <div className="clearfix ">


                        <div>

                            <div className="col-md-3">
                                <div className="pull-left m-left-sm ">
                                    <span> <a href={`${serverFile}${filesave}`} style={{color:'#000'}} title={originalname}>
                                        <i className="fa fa-file-pdf-o fa-4x"></i></a></span><br></br>
                                    <small
                                        className="text-muted text-danger font-7">  Digital
                                    </small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="pull-left m-left-sm" style={{color:'#000'}}>
                                    <span className="font-16">{denominacion}</span><br></br>
                                    <small style={{color:'#000'}} className="text-muted">{tipoinfraestructura} | {tipoproyecto}  </small>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <div className="pull-left m-left-sm ">
                                    <span> {fechadocumento}</span><br></br>
                                    <small
                                        className="text-muted text-danger font-7">  Fecha Documento
                                    </small>
                                </div>
                            </div>


                            <div className="col-md-1">
                                <div className="pull-left m-left-sm ">
                                    <span> { fecha_registro}</span><br></br>
                                    <small
                                        className="text-muted text-danger font-7">  Fecha Registro
                                    </small>
                                </div>
                            </div>
                           

                           
                           
                           
                            <div className="col-md-1">
                                <div className="btn-group pull-right  margin-rigth-20">
                                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                        className="caret"></span></button>
                                    <ul className="dropdown-menu">
                                        <li><Link to={`/solicitud-del/${denominacion}`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                                        <li className="divider"></li>
                                        <li><Link to={`/solicitud/datosgenerales/${denominacion}`} href="#"><i className="fa fa-home" aria-hidden="true"></i> Gestion Predial</Link></li>
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

export default Solicitud;