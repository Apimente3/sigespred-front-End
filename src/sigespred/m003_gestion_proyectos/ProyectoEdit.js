import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors, serverFile} from '../../config/axios';

/*IMportacion de componenetes*/
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import Map from "../../components/helpers/maps/MapProyecto";
import MapProyectoEmpy from "../../components/helpers/maps/MapProyectoEmpy";
import UploadFile from "../../components/helpers/uploaders/Upload";

const Axios = initAxiosInterceptors();

/*Guarda el proyecto*/
async function save(proyecto) {
    const {data} = await Axios.post(`/saveproyecto`, proyecto);
    return data;
}

/*Obtiene el polygono de respositorio de polygonos cad*/
async function getPolygonoServer(codigo) {
    const {data} = await Axios.get(`/obtener_poligono_proyecto?idcapa=1&pre_codigo=${codigo}`);
    let result = JSON.parse(data[0].geojson_3857);
    return result;
}

/*Obtiene la solcitud de polygonos*/
async function getsolicitudGestionPredial() {
    const {data} = await Axios.get(`/drpsolicituds`);
    return data;
}

/*Obtiene la solcitud de polygonos*/
async function getProyecto(codigo) {
    const {data} = await Axios.get(`/proyecto/${codigo}`);
    return data;
}

const ProyectoEdit = ({history, match}) => {

    const {codigo} = match.params;
    const [proyecto, set_proyecto] = useState({});
    const [solicituds, set_solicituds] = useState([]);


    useEffect(() => {
        const init = async () => {

            let listsolicituds = await getsolicitudGestionPredial();
            console.log(listsolicituds)
            set_solicituds(listsolicituds);
            let proyecto = await getProyecto(codigo);
            set_proyecto(proyecto);
        };
        init();


    }, []);


    function handleInputChange(e) {


        set_proyecto({
            ...proyecto,
            [e.target.name]: e.target.name == 'url_ortofoto' ? e.target.value : e.target.value.toUpperCase()
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
                polygono: geojson.features[0].geometry, polygonojson: geojson
            });
            toastr.info('Se encontro el Polygono del Proyecto en la Base Gráfica')
        } catch (e) {
        }
    }


    /*FUncion para guardar el proeyecto*/
    const registrarProyecto = async (e) => {
        e.preventDefault()
        try {
            /*Validacion de digital de documento*/
            if (!proyecto.tipo_infraestructura_id || (proyecto.tipo_infraestructura_id + '').trim() == 0) {
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
    /*Para guardar fotos de portada*/
    const saveFotoPortada = (pmd) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen": pmd.filename
        });
    }
    
    //Permite Obtener los datos del proyecto
    
    

    return (
        <div>
            <SidebarAdm/>
            <Header></Header>
            <div className="container mtop-20">
                <form>
                    <fieldset className={'fielsettext'}>
                        <legend align="mtop-25 center fielsettext ">
                            <label className={'titleform'}>EDITAR PROYECTO</label>
                        </legend>
                    </fieldset>
                </form>

                <form onSubmit={registrarProyecto}>
                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-body">
                            <legend align=" center fielsettext "><label className={'titleform'}>1. DATOS
                                GENERALES DEL PROYECTO</label>
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> </label>
                                <div className="col-lg-6">
                                    <a href="#" className="thumbnail pull-left relative">
                                        {proyecto.portada_imagen ?
                                            <img style={{with: '200px', height: '200px'}} data-src="holder.js/150x150"
                                                 alt="150x150"
                                                 src={serverFile + proyecto.portada_imagen}
                                            /> :
                                            <img data-src="holder.js/150x150" alt="150x150"
                                                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAFXklEQVR4Xu3XXSulURjG8TXKe0QUTiQ54gzf/xN4ORClJEmhvEXKS5npXrWe1jx2M1v2xcy+/o5m2K7tvu5fa6/nx83Nzc/EFw30uIEfwOpxo8TlBoAFBEkDwJLUSiiwMCBpAFiSWgkFFgYkDQBLUiuhwMKApAFgSWolFFgYkDQALEmthAILA5IGgCWplVBgYUDSALAktRIKLAxIGgCWpFZCgYUBSQPAktRKKLAwIGkAWJJaCQUWBiQNAEtSK6HAwoCkAWBJaiUUWBiQNAAsSa2EAgsDkgaAJamVUGBhQNIAsCS1EgosDEgaAJakVkKBhQFJA8CS1EoosDAgaQBYkloJBRYGJA0AS1IrocDCgKQBYElqJRRYGJA0ACxJrYQCCwOSBoAlqZVQYGFA0gCwJLUSCiwMSBoAlqRWQoGFAUkDwJLUSiiwMCBpAFiSWgkFFgYkDQBLUiuhwMKApAFgSWolFFgYkDQALEmthAILA5IGgCWplVBgYUDSALAktRIKLAxIGgCWpFZCgYUBSQPAktRKKLAwIGmgb2E9PDyknZ2dND4+njY3N3N5FxcX6eDgIL29veX/DwwMpNXV1TQ/P59OTk7S0dFR/v7Y2Fja2NhIw8PDXZW+v7+fLi8vm6z4pfje+fl58/t1Zv2zqamp5u/r6s3+kxf1JawaUL24wHN8fPwbgNhTQTg7O5sWFxffgfzTLre2ttLd3d1vSOP18f2Xl5d3QMvftry8nEZGRjL0ubm5tLa29p+Q6e7P7DtY7VOphhUnxdXVVVpfX08TExNNQ+W0WllZSUtLSxnF4+Njft3p6Wk+eeJnMzMzGd3g4GAGs7e3l1G1T7/n5+e0vb2dhoaG3p1G9ek2PT2dXxdfHzkhu1vt976qL2EFhIWFhXwaTE5ONsstp0upPF4TJ0X7o6zT8l9fXzOop6en5sTb3d3N73N2dpbu7++b75cTMH6nja5GG7jb//9eDr17976DVaopJ1eB1b5zlXtOnERxOtV3pDa0+v7V6U4UOGpY9QkY8OJUCmRxAh4eHjanIbB6B/nLktqw2m9cfh73m/j6E6zy0VafVnVeG1b7vWqocbqVj1lgfRmH3r3RR2DFk2M8EXa6Y8Xy66e4Tk+MH4F1fX3dIOaO1bt9f1lSNx+F5ZQKWHEpj6fCwFVfvOuc0dHRfJEvd7MyTDcfheWCfnt7m+9+8VRYHgbifXkq/DIan3ujTidWfVeK9HJCxb/rp8n6VKrRlBOm3JfKk2WnE6t+UIhLf/0k+rc72+cm/zd+u28v7/9Gvb5/BbB8dy+dHFjSen3DgeW7e+nkwJLW6xsOLN/dSycHlrRe33Bg+e5eOjmwpPX6hgPLd/fSyYElrdc3HFi+u5dODixpvb7hwPLdvXRyYEnr9Q0Hlu/upZMDS1qvbziwfHcvnRxY0np9w4Hlu3vp5MCS1usbDizf3UsnB5a0Xt9wYPnuXjo5sKT1+oYDy3f30smBJa3XNxxYvruXTg4sab2+4cDy3b10cmBJ6/UNB5bv7qWTA0tar284sHx3L50cWNJ6fcOB5bt76eTAktbrGw4s391LJweWtF7fcGD57l46ObCk9fqGA8t399LJgSWt1zccWL67l04OLGm9vuHA8t29dHJgSev1DQeW7+6lkwNLWq9vOLB8dy+dHFjSen3DgeW7e+nkwJLW6xsOLN/dSycHlrRe33Bg+e5eOjmwpPX6hgPLd/fSyYElrdc3HFi+u5dODixpvb7hwPLdvXRyYEnr9Q0Hlu/upZMDS1qvbziwfHcvnRxY0np9w4Hlu3vp5MCS1usbDizf3UsnB5a0Xt9wYPnuXjr5L14cG5m5fLu3AAAAAElFTkSuQmCC"
                                            />
                                        }
                                    </a>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Foto de Portada</label>
                                <div className="col-lg-8">

                                    {proyecto.portada_imagen ?
                                        <UploadFile key="upload_portada_imagen" file={{
                                            urlDocumento: proyecto.portada_imagen,
                                            originalName: proyecto.portada_imagen
                                        }}
                                                    accept={'.jpg,.png,.gif'}
                                                    setFile={saveFotoPortada}></UploadFile>
                                        : <span></span>
                                    }


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
                                    <input required type="text" className="form-control input-sm" placeholder="Proyecto"
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

                                    {proyecto.pmd ? <UploadFile key="upload_documento_rspta" file={{
                                            urlDocumento: proyecto.pmd,
                                            originalName: proyecto.pmd
                                        }}
                                                                setFile={savePMD}></UploadFile> :
                                        <span></span>
                                    }
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

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> URL ORTOFOTO</label>
                                <div className="col-lg-8">
                                    <input required type="text" placeholder=""
                                           className="form-control input-sm"
                                           name="url_ortofoto"
                                           onChange={handleInputChange}
                                           placeholder={'URL del WMS donde esta alojado la ORTOFOTO.'}
                                           value={proyecto.url_ortofoto}
                                    ></input>
                                </div>


                            </div>


                            <legend align=" center fielsettext "><label className={'titleform'}>2. INFORMACIÓN
                                GRAFICA</label>
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-1 control-label"></label>
                                <div className="col-lg-10">
                                    {proyecto.polygono ? <Map geojson={proyecto.polygono}/> :
                                        <MapProyectoEmpy></MapProyectoEmpy>}


                                </div>
                            </div>


                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">

                                        {proyecto.polygono ?
                                            <button id="btnguardar" type="submit"
                                                    className="btn btn-danger btn-sm btn-control">Guardar
                                            </button> :
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

export default ProyectoEdit;