import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Brigada =({history,equipo})=> {
   
    const {id,denominacion,fecha_registro,cantintegrantes,responsable}=equipo;
   let idequiq=(id==null?0:id);
    return (
        <div>
            <li className="list-group-item clearfix trabajdorlist">
                <div className="padding-trabajador">
                    <div className="clearfix ">
                        <div>
                            <div className="col-md-4">
                                <div className="pull-left m-left-sm">
                                    <span className="font-16">{denominacion}</span><br></br>
                                    <small className="text-muted">Equipo de Trabajo </small>
                                </div>
                            </div>
                            
                            <div className="col-md-1">
                                <div className="pull-left m-left-sm ">
                                    <small>{fecha_registro}</small><br></br>
                                    <small
                                        className="text-muted text-danger font-7"><i className="fa fa-calendar" aria-hidden="true"></i> 
                                    </small>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="pull-left m-left-sm  ">
                                    <span> {responsable}</span>
                                    <br></br>
                                    <small
                                        className="text-muted text-danger font-7">Coord. Resposable
                                    </small>
                                </div>
                            </div>
                            <div className="col-md-1">
                                <div className="pull-left m-left-sm  ">
                                    <span> {cantintegrantes}</span>
                                    <br></br>
                                    <small
                                        className="text-muted text-danger font-7"><i title="Cantidad" className="fa fa-users" aria-hidden="true"></i>  
                                    </small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="btn-group pull-right  margin-rigth-20">
                                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                        className="caret"></span></button>
                                    <ul className="dropdown-menu">
                                        <li><Link to={`/equipo-gestion/${id}`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Gestionar</Link></li>
                                       <li><Link to={`/equipo-del/${id}`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                      

                    </div>
                    <div className="seperator"></div>

                </div>


            </li>

        </div>
    );

}

export default Brigada;