import React, {useState, useEffect, useRef} from 'react';
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import {Link} from "react-router-dom";
import FileBase64 from 'react-file-base64';
import {toastr} from 'react-redux-toastr'
import { useAsync } from "react-async-hook";
//import {agregar, setcontinuarAgregar} from '../../actions/trabajador/Actions';
import {agregar} from '../../actions/_ddp_plano/Actions';
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";

import {useDispatch, useSelector} from 'react-redux';
import UploadMemo from "../../components/helpers/uploaders/UploadMemo";
import {serverFile} from "../../config/axios";

const {$} = window;

const PlanoAdd = ({history}) => {
    const [plano, set_plano] = useState({observaciones: 'Nuevo Registro'});
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
        set_plano({observaciones: 'Nuevo Registro'})
    }

    function handleInputChange(e) {
        if (['nroexpediente'].includes(e.target.name)) {
            set_plano({
                ...plano,
                [e.target.name]: e.target.value.toUpperCase()
            });
        }else{
            set_plano({
                ...plano,
                [e.target.name]: e.target.value
            });
        }
        //TODO: remover console
        console.log(plano);
    }

    const saveArchivoDigital = (file) => {
        set_planoArchTmp({
            ...planoArchTmp,
            "digital": file.path
        });
    }

    const saveArchivoMemoria = (file) => {
        set_planoArchTmp({
            ...planoArchTmp,
            "memdescriptiva": file.path
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
            "memdescriptiva": ''
        });
    }

    function setSolicitante(idLocador) {
        set_plano({
            ...plano,
            profesionalid: idLocador
        });
        console.log(plano);
    }



    
    
    
    
    const [trabajador, set_trabajador] = useState({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'});
    const dispatch = useDispatch();
    const agregarPlanoComp = (plano) => dispatch(agregar(plano));

    // const setcontinuarAgregarComp = (estado) => dispatch(setcontinuarAgregar(estado));

    // useEffect(() => {
    //     $('[data-toggle="tooltip"]').tooltip()
    //     setcontinuarAgregarComp(true)
    // }, []);



    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        try {
            await agregarPlanoComp(plano);

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

        return (
            <div>
                {/* <Header/> */}
                <SidebarAdm/>
                <form onSubmit={registrar}>
                    <div className="container mtop-20">
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">
                                <label className={'titleform'}>REGISTRAR PLANO</label>
                            </legend>
                        </fieldset>
                        <div className="form-group mtop-25">
                            <div className="row">
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Datos de Codificación</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Tipo de Plano</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className="form-control" id="tipoplanoid" name="tipoplanoid"
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
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Proyecto</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className="form-control" id="gestionpredialid" name="gestionpredialid" 
                                                required
                                                title="El Proyecto es requerido"
                                                onChange={handleInputChange}
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
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Nro. de Expediente</label>
                                            </div>
                                            <div className="col-md-8">
                                                {/* <input type="text" className="form-control " id="codplano" name="codplano" placeholder="Código del plano" onBlur={definirFiltro}/> */}
                                                <input type="text" className="form-control " id="nroexpediente" name="nroexpediente" 
                                                placeholder="Número de expediente"
                                                required
                                                title="El Número de Expediente es requerido"
                                                autoComplete = "off"
                                                onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Año</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className="form-control" id="periodoid" name="periodoid" 
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
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Proceso</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className="form-control" id="procesoid" name="procesoid"
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
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Datos Generales</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Profesional Solicitante</label>
                                            </div>
                                            <div className="col-md-8" style={{"font-size": "13px"}}>
                                                {resListaSolicitantes.error
                                                ? "Se produjo un error cargando los locadores"
                                                : resListaSolicitantes.loading
                                                ? "Cargando..."
                                                : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} />}
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Estado del Plano</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="estadoid" name="estadoid" className="form-control" onChange={handleInputChange}>
                                                    <option value="0">--SELECCIONE--</option>
                                                    {resListaEstadosPlano.error
                                                    ? "Se produjo un error cargando los estados de plano"
                                                    : resListaEstadosPlano.loading
                                                    ? "Cargando..."
                                                    : <ComboOptions data={resListaEstadosPlano.result} valorkey="valorcodigo" valornombre="valortexto" />}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Plano Antecedente</label>
                                            </div>
                                            <div className="col-md-8">
                                                {/* <input type="text" className="form-control " id="codplano" name="codplano" placeholder="Código del plano" onBlur={definirFiltro}/> */}
                                                <input type="text" className="form-control" id="antecedente" name="antecedente" readOnly onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Fecha de Creación</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input style={{lineHeight: '1.43'}} type="date" id="fechacreacion" name="fechacreacion" className="form-control" onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Observaciones</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" id="observaciones" name="observaciones" onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Ubicación</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Tramo</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="tramo" name="tramo" className="form-control" onChange={handleInputChange}>
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Subtramo</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" id="subtramo" name="subtramo" onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Departamento</label>
                                            </div>
                                            <div className="col-md-8">
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
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Provincia</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="provinciaid" name="provinciaid" className="form-control" onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}>
                                                    <option value="0">--SELECCIONE--</option>
                                                    <ComboOptions data={dataProv} valorkey="id_prov" valornombre="nombre" />
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Distrito</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="distritoid" name="distritoid" className="form-control" onChange={handleInputChange}>
                                                    <option value="0">--SELECCIONE--</option>
                                                    <ComboOptions data={dataDist} valorkey="id_dist" valornombre="nombre" />
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Referencia Geográfica</label>
                                            </div>
                                            <div className="col-md-8">
                                                <UploadMemo key="refgeografica" file={{urlDocumento:''}}
                                                    accept={'.jpg,.png,.gif'}
                                                    setFile={saveArchivoDigital} folderSave={"FotosUsuarios"} eliminar={deleteArchivoDigital}></UploadMemo>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Archivos</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Plano Dígital</label>
                                            </div>
                                            <div className="col-md-8">
                                                <UploadMemo key="planodigitaltmp" file={{urlDocumento:''}}
                                                    accept={'.jpg,.png,.gif'}
                                                    setFile={saveArchivoDigital} folderSave={"FotosUsuarios"} eliminar={deleteArchivoDigital}></UploadMemo>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Memoría Descriptiva</label>
                                            </div>
                                            <div className="col-md-8">
                                                <UploadMemo key="memdescriptivatmp" file={{urlDocumento:''}}
                                                    accept={'.jpg,.png,.gif'}
                                                    setFile={saveArchivoMemoria} folderSave={"FotosUsuarios"} eliminar={deleteArchivoMemoria}></UploadMemo>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        
                        </div>
                        <hr></hr>
                        <div className="panel-body">
                            <div className="form-group ">
                                <div className="col-lg-offset-2 col-lg-10">
                                    <button id="btnguardar" type="submit"
                                            className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <Link to={`/planos`}
                                            className="btn btn-default btn-sm btn-control">Cancelar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <FooterProcess/>
            </div>
        );

    }

    export default PlanoAdd; 
