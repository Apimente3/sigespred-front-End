import React from 'react';
import SidebarAdm from "../SidebarAdm";
import Header from "../../header/Header";
import {Link} from "react-router-dom";
import FooterProcess from "../../gestionPredios/FooterProcess";

const TrabajadorDel = () => {
    return (
        <div>
            <SidebarAdm/>
            <form action="">

                <Header></Header>
                <div className="container mtop-20">
                    <h4 className="headline ">
                        Eliminacion del Trabajador
                        <span className="line"></span>
                    </h4>

                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <h5><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminacion Trabajador</h5>
                        </div>
                        <div className="panel-body">
                            <form action="" >

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Nº
                                        DNI de Trabajador</label>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm" type="text"
                                               placeholder="Confirme el codigo del Solicitud a ELIMINAR"></input>
                                    </div>
                                </div>


                                <div className="form-group ">
                                    <label className="col-lg-2 control-label">Motivo de Eliminacion </label>
                                    <div className="col-lg-6">
                                <textarea required className="form-control input-sm"
                                          placeholder="Ingrese el Motivo de la Eliminacion">
                                  
                                </textarea>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="panel-body">
                                    <div className="form-group ">
                                        <div className="col-lg-offset-2 col-lg-10">
                                            <button id="btnguardar" type="submit"
                                                    className="btn btn-danger btn-sm btn-control">Eliminar
                                            </button>
                                            <Link to={`/list-trabajadores`}
                                                  className="btn btn-default btn-sm btn-control">Cancelar</Link>

                                        </div>

                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row margin-button-form "></div>

            </form>
            <FooterProcess/>
        </div>
    );
};

export default TrabajadorDel;