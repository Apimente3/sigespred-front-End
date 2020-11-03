import React, {useState} from 'react';
import {initAxiosInterceptors} from '../../config/axios';
import moment from 'moment';
import {REGISTRO_SOLICITUD_BREADCRUM} from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import { useAsync } from "react-async-hook";
import {agregar, setcontinuarAgregar} from '../../actions/_ddp_plano/Actions';
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
// import SubLista from './SubListaDelete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import {useDispatch} from 'react-redux';
import UploadMemo from "../../components/helpers/uploaders/UploadMemo";

const {$} = window;
const Axios = initAxiosInterceptors();

const SolicitudAdd = ({history,  match}) => {
    const [solicitud, setSolicitud] = useState({});
    // const [planoArchTmp, set_planoArchTmp] = useState({digital: '', memdescriptiva: ''});
    const resListaEntidades = useAsync(helperGets.helperGetListEntidades, []);
    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaTipoSolic = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOSOLICEXT]);
    const resListaCanalEnvio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.SOLICCANALENVIO]);
    // const resListaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    // const resListaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    // const resListaDistrito = useAsync(helperGets.helperGetListDistrito,[]);
    // const resListaEstadosPlano = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.ESTADOPLANO]);
    const resListaResponsable = useAsync(helperGets.helperGetListaLocadores, []);

    // const [dataProv, set_dataProv] = useState(null);
    // const [dataDist, set_dataDist] = useState(null);
    const [dataTramo, setDataTramo] = useState(null);
    const [dataEquipo, setDataEquipo] = useState(null);
    // const [listaArchivos, set_listaArchivos] = useState([]);
    // const [valAncedente, setValAntecedente] = useState('');
    // const [reiniciarValDigital, setReiniciarValDigital] = useState(false);
    // const [reiniciarValMemoria, setReiniciarValMemoria] = useState(false);
    

    // const {ante} = match.params;
    
    // if(ante && !valAncedente){
    //     setValAntecedente(ante);
    //     set_plano({
    //         ...plano,
    //         antecedente: ante
    //     });
    // }

    const handleChangeProyecto = async(e) => {
        if (e.target.value) {
            let data = await helperGets.helperGetListTramos(e.target.value);
            let dataEq = await helperGets.helperGetListEquipos(e.target.value);
            setDataTramo(data);
            setDataEquipo(dataEq);
        } else {
            setDataTramo(null);
            setDataEquipo(null);
        }
    }

    // function handleChangeDepartmento(e) {
    //     if(!resListaProvincia.loading){
    //         let data = resListaProvincia.result;
    //         let provList = data[Object.keys(data)[0]].filter( o => o.id_dpto === e.target.value);
    //         set_dataProv({data: provList});
    //         set_dataDist(null);
    //     }
    // }

    // function handleChangeProvincia(e) {
    //     if(!resListaDistrito.loading){
    //         let data = resListaDistrito.result;
    //         let distList = data[Object.keys(data)[0]].filter( o => o.id_prov === e.target.value);
    //         set_dataDist({data: distList});
    //     }
    // }

    // const limpiarForm = () => {
    //     set_plano({observaciones: ''})
    // }

    function handleInputChange(e) {
        switch(e.target.name){
            case 'nroexpediente':
                setSolicitud({
                    ...solicitud,
                    [e.target.name]: e.target.value.toUpperCase()
                });
                break;
            case 'gestionpredialid':
                setSolicitud({
                    ...solicitud,
                    [e.target.name]: e.target.value,
                    tramoid: '',
                    equipoid: ''
                });
                break;
            case 'departamentoid':
                setSolicitud({
                    ...solicitud,
                    [e.target.name]: e.target.value,
                    provinciaid: '',
                    distritoid: ''
                });
                break;
                case 'provinciaid':
                    setSolicitud({
                        ...solicitud,
                        [e.target.name]: e.target.value,
                        distritoid: ''
                    });
                    break;
            default:
                setSolicitud({
                    ...solicitud,
                    [e.target.name]: e.target.value
                });
        }
        //TODO: remover console
        console.log(solicitud);
    }

    const saveDigitalPlano = (file) => {
        setSolicitud({
            ...solicitud,
            "urlplano": file
        });
    }

    const deleteDigitalPlano = () => {
        setSolicitud({
            ...solicitud,
            "urlplano": ''
        });
    }

    const saveDigitalOficio = (file) => {
        setSolicitud({
            ...solicitud,
            "urloficio": file
        });
    }

    const deleteDigitalOficio = () => {
        setSolicitud({
            ...solicitud,
            "urloficio": ''
        });
    }

    // const saveArchivoDigital = (file) => {
    //     setReiniciarValDigital(false);
    //     set_planoArchTmp({
    //         ...planoArchTmp,
    //         "digital": file
    //     });
    // }

    // const saveArchivoMemoria = (file) => {
    //     setReiniciarValMemoria(false);
    //     set_planoArchTmp({
    //         ...planoArchTmp,
    //         "memoria": file
    //     });
    // }

    // const deleteArchivoDigital = () => {
    //     set_planoArchTmp({
    //         ...planoArchTmp,
    //         "digital": ''
    //     });
    // }

    // const deleteArchivoMemoria = () => {
    //     set_planoArchTmp({
    //         ...planoArchTmp,
    //         "memoria": ''
    //     });
    // }

    // const handleChangeLamina = (e) => {
    //     var uidDate = moment().format("YYYYMMDDHHmmss");
    //     set_planoArchTmp({
    //         ...planoArchTmp,
    //         "lamina": e.target.value,
    //         "laminaid": uidDate,
    //     });
    // }

    // const actualizarLista = () => {
        
    //     if (planoArchTmp.lamina && planoArchTmp.digital) {
    //         set_listaArchivos(listaArchivos => [...listaArchivos, planoArchTmp]);
    //         set_planoArchTmp({
    //             ...planoArchTmp,
    //             "lamina": '',
    //             "laminaid": '',
    //             "digital": '',
    //             "memoría": ''
    //         });
    //         setReiniciarValDigital(true);
    //         setReiniciarValMemoria(true);
    //     } else {
    //         toastr.error(`Se require al menos un identificador de lámina y el archivo digital.`)
    //     }
    // }

    // const removerDeLista = (idLamina) => {
    //     var data = $.grep(listaArchivos, function(e){ 
    //         return e.laminaid != idLamina; 
    //    });
    //    set_listaArchivos(data);
    // }

    function setResponsable(idLocador) {
        setSolicitud({
            ...solicitud,
            responsableid: idLocador
        });
    }

    // const dispatch = useDispatch();
    // const agregarPlanoAction = (plano) => dispatch(agregar(plano));
    // const setcontinuarAgregarAction = (estado) => dispatch(setcontinuarAgregar(estado));

    // // useEffect(() => {
    // //     $('[data-toggle="tooltip"]').tooltip()
    // //     setcontinuarAgregarAction(true)
    // // }, []);

    async function addSolicitud(solicitud) {
        const {data} = await Axios.post(`/solicitudentidad`,solicitud);
        return data;
    }

    const registrar = async e => {

        e.preventDefault();

        // $.each(plano, function(key, value){
        //     if (key === 'tramoid' && (value === "" || value === null)){
        //         delete plano[key];
        //     }
        // });
        
        // if (Array.isArray(listaArchivos) && listaArchivos.length) {
        //     plano.archivos = listaArchivos;
        //     set_plano({
        //         ...plano,
        //         archivos: listaArchivos
        //     });
        // }

        $('#btnguardar').button('loading');
        try {
            let resultPlano = await addSolicitud(solicitud);
            $('#btnguardar').button('reset');
            // const toastrConfirmOptions = {
            //     onOk: () => limpiarForm(),
            //     onCancel: () => history.push('/planos')
            // };
            // toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);
            toastr.success('Registro de Solicitud a Entidades', `La solicitud fue ingresada correctamente.`);
            //history.push('/planos');
        }
        catch (e) {
            toastr.error('Registro de Solicitud a Entidades', "Se encontró un error: " +  e.message);
            $('#btnguardar').button('reset');
        }
    }

    const cabeceraArchivos = ["Lámina","Plano Digital", "Mem. Descriptiva", "Eliminar"];

        return (
            <>
            <WraperLarge titleForm={"Registro de Solicitud a Entidades"} listbreadcrumb={REGISTRO_SOLICITUD_BREADCRUM}>
                <form onSubmit={registrar}>
                    <div className="form-group">
                        <div className="form-group col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Datos Generales</legend>
                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                            <label className="col-lg-4 control-label">
                                                <span className="obligatorio">* </span>Proyecto
                                            </label>
                                            <div className="col-lg-8">
                                                <select className="form-control input-sm" id="gestionpredialid" name="gestionpredialid" 
                                                required
                                                title="El Proyecto es requerido"
                                                onChange={(e) => {handleChangeProyecto(e); handleInputChange(e);}}
                                                >
                                                    <option value="">--SELECCIONE--</option>
                                                    {resListaProyectos.result?
                                                    <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>
                                                    : "Cargando..."}
                                                </select>
                                            </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Tramo</label>
                                        <div className="col-lg-8">
                                            <select id="tramoid" name="tramoid" className="form-control input-sm" onChange={handleInputChange}>
                                                <option value="">--SELECCIONE--</option>
                                                {dataTramo &&
                                                <ComboOptions data={dataTramo} valorkey="id" valornombre="descripcion" />}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Subtramo</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="subtramo" name="subtramo" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">
                                            <span className="obligatorio">* </span>Tipo de Consulta
                                        </label>
                                        <div className="col-lg-8">
                                            <select className="form-control input-sm" id="tipoconsultaid" name="tipoconsultaid"
                                            required
                                            title="El Tipo de Consulta es requerido"
                                            onChange={handleInputChange}
                                            >
                                                <option value="">--SELECCIONE--</option>
                                                {resListaTipoSolic.result
                                                ? <ComboOptions data={resListaTipoSolic.result} valorkey="valorcodigo" valornombre="valortexto" />
                                                : "Cargando..."}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">
                                            Equipo
                                        </label>
                                        <div className="col-lg-8">
                                            <select className="form-control input-sm" id="equipoid" name="equipoid"
                                            // required
                                            // title="El Tipo de Plano es requerido"
                                            onChange={handleInputChange}
                                            >
                                                <option value="">--SELECCIONE--</option>
                                                {dataEquipo &&
                                                <ComboOptions data={dataEquipo} valorkey="id" valornombre="equipo" />}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Profesional Responsable</label>
                                        <div className="col-lg-8">
                                            {resListaResponsable.result
                                            ? <Autocomplete listaDatos={resListaResponsable.result} callabck={setResponsable} />
                                            : "Cargando..."}
                                        </div>
                                    </div>
                                    {/* <div className="form-group">
                                        <label className="col-lg-4 control-label">Código del Plano</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="codplano" name="codplano" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Archivo Digital del Plano</label>
                                        <div className="col-lg-8">
                                            <UploadMemo key="urlplano" file={{urlDocumento:''}}
                                            accept={'.*'}
                                            setFile={saveDigitalPlano} folderSave={"FotosUsuarios"} eliminar={deleteDigitalPlano}></UploadMemo>
                                        </div>
                                    </div> */}
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Datos de Envío</legend>
                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label"><span className="obligatorio">* </span>Código STD</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="codigostd" name="codigostd" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Fecha de Elaboración de Oficio</label>
                                        <div className="col-lg-8">
                                            <input style={{lineHeight: '1.43'}} type="date" id="fechaelaboficio" name="fechaelaboficio" className="form-control input-sm" onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label"><span className="obligatorio">* </span>Número de Oficio</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="nrooficio" name="nrooficio" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label"><span className="obligatorio">* </span>Digital de Documento Enviado</label>
                                        <div className="col-lg-8">
                                            <UploadMemo key="urloficio" file={{urlDocumento:''}}
                                            accept={'.*'}
                                            setFile={saveDigitalOficio} folderSave={"FotosUsuarios"} eliminar={deleteDigitalOficio}></UploadMemo>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group col-lg-12">
                            <fieldset className="mleft-20">
                                <legend></legend>
                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Entidad</label>
                                        <div className="col-lg-8">
                                            <select id="entidadid" name="entidadid" className="form-control input-sm" onChange={handleInputChange}>
                                                <option value="">--SELECCIONE--</option>
                                                {resListaEntidades.result
                                                ? <ComboOptions data={resListaEntidades.result} valorkey="id" valornombre="nombre" />
                                                : "Cargando..."}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Oficina (de Destino)</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="oficinaentidad" name="oficinaentidad" onChange={handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">
                                            Canal de Envío
                                        </label>
                                        <div className="col-lg-8">
                                            <select className="form-control input-sm" id="canalenvio" name="canalenvio"
                                            onChange={handleInputChange}
                                            >
                                                <option value="">--SELECCIONE--</option>
                                                {resListaCanalEnvio.result
                                                ? <ComboOptions data={resListaCanalEnvio.result} valorkey="valorcodigo" valornombre="valortexto" />
                                                : "Cargando..."}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Código de Tramite de Expediente</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="codigotramexp" name="codigotramexp" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Fecha de Recepción (en Entidad)</label>
                                        <div className="col-lg-8">
                                            <input style={{lineHeight: '1.43'}} type="date" id="fecharecepcion" name="fecharecepcion" className="form-control input-sm" onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Descripción del Canal</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="descripcionenvio" name="descripcionenvio" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group col-lg-12">
                            <fieldset className="mleft-20">
                                <legend></legend>
                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">
                                            Tipo de Entidad
                                        </label>
                                        <div className="col-lg-8">
                                            <select className="form-control input-sm" id="tipoentidadid" name="tipoentidadid"
                                            onChange={handleInputChange}
                                            >
                                                <option value="">--SELECCIONE--</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">
                                            Clasificación de Entidad
                                        </label>
                                        <div className="col-lg-8">
                                            <select className="form-control input-sm" id="clasifentidadid" name="clasifentidadid"
                                            onChange={handleInputChange}
                                            >
                                                <option value="">--SELECCIONE--</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6">
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Contacto</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="contacto" name="contacto" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">Observaciones</label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm" id="observacion" name="observacion" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    
                    <div className="panel-body">
                        <div className="form-group">
                            <div className="col-lg-offset-8 col-lg-4">
                                <Link to={`/solicitud-list`} className="btn btn-default btn-sm btn-control">Cancelar
                                </Link>
                                <button id="btnguardar" type="submit"
                                        className="btn btn-danger btn-sm btn-control">Guardar
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </form>
                </WraperLarge>
            </>
        );
    }

    export default SolicitudAdd; 
