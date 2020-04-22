import React, {useEffect, useState} from 'react';
import Header from "../../header/Header";
import {initAxiosInterceptors,} from '../../../config/axios';
import {Link} from "react-router-dom";
import FooterProcess from "../../gestionPredios/FooterProcess";
import SidebarAdm from "../SidebarAdm";
import {toastr} from "react-redux-toastr";
import moment from "moment";

const {$} = window;

const Axios = initAxiosInterceptors();

/*Permite cargar los reposables*/
let initialEquipos = []

async function cargarResponsablescall() {
    const {data: {responsables, equipos}} = await Axios.get(`/responsables`);
    initialEquipos = equipos;
    return {responsables, equipos};
}

async function getDrpProyectos() {
    const {data} = await Axios.get(`/drpProyectos`);
    return data;
}

async function getdrptipoinfraestructura() {
    const {data} = await Axios.get(`/drptipoinfraestructura`);
    return data;
}

var listaProyectosdrp = [];


const SolicitudAdd = ({history}) => {

    const [categoriaproyecto, setCategoriaproyecto] = useState('');
    const [solicitud, setSolicitud] = useState({});
    const [resposables, setResposables] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [listProyectos, set_listproyectos] = useState([]);
    const [listoTipoInfraestructura, set_listoTipoInfraestructura] = useState([]);
    const [privado, setPrivado] = useState(false);


    const [subiendoImagen, setSubiendoImagen] = useState('ninguno');
    const [porcentajeSubida, setPorcentajeSubida] = useState(0);
    const [urlDocumento, setUrlDocumento] = useState(null);
    const [originalName, setoriginalName] = useState(null);
    const [layerAdd, setLayerAdd] = useState(null);


    const [proyecto_relacionados, set_proyecto_relacionados] = useState([]);

    useEffect(() => {
        console.log(layerAdd)

    }, [layerAdd]);


    /*Efecto para realizar el cargo de los resposablmes*/
    useEffect(() => {
        async function cargarResponsables() {
            try {
                const {responsables, equipos} = await cargarResponsablescall();
                const listProyectos = await getDrpProyectos();
                const listTipoInfraestructura = await getdrptipoinfraestructura();
                listaProyectosdrp = listProyectos;
                set_listproyectos(listProyectos);
                set_listoTipoInfraestructura(listTipoInfraestructura);
                setResposables(responsables);
                setEquipos(equipos);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }

        cargarResponsables();

    }, []);


    function handleInputChange(e) {
        if (e.target.name == 'tipoproy_id') {

            if (e.target.value == 2) {
                setPrivado(true)
            } else {
                setPrivado(false)
            }
        }

        if (e.target.name == 'denominacion') {

            e.target.value = e.target.value.toUpperCase()
        }
        if (e.target.name == 'asunto') {

            e.target.value = e.target.value.toUpperCase()
        }
        setSolicitud({
            ...solicitud,
            [e.target.name]: e.target.value
        });
    }


    async function handleImagenSeleccionada(e) {
        try {
            setSubiendoImagen(true);
            const file = e.target.files[0];

            var formData = new FormData()
            formData.append('myfile', file);
            formData.append('filename', file.name);
            //  formData.append('path',generateNameunique(filename))
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {

                    console.log(progressEvent.loaded)
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setPorcentajeSubida(percentCompleted)
                }
            };
            setSubiendoImagen('cargando')
            const {data} = await Axios.post('/uploadsolicitud', formData, config);

            setUrlDocumento(data.filesave)
            setoriginalName(data.originalname)

            let filesaved = {filesave: data.filesave, originalname: data.originalname};

            setSolicitud({
                ...solicitud, ...filesaved
            });
            setSubiendoImagen(false);
            setPorcentajeSubida(0);
            setSubiendoImagen('subido')
            toastr.info('¡ Correcto !', 'Se subio correctamente el Documento', {position: 'top-right'})
        } catch (error) {
            setSubiendoImagen(false);
            //  mostrarError(error.response.data);
            console.log(error);
        }
    }


    const regitrar = (e) => {
        e.preventDefault()
        setSolicitud({
            ...solicitud, ...{filesave: null, originalname: null}
        });
    }

    const eliminarFilesubido = e => {
        setSubiendoImagen('ninguno');
        setUrlDocumento(null)
    }


    const filtrarEquipo = (e) => {

        let equipoFilter = initialEquipos.filter(row => {
            return row.coordinador_id == e.target.value;
        });
        console.log(equipoFilter)
        setEquipos(equipoFilter);
    }

    /*Funcion que filtra el combo proyectos de acuerdo al tipo de infraestructura*/
    const filterProybyTipInfra = e => {
        let tipoinfra_id = e.target.value;
        set_listproyectos(listaProyectosdrp.filter(item => {
            return item.tipo_infraestructura_id == tipoinfra_id
        }));

    }


    /*Funcion que agrega un proyecto relacionado a la solicitud*/
    const addProyectoSolicitud = e => {
        let proy = {proyecto_id: $('#drpProyectos').val(), proyecto: $('#drpProyectos option:selected').text()};

        let bndFiltro= proyecto_relacionados.filter(item=>item.proyecto_id==proy.proyecto_id);
        if(bndFiltro.length==0 && proy.proyecto.length!==0){
            set_proyecto_relacionados([...proyecto_relacionados, proy])
        }else{
            
            if(proy.proyecto.length==0)   toastr.error(`No se selecciono ningun Proyecto.`)
            else toastr.error(`El proyecto ${proy.proyecto} ya fue agregado.`)
        }

    }

    const removeProyectoSolicitud = (idproy) => {
     //  alert(idproy)
       set_proyecto_relacionados(proyecto_relacionados.filter(item=>item.proyecto_id!==idproy) );

    }

    
    /*Funcion que registra una solciitud de informacion*/
    const registrarSolicitud = async (e) => {
        e.preventDefault();
        try {



            /*Validacion de digital de documento*/
            if (!solicitud.filesave || solicitud.filesave.trim() == 0) {
                throw {error: " Seleccione en documento en formato digital . "}
            }

            /*Validacion de digital de documento*/
            if (!solicitud.organosolicitante || solicitud.organosolicitante.trim() == 0) {
                throw {error: " Ingrese un Organo que realiza la SOLICITUD DE GESTION PREDIAL. "}
            }


            /*Validacion de los combos tipo proyecto*/
            if (!solicitud.tipoproy_id || solicitud.tipoproy_id == 0) {
                throw {error: " Seleccione un Tipo de Proyecto. "}
            }

           


            /*Validacion de reposable */
            if (!solicitud.responsable_id || solicitud.responsable_id == 0) {
                throw {error: " Seleccione un Resposable. "}
            }
            /*Validacion de equipo */
            if (!solicitud.brigada_id || solicitud.brigada_id == 0) {
                throw {error: " Seleccione un Equipo. "}
            }


            if (solicitud.tipoproy_id == 2) {
                /*Validacion de las fases*/
                if (!solicitud.fase_id || solicitud.fase_id == 0) {
                    throw {error: " Seleccione una fase. "}
                }
            }
            
            //Agregando la lista de proyectos vinculados
            


            const toastrConfirmOptions = {
                onOk: async () => {

                    try {
                        const {data} = await Axios.post(`/solicitud`, {...solicitud,proyectos_relacionados:proyecto_relacionados});
                       

                        toastr.info('Registro correcto')
                        history.push('/solicitudes')
                    } catch (e) {
                        console.log(e)
                        toastr.error(e.error)
                    }

                },
                onCancel: () => {
                }
            };
            toastr.confirm('¿ Esta registrando un solicitud de Peticion de Gestion Predial y no podra modificar ni eliminar ?', toastrConfirmOptions);


        }
        catch (err) {
            console.log(err)
            toastr.error(err.error)
        }

    }


    return (
        <div>
            <SidebarAdm/>
            <form onSubmit={registrarSolicitud}>
                <Header></Header>
                <div className="container mtop-20">
                   
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">

                                <label className={'titleform'}>REGISTRO DE PETICION DE GESTIÓN PREDIAL</label>

                            </legend>

                        </fieldset>



                    </form>
                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-body">
                            <legend align=" center fielsettext "><label className={'titleform'}>1. DATOS
                                GENERALES DEL DOCUMENTO</label>
                            </legend>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Tipo de Documento</label>
                                <div className="col-lg-8">

                                    <select

                                        className="form-control input-sm"
                                        name="tipodocumento_id"
                                        onChange={handleInputChange}
                                        value={solicitud.tipodocumento_id}
                                    >
                                        <option value="0">-- SELECCIONE --</option>
                                        <option value="1">MEMORANDUM</option>
                                        <option value="2">OTRO DOCUMENTO</option>


                                    </select>
                                </div>


                            </div>


                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Nro Documento</label>
                                <div className="col-lg-8">
                                    <input required type="text" placeholder=""

                                           className="form-control input-sm"
                                           name="denominacion"
                                           onChange={handleInputChange}
                                           value={solicitud.denominacion}
                                    ></input>
                                </div>


                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Fecha Documento</label>
                                <div className="col-lg-4">
                                    <input required type="date" placeholder=""

                                           className="form-control input-sm"
                                           name="fechadocumento"
                                           onChange={handleInputChange}
                                           value={solicitud.fechadocumento}
                                    ></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Asunto</label>
                                <div className="col-lg-8">
                                    <input required type="text" placeholder=""

                                           className="form-control input-sm"
                                           name="asunto"
                                           onChange={handleInputChange}
                                           value={solicitud.asunto}
                                    ></input>
                                </div>


                            </div>


                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Digital del Memorandum</label>
                                <div className="col-lg-6">


                                    {subiendoImagen == 'ninguno' ? (
                                        <input name='documentofile' required="" className=" input-sm" type="file"
                                               onChange={handleImagenSeleccionada}></input>
                                    ) : null}

                                    {subiendoImagen == 'cargando' ? (<>
                                        <div className="progress progress-striped active">
                                            <div className="progress-bar progress-bar-danger"
                                                 style={{width: `${porcentajeSubida}%`}}><span
                                                style={{color: '#000'}}>{porcentajeSubida} %</span></div>
                                        </div>
                                        <a onClick={e => {
                                            setSubiendoImagen('ninguno');
                                            setUrlDocumento(null)
                                        }} className="btn btn-default btn-sm dropdown-toggle pull-left"
                                           data-toggle="dropdown" data-toggle="tooltip"
                                           data-original-title={`Permite Sincronizar`}>
                                            <i className="fa fa-times" aria-hidden="true"></i></a> </>) : null}

                                    {subiendoImagen == 'subido' ? (
                                        <label style={{color: '#000'}}>{originalName}</label>) : null}


                                </div>

                                {!urlDocumento ? ('') :
                                    (<div className="col-lg-2">
                                        <a title="Descargar Adjunto"
                                           href={'http://localhost:7000/files/' + urlDocumento} target="_blank"
                                           className="btn btn-default btn-sm dropdown-toggle pull-left"
                                           data-toggle="dropdown" data-toggle="tooltip"
                                           data-original-title={`Permite Sincronizar`}>
                                            <i className="fa fa-download"></i></a>
                                        <a title="Eliminar Adjunto" onClick={eliminarFilesubido}
                                           className="btn btn-default btn-sm dropdown-toggle pull-left"
                                           data-toggle="dropdown" data-toggle="tooltip"
                                           data-original-title={`Permite Sincronizar`}>
                                            <i className="fa fa-times" aria-hidden="true"></i></a>
                                    </div>)
                                }


                                <div className="col-lg-1">

                                </div>
                            </div>


                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Tipo de Proyecto</label>
                                <div className="col-lg-4">
                                    <select

                                        className="form-control input-sm"
                                        name="tipoproy_id"
                                        onChange={handleInputChange}
                                        value={solicitud.tipoproy_id}
                                    >
                                        <option value="0">-- SELECCIONE --</option>
                                        <option value="1">INVERSION PUBLICA</option>
                                        <option value="2">INVERSION PRIVADA</option>


                                    </select>
                                </div>


                            </div>


                            {privado ? (
                                <>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Contrato</label>
                                        <div className="col-lg-6">
                                            <input required className="form-control input-sm" type="text" placeholder=""
                                                   className="form-control input-sm"
                                                   name="contrato"
                                                   onChange={handleInputChange}
                                                   value={solicitud.contrato}

                                            ></input>
                                        </div>
                                        <div className="col-lg-2">
                                            <a title="Buscar en el Sistema de Concesiones"
                                               className="btn btn-default btn-sm dropdown-toggle pull-left"
                                               data-toggle="dropdown" data-toggle="tooltip"
                                               data-original-title={`Permite Sincronizar`}>
                                                <i className="fa fa-refresh"></i></a>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Fase</label>
                                        <div className="col-lg-4">
                                            <select
                                                className="form-control input-sm"
                                                name="fase_id"
                                                onChange={handleInputChange}
                                                value={solicitud.fase_id}
                                            >
                                                <option value="0">-- SELECCIONE --</option>
                                                <option value="1">PLANEAMIENTO Y PROGRAMACION</option>
                                                <option value="2">FORMULACION</option>
                                                <option value="3">ESTRUCTURACION</option>
                                                <option value="4">TRANSACCION</option>
                                                <option value="5">EJECUCION CONTRACTUAL</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            ) : null}


                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>Organo
                                    MTC Solicitante</label>
                                <div className="col-lg-6">
                                    <input required list="organosolicitante" required=""
                                           className="form-control input-sm" type="text"
                                           placeholder="Entidad quien solicita la liberacion, adquisicion de predios e interferencias."

                                           className="form-control input-sm"
                                           name="organosolicitante"
                                           onChange={handleInputChange}
                                           value={solicitud.organosolictante_id}

                                    ></input>


                                    <datalist required id="organosolicitante" name="organosolictante_id"
                                              onChange={handleInputChange}
                                              value={solicitud.organosolictante_id}
                                    >

                                        <option
                                            value="DIRECCION DE INVERSION PRIVADA EN TRANSPORTES - DINPTRA"></option>
                                        <option value="DIRECCION GENERAL DE AERONAUTICA CIVIL - DGAC"></option>
                                        <option
                                            value="DIRECCION DE GESTION DE INFRAESTRUCTURA Y SERVICIO DE TRANSPORTE - DGISTR"></option>

                                        <option value="OTROS"></option>
                                    </datalist>
                                </div>

                            </div>

                            <legend align=" center fielsettext "><label className={'titleform'}>2. PROYECTOS
                                REFERENCIADOS EN LA SOLICITUD</label>
                            </legend>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Tipo Infraestructura</label>
                                <div className="col-lg-2">
                                    <select

                                        className="form-control input-sm"
                                        name="tipoinfra_id"
                                        onChange={filterProybyTipInfra}
                                        value={solicitud.tipoinfra_id}
                                    >
                                        <option value="0">-- SELECCIONE --</option>
                                        {listoTipoInfraestructura.map(item =>
                                            <option value={item.id}>{item.denominacion}</option>
                                        )}
                                    </select>
                                </div>
                                <label className="col-lg-1 control-label"><span
                                    className="obligatorio">* </span> Proy.</label>
                                <div className="col-lg-3">
                                    <select
                                        id="drpProyectos"
                                        className="form-control input-sm"
                                        name="fase_id"
                                        onChange={handleInputChange}
                                        value={solicitud.fase_id}
                                    >
                                        {listProyectos.map(item =>
                                            <option value={item.id}>{item.descripcion}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-2">
                                    <button onClick={addProyectoSolicitud} type="button"
                                            title="Referenciar proyecto a Solicitud de Gestion Predial"
                                            className="btn btn-default form-button-proc"><i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <hr/>
                                <label className="col-lg-2 control-labe alert-infol"> Proyectos Referenciados:</label>
                                <div className="col-lg-8">

                                    {proyecto_relacionados.map(item=>
                                        <div className="alert alert-info">
                                            <strong>{item.proyecto}</strong> <button onClick={e=>{removeProyectoSolicitud(item.proyecto_id)}} className="pull-right" href="#"
                                                                                      title="Removing tag">X</button>
                                        </div>
                                    )}
                                    

                                </div>


                            </div>

                            <legend align=" center fielsettext "><label className={'titleform'}>3. DATOS
                                DE ASIGNACIÓN DE RESPONSABILIDAD</label>
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span>Coordinador Responsable</label>
                                <div className="col-lg-6">
                                    <select
                                        className="form-control input-sm"
                                        name="responsable_id"
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            filtrarEquipo(e);
                                        }}
                                        value={solicitud.reponsable_id}
                                    >
                                        <option value="0">-- SELECCIONE --</option>


                                        {resposables.map(resp =>
                                            <option key={resp.id} value={resp.id}>{resp.responsable}</option>
                                        )};


                                    </select>
                                </div>

                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Equipo de trabajo</label>
                                <div className="col-lg-6">
                                    <select
                                        className="form-control input-sm"
                                        name="brigada_id"
                                        onChange={handleInputChange}
                                        value={solicitud.brigada_id}
                                    >
                                        <option value="0">-- SELECCIONE --</option>
                                        {equipos.map(equipo =>
                                            <option key={equipo.id} value={equipo.id}>{equipo.denominacion}</option>
                                        )};


                                    </select>
                                </div>

                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Fecha Asignacion</label>
                                <div className="col-lg-4">
                                    <input required className="form-control input-sm" type="date" placeholder=""
                                           name="fechasignacion"
                                           onChange={handleInputChange}
                                           value={solicitud.fechasignacion}
                                    >

                                    </input>
                                </div>
                            </div>


                            <div className="form-group ">
                                <label className="col-lg-2 control-label">Observaciones </label>
                                <div className="col-lg-6">
                                <textarea required className="form-control input-sm" placeholder="Observaciones"
                                          name="observaciones"
                                          onChange={handleInputChange}

                                >
                                    {solicitud.observaciones}
                                </textarea>
                                </div>

                            </div>
                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">
                                        <button id="btnguardar" type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>
                                        <Link to={`/solicitudes`}
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

export default SolicitudAdd;