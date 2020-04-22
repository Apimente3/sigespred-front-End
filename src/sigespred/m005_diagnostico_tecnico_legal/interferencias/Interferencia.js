import React from 'react';
import {Link} from "react-router-dom";

const Interferencia = () => {
    return (
        <div>
            <li className="list-group-item clearfix trabajdorlist">
                <div className="padding-trabajador">
                    <div className="clearfix ">


                        <div>

                            <div className="col-md-12">

                                <div className="form-group">
                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>INTERF - 0001</span><br></br>
                                            <small className="text-muted text-danger font-7">CODIGO</small>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="pull-left m-left-sm ">
                                            <span>Torre de Luz</span><br></br>
                                            <small className="text-muted text-danger font-7">INTERFERENCIA</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="pull-left m-left-sm ">
                                            <span>Electro Centro - Oeste SAC</span><br></br>
                                            <small className="text-muted text-danger font-7">EMPRESA A CARGO</small>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">

                                    </div>

                                    <div className="col-lg-3">
                                        <div className="pull-right m-left-sm ">
                                            <div className="btn-group pull-right  margin-rigth-20">
                                                <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                                    className="caret"></span></button>
                                                <ul className="dropdown-menu">

                                                   
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

export default Interferencia;