import React from 'react';
import {Link} from "react-router-dom";

const Predio = ({predio}) => {

    return (
        <div>
            <li className="list-group-item clearfix trabajdorlist">
                <div className="padding-trabajador">
                    <div className="clearfix ">


                        <div>

                            <div className="col-md-12">

                                <div className="form-group">
                                    <div className="col-lg-4">
                                        <div className="pull-left m-left-sm ">
                                            <a><b>{predio.codigo}</b></a><br></br>
                                            <small className="text-muted text-danger font-7">CODIGO</small>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <div className="pull-left m-left-sm ">
                                            <span>{predio.usuaregistra}</span><br></br>
                                            <small className="text-muted text-danger font-7">Registrado por:</small>
                                        </div>
                                    </div>


                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>{predio.fech_registro}</span><br></br>
                                            <small className="text-muted text-danger font-7">Fecha Registro</small>
                                        </div>
                                    </div>



                                    <div className="col-lg-3">
                                        <div className="pull-right m-left-sm ">
                                            <div className="btn-group pull-right  margin-rigth-20">
                                                <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                                    className="caret"></span></button>
                                                <ul className="dropdown-menu">

                                                    <li><Link to={`/datos-predio/${predio.codigo}`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Gestionar</Link></li>
                                                    <li><Link to={`/solicitud-del/00001`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>


                        </div>

                    </div>
                    <div className="seperator"></div>

                </div>


            </li>
        </div>
    );
};

export default Predio;