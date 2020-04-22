import React from 'react';
import PropietarioRow from "./PropietarioRow";
import {Link} from "react-router-dom";

const Titulares = () => {
    return (
        <>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="inputEmail1" className="col-lg-2 control-label">Tipo de Titular</label>
                    <div className="col-lg-10">
                        <select id="tipopredio" className="form-control input-sm"
                        >

                            <option value="URBANO">PROPIETARIO UNICO</option>
                            <option value="RURAL">COPROPRIETARIO</option>
                            <option value="RURAL">SOCIEDAD CONYUGAL</option>
                            <option value="RURAL">SUCESION INTESTADA</option>

                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword1"
                           className="col-lg-2 control-label">Domicilio Fiscal </label>
                    <div className="col-lg-10">
                        <input type="password" className="form-control input-sm" id="inputPassword1"
                               placeholder="Domicilio Fiscal a enviar Doc, Notif. y otros">
                        </input>
                    </div>
                </div>
                <hr></hr>
                <div className="form-group">
                    <label htmlFor="inputPassword1"
                           className="col-lg-2 control-label">DNI</label>
                    <div className="col-lg-9">
                        <input type="password" className="form-control input-sm" id="inputPassword1"
                               placeholder="Ingrese DNI">
                        </input>
                    </div>

                    <div className="col-lg-1">
                        <a className="btn btn-default btn-sm dropdown-toggle pull-left" title={'Sincronizar con RENIEC'}
                           data-toggle="dropdown" data-toggle="tooltip"
                           data-original-title={`Permite Sincronizar con la RENIEC`}>
                            <i className="fa fa-refresh"></i></a>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword1"
                           className="col-lg-2 control-label">Nombres</label>
                    <div className="col-lg-10">
                        <input type="password" className="form-control input-sm" id="inputPassword1"
                               placeholder="Ingrese Nombres">
                        </input>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword1"
                           className="col-lg-2 control-label">Apellidos</label>
                    <div className="col-lg-10">
                        <input type="password" className="form-control input-sm" id="inputPassword1"
                               placeholder="Ingrese Apellidos">
                        </input>
                    </div>
                </div>
           
                <div className="form-group">
                    <label htmlFor="inputPassword1"
                           className="col-lg-2 control-label">Representante</label>
                    <div className="col-lg-10">
                        <input type="checkbox" className="form-control input-sm" id="inputPassword1"
                               placeholder="Ingrese Apellidos">
                        </input>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-lg-offset-2 col-lg-10">
                        <button type="submit" className="btn btn-default btn-sm">+ Agregar</button>
                    </div>
                </div>
            </form>

            <table className="table table-bordered table-condensed table-hover table-striped">
                <thead>
                <tr>
                    <th></th>
                    <th>DNI</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Direccion</th>
                    <th>Representante</th>
                </tr>
                </thead>
                <tbody>

                <PropietarioRow/>
                <PropietarioRow/>
                <PropietarioRow/>
                </tbody>
            </table>
          
        </>
    );
};

export default Titulares;