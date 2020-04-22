import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors, serverFile} from '../../config/axios';

/*IMportacion de componenetes*/
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import Map from "../../components/helpers/maps/MapRegistroProyecto";
import MapProyectoEmpy from "../../components/helpers/maps/MapProyectoEmpy";
import UploadFile from "../../components/helpers/uploaders/Upload";
import {DETALLE_EQUIPO} from "../../actions/equipos/types";
const {$}=window
const Axios = initAxiosInterceptors();


async function save(proyecto) {
    const {data} = await Axios.post(`/saveproyecto`, proyecto);
    return data;
}

async function getPolygonoServer(codigo) {
    const {data} = await Axios.get(`/obtener_poligono_proyecto?idcapa=1&codigo=${codigo}`);
    // let result = JSON.parse(data[0].geojson_3857);
    return data;
}

async function getsolicitudGestionPredial() {
    const {data} = await Axios.get(`/drpsolicituds`);
    return data;
}

/*Obteniendo la lista de resposables */
let initialEquipos = []

async function cargarResponsablescall() {
    const {data: {responsables, equipos}} = await Axios.get(`/responsables`);
    initialEquipos = equipos;
    return {responsables, equipos};
}

/*Obteniendo el tipo de infraestructura*/
async function getdrptipoinfraestructura() {
    const {data} = await Axios.get(`/drptipoinfraestructura`);
    return data;
}
/*Obteniendo el los organos solictantes*/
async function getorporgano_solicitante() {
    const {data} = await Axios.get(`/organo_solicitante`);
    return data;
}

/*Obtencion de datos de la brigada*/
export const detalle_equipo =async  (equipo_id) => {
    const {data} = await Axios.get(`/details-equipo?equipo_id=${equipo_id}`);
    console.log(data)

    return data.integrantes;
}


