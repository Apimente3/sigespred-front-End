import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {REGISTRO_PLANO_BREADCRUM} from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr';
import { useAsync } from "react-async-hook";
import {editar} from '../../actions/_ddp_plano/Actions';
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import SubLista from './SubListaDelete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import {initAxiosInterceptors} from '../../config/axios';
import {useDispatch} from 'react-redux';
import UploadMemo from "../../components/helpers/uploaders/UploadMemo";

const {$} = window;
const axios=initAxiosInterceptors();

const obtenerPlano = async(id) => {
    const {data} = await axios.get(`/plano?id=${id}`);
    return data
}

const PlanoEdit = ({history, match}) => {

    const {id} = match.params;
    const editarPlanoAction = (plano) => dispatch(editar(plano));
    const [planoEditado,set_planoEditado]= useState({});
    const [listaArchivos, set_listaArchivos] = useState([]);
    const [planoEdicion, setPlanoEdicion]  = useState({});
    
    useEffect(() => {
        const getPlano=async (idplano)=>{
           let planoDB = await obtenerPlano(idplano);
            setPlanoEdicion(planoDB);
            if (planoDB.archivos) {
                set_listaArchivos(planoDB.archivos);
            }            
            cargarTramo(planoDB.gestionpredialid);
        }
        getPlano(id);
    }, []);
    
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
    const [firstLoad, set_firstLoad] = useState(true);
    
    const [reiniciarValDigital, setReiniciarValDigital] = useState(false);
    const [reiniciarValMemoria, setReiniciarValMemoria] = useState(false);
    
    function setProvinciaDistrito(iddep){
        if (firstLoad && resListaProvincia.result && resListaDistrito.result){
            if(iddep){
                let data = resListaProvincia.result;
                let provList = data[Object.keys(data)[0]].filter( o => o.id_dpto === iddep);
                set_dataProv({data: provList});
            }
            if(planoEdicion.distritoid){
                let data = resListaDistrito.result;
                let distList = data[Object.keys(data)[0]].filter( o => o.id_prov === planoEdicion.provinciaid);
                set_dataDist({data: distList});
            }
            set_firstLoad(false);
        }
    }

    const cargarTramo = async(idProyecto) => {
        if (idProyecto) {
            let data = await helperGets.helperGetListTramos(idProyecto);
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
            planoEdicion['provinciaid'] = '';
            planoEdicion['distritoid'] = '';
            set_planoEditado({
                ...planoEditado,
                provinciaid: '',
                distritoid: ''
            });
        }
    }

    function handleChangeProvincia(e) {
        if(!resListaDistrito.loading){
            let data = resListaDistrito.result;
            let distList = data[Object.keys(data)[0]].filter( o => o.id_prov === e.target.value);
            set_dataDist({data: distList});
            planoEdicion['distritoid'] = '';
            set_planoEditado({
                ...planoEditado,
                distritoid: ''
            });
        }
    }

    function handleInputChange(e) {
        if(e.target.name){
            planoEdicion[e.target.name] = e.target.value;
            set_planoEditado({
                ...planoEditado,
                [e.target.name]: e.target.value
            });
        }
        //TODO: remover console
        console.log(planoEdicion);
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

    function setSolicitante(idLocador) {
        planoEdicion['profesionalid'] = idLocador;
        set_planoEditado({
            ...planoEditado,
            profesionalid: idLocador
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

    const dispatch = useDispatch();
    
    const actualizar = async e => {
        e.preventDefault();

        $.each(planoEdicion, function(key, value){
            if (key === 'tramoid' && (value === "" || value === null)){
                delete planoEdicion[key];
            }
        });

        if (Array.isArray(listaArchivos) && listaArchivos.length) {
            planoEdicion.archivos = listaArchivos;
            set_planoEditado({
                ...planoEditado,
                archivos: listaArchivos
            });
        }

        $('#btnguardar').button('loading');
        try {
            await editarPlanoAction(planoEdicion);
            toastr.success('Actualización de Plano', `El plano ${planoEdicion.codplano} fue actualizado correctamente.`);
            $('#btnguardar').button('reset');
            history.push('/planos');
        }
        catch (e) {
            toastr.error('Actualización de Plano', "Se encontró un error: " +  e.message);
            $('#btnguardar').button('reset');
        }
    }

    const cabeceraArchivos = ["Lámina","Plano Digital", "Mem. Descriptiva", "Eliminar"];

        return (
            <>
            <WraperLarge titleForm={"Edición de Plano: " + planoEdicion.codplano} listbreadcrumb={REGISTRO_PLANO_BREADCRUM}>
                <form onSubmit={actualizar}>
                    <div className="form-group">
                        <div className="form-group col-lg-6">
                            <fieldset className="mleft-20">
                                <legend>Datos de Codificación</legend>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Tipo de Plano
                                    </label>
                                    <div className="col-lg-8">
                                        {resListaTipoPlano.error
                                        ? "Se produjo un error cargando los tipos de plano"
                                        : resListaTipoPlano.loading
                                        ? "Cargando..."
                                        :
                                        <select className="form-control input-sm" id="tipoplanoid" name="tipoplanoid"
                                        readOnly
                                        value={planoEdicion.tipoplanoid || ''}
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />
                                        </select>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Proyecto
                                    </label>
                                    <div className="col-lg-8">
                                        {resListaProyectos.error
                                        ? "Se produjo un error cargando los proyectos"
                                        : resListaProyectos.loading
                                        ? "Cargando..."
                                        :
                                        <select className="form-control input-sm" id="gestionpredialid" name="gestionpredialid" 
                                        readOnly
                                        value={planoEdicion.gestionpredialid || ''}
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>
                                        </select>}
                                        {resListaProyectos.result && (
                                        setProvinciaDistrito(planoEdicion.departamentoid)
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Nro. de Expediente
                                    </label>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control input-sm" id="nroexpediente" name="nroexpediente" 
                                        readOnly
                                        value={planoEdicion.nroexpediente || ''}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Año
                                    </label>
                                    <div className="col-lg-8">
                                        {resListaAnios.error
                                        ? "Se produjo un error cargando los años"
                                        : resListaAnios.loading
                                        ? "Cargando..."
                                        :
                                        <select className="form-control input-sm" id="periodoid" name="periodoid" 
                                        readOnly
                                        value={planoEdicion.periodoid || ''}
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />
                                        </select>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">
                                        <span className="obligatorio">* </span>Proceso
                                    </label>
                                    <div className="col-lg-8">
                                        {resListaProcesos.error
                                        ? "Se produjo un error cargando los procesos"
                                        : resListaProcesos.loading
                                        ? "Cargando..."
                                        :
                                        <select className="form-control input-sm" id="procesoid" name="procesoid"
                                        readOnly
                                        value={planoEdicion.procesoid || ''}
                                        >
                                            <option value="">--SELECCIONE--</option>
                                            <ComboOptions data={resListaProcesos.result} valorkey="valorcodigo" valornombre="valortexto" />
                                        </select>}
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="form-group col-lg-6">
                        <fieldset className="mleft-20">
                            <legend>Datos Generales</legend>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Profesional Solicitante
                                </label>
                                <div className="col-lg-8">
                                    {resListaSolicitantes.error
                                    ? "Se produjo un error cargando los locadores"
                                    : resListaSolicitantes.loading
                                    ? "Cargando..."
                                    : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} valorinit={planoEdicion.profesionalid}/>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Estado del Plano
                                </label>
                                <div className="col-lg-8">
                                    <select id="estadoid" name="estadoid" className="form-control input-sm" 
                                    value={planoEdicion.estadoid || ''}
                                    onChange={handleInputChange}>
                                        <option value="">--SELECCIONE--</option>
                                        {resListaEstadosPlano.error
                                        ? "Se produjo un error cargando los estados de plano"
                                        : resListaEstadosPlano.loading
                                        ? "Cargando..."
                                        : <ComboOptions data={resListaEstadosPlano.result} valorkey="valorcodigo" valornombre="valortexto" />}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Plano Antecedente
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm" id="antecedente" name="antecedente" 
                                    value={planoEdicion.antecedente || ''}
                                    readOnly onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Fecha de Creación
                                </label>
                                <div className="col-lg-8">
                                    <input style={{lineHeight: '1.43'}} type="date" id="fechacreacion" name="fechacreacion" className="form-control" 
                                    value={planoEdicion.fechacreacion || ''}
                                    onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Observaciones
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm" id="observaciones" name="observaciones" 
                                        value={planoEdicion.observaciones || ''}
                                        onChange={handleInputChange}/>
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    </div>
                    <div className="form-group col-lg-6">
                        <fieldset className="mleft-20">
                            <legend>Ubicación</legend>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Tramo
                                </label>
                                <div className="col-lg-8">
                                {dataTramo?
                                    <select id="tramoid" name="tramoid" className="form-control input-sm" 
                                        value={planoEdicion.tramoid || ''}
                                        onChange={handleInputChange}>
                                        <option value="">--SELECCIONE--</option>
                                        <ComboOptions data={dataTramo} valorkey="id" valornombre="descripcion" />
                                    </select>
                                    :
                                    <select id="tramoid" name="tramoid" className="form-control input-sm">
                                        <option value="">--SELECCIONE--</option>
                                    </select>
                                }
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Subtramo
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm" id="subtramoid" name="subtramoid" 
                                    value={planoEdicion.subtramoid || ''}
                                    onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Departamento
                                </label>
                                <div className="col-lg-8">
                                    {resListaDepartmento.error
                                    ? "Se produjo un error cargando los departamentos"
                                    : resListaDepartmento.loading
                                    ? "Cargando..."
                                    :
                                    <select className="form-control input-sm" id="departamentoid" name="departamentoid" 
                                    value={planoEdicion.departamentoid || ''}
                                    onChange={(e) => {handleChangeDepartmento(e); handleInputChange(e);}}>
                                        <option value="">--SELECCIONE--</option>
                                        <ComboOptions data={resListaDepartmento.result} valorkey="id_dpto" valornombre="nombre" />
                                    </select>}
                                    {resListaDepartmento.result && (
                                        setProvinciaDistrito(planoEdicion.departamentoid)
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Provincia
                                </label>
                                <div className="col-lg-8">
                                    <select id="provinciaid" name="provinciaid" className="form-control input-sm" 
                                    value={planoEdicion.provinciaid || ''}
                                    onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}>
                                        <option value="">--SELECCIONE--</option>
                                        <ComboOptions data={dataProv} valorkey="id_prov" valornombre="nombre" />
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Distrito
                                </label>
                                <div className="col-lg-8">
                                    <select id="distritoid" name="distritoid" className="form-control input-sm"
                                    value={planoEdicion.distritoid || ''}
                                    onChange={handleInputChange}>
                                        <option value="">--SELECCIONE--</option>
                                        <ComboOptions data={dataDist} valorkey="id_dist" valornombre="nombre" />
                                    </select>
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Referencia Geográfica
                                </label>
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
                                <label className="col-lg-4 control-label">
                                    Plano Dígital
                                </label>
                                <div className="col-lg-6">
                                    <UploadMemo key="planodigitaltmp" file={{urlDocumento:''}}
                                    accept={'.jpg,.png,.gif'} resetContenido={reiniciarValDigital}
                                    setFile={saveArchivoDigital} folderSave={"FotosUsuarios"} eliminar={deleteArchivoDigital}></UploadMemo>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    Memoría Descriptiva
                                </label>
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
                                {listaArchivos ?
                                <SubLista data={listaArchivos} cabecera={cabeceraArchivos} deleterow={removerDeLista}/>
                                :
                                <SubLista data={[]} cabecera={cabeceraArchivos} deleterow={removerDeLista}/>
                                }
                            </div>
                        </fieldset>
                    </div>

                    <div className="panel-body">
                        <div className="form-group">
                            <div className="col-lg-offset-8 col-lg-4">
                                <Link to={`/planos`} className="btn btn-default btn-sm btn-control">Cancelar
                                </Link>
                                <button id="btnguardar" type="submit"
                                        className="btn btn-danger btn-sm btn-control">Actualizar
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </form>
            </WraperLarge>
            </>
        );
    }

    export default PlanoEdit; 
