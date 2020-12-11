import React, {useEffect, useState} from "react";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { LISTADO_REQOS_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import { Table } from "../../components/forms";
import { initAxiosInterceptors } from "../../config/axios";
import { toastr } from "react-redux-toastr";
import { useTable } from "../../hooks/useTable";
import { Loading } from "../../components/forms";
import { OrdenServicioRow } from "./OrdenServicioRow";
import Pagination from "react-js-pagination";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import Autocomplete from '../../components/helpers/Autocomplete';
import MViewEntregables from './MViewEntregables';
import MGenReqDocumento from './MGenReqDocumento';

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;
const queryString = require("query-string");

async function buscarOrdenServicio(query) {
    const { data } = await Axios.get(`/ordenservicio?` + query);
    return data;
  }

async function buscarProductoOrdenServicio(idos) {
const { data } = await Axios.get(`/producto/${idos}`);
return data;
}

const OrdenServicioList = () => {
    const listaUsuarios = useAsync(helperGets.helperGetListaLocadores, []);
    const listaTipoPlantilla = useAsync(helperGets.helperGetListPrintTempPorTipo, [PARAMS.listaplantillas.generaciontdr]);
    const [filtros, setFiltros] = useState({});
    const [contentMessage, set_contentMessage] = useState("");
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();
    const [busqueda, setBusqueda] = useState("");
    const [cargandoGrid, setCargandoGrid] = useState(true);
    const [reiniciarUsuario, setReiniciarUsuario] = useState(false);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mostrarPopupDocumento, setMostrarPopupDocumento] = useState(false);
    const [productosOs, setProductosOs] = useState('');
    const [idOs, setIdOs] = useState('');
    const [idOsDocumento, setIdOsDocumento] = useState('');

    useEffect(() => {
        async function initialLoad() {
          try {
    
            let query =  await  queryString.stringify({busqueda, page: activePage, limit});       
            let listordenes = await buscarOrdenServicio(query);
            changePage(activePage, listordenes);
            setCargandoGrid(false);
          } catch (e) {
              toastr.error('Listado de Ordenes de Servicio', `Se ha encontrado un error: ${e.message}`, {position: 'top-right'})
          }
        }
        initialLoad();
      }, []);

    function setMonitor(idLocador, nameLocador) {
        setReiniciarUsuario(false);
        setFiltros({
            ...filtros,
            monitorid: idLocador
        });
    }

    const limpiarOrdenFilter =(e)=>{
        $('#nrorequerimiento').val('');
        $('#nroordenservicio').val('');
        setReiniciarUsuario(true);
        setFiltros({});
        ejecutarOrdenFilter('');
    }

    const buscarOrdenFilter =async (e)=>{
        let valorFiltros = '';
        if (filtros) {
            $.each(filtros, function(key, value){
                if (value === "" || value === null){
                    delete filtros[key];
                }
            });
            valorFiltros = $.param(filtros);
        }
        ejecutarOrdenFilter(valorFiltros);
    }
    
    const ejecutarOrdenFilter=async (datosfiltro)=>{
        setBusqueda(datosfiltro);
        setCargandoGrid(true);
        let query =  await  queryString.stringify({page:1, limit});
        if(datosfiltro) {
            query += `&${datosfiltro}`;
        }
        let listOrdenes= await buscarOrdenServicio(query);
        changePage(1, listOrdenes);
        setCargandoGrid(false);
    }

    function handleInputChange(e) {
        switch(e.target.name){
            default:
                setFiltros({
                    ...filtros,
                    [e.target.name]: e.target.value
                });
        }
    }

    const handlePageChange = async (pageNumber) => {
        let query =  await  queryString.stringify({page:pageNumber, limit});
        if(busqueda) {
            query += `&${busqueda}`;
        }

        let listOrdenes = await buscarOrdenServicio(query);
        changePage(pageNumber,listOrdenes);
    }

    const cargarPopupEntregables = async (idos) => {
        if(idos) {
            try {        
                var listaProductos = await buscarProductoOrdenServicio(idos);
                
              } catch (e) {
                  toastr.error('Productos/Entregables de Orden de Servicio', `Se ha encontrado un error: ${e.message}`, {position: 'top-right'})
                  return;
              }

              if(listaProductos) {
                setIdOs(idos);
                setProductosOs(listaProductos);
                setMostrarPopup(true);
              }
        }
    }

    const cargarPopupDocumentos = (idos) => {
        if(idos) {
            setIdOsDocumento(idos);
            setMostrarPopupDocumento(true);
        }
    }

    const cerrarModal=(estado)=>{
        setMostrarPopup(estado);
        setProductosOs(null);
    }

    const cerrarModalDocumento=(estado)=>{
        setMostrarPopupDocumento(estado);
    }

    const descargarXls = async() =>{
        let numfilas = list.count;

        if (!numfilas || numfilas === "0") {
            toastr.warning('Listado de Ordenes de Servicio', "No se encontrarón registros", {position: 'top-center'});
            return;
        }

        let query =  await  queryString.stringify({page:1, numfilas});
        if(busqueda) {
            query += `&${busqueda}`;
        }
        let listaOrdenes = await buscarOrdenServicio(query);

        let listexportexcel = listaOrdenes.rows;
        
        var resultjson = alasql(`SELECT id, monitor, area, objetivo, duracionservicio, montosueldo, profesionalinvitado,
                                dniinvitado, fecharespuesta, nrorequerimiento, entregables
                                FROM ? ORDER BY id DESC`, [listexportexcel])

        var opts = [{
            sheetid: 'Reporte',
            headers: true
        }];
        var res = alasql('SELECT INTO XLSX("ListadoOrdenes.xlsx",?) FROM ?', [opts, [resultjson]]);
        return false;
    }

    const cabecerasTabla = [
    "",
    "ID",
    "Nº REQ.",
    "ÁREA",
    "COORDINADOR/MONITOR",
    "MONTO TOTAL",
    "DURACIÓN (DÍAS)",
    "ENTREGABLES",
    "ACCIONES"
    ];
  return (
    <>
    <WraperLarge titleForm={"Listado de Ordenes de Servicios"} listbreadcrumb={LISTADO_REQOS_BREADCRUM}>
        <form className={"form-horizontal"}>
            <legend className="mleft-20">
                <i className="fa fa-filter"></i> Filtros de Búsqueda de Ordenes de Servicio
            </legend>
            <div className="form-group">
                <div className="row mb-3">
                    <label className="col-lg-2 control-label">Nro. Requerimiento</label>
                    <div className="col-lg-4">
                        <input type="text" className="form-control input-sm" id="nrorequerimiento"
                        name="nrorequerimiento" placeholder="Ingrese el Nro. de Requerimiento" onBlur={handleInputChange} />
                    </div>
                    <label className="col-lg-2 control-label">Nro. Orden de Servicio</label>
                    <div className="col-lg-4">
                        <input type="text" className="form-control input-sm" id="nroordenservicio"
                        name="nroordenservicio" placeholder="Ingrese el Nro. de O/S" onBlur={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row mb-3">
                    <label className="col-lg-2 control-label">Coordinador / Monitor</label>
                    <div className="col-lg-4">
                        {listaUsuarios.result
                        ? <Autocomplete listaDatos={listaUsuarios.result} callabck={setMonitor} resetContenido={reiniciarUsuario} />
                        : "Cargando..."
                        }
                    </div>
                    <label className="col-lg-2 control-label">DNI de Profesional Invitado</label>
                    <div className="col-lg-4">
                        <input type="text" className="form-control input-sm" id="dniinvitado"
                        name="dniinvitado" placeholder="Ingrese el DNI del Profesional" onBlur={handleInputChange} />
                    </div>
                    
                </div>
            </div>
        </form>

        <div className="form-group">
                <div className="row mb-3">
                    <div className="col-lg-6 text-center">
                    {contentMessage && (
                        <label className="alert alert-danger">{contentMessage}</label>
                    )}
                    </div>
                    <div className="col-lg-6 text-right">
                    <button type="button" onClick={limpiarOrdenFilter}
                        className="btn btn-default btn-sm fullborder">
                        <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                    </button>
                    <button type="button" onClick={buscarOrdenFilter}
                        className="btn btn-info  btn-sm  fullborder">
                        <i className="fa fa-search"></i> Aplicar Filtro(s)
                    </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 form-group">
                <div className="row">
                    <div className="col-md-6">
                    <legend className="fullborder">
                        Resultados de Búsqueda de Ordenes de Servicio
                    </legend>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" 
                        onClick={descargarXls} 
                        className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-file-excel-o"></i> Descargar Excel
                        </button>
                        <Link to={`/orden-add`} className="btn btn-danger btn-sm fullborder" >
                            <i className="fa fa-plus-circle"></i> Agregar O/S - REQ
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
            {
            (cargandoGrid)?
                <Loading></Loading>
                :
                (
                <>
                <Table cabecera={cabecerasTabla}>
                    {list.rows.map((ordenservicio, i) => (
                        <OrdenServicioRow nro={i} ordenservicio={ordenservicio} loadentregables={cargarPopupEntregables} 
                        loadprintdocs={cargarPopupDocumentos} />
                    ))}        
                </Table>
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
            {mostrarPopup && <MViewEntregables closeventana={cerrarModal} listaproductos={productosOs} idos={idOs} />}
            {mostrarPopupDocumento && <MGenReqDocumento closeventana={cerrarModalDocumento} idos={idOsDocumento} 
            listaplantillas={listaTipoPlantilla.result} />}
      </WraperLarge>
    </>
  );
};

export default OrdenServicioList;