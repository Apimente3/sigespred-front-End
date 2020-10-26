import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {REGISTRO_PLANO_BREADCRUM} from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import { useAsync } from "react-async-hook";
import {agregar, setcontinuarAgregar} from '../../actions/_ddp_plano/Actions';
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import SubLista from './SubListaDelete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import {useDispatch} from 'react-redux';
import UploadMemo from "../../components/helpers/uploaders/UploadMemo";

const {$} = window;

const PlanoAdd = ({history,  match}) => {
    const [plano, set_plano] = useState({observaciones: ''});
    const [planoArchTmp, set_planoArchTmp] = useState({digital: '', memdescriptiva: ''});
    const resListaTipoPlano = useAsync(helperGets.helperGetListTipoPlano, [""]);
    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaAnios = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.ANIO]);
    const resListaProcesos = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.PROCESOSGPRED]);
    const resListaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const resListaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    const resListaDistrito = useAsync(helperGets.helperGetListDistrito,[]);
    const resListaEstadosPlano = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.ESTADOPLANO]);
    const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, []);

    const [dataProv, set_dataProv] = useState(null);
    const [dataDist, set_dataDist] = useState(null);
    const [dataTramo, setDataTramo] = useState(null);
    const [listaArchivos, set_listaArchivos] = useState([]);
    const [valAncedente, setValAntecedente] = useState('');
    const [reiniciarValDigital, setReiniciarValDigital] = useState(false);
    const [reiniciarValMemoria, setReiniciarValMemoria] = useState(false);
    

    const {ante} = match.params;
    
    if(ante && !valAncedente){
        setValAntecedente(ante);
        set_plano({
            ...plano,
            antecedente: ante
        });
    }

    const handleChangeProyecto = async(e) => {
        if (e.target.value) {
            let data = await helperGets.helperGetListTramos(e.target.value);
            setDataTramo(data);
        } else {
            setDataTramo(null);
        }
    }

    function handleChangeDepartmento(e) {
        if(!resListaProvincia.loading){
            let data = resListaProvincia.result;
            let provList = data[Object.keys(data)[0]].filter( o => o.id_dpto === e.target.value);
            set_dataProv({data: provList});
            set_dataDist(null);
        }
    }

    function handleChangeProvincia(e) {
        if(!resListaDistrito.loading){
            let data = resListaDistrito.result;
            let distList = data[Object.keys(data)[0]].filter( o => o.id_prov === e.target.value);
            set_dataDist({data: distList});
        }
    }

    const limpiarForm = () => {
        set_plano({observaciones: ''})
    }

    function handleInputChange(e) {
        switch(e.target.name){
            case 'nroexpediente':
                set_plano({
                    ...plano,
                    [e.target.name]: e.target.value.toUpperCase()
                });
                break;
            case 'gestionpredialid':
                set_plano({
                    ...plano,
                    [e.target.name]: e.target.value,
                    tramoid: ''
                });
                break;
            case 'departamentoid':
                set_plano({
                    ...plano,
                    [e.target.name]: e.target.value,
                    provinciaid: '',
                    distritoid: ''
                });
                break;
                case 'provinciaid':
                    set_plano({
                        ...plano,
                        [e.target.name]: e.target.value,
                        distritoid: ''
                    });
                    break;
            default:
                set_plano({
                    ...plano,
                    [e.target.name]: e.target.value
                });
        }
        //TODO: remover console
        console.log(plano);
    }

    const saveArchivoDigital = (file) => {
        setReiniciarValDigital(false);
        set_planoArchTmp({
            ...planoArchTmp,
            "digital": file.path
        });
    }

    const saveArchivoMemoria = (file) => {
        setReiniciarValMemoria(false);
        set_planoArchTmp({
            ...planoArchTmp,
            "memoria": file.path
        });
    }

    const deleteArchivoDigital = () => {
        set_planoArchTmp({
            ...planoArchTmp,
            "digital": ''
        });
    }

    const deleteArchivoMemoria = () => {
        set_planoArchTmp({
            ...planoArchTmp,
            "memoria": ''
        });
    }

    const handleChangeLamina = (e) => {
        var uidDate = moment().format("YYYYMMDDHHmmss");
        set_planoArchTmp({
            ...planoArchTmp,
            "lamina": e.target.value,
            "laminaid": uidDate,
        });
    }

    const actualizarLista = () => {
        
        if (planoArchTmp.lamina && planoArchTmp.digital) {
            set_listaArchivos(listaArchivos => [...listaArchivos, planoArchTmp]);
            set_planoArchTmp({
                ...planoArchTmp,
                "lamina": '',
                "laminaid": '',
                "digital": '',
                "memoría": ''
            });
            setReiniciarValDigital(true);
            setReiniciarValMemoria(true);
        } else {
            toastr.error(`Se require al menos un identificador de lámina y el archivo digital.`)
        }
    }

    const removerDeLista = (idLamina) => {
        var data = $.grep(listaArchivos, function(e){ 
            return e.laminaid != idLamina; 
       });
       set_listaArchivos(data);
    }

    function setSolicitante(idLocador) {
        set_plano({
            ...plano,
            profesionalid: idLocador
        });
    }

    const dispatch = useDispatch();
    const agregarPlanoAction = (plano) => dispatch(agregar(plano));
    const setcontinuarAgregarAction = (estado) => dispatch(setcontinuarAgregar(estado));

    // useEffect(() => {
    //     $('[data-toggle="tooltip"]').tooltip()
    //     setcontinuarAgregarAction(true)
    // }, []);


    const registrar = async e => {

        e.preventDefault();
        
        if (Array.isArray(listaArchivos) && listaArchivos.length) {
            plano.archivos = listaArchivos;
            set_plano({
                ...plano,
                archivos: listaArchivos
            });
        }

        $('#btnguardar').button('loading');
        try {
            await agregarPlanoAction(plano);

            $('#btnguardar').button('reset');
            const toastrConfirmOptions = {
                onOk: () => limpiarForm(),
                onCancel: () => history.push('/planos')
            };
            toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);
        }
        catch (e) {
            alert(e.message)
        }
    }

    const cabeceraArchivos = ["Lámina","Plano Digital", "Mem. Descriptiva", "Eliminar"];

        return (
            <>
            <WraperLarge titleForm={"Registro de Plano"} listbreadcrumb={REGISTRO_PLANO_BREADCRUM}>
                <form onSubmit={registrar}>
                    <div className="form-group">
                        <div className="form-group col-lg-6">
                            <fieldset className="mleft-20">
                                <legend>Datos de Codificación</legend>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Tipo de Plano
                                    </label>
                                    <div className="col-lg-8">
                                        <select className="form-control input-sm" id="tipoplanoid" name="tipoplanoid"
                                        required
                                        title="El Tipo de Plano es requerido"
                                        onChange={handleInputChange}
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            {resListaTipoPlano.error
                                            ? "Se produjo un error cargando los tipos de plano"
                                            : resListaTipoPlano.loading
                                            ? "Cargando..."
                                            : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Proyecto
                                    </label>
                                    <div className="col-lg-8">
                                        <select className="form-control input-sm" id="gestionpredialid" name="gestionpredialid" 
                                        required
                                        title="El Proyecto es requerido"
                                        onChange={(e) => {handleChangeProyecto(e); handleInputChange(e);}}>
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            {resListaProyectos.error
                                            ? "Se produjo un error cargando los proyectos"
                                            : resListaProyectos.loading
                                            ? "Cargando..."
                                            : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Nro. de Expediente
                                    </label>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control input-sm uppercaseinput" id="nroexpediente" name="nroexpediente" 
                                        placeholder="Número de expediente"
                                        required
                                        title="El Número de Expediente es requerido"
                                        autoComplete = "off"
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Año
                                    </label>
                                    <div className="col-lg-8">
                                        <select className="form-control input-sm" id="periodoid" name="periodoid" 
                                        required
                                        title="El Año es requerido"
                                        autoComplete = "off"
                                        onChange={handleInputChange}
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            {resListaAnios.error
                                            ? "Se produjo un error cargando los años"
                                            : resListaAnios.loading
                                            ? "Cargando..."
                                            : <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Proceso
                                    </label>
                                    <div className="col-lg-8">
                                        <select className="form-control input-sm" id="procesoid" name="procesoid"
                                        required
                                        title="El Proceso es requerido"
                                        onChange={handleInputChange}
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            {resListaProcesos.error
                                            ? "Se produjo un error cargando los procesos"
                                            : resListaProcesos.loading
                                            ? "Cargando..."
                                            : <ComboOptions data={resListaProcesos.result} valorkey="valorcodigo" valornombre="valortexto" />}
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div className="form-group col-lg-6">
                            <fieldset className="mleft-20">
                                <legend>Datos Generales</legend>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">Profesional Solicitante</label>
                                    <div className="col-lg-8">
                                        {resListaSolicitantes.error
                                        ? "Se produjo un error cargando los locadores"
                                        : resListaSolicitantes.loading
                                        ? "Cargando..."
                                        : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} />}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">Estado del Plano</label>
                                    <div className="col-lg-8">
                                        <select id="estadoid" name="estadoid" className="form-control input-sm" onChange={handleInputChange}>
                                            <option value="0">--SELECCIONE--</option>
                                            {resListaEstadosPlano.error
                                            ? "Se produjo un error cargando los estados de plano"
                                            : resListaEstadosPlano.loading
                                            ? "Cargando..."
                                            : <ComboOptions data={resListaEstadosPlano.result} valorkey="valorcodigo" valornombre="valortexto" />}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">Plano Antecedente</label>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control input-sm" id="antecedente" name="antecedente" 
                                        value={valAncedente}
                                        readOnly 
                                        onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">Fecha de Creación</label>
                                    <div className="col-lg-8">
                                        <input style={{lineHeight: '1.43'}} type="date" id="fechacreacion" name="fechacreacion" className="form-control input-sm" onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">Observaciones</label>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control input-sm" id="observaciones" name="observaciones" onChange={handleInputChange}/>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>


                    <div className="form-group col-lg-6">
                        <fieldset className="mleft-20">
                            <legend>Ubicación</legend>
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
                            <div className="form-group">
                                <label className="col-lg-4 control-label">Departamento</label>
                                <div className="col-lg-8">
                                    <select className="form-control" id="departamentoid" name="departamentoid" onChange={(e) => {handleChangeDepartmento(e); handleInputChange(e);}}>
                                        <option value="">--SELECCIONE--</option>
                                        {resListaDepartmento.error
                                        ? "Se produjo un error cargando los departamentos"
                                        : resListaDepartmento.loading
                                        ? "Cargando..."
                                        : <ComboOptions data={resListaDepartmento.result} valorkey="id_dpto" valornombre="nombre" />}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">Provincia</label>
                                <div className="col-lg-8">
                                    <select id="provinciaid" name="provinciaid" className="form-control input-sm" onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}>
                                        <option value="0">--SELECCIONE--</option>
                                        <ComboOptions data={dataProv} valorkey="id_prov" valornombre="nombre" />
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">Distrito</label>
                                <div className="col-lg-8">
                                    <select id="distritoid" name="distritoid" className="form-control input-sm" onChange={handleInputChange}>
                                        <option value="0">--SELECCIONE--</option>
                                        <ComboOptions data={dataDist} valorkey="id_dist" valornombre="nombre" />
                                    </select>
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <label className="col-lg-4 control-label">Referencia Geográfica</label>
                                <div className="col-lg-8">
                                    <UploadMemo key="refgeografica" file={{urlDocumento:''}}
                                    accept={'.jpg,.png,.gif'}
                                    setFile={saveArchivoDigital} folderSave={"FotosUsuarios"} eliminar={deleteArchivoDigital}></UploadMemo>
                                </div>
                            </div> */}
                        </fieldset>
                    </div>

                    <div className="form-group col-lg-6">
                        <fieldset className="mleft-20">
                            <legend>Archivos</legend>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">Descripcion de Lámina</label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm" id="nombrelam" name="nombrelam" 
                                    value = {planoArchTmp.lamina || ''}
                                    onChange={handleChangeLamina}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">Plano Dígital</label>
                                <div className="col-lg-6">
                                    <UploadMemo key="planodigitaltmp" file={{urlDocumento:''}}
                                    accept={'.jpg,.png,.gif'} resetContenido={reiniciarValDigital}
                                    setFile={saveArchivoDigital} folderSave={"FotosUsuarios"} eliminar={deleteArchivoDigital}></UploadMemo>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">Memoría Descriptiva</label>
                                <div className="col-lg-6">
                                    <UploadMemo key="memdescriptivatmp" file={{urlDocumento:''}}
                                    accept={'.jpg,.png,.gif'} resetContenido={reiniciarValMemoria}
                                    setFile={saveArchivoMemoria} folderSave={"FotosUsuarios"} eliminar={deleteArchivoMemoria}></UploadMemo>
                                </div>
                                <div className="col-lg-2">
                                <a className="btn btn-default btn-sm dropdown-toggle pull-left"
                                    title="Agregar a la lista"
                                    onClick={actualizarLista}
                                    >
                                    <i className="fa fa-archive fa-2x"></i></a>
                                </div>
                            </div>
                            <div className="form-group">
                                <SubLista data={listaArchivos} cabecera={cabeceraArchivos} deleterow={removerDeLista}/>
                            </div>
                        </fieldset>
                    </div>
                    
                    <div className="panel-body">
                        <div className="form-group">
                            <div className="col-lg-offset-8 col-lg-4">
                                <Link to={`/planos`} className="btn btn-default btn-sm btn-control">Cancelar
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

    export default PlanoAdd; 
