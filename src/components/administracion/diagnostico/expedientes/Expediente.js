import React from 'react';
import {Link} from "react-router-dom";

const Expediente = () => {
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
                                            <span>EXP - AERO 0001</span><br></br>
                                            <small className="text-muted text-danger font-7">CODIGO</small>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="pull-left m-left-sm ">
                                            <span>ADQUISICION DE PREDIOS</span><br></br>
                                            <small className="text-muted text-danger font-7">EXPEDIENTE</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="pull-left m-left-sm ">
                                            <span>Jose Mendoza Quispe</span><br></br>
                                            <small className="text-muted text-danger font-7">SUJETO PASIVO</small>
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

export default Expediente;