const ProyectoAdd = ({history}) => {

    const [proyecto, set_proyecto] = useState({portada_imagen: '', pmd: '', descripcion: ''});
    const [solicituds, set_solicituds] = useState([]);
    const [organo_solicitantes, set_organo_solicitantes] = useState([]); // el estado para los organos solicitantes
    
    /*Para la gestion de la infraestrcutura*/
    const [listoTipoInfraestructura, set_listoTipoInfraestructura] = useState([]);
    /*Gestio de equipoys y coordinadores*/
    const [resposables, setResposables] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [trabajadores, set_trabajadores] = useState([]);


    useEffect(() => {
        const init = async () => {

            let listsolicituds = await getsolicitudGestionPredial();
            const listTipoInfraestructura = await getdrptipoinfraestructura();
            const listOrganosSolicitantes = await getorporgano_solicitante();
           const {responsables, equipos} = await cargarResponsablescall();
            setResposables(responsables);
            set_organo_solicitantes(listOrganosSolicitantes);
           // setEquipos(equipos);
            set_listoTipoInfraestructura(listTipoInfraestructura);
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

    /*Funcion que permite obtener el polygono del sistema*/
    async function getPolygono(codigo) {
        set_proyecto({
            ...proyecto,
            polygono: undefined
        });
        try {
            let geojson = await getPolygonoServer(codigo);
            /*Validacion de digital de documento*/
            if (geojson.features.length == 0) {
                throw {error: "No se econtro ningun polygono con ese codigo, revise y vuelva a subir "}
            }
            set_proyecto({
                ...proyecto,
                polygono: geojson.features[0].geometry, polygonojson: geojson
            });
            toastr.info('Se encontro el Polygono del Proyecto en la Base Gráfica')
        } catch (err) {
            console.log(err)
            toastr.error(err.error)
        }
    }


    /*FUncion para guardar el proeyecto*/
    const registrarProyecto = async (e) => {
        e.preventDefault()
        try {
           
            /*Validacion de digital de documento*/
            if (!proyecto.tipo_infraestructura_id || proyecto.tipo_infraestructura_id.trim() == 0) {
                throw {error: " Seleccione el tipo de infraestructura. "}
            }

            /*Validacion de digital de documento*/
            if (!proyecto.tipo_documento_id || proyecto.tipo_documento_id.trim() == 0) {
                throw {error: " Seleccione el tipo de infraestructura. "}
            }


            /*Validacion de digital de documento*/
            if (!proyecto.codigo || proyecto.codigo.trim() == 0) {
                throw {error: " Ingrese el Codigo. "}
            }
            /*Validacion de digital de documento*/
            if (!proyecto.pmd || proyecto.pmd.trim() == 0) {
                throw {error: " Suba el Documeto Digital "}
            }  /*Validacion de digital de documento*/
            if (!proyecto.responsable_id || proyecto.responsable_id.trim() == 0) {
                setTimeout(function(){ $('#tabresposables').click() }, 2000);
                throw {error: " Ingrese los Resposanbles en el Segunda Pestaña"}
               
                
            }
            else {
                toastr.info("El proyecto se esta registrando sin un coordinador resposable")
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
    /*Filtro del eqquipo*/
    const filtrarEquipo = (e) => {

        let equipoFilter = initialEquipos.filter(row => {
            return row.coordinador_id == e.target.value;
        });
        console.log(equipoFilter)
        setEquipos(equipoFilter);
    }
    /*Filtro del eqquipo*/
    const obtenerTrabajadores = async (e) => {

        let trabajador_id = e.target.value;
        await set_trabajadores([]);
        let list_trabajadores = await detalle_equipo(trabajador_id)
        await set_trabajadores(list_trabajadores);
    }
    
    
    const seleccionarBrigada=(brigada_id)=>{
   
      set_proyecto({
            ...proyecto,
            "brigada_id": brigada_id
        });
    }


    return (
        <div>


            <Header></Header>
            <div className="container mtop-20">
                <form>
                    <fieldset className={'fielsettext'}>
                        <legend align="mtop-25 center fielsettext ">
                            <label className={'titleform'}>REGISTRAR PROYECTO</label>
                        </legend>
                    </fieldset>
                </form>


                <div className="panel panel-default">
                    <div className="form-horizontal no-margin form-border" id="formWizard1" noValidate="">

                        <div className="panel-tab">
                            <ul className="tab-bar wizard-demo" id="wizardDemo1">
                                <li className="active">
                                    <a href="#wizardContent1" data-toggle="tab">1. Datos del Proyecto</a>
                                </li>
                                <li > 
                                    <a id="tabresposables" href="#wizardContent2" data-toggle="tab">2. Asignacion de Brigada Responsable</a>
                                </li>

                            </ul>
                        </div>
                        <form onSubmit={registrarProyecto}>
                        <div className="panel-body">
                      
                            <div className="tab-content">
                                <div className="tab-pane fade in active" id="wizardContent1">
                                 
                                        <div>

                                            <i> <span>Los campos marcados con <span
                                                className="obligatorio">* </span> son requeridos.</span></i>
                                            {/*  <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> </label>
                                                <div className="col-lg-6">

                                                    <a href="#" className="thumbnail pull-left relative">
                                                        {proyecto.portada_imagen ?
                                                            <img style={{with: '200px', height: '200px'}}
                                                                 data-src="holder.js/150x150" alt="150x150"
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
                                                    <UploadFile key="upload_portada_imagen"
                                                                file={proyecto.portada_imagen} accept={'.jpg,.png,.gif'}
                                                                setFile={saveFotoPortada}></UploadFile>
                                                </div>
                                            </div>*/}
                                            {/*  <legend align=" center fielsettext "><label className={'titleform'}>
                                                Datos del Proyecto
                                            </label>
                                            </legend>*/}
                                            <div style={{height: '20px'}}></div>

                                            <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Tipo de Infraestructura :</label>
                                                <div className="col-lg-8">
                                                    <select
                                                        required
                                                        className="form-control input-sm"
                                                        name="tipo_infraestructura_id"
                                                        onChange={handleInputChange}
                                                        value={proyecto.tipo_infraestructura_id}
                                                    >

                                                        <option value="0">-- SELECCIONE --</option>
                                                        {listoTipoInfraestructura.map(item =>
                                                            <option value={item.id}>{item.denominacion}</option>
                                                        )}

                                                    </select>
                                                </div>


                                            </div>

                                            <div className="form-group ">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Denominacion :</label>
                                                <div className="col-lg-8">
                                                    <input required type="text" className="form-control input-sm"
                                                           placeholder="Proyecto"
                                                           name="descripcion"
                                                           onChange={handleInputChange}
                                                           value={proyecto.descripcion}
                                                    >
                                                    </input>
                                                </div>

                                            </div>

                                            <div className="form-group">
                                                <label className="col-lg-2 control-label"> Concesion :</label>
                                                <div className="col-lg-8">
                                                    <input  type="text" placeholder=""
                                                           className="form-control input-sm"
                                                           name="concesion"
                                                           onChange={handleInputChange}
                                                           placeholder="Nombre de la Concesion "
                                                           value={proyecto.concesion}
                                                    ></input>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Tipo de Documento :</label>
                                                <div className="col-lg-8">
                                                    <select
                                                        required
                                                        className="form-control input-sm"
                                                        name="tipo_documento_id"
                                                        onChange={handleInputChange}
                                                        value={proyecto.tipo_documento_id}
                                                    >
                                                        <option value="0">-- SELECCIONE --</option>
                                                        <option value="1">MEMORANDUM</option>
                                                        <option value="5">CORREO</option>


                                                    </select>
                                                </div>


                                            </div>

                                            <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span>  Nº de Documento :</label>
                                                <div className="col-lg-8">
                                                    <input required type="text" placeholder=""
                                                           className="form-control input-sm"
                                                           name="codigo"
                                                           onChange={handleInputChange}
                                                           placeholder="Numero de Documento Solicitante "
                                                           value={proyecto.codigo}
                                                    ></input>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Organo Solicitante :</label>
                                                <div className="col-lg-8">
                                                    <select
                                                        required
                                                        className="form-control input-sm"
                                                        name="organo_solicitante"
                                                        onChange={handleInputChange}
                                                        value={proyecto.organo_solicitante}
                                                    >
                                                        <option value="0">-- SELECCIONE --</option>
                                                        {organo_solicitantes.map(item =>
                                                            <option value={item.denominacion}>{item.denominacion}</option>
                                                        )}

                                                    </select>
                                                </div>


                                            </div>
                                            <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span>Digital del Documento :</label>
                                                <div className="col-lg-8">

                                                    <UploadFile key="upload_documento_rspta" file={proyecto.pmd}
                                                                setFile={savePMD}></UploadFile>
                                                </div>


                                            </div>


                                            {/*  <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Codigo Base Grafica :</label>
                                                <div className="col-lg-8">
                                                    <input required type="text" placeholder=""

                                                           className="form-control input-sm"
                                                           name="codigo"
                                                           onChange={handleInputChange}
                                                           placeholder={'Codigo con el que subio desde el Autocad haciendo uso de App Predios'}
                                                           onBlur={() => {
                                                               getPolygono(proyecto.codigo)
                                                           }}
                                                           value={proyecto.codigo}
                                                    ></input>
                                                </div>


                                            </div>

                                            <div className="form-group">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> URL ORTOFOTO  :</label>
                                                <div className="col-lg-8">
                                                    <input required type="text" placeholder=""
                                                           className="form-control input-sm"
                                                           name="url_ortofoto"
                                                           onChange={handleInputChange}
                                                           placeholder={'URL del WMS donde esta alojado la ORTOFOTO.'}
                                                           value={proyecto.url_ortofoto}
                                                    ></input>
                                                </div>


                                            </div>*/}

                                            {/*
                                            <legend align=" center fielsettext "><label className={'titleform'}>
                                               Información Gráfica 
                                                </label>
                                            </legend>
                                            <div className="form-group">
                                                <label className="col-lg-1 control-label"></label>
                                                <div className="col-lg-10">
                                                    {proyecto.polygono ? <Map geojson={proyecto.polygonojson}/> :
                                                        <MapProyectoEmpy></MapProyectoEmpy>}


                                                </div>
                                            </div>*/}


                                        </div>
                                  
                                </div>
                                <div className="tab-pane fade" id="wizardContent2">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div>
                                                <div className="form-group">
                                                    <label className="col-lg-2 control-label"><span
                                                        className="obligatorio">* </span>Coordinador Responsable :</label>
                                                    <div className="col-lg-8">
                                                        <select
                                                            className="form-control input-sm"
                                                            name="responsable_id"
                                                            onChange={(e) => {
                                                                handleInputChange(e);
                                                                filtrarEquipo(e);
                                                            }}
                                                            value={proyecto.responsable_id}

                                                        >
                                                            <option value="0">-- SELECCIONE --</option>
                                                            {resposables.map(resp =>
                                                                <option key={resp.id}
                                                                        value={resp.id}>{resp.responsable}</option>
                                                            )};


                                                        </select>
                                                    </div>

                                                </div>

                                            
                                                

                                                <div className="form-group">
                                                    <label className="col-lg-2 control-label"><span
                                                        className="obligatorio">* </span> Equipo  :</label>
                                                    <div className="col-lg-10">
                                                    <div className="row">
                                                
                                                        <div className="col-lg-12">
                                                            <div className="row">
                                                                
                                                                {equipos.map(item=>
                                                                    
                                                                    

                                                                    <div className="col-lg-3" style={{border:'0px solid #dedede',padding:'2px',marginLeft:'2px',borderRadius:'5px'}}>
                                                                    <div className="thumbnail" style={{height:'220px'}}>
                                                                            <div className="caption">
                                                                                 <h6 ><b>     <input name={'brigada'} type="radio"  onClick={
                                                                                     ()=>{seleccionarBrigada(item.id)}
                                                                                 } ></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {`${item.denominacion}`}</b></h6>
                                                                                
                                                                                {
                                                                                   item.integrantes.map(value=>
                                                                                       ( <> 
                                                                                           <hr/>
                                                                                           <span style={{color:'#498AF5'}}>
                                                                                               {value.denominacion} </span>
                                                                                           <div  className="pull-left m-left-sm">
                                                                                           <span style={{fontSize:'10px'}}>{`${value.int_nombres} ${value.int_apellidos}`}</span><br/>
                                                                                           <small
                                                                                               className="text-muted"><span  style={{color:'#FB5A43'}}> {value.cargo}</span>
                                                                                           </small>
                                                                                       </div>
                                                                                     </>)
                                                                                    )
                                                                                        
                                                                                }
                                                                              
                                                                                
                                                                            
                                                                            </div>
                                                                     
                                                                    </div>
                                                                     
                                                                    </div>
                                                                )}

                                                              

                                                              
                                                                
                                                                
                                                                
                                                                
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>

                                                </div>

                                                <div className="form-group">
                                                    <label className="col-lg-2 control-label"><span
                                                        className="obligatorio">* </span> Fecha Asignacion :</label>
                                                    <div className="col-lg-8">
                                                        <input  className="form-control input-sm" type="date"
                                                               placeholder=""
                                                               name="fech_asig_brigada"
                                                               onChange={handleInputChange}
                                                               value={proyecto.fech_asig_brigada}

                                                        >

                                                        </input>
                                                    </div>
                                                </div>


                                                <div className="form-group ">
                                                    <label className="col-lg-2 control-label">Observaciones :</label>
                                                    <div className="col-lg-8">
                                <textarea  className="form-control input-sm" placeholder="Observaciones"
                                          name="observaciones"
                                          onChange={handleInputChange}

                                >
                                    {proyecto.observaciones}
                                </textarea>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>


                                </div>

                            </div>
                   
                        </div>
                        <div className="panel-footer clearfix">
                            <div className="pull-left">
                                <button type="submit" className="btn btn-danger btn-sm  btn-control" 
                                        > Guardar
                                </button>
                                <Link to={'/list-proyectos'}  className="btn btn-sm btn-default btn-control" id="nextStep1">
                               
                                    Cancelar
                                </Link>
                            </div>


                        </div>
                        </form>
                    </div>
                </div>


            </div>
            <div className="row margin-button-form "></div>
            <FooterProcess/>
        </div>
    );
};




export default ProyectoAdd;