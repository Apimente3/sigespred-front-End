import React, {useState} from 'react';
import Header from "../../../header/Header";
import SiderBar from "../SiderBarDiagnostico";

import {Link} from "react-router-dom";
import FooterProcess from "../../../gestionPredios/FooterProcess";

import Map from "../../solicitudes/Map";
import {toastr} from "react-redux-toastr";
import UploadFile from "../../solicitudes/UploadFile";

const InterferenciaAdd = () => {
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
                        Registro de Interferencia
                        <span className="line"></span>
                    </h4>

                    <div className="panel panel-default form-horizontal no-margin form-border">

                        <div className="panel-body">

                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">TRAMO - OBRA</legend>
                                </fieldset>
                            </form>


                            <div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Tramo - Obra</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--SELECCIONE--</option>
                                            <option value="1">TRAMO 01</option>
                                            <option value="2">TRAMO 02</option>
                                            <option value="3">TRAMO 03</option>

                                        </select>
                                    </div>

                                </div>

                           
                            </div>
                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">DATOS DE LA INTERFERENCIA</legend>
                                </fieldset>
                            </form>

                            <div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Tipo</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--SELECCIONE--</option>
                                            <option value="RURAL">SUBSUELO</option>
                                            <option value="URBANO">SUELO</option>
                                        </select>
                                    </div>

                                   

                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Descripcion</label>
                                    <div className="col-lg-8">
                                        <input list="usopredio" className="form-control input-sm" name="rol"
                                        />

                                      

                                    </div>


                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Entidad Competente</label>
                                    <div className="col-lg-4">
                                        <input list="usopredio" className="form-control input-sm" name="rol"
                                        />

                                        <datalist id="usopredio">
                                            <option value="ELECTRO CENTRO"></option>
                                            <option value="CALIDA"></option>
                                            <option value="SEDAPAL"></option>
                                            <option value="TELEFONICA"></option>
                                          
                                        </datalist>

                                    </div>


                                </div>
                            </div>
                            <div>
                                <div className={''}>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Polygono</label>
                                        <div className="col-lg-10">
                                            <Map setLayerMapchild={setLayerMap} toastr={toastr}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className={''}>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Archivos (Fotos, Videos, Planos etc)</label>
                                        <div className="col-lg-10">
                                            <UploadFile/> 
                                        </div>
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

export default InterferenciaAdd;