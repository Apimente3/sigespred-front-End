import React, {useState} from 'react';
import SidebarAdm from "./SiderBarDiagnostico";
import {Link} from "react-router-dom";

import FooterProcess from "../m000_common/footers/FooterProcess";
import Header from "../m000_common/headers/Header";
import UploadFile from "../../components/helpers/uploaders/UploadMultiple";
import Map from "../../components/helpers/maps/MapProyectoEmpy";
import {toastr} from 'react-redux-toastr'

const Diagnostico = ({history, match}) => {
    const {codsolicitud: solicitud} = match.params;
    const [layerAdd, setLayerAdd] = useState(null);
    const [filesaditional, setFilesaditional] = useState([]);

    const setLayerMap = (valor) => {
        setLayerAdd(valor)
    }

    const setFiles=(newListFiles)=>{
        setFilesaditional([...filesaditional,newListFiles])
    }

    const removeFiles=(id)=>{
        setFilesaditional(
            filesaditional.filter(file => file.id !== id)
        )
    }
    return (
        <>
            <div>
                <SidebarAdm solicitud={solicitud} />
                <Header></Header>

                <form>
                    <div className="container mtop-20">
                        <h4 className="headline ">
                            Informacion Cartografica Base
                            <span className="line"></span>
                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                            <div className="panel-body">
                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext" title={'Polygono Mama'}>Polygono Matriz</legend>
                                </fieldset>

                                <div>


                                    <div className="form-group">
                                        <label className="col-lg-1 control-label"></label>
                                        <div className="col-lg-11">
                                            <Map setLayerMap={setLayerMap} toastr={toastr}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Detalle de Informacion Cartografica</label>
                                        <div className="col-lg-8">
                                            <label className="label-checkbox">
                                                <input type="checkbox"/>
                                                <span className="custom-checkbox"></span>
                                               Shape File (.shp)
                                            </label>
                                            <label className="label-checkbox">
                                                <input type="checkbox"/>
                                                <span className="custom-checkbox"></span>
                                                Autocad (.dwg)
                                            </label>
                                            <label className="label-checkbox">
                                                <input type="checkbox"/>
                                                <span className="custom-checkbox"></span>
                                                OrtoFoto
                                            </label>
                                            <label className="label-checkbox">
                                                <input type="checkbox"/>
                                                <span className="custom-checkbox"></span>
                                                Imagen Satelital
                                            </label>
                                            <label className="label-checkbox">
                                                <input type="checkbox"/>
                                                <span className="custom-checkbox"></span>
                                                Otro
                                            </label>
                                        </div>

                                    </div>
                                </div>

                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext"><i className="fa fa-paperclip"></i> Adjuntar Otros Documentos</legend>
                                </fieldset>

                                <div>

                                    <div className="form-group">

                                        <div className="col-lg-12">
                                   
                                            <UploadFile listFiles={[]} setListFiles={setFiles} removeFiles={removeFiles}/>
                                        </div>
                                    </div>

                                </div>

                              
                                <hr/>
                                <div className="panel-body">
                                   

                                </div>
                            </div>
                        </div>
                    </div>


                </form>
                <FooterProcess/>
            </div>
        </>
    );
};

export default Diagnostico;