import React from 'react';
import {Link} from "react-router-dom";
import Header from "../../../header/Header";
import SidebarAdm from "../SiderBarDiagnostico";

import Interferencia from "./Interferencia";

const Interferencias = () => {
    return (
        <div>
            <Header></Header>
            <SidebarAdm/>

            <div>
                <div id="breadcrumb">
                    <ul className="breadcrumb">
                        <li><i className="fa fa-home"></i><a href="#"> Proyectos</a></li>
                        <li className="active">Busqueda de Proyectos</li>
                    </ul>
                </div>
                <div className="padding-md container">
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">
                                <label className={'titleform'}>LISTADO DE INTERFERENCIAS </label>
                                <Link to={`/solicitud/interferencia-add/1234`} className="btn btn-default pull-right btn-sm fullborder  btn-control">
                                    + Registrar Interferencia</Link>
                            </legend>

                        </fieldset>

                    </form>
                    <div className="row">

                        <div className="col-md-12">


                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <form className="form-inline no-margin">
                                        <div className="form-group margin-form-search">
                                            <label className="label-checkbox">

                                                Codigo<br></br>
                                            </label>
                                            <input type="text" className="form-control input-sm"
                                                   placeholder="Ingrese Codigo"></input>
                                        </div>





                                        <Link to={'/'}  type="submit" className="btn btn-sm btn-danger pull-right margin-form-boton  btn-control">
                                            <i className="fa fa-search"></i>    Buscar
                                        </Link>
                                    </form>
                                </div>



                                <ul className="list-group">

                                    <Interferencia/>
                                    <Interferencia/>
                                    <Interferencia/>
                                    <Interferencia/>
                                    <Interferencia/>
                                </ul>
                                <div className="panel-footer text-right">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default">1</button>
                                        <button type="button" className="btn btn-default">2</button>
                                        <button type="button" className="btn btn-default">3</button>
                                        <button type="button" className="btn btn-default">4</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Interferencias;