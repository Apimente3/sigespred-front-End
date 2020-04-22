import React, {useState} from 'react';
import Header from "../../../header/Header";
import SiderBar from "../SiderBarDiagnostico";

import {Link} from "react-router-dom";
import FooterProcess from "../../../gestionPredios/FooterProcess";

import Map from "../../solicitudes/Map";
import {toastr} from "react-redux-toastr";
import UploadFile from "../../solicitudes/UploadFile";

const ExpedienteAdd = () => {
    const [layerAdd, setLayerAdd] = useState(null);
    const setLayerMap=(valor)=>{
        setLayerAdd(valor)
    }

    return (
        <div>


            <Header></Header>

            <SiderBar/>

            <form>


                <div className="container mtop-20">
                    <h4 className="headline ">
                        Registro de Expediente
                        <span className="line"></span>
                    </h4>

                    <div className="panel panel-default form-horizontal no-margin form-border">

                        <div className="panel-body">

                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">DATOS DEL EXPEDIENTE</legend>
                                </fieldset>
                            </form>


                            <div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Tipo de Expediente</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--SELECCIONE--</option>
                                            <option value="RURAL">AQUISICION DE PREDIOS</option>
                                            <option value="RURAL">LIBERACION DE INTERFERENCIAS</option>
                                            <option value="RURAL">PAGO DE MEJORAS</option>
                                            <option value="RURAL">TRANFERENCIA INTERESTATALES</option>

                                        </select>
                                    </div>



                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Predios Registrados </label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--NINGUNO--</option>
                                            <option value="1">PREDIO - 0001</option>
                                            <option value="1">PREDIO - 0002</option>
                                            <option value="1">PREDIO - 0003</option>
                                            <option value="1">PREDIO - 0004</option>
                                            <option value="1">PREDIO - 0005</option>

                                        </select>
                                    </div>

                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Interferencias Registradas </label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--NINGUNO--</option>
                                            <option value="1">Interf - 0001 - Torre de Luz - Electro Centro</option>


                                        </select>
                                    </div>

                                </div>


                                <form>
                                    <fieldset className="fielsettext">
                                        <legend align="center fielsettext">SUJETO PASIVO</legend>
                                    </fieldset>
                                </form>

                               

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>Titular </label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--NINGUNO--</option>
                                            <option value="1">Jose Mendoza y Julia Espinoza - SOCIEDAD CONYUGAL</option>
                                          

                                        </select>
                                    </div>

                                </div>


                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Ocupante</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--NINGUNO--</option>
                                            <option value="1">Javier Perez Ochoa</option>
                                          

                                        </select>
                                    </div>

                                </div>


                            </div>
                          

                         

                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">
                                        <button id="btnguardar" type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>
                                        <Link to={`/list-trabajadores`}
                                              className="btn btn-default btn-sm btn-control">Cancelar</Link>

                                    </div>

                                </div>

                            </div>





                        </div>
                    </div>
                </div>
                <div className="row margin-button-form "></div>

            </form>
            <FooterProcess/>
        </div>
    );
};

export default ExpedienteAdd;