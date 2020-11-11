import React, {useEffect, useState} from 'react';
import { useAsync } from "react-async-hook";
import {toastr} from 'react-redux-toastr';
import TableSolicitud from "./TableSolicitud";
import SolicitudRow from "./SolicitudRow";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import ComboOptions from "../../components/helpers/ComboOptions";
import {useTable} from "../../hooks/useTable";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {LISTADO_SOLICITUD_BREADCRUM} from "../../config/breadcrums";

const Axios = initAxiosInterceptors();
const {alasql}=window;
const {$} = window;
const queryString = require('query-string');

async function buscarSolicitud(query) {
     const {data} = await Axios.get(`/solicitudentidad?`+ query);
     return data;
 }

const SolicitudList = ({history}) => {
    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaEntidades = useAsync(helperGets.helperGetListEntidades, []);
    const resListaTipoSolic = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOSOLICEXT]);

    const [filtros, set_filtros] = useState({});
    const [busquedaLocal, set_busquedaLocal] = useState(true);
    const [contentMessage, set_contentMessage] = useState('');
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [archivosPopup, setArchivosPopup] = useState([]);

    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();

    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        async function initialLoad() {
            try {
                set_busquedaLocal(false);

                let query =  await  queryString.stringify({busqueda, page: activePage, limit});
                let listSolicitud = await buscarSolicitud(query);
                changePage(activePage,listSolicitud);
            } catch (error) {
                console.log(error);
            }
        }
        initialLoad();
    }, []);

    const handleChangeProyecto = async(e) => {
        // if (e && e.target.value) {
        //     let data = await helperGets.helperGetListTramos(e.target.value);
        //     setDataTramo(data);
        // } else {
        //     setDataTramo(null);
        // }
    }

    function handleInputChange(e) {
        switch(e.target.name){
            default:
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value
                });
        }
        //TODO: remover console
        console.log(filtros);
        
    }

    const limpiarSolicitudesFilter =(e)=>{
        $('#nrooficio').val('');
        $('#gestionpredialid').val('');
        $('#fechainicio').val('');
        $('#fechafin').val('');
        $('#entidadid').val('');
        $('#tipoconsultaid').val('');    
        
        handleChangeProyecto('');
        set_filtros({});
        ejecutarSolicitudesFilter('');
    }

    const cargarPopupDigitales = (codsolicitud, archivos) => {
        setArchivosPopup(archivos);
        setMostrarPopup(true);
    }

 

    const ejecutarEliminar = (id) => {
        Axios.delete(`/solicitudentidad/${id}`)
        .then(() => {
            ejecutarSolicitudesFilter(busqueda);
        })
        .catch(error => {
            toastr.error('Eliminar Solicitud', "Se encontró un error: " +  error);
        });
    }    

    const callbackEliminarSolicitud = (idsolicitud, nrooficio) => {
        try {
            console.log(idsolicitud);
            const toastrConfirmOptions = {
                onOk: () => ejecutarEliminar(idsolicitud),
            };
            toastr.confirm(`¿Desea eliminar el plano: ${nrooficio}?`, toastrConfirmOptions);
        }
        catch (e) {
            toastr.error('Búsqueda de Solicitudes', "Se encontró un error: " +  e.message);
        }
    }

    const buscarSolicitudesFilter=async (e)=>{

        if ((filtros.fechainicio && !filtros.fechafin) || (!filtros.fechainicio && filtros.fechafin)){
            set_contentMessage('El filtro Fecha de Elaboración, debe tener un inicio y fin');
            return;
        } else {
            set_contentMessage('');
        }

        if (filtros.fechainicio && filtros.fechafin){
            let resultFechaInicio = funcGlob.helperValidarFecha(filtros.fechainicio, true);
            let resultFechaFin = funcGlob.helperValidarFecha(filtros.fechafin, true);
            
            if (resultFechaFin < resultFechaInicio) {
                set_contentMessage('La Fecha de Elaboración de inicio no puede ser mayor a la de fin');
                return;
            } else {
                set_filtros({
                    ...filtros,
                    fechainicio: resultFechaInicio,
                    fechafin: resultFechaFin
                });
                $.each(filtros, function(key, value){
                    if (key === "fechainicio"){
                        filtros[key] = resultFechaInicio;
                    }
                    if (key === "fechafin"){
                        filtros[key] = resultFechaFin;
                    }
                });

            }
        }

        let valorFiltros = '';
        if (filtros) {
            $.each(filtros, function(key, value){
                if (value === "" || value === null){
                    delete filtros[key];
                }
            });
            valorFiltros = $.param(filtros);
            console.log('valorFiltros');
            console.log(valorFiltros);
        }
        ejecutarSolicitudesFilter(valorFiltros);
    }

    const ejecutarSolicitudesFilter=async (datosfiltro)=>{
        set_busquedaLocal(true)
        setBusqueda(datosfiltro);
        let query =  await  queryString.stringify({page:1, limit});
        if(datosfiltro) {
            query += `&${datosfiltro}`;
        }
        let listSolicitud = await buscarSolicitud(query);
        changePage(1, listSolicitud);
        set_busquedaLocal(false)
    }

    const handlePageChange = async (pageNumber) => {
        
        let query =  await  queryString.stringify({page:pageNumber, limit});
        if(busqueda) {
            query += `&${busqueda}`;
        }

        let listSolicitud = await buscarSolicitud(query);
        changePage(pageNumber,listSolicitud);
    }
 
    // TODO: Revisar procedimiento de exportación
    const descargarXls=()=>{

        let listexportexcel = list.rows;
        
        //var resultjson = alasql(`SELECT *
        var resultjson = alasql(`SELECT id,entidad,proyecto,tramo,tipoconsulta,codigostd,nrooficio,fechaelaboficio,fecharecepcion,
                                recibiorespuesta,fecharespuesta,nrodocrespuesta,plazo_atencion,estado,accion,observaciones
                                FROM ? `, [listexportexcel])
        var opts = [{
            sheetid: 'Reporte',
            headers: true
        }];
        var res = alasql('SELECT INTO XLSX("ListadoSolicitudes.xlsx",?) FROM ?', [opts, [resultjson]]);
        return false;
    }

    const cabecerasTabla = ["","ID", "ENTIDAD", "PROYECTO", "TIPO DE CONSULTA", "CÓDIGO STD","NRO. OFICIO", "FECHA DE RECEPCIÓN", "ATENDIDO", "FECHA DE ATENCIÓN", "DOCUMENTO ATENCIÓN", "PLAZO ATENCIÓN", "SEG. ESTADO", "SEG. ACCIÖN", "ACCIONES"]
    return (
        <>
        <WraperLarge titleForm={"Listado de Solicitudes"} listbreadcrumb={LISTADO_SOLICITUD_BREADCRUM}>
            <legend className="mleft-20"><i className="fa fa-filter"></i> Filtros de Búsqueda de Solicitudes</legend>
            <div className="form-group">
                <label className="col-lg-2 control-label">Número de Oficio</label>
                <div className="col-lg-4">
                    <input type="text" className="form-control input-sm" id="nrooficio" name="nrooficio" 
                    placeholder="Número de Oficio" onBlur={handleInputChange}/>
                </div>

                <label className="col-lg-2 control-label">Proyecto</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="gestionpredialid" name="gestionpredialid" 
                    onChange={(e) => {handleChangeProyecto(e); handleInputChange(e);}}>
                        <option value="">--SELECCIONE--</option>
                        {resListaProyectos.result
                        ? <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion" />
                        : "Cargando..."}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label className="col-lg-2 control-label">Fecha de Elaboración - Inicio</label>
                <div className="col-lg-4">
                    <input className="form-control input-sm" type="date"
                    id="fechainicio"
                    name="fechainicio"
                    placeholder="Ingrese fecha inicio"
                    onChange={handleInputChange}
                    ></input>
                </div>

                <label className="col-lg-2 control-label">Fecha de Elaboración - Fin</label>
                <div className="col-lg-4">
                    <input className="form-control input-sm" type="date"
                    id="fechafin"
                    name="fechafin"
                    placeholder="Ingrese fecha fin"
                    onChange={handleInputChange}
                    ></input>
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">Entidad</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="entidadid" name="entidadid" 
                    onChange={handleInputChange}>
                        <option value="">--SELECCIONE--</option>
                        {resListaEntidades.result
                        ? <ComboOptions data={resListaEntidades.result} valorkey="id" valornombre="nombre" />
                        : "Cargando..."}
                    </select>
                </div>

                <label className="col-lg-2 control-label">Tipo de Consulta</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="tipoconsultaid" name="tipoconsultaid" 
                    onChange={handleInputChange}>
                        <option value="">--SELECCIONE--</option>
                        {resListaTipoSolic.result
                        ? <ComboOptions data={resListaTipoSolic.result} valorkey="id" valornombre="valortexto" />
                        : "Cargando..."}
                    </select>
                </div>
            </div>


            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-lg-6 text-center">
                    {contentMessage && (
                        <label className="alert alert-danger">{contentMessage}</label>
                    )}  
                    </div>
                    <div className="col-lg-6 text-right">
                    <button type="button" onClick={limpiarSolicitudesFilter} className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                        </button>
                        <button type="button" onClick={buscarSolicitudesFilter} className="btn btn-info  btn-sm  fullborder">
                            <i className="fa fa-search"></i> Aplicar Filtro(s)
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 form-group">
                <div className="row">
                    <div className="col-md-6">
                        <legend className="fullborder">Resultados de Búsqueda de Solicitudes</legend>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" onClick={descargarXls} className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-file-excel-o"></i> Descargar Excel
                        </button>
                        <Link to={`/solicitud-add`} className="btn btn-danger btn-sm fullborder">
                            <i className="fa fa-plus-circle"></i>  Agregar Solicitud
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                {
                (busquedaLocal)?
                    console.log('cargando datos de solicitudes...')
                    :
                    (
                    <>
                    <TableSolicitud cabecera={cabecerasTabla}>
                        {list.rows.map((solicitud, i) => (
                            <SolicitudRow nro={i} solicitud={solicitud} callback={callbackEliminarSolicitud} loadfiles={cargarPopupDigitales}></SolicitudRow>
                        ))}
                    </TableSolicitud>
                    <div className="panel-footer clearfix pull-right">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={limit}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={pageRangeDisplayed}
                            onChange={handlePageChange}
                        ></Pagination>
                    </div>
                    </>
                    )
                }
            </div>
            {/* {mostrarPopup && <MArcDigital closeventana={cerrarModal} codplano={codPlanoPopup} archivosdescargar={archivosPopup}/>} */}
        </WraperLarge>
        </>
    );

}

export default SolicitudList;