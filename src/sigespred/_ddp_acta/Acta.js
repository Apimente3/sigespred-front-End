import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {LISTADO_ACTA_BREADCRUM} from "../../config/breadcrums";
import RowActa from "./RowActa";
import ComboOptions from "../../components/helpers/ComboOptions";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import TableActa from "./TableActa";
import MAgenda from "./MAgenda";
import Pagination from "react-js-pagination";
import { toastr } from "react-redux-toastr";

const queryString = require('query-string');

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;


const obtenerEquipo = async () => {
    const {data:equipo } = await Axios.get(`/equipolista`);
    return {equipo};
  };

const Acta = () => {

  async function buscarActa(query) {
     const {data} = await Axios.get(`/acta?`+ query);
     return data;
 }

 const [busqueda, setBusqueda] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [activePage, setactivePage] = useState(1);
  const [actas, setActas] = useState({"count":5,"rows":[]});
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [codPlanoPopup, setCodPlanoPopup] = useState('');
  const [archivosPopup, setArchivosPopup] = useState([]);
  const [filtros, set_filtros] = useState({});
  const [busquedaLocal, set_busquedaLocal] = useState(true);
  const [contentMessage, set_contentMessage] = useState('');

  const resListaEquipos = useAsync(obtenerEquipo, []);

  useEffect(() => {
      async function init() {
          try {
              let query =  await  queryString.stringify({busqueda,page, limit});
              let actas = await buscarActa(query)
              setActas({rows:actas})
              settotalItemsCount(actas.length)
          } catch (e) {
            toastr.error('Actas', e.message, {position: 'top-center'})
          }
      }
      init();
  }, []);

  const descarxls = () => {

    let listexportexcel = actas.rows;
    var resultgeojson = alasql(`SELECT *
             FROM ? `, [listexportexcel])
    var opts = [{
        sheetid: 'Reporte',
        headers: true
    }];
    var res = alasql('SELECT INTO XLSX("ListadoActas.xlsx",?) FROM ?', [opts, [resultgeojson]]);
    return false;
  }

  const handlePageChange = async (pageNumber) => {
    await setPage(pageNumber)
    setactivePage(pageNumber)
    setPage(pageNumber)

    let query =  await  queryString.stringify({ busqueda, page:pageNumber, limit});
    let actas= await buscarActa(query)
    setActas({rows:actas})

    }
    const cerrarModal=(estado)=>{
        setMostrarPopup(estado);
    }
    

    const cargarPopupDigitales = (codacta, archivos) => {
        setCodPlanoPopup(codacta);
        setArchivosPopup(archivos);
        setMostrarPopup(true);
    }

    const limpiarActaFilter =(e)=>{
        $('#codigoacta').val('');
        $('#equipoid').val('');
        $('#fechainicio').val('');
        $('#fechafin').val('');
        
        set_filtros({});
        ejecutarPlanosFilter('');
    }

    const ejecutarPlanosFilter=async (datosfiltro)=>{
        set_busquedaLocal(true)
        setBusqueda(datosfiltro);
        await setPage(1)
        setactivePage(1)
        let query =  await  queryString.stringify({page:1, limit});
        if(datosfiltro) {
            query += `&${datosfiltro}`;
        }
        let listActas = await buscarActa(query);
        setActas({rows:listActas})
        settotalItemsCount(listActas.length)
        set_busquedaLocal(false)
    }

    const buscarActaFilter=async (e)=>{

        if ((filtros.fechainicio && !filtros.fechafin) || (!filtros.fechainicio && filtros.fechafin)){
            set_contentMessage('El filtro Fecha de Creación, debe tener un inicio y fin');
            return;
        } else {
            set_contentMessage('');
        }

        if (filtros.fechainicio && filtros.fechafin){
            let resultFechaInicio = funcGlob.helperValidarFecha(filtros.fechainicio, true);
            let resultFechaFin = funcGlob.helperValidarFecha(filtros.fechafin, true);
            
            if (resultFechaFin < resultFechaInicio) {
                set_contentMessage('La Fecha de Creación de inicio no puede ser mayor a la de fin');
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
        }
        ejecutarPlanosFilter(valorFiltros);
    }

    function handleInputChange(e) {
        switch(e.target.name){
            case 'codigoacta':
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value.toUpperCase()
                });
                break;
            case 'equipoid':
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value,
                    tramoid: ''
                });
                break;
            default:
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value
                });
        }
        
    }

  const cabecerasTabla = ["NRO","CÓDIGO ACTA", "EQUIPO", "MONITOR", "PROYECTO", "FECHA", "DURACIÓN","ESTADO","AGENDA", "ACCIONES"]
 
  return (
    <>
          <WraperLarge titleForm={"Listado de Actas"} listbreadcrumb={LISTADO_ACTA_BREADCRUM}>
            <fieldset className={'fielsettext'}>
                <form >
                
                <div className="form-group">
                    <label className="col-lg-2 control-label">
                        Fecha de Inicio</label>
                    <div className="col-lg-2">
                    <input
                        style={{ lineHeight: "1.43" }}
                        type="date"
                        id="fechainicio"
                        name="fechainicio"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                    </div>
                    <label className="col-lg-2 control-label">
                        Fecha de Fin</label>
                    <div className="col-lg-2">
                    <input
                        style={{ lineHeight: "1.43" }}
                        type="date"
                        id="fechafin"
                        name="fechafin"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-lg-2 control-label">
                        Equipo</label>
                    <div className="col-lg-2">
                    <select
                      className="form-control input-sm-3"
                      id="equipoid"
                      name="equipoid"
                      onChange={handleInputChange}
                    >
                      <option value="">--SELECCIONE--</option>
                      {resListaEquipos.error ? (
                        "Se produjo un error cargando los equipos"
                      ) : resListaEquipos.loading ? (
                        "Cargando..."
                      ) : (
                        <ComboOptions
                          data={resListaEquipos.result}
                          valorkey="id"
                          valornombre="equipo"
                        />
                      )}
                    </select>
                    
                    
                    </div>
                    <label className="col-lg-2 control-label">
                        Código Acta</label>
                    <div className="col-lg-2">
                    <input mayuscula="true" required
                        className="form-control input-sm " type="text"
                        id="codigoacta"
                        name="codigoacta"
                        placeholder="Ingrese el código"
                        onChange={handleInputChange}
                        >
                    </input>
                    </div>
                </div>
                    
                    <div className="form-group">
                        <div className="row mb-3">
                            <div className="col-lg-6 text-center">
                            {contentMessage && (
                                <label className="alert alert-danger">{contentMessage}</label>
                            )}  
                            </div>
                            <div className="col-lg-8">
                                <button type="button" onClick={buscarActaFilter} className="btn btn-info pull-right btn-sm fullborder">
                                    <i className="fa fa-search"></i> Aplicar Filtro(s)
                                </button>
                                <button type="button" onClick={limpiarActaFilter} className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                                </button>
                            </div>
                            <div className="col-lg-4">
                                <Link to={`/acuerdo-list`} className="btn btn-info pull-right btn-sm fullborder">
                                    <i className="fa fa-group"></i> Acuerdos</Link>
                                <Link to={`/acta-add`} className="btn btn-danger pull-right btn-sm fullborder">
                                    <i className="fa fa-plus"></i> Agregar Acta</Link>
                                <button type="button" onClick={descarxls}
                                        className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        
                    </div>
                </form>
            </fieldset>
            <div className="panel panel-default">
                <TableActa cabecera={cabecerasTabla}>
                   {actas.rows.map((acta, i) => (
                        <RowActa nro={i} acta={acta} loadfiles={cargarPopupDigitales}></RowActa>
                    ))}
                </TableActa>
                <div className="panel-footer clearfix pull-right">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={limit}
                        totalItemsCount={parseInt(totalItemsCount)}
                        pageRangeDisplayed={3}
                        onChange={handlePageChange}
                    ></Pagination>
                </div>
            </div>
            {mostrarPopup && <MAgenda closeventana={cerrarModal} codacta={codPlanoPopup} agenda={archivosPopup}/>}
          </WraperLarge>  
    </>
);
};
export default Acta;
