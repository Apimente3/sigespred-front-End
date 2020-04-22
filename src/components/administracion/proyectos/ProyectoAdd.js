import React, {useEffect, useState} from 'react';
import Header from "../../header/Header";
import {initAxiosInterceptors,} from '../../../config/axios';
import {Link} from "react-router-dom";
import FooterProcess from "../../gestionPredios/FooterProcess";
import SidebarAdm from "../SidebarAdm";
import {toastr} from "react-redux-toastr";
import moment from "moment";
import Map from "../../helpers/maps/MapProyecto";
import MapProyectoEmpy from "../../helpers/maps/MapProyectoEmpy";
import UploadFile from "../../helpers/uploaders/Upload";

const Axios = initAxiosInterceptors();


async function save(proyecto) {
    const {data} = await Axios.post(`/saveproyecto`, proyecto);
    return data;
}

async function getPolygonoServer(codigo) {
    const {data} = await Axios.get(`/obtener_poligono_proyecto?idcapa=1&pre_codigo=${codigo}`);
    let result = JSON.parse(data[0].geojson_3857);
    return result;
}

async function getsolicitudGestionPredial() {
    const {data} = await Axios.get(`/drpsolicituds`);
    return data;
}



const ProyectoAdd = ({history}) => {

    const [proyecto, set_proyecto] = useState({pmd: '', descripcion: ''});
    const [solicituds, set_solicituds] = useState([]);


    useEffect(() => {
     const init=async ()=>{
         
         let listsolicituds=await getsolicitudGestionPredial();
         console.log(listsolicituds)
         set_solicituds(listsolicituds);
     };
     init();
         

    }, []);


    function handleInputChange(e) {
        set_proyecto({
            ...proyecto,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    async function getPolygono(codigo) {
        set_proyecto({
            ...proyecto,
            polygono: undefined
        });
        try {
            let geojson = await getPolygonoServer(codigo);
            set_proyecto({
                ...proyecto,
                polygono: geojson.features[0].geometry,polygonojson:geojson
            });
            toastr.info('Se encontro el Polygono del Proyecto en la Base Gráfica')
        } catch (e) {
        }
    }


    /*FUncion para guardar el proeyecto*/
    const registrarProyecto = async (e) =>{
        
        e.preventDefault()

        try {



            /*Validacion de digital de documento*/
            if (!proyecto.tipo_infraestructura_id || proyecto.tipo_infraestructura_id.trim() == 0) {
                throw {error: " Seleccione el tipo de infraestructura. "}
            }

            /*Validacion de digital de documento*/
            if (!proyecto.codigo || proyecto.codigo.trim() == 0) {
                throw {error: " Ingrese el Codigo. "}
            }

            /*Validacion de digital de documento*/
            if (!proyecto.pmd || proyecto.pmd.trim() == 0) {
                throw {error: " Suba el PMD. "}
            }


            await save(proyecto);
            history.push('/list-proyectos');


        }
        catch (err) {
            console.log(err)
            toastr.error(err.error)
        }

    }

    /*FUncion para guardar la url del documento guardado */

    const savePMD = (pmd) => {
        set_proyecto({
            ...proyecto,
            "pmd": pmd.filename
        });
    }


    return (
        <div>
            <SidebarAdm/>

            <Header></Header>
            <div className="container mtop-20">
                <h4 className="headline ">
                    Registro de Proyecto
                    <span className="line"></span>
                </h4>
                <form onSubmit={registrarProyecto}>
                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-body">
                            <legend align=" center fielsettext "><label className={'titleform'}>1. DATOS
                                GENERALES DEL PROYECTO</label>
                            </legend>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Solicitud Gestion Predial</label>
                                <div className="col-lg-8">
                                    <select
                                        required
                                        className="form-control input-sm"
                                        name="solicituds_id"
                                        onChange={handleInputChange}
                                        value={proyecto.solicituds_id}
                                    >
                                        
                                        { solicituds.map(item=>
                                            <option value={item.id}>{item.denominacion}</option>
                                           )
                                        }
                                    </select>
                                </div>


                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Tipo de Infraestructura</label>
                                <div className="col-lg-8">
                                    <select
                                        required
                                        className="form-control input-sm"
                                        name="tipo_infraestructura_id"
                                        onChange={handleInputChange}
                                        value={proyecto.tipo_infraestructura_id}
                                    >
                                        <option value="0">-- SELECCIONE --</option>
                                        <option value="1">VIALES</option>
                                        <option value="2">AEROPORTUARIOS</option>
                                        <option value="3">PORTUARIOS</option>
                                        <option value="4">FERROVIARIOS</option>
                                        <option value="5">ANTEPUERTOS</option>
                                        <option value="6">HIDROVIAS</option>

                                    </select>
                                </div>


                            </div>

                            <div className="form-group ">
                                <label className="col-lg-2 control-label">Denominacion </label>
                                <div className="col-lg-6">
                                <input type="text" className="form-control input-sm" placeholder="Proyecto"
                                          name="descripcion"
                                          onChange={handleInputChange}
                                          value={proyecto.descripcion}
                                >
                                </input>
                                </div>

                            </div>


                         

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Digital del PMD</label>
                                <div className="col-lg-8">

                                    <UploadFile key="upload_documento_rspta" file={proyecto.pmd}
                                                setFile={savePMD}></UploadFile>
                                </div>


                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Concesion</label>
                                <div className="col-lg-8">
                                    <input required type="text" placeholder=""
                                           className="form-control input-sm"
                                           name="concesion"
                                           onChange={handleInputChange}
                                           value={proyecto.concesion}
                                    ></input>
                                </div>
                            </div>
                          

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Codigo Base Grafica</label>
                                <div className="col-lg-8">
                                    <input required type="text" placeholder=""

                                           className="form-control input-sm"
                                           name="codigo"
                                           onChange={handleInputChange}
                                           onBlur={() => {
                                               getPolygono(proyecto.codigo)
                                           }}
                                           value={proyecto.codigo}
                                    ></input>
                                </div>


                            </div>


                            <legend align=" center fielsettext "><label className={'titleform'}>2. INFORMACIÓN
                                GRAFICA</label>
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-1 control-label"></label>
                                <div className="col-lg-11">
                                    {proyecto.polygono ? <Map geojson={proyecto.polygono}/> :
                                        <MapProyectoEmpy></MapProyectoEmpy>}


                                </div>
                            </div>


                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">

                                        {proyecto.polygono ?
                                        <button id="btnguardar"  type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>:
                                        <button id="btnguardar" disabled type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>}
                                       
                                   

                                        <Link to={`/list-proyectos`}
                                              className="btn btn-default btn-sm btn-control">Cancelar</Link>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="row margin-button-form "></div>
            <FooterProcess/>
        </div>
    );
};

export default ProyectoAdd;