import React, {Component} from 'react';
import {Link} from "react-router-dom";

const Trabajador =({trabajador})=> {
    

  
        return (
            <div>
                <li className="list-group-item clearfix trabajdorlist">
                    <div className="padding-trabajador">
                        <div className="clearfix ">


                            <div>
                                <div className="col-md-4">
                                    <a href="#" className="pull-left m-right-sm">
                                        <img src={trabajador.foto} className="img-circle fototrabajador-list"
                                             alt="User Avatar"></img>
                                    </a>
                                    <div className="pull-left m-left-sm">
                                        <span>{`${trabajador.nombres} ${trabajador.apellidos}`}</span><br></br>
                                        <small className="text-muted">CARGO: {trabajador.cargo}</small>
                                    </div>

                                </div>
                                <div className="col-md-8">

                                    <div className="pull-left m-left-sm ">
                                        <span><i className="fa fa-id-card-o" aria-hidden="true"></i> {trabajador.dni}</span><br></br>
                                        <small
                                            className="text-muted text-danger font-7">DNI
                                        </small>
                                    </div>
                                    <div className="pull-left m-left-sm ">
                                        <span><i className="fa fa-user-o" aria-hidden="true"></i> {trabajador.rol}</span><br></br>
                                        <small
                                            className="text-muted text-danger font-7">ROL
                                        </small>
                                    </div>
                                    <div className="pull-left m-left-sm ">
                                        <span><i className="fa fa-phone" aria-hidden="true"></i> {trabajador.telefonos}</span><br></br>
                                        <small
                                            className="text-muted text-danger font-7"> TELEFONOS
                                        </small>
                                    </div>

                                    <div className="btn-group pull-right  margin-rigth-20">
                                        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                            className="caret"></span></button>
                                        <ul className="dropdown-menu">

                                            <li><Link to={`/trabajador-edit/${trabajador.id}`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</Link></li>
                                            <li><Link to={`/trabajador-del/${trabajador.id}`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
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

export default Trabajador;