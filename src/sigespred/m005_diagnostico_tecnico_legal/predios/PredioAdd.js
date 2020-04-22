import React, {useState} from 'react';
import Header from "../../../header/Header";
import SiderBar from "../SiderBarDiagnostico";
import FileBase64 from "react-file-base64";
import {Link} from "react-router-dom";
import FooterProcess from "../../../gestionPredios/FooterProcess";
import PropietarioAdd from "./PropietarioAdd";
import Tramo from "../tramos/Tramo";
import Predio from "./Predio";
import Propietario from "./Propietario";
import Ocupante from "./Ocupante";
import UploadFile from "./UploadFile";
import Map from "../../solicitudes/Map";
import {toastr} from "react-redux-toastr";

const PredioAdd = () => {
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
                        Registro de Predio
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
                                            <option value="1">ADMINISTRADOR</option>
                                            <option value="2">COORDINADOR</option>
                                            <option value="3">BRIGADISTA</option>

                                        </select>
                                    </div>

                                </div>
                            </div>
                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">DATOS DE PREDIO</legend>
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
                                            <option value="RURAL">RURAL</option>
                                            <option value="URBANO">URBANO</option>
                                        </select>
                                    </div>

                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Zonificacion</label>
                                    <div className="col-lg-4">


                                        <input list="zonificacion" className="form-control input-sm" name="rol"
                                               autoComplete={'on'}
                                        />
                                        <datalist id="zonificacion">
                                            <option value="Internet Explorer"></option>
                                            <option value="Firefox"></option>
                                            <option value="Chrome"></option>
                                            <option value="Opera"></option>
                                            <option value="Safari"></option>
                                        </datalist>
                                    </div>

                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Uso actual</label>
                                    <div className="col-lg-4">
                                        <input list="usopredio" className="form-control input-sm" name="rol"
                                        />

                                        <datalist id="usopredio">
                                            <option value="CASA HABITACION o VIVIENDA"></option>
                                            <option value="INDUSTRIA"></option>
                                            <option value="COMERCIO"></option>
                                            <option value="HOSPITAL"></option>
                                            <option value="SERVICIO EDUCATIVO"></option>
                                            <option value="SERVICIO HOSPEDAJE"></option>
                                            <option value="TEMPLO CONVENTO"></option>
                                            <option value="SEDE ADMINISTRATIVA"></option>
                                            <option value="TERRENO SIN CONSTRUIR"></option>
                                            <option value="COCHERA"></option>
                                            <option value="PLAYA DE ESTACIONAMIENTO"></option>
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

                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">UBICACIÓN DE PREDIO</legend>
                                </fieldset>
                            </form>

                            <div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Unidad Catastral</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Denominación</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>Sector</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>


                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Departamento</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Provincia</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>Distrito</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>


                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Referencia</label>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>


                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Via </label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span>Mz. </label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span>Lote</label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                </div>

                            </div>

                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">SUJETO PASIVO</legend>
                                </fieldset>
                            </form>

                            <div>

                                <div className="form-group">
                                    <label className="col-lg-3 control-label"><span
                                        className="obligatorio">* </span> Naturaleza de los Propietarios</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--SELECCIONE--</option>
                                            <option value="1">PROPIETARIO UNICO</option>
                                            <option value="1"> SOCIEDAD CONYUGAL</option>

                                            <option value="2">COPROPIETARIO</option>
                                            <option value="3">LITIGIO</option>
                                            <option value="3">SUCESION INTESTADA</option>

                                        </select>
                                    </div>

                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label"><span
                                        className="obligatorio">* </span> Cond. Propiedad</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                        >
                                            <option value="0">--SELECCIONE--</option>
                                            <option value="PROPIETARIO INSCRITO">PROPIETARIO INSCRITO</option>
                                            <option value="PROPIETARIO NO INSCRITO ">PROPIETARIO NO INSCRITO </option>
                                            <option value="POSESIONARIO CON MAS DE 10 AÑOS DE ANTIGÜEDAD DE POSESIÓN">
                                                POSESIONARIO CON MAS DE 10 AÑOS DE ANTIGÜEDAD DE POSESIÓN
                                            </option>
                                            <option value="POSESIONARIO CON MENOS DE 10 AÑOS DE ANTIGÜEDAD DE POSESIÓN">
                                                POSESIONARIO CON MENOS DE 10 AÑOS DE ANTIGÜEDAD DE POSESIÓN
                                            </option>
                                            <option value="OCUPANTES">OCUPANTES</option>


                                        </select>
                                    </div>

                                </div>

                                <h6>Titulares</h6>
                                <hr/>

                                <PropietarioAdd/>

                                <Propietario props={{progresivaInicio: '0', progresivaFinal: '100'}}/>
                                <Propietario props={{progresivaInicio: '0', progresivaFinal: '100'}}/>
                                <Propietario props={{progresivaInicio: '0', progresivaFinal: '100'}}/>
                                <h6>Posesionarios - Ocupantes</h6>
                                <hr/>
                                <PropietarioAdd/>
                                
                                <Ocupante props={{progresivaInicio: '0', progresivaFinal: '100'}}/>
                                <Ocupante props={{progresivaInicio: '0', progresivaFinal: '100'}}/>
                                <Ocupante props={{progresivaInicio: '0', progresivaFinal: '100'}}/>

                            </div>
                            <hr/>
                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">Documentos Adjuntos</legend>
                                </fieldset>
                            </form>
                            <UploadFile/>

                            <form>
                                <fieldset className="fielsettext">
                                    <legend align="center fielsettext">Cargas y Gravamenes</legend>
                                </fieldset>
                            </form>
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

export default PredioAdd;