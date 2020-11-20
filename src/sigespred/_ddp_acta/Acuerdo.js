import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {LISTADO_ACUERDO_BREADCRUM} from "../../config/breadcrums";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import ComboOptions from "../../components/helpers/ComboOptions";
import RowAcuerdo from "./RowAcuerdo";
import TableAcuerdo from "./TableAcuerdo";
import Pagination from "react-js-pagination";
import MParticipante from "./MParticipante";
import { toastr } from "react-redux-toastr";
const queryString = require('query-string');

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

async function updateEstado(participante) {
    const {data} = await Axios.put(`/actaparticipante/${participante.id}`,participante);
    return data;
}

const obtenerEquipo = async () => {
    const {data:equipo } = await Axios.get(`/equipolista`);
    return {equipo};
  };

const Acuerdo = () => {

  async function buscarAcuerdo(query) {
     const {data} = await Axios.get(`/actaproceso?`+ query);
     return data;
 }

  const [busqueda, setBusqueda] = useState('');
  const [filtros, set_filtros] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [activePage, setactivePage] = useState(1);
  const [acuerdos, setAcuerdos] = useState({"count":5,"rows":[]});

  const [mostrarPartPopup, setMostrarPartPopup] = useState(false);
  const [codPlanoPopup, setCodPlanoPopup] = useState('');
  const [participantesPopup, setParticipantesPopup] = useState([]);

  const [actividades, set_actividades] = useState({ActaParticipante:[]});

  const [busquedaLocal, set_busquedaLocal] = useState(true);
  const [contentMessage, set_contentMessage] = useState('');

  const resListaEquipos = useAsync(obtenerEquipo, []);
  const listaEstadoActividad = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOACTAACUERDO]);

  useEffect(() => {
      async function init() {
          try {
              set_busquedaLocal(false);

              let query =  await  queryString.stringify({busqueda,page, limit});
              let acuerdo = await buscarAcuerdo(query)
              setAcuerdos(acuerdo)
              settotalItemsCount(acuerdo.count)
          } catch (e) {
                toastr.error('Acuerdos', e.message, {position: 'top-center'})
          }
      }
      init();
  }, []);
  

  const ejecutarPlanosFilter=async (datosfiltro)=>{
    set_busquedaLocal(true)
    setBusqueda(datosfiltro);
    await setPage(1)
    setactivePage(1)
    let query =  await  queryString.stringify({page:1, limit});
    if(datosfiltro) {
        query += `&${datosfiltro}`;
    }
    let listaAcuerdo = await buscarAcuerdo(query)
    setAcuerdos(listaAcuerdo)
    settotalItemsCount(listaAcuerdo.count)
    set_busquedaLocal(false)
}

const limpiarAcuerdoFilter =(e)=>{
    $('#codigoacta').val('');
    $('#equipoid').val('');
    $('#fechainicio').val('');
    $('#fechafin').val('');
    $('#profesional').val('');
    $('#alerta').val('');
    
    set_filtros({});
    ejecutarPlanosFilter('');
}

  const buscarAcuerdoFilter = async (e) => {

    e.preventDefault();
    
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
        console.log('valorFiltros');
        console.log(valorFiltros);
    }
    ejecutarPlanosFilter(valorFiltros);

  }

  const descarxls = () => {

    let listexportexcel = acuerdos.rows;
    var resultgeojson = alasql(`SELECT *
             FROM ? `, [listexportexcel])
    var opts = [{
        sheetid: 'Reporte',
        headers: true
    }];
    var res = alasql('SELECT INTO XLSX("ListadoAcuerdos.xlsx",?) FROM ?', [opts, [resultgeojson]]);
    return false;
  }

  const handlePageChange = async (pageNumber) => {
    await setPage(pageNumber)
    setactivePage(pageNumber)
    setPage(pageNumber)
    console.log(`active page is ${pageNumber}`);
    let query =  await  queryString.stringify({ busqueda, page:pageNumber, limit});
    let acuerdo= await buscarAcuerdo(query)
    setAcuerdos(acuerdo)
}

    const cerrarPartModal=async (estado)=>{
        setMostrarPartPopup(estado);
        let query =  await  queryString.stringify({busqueda,page, limit});
        let acuerdo = await buscarAcuerdo(query)
        setAcuerdos(acuerdo)
    }

    const cargarPopupParticipantes = (codacta, participantes) => {
        const ar_participantes = [];
        ar_participantes.push(participantes)
        actividades.ActaParticipante=ar_participantes;
        setCodPlanoPopup(codacta);
        setParticipantesPopup(actividades.ActaParticipante);
        setMostrarPartPopup(true);
    }

    const handleUpdateClick = async (e, actividad) => {
        e.preventDefault();
        try {
            await updateEstado(actividad);
            toastr.success('Estado de compromiso', 'Se registro correctamente.');
            cerrarPartModal();
        }
        catch (e) {
            alert(e.message)
        }
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
                    [e.target.name]: e.target.value
                });
                break;
            case 'profesional':
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value.toUpperCase()
                });
                break;
            case 'alerta':
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value
                });
                break;
            default:
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value
                });
        }
        //TODO: remover console
        console.log(filtros);
        
    }

  const cabecerasTabla = ["NRO","CÓDIGO ACTA", "PROYECTO","EQUIPO","PROFESIONAL","ACTIVIDAD", "PRODUCTO","DESCRIPCION","ASISTENCIA", "FECHA INCIO", "FECHA COMPROMISO","ALERTA","ESTADO","REVISIÓN"]
 
  return (
    <>
          <WraperLarge titleForm={"Listado de acuerdos"} listbreadcrumb={LISTADO_ACUERDO_BREADCRUM}>
            <fieldset className={'fielsettext'}>
                <form>
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
                    <input mayuscula="true"
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
                    <label className="col-lg-2 control-label">
                        Profesiona</label>
                    <div className="col-lg-2">
                    <input mayuscula="true"
                        className="form-control input-sm " type="text"
                        id="profesional"
                        name="profesional"
                        placeholder="Ingrese el profesional"
                        onChange={handleInputChange}
                        >
                    </input>
                    </div>
                    <label className="col-lg-2 control-label">
                        Tipo de Alerta</label>
                    <div className="col-lg-2">
                    <input type="text" list="data" 
                    className="form-control"
                    id="alerta" 
                    name="alerta" 
                    placeholder="Ingrese la alerta"
                    onChange={handleInputChange}
                    />
                    <datalist id="data">
                        {acuerdos.rows.map((item, key) =>
                        <option key={key} value={item.alerta} />
                        )}
                    </datalist>
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
                                <button type="button" onClick={buscarAcuerdoFilter} className="btn btn-info pull-right  btn-sm  fullborder">
                                    <i className="fa fa-search"></i> Aplicar Filtro(s)
                                </button>
                                <button type="button" onClick={limpiarAcuerdoFilter} className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                                </button>
                            </div>
                            <div className="col-lg-4">
                                <Link to={`/acta-add`} className="btn btn-danger pull-right btn-sm fullborder">
                                    <i className="fa fa-plus"></i> Agregar Acta</Link>
                                <button type="button" onClick={descarxls}
                                        className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </fieldset>
            <div className="panel panel-default">
                {
                    (busquedaLocal)?
                        console.log('cargando datos acuerdos...')
                        :
                        (
                        <>
                        <TableAcuerdo cabecera={cabecerasTabla}>
                        {acuerdos.rows.map((acuerdo, i) => (
                                <RowAcuerdo nro={i} acuerdo={acuerdo} loadParticipantes={cargarPopupParticipantes}></RowAcuerdo>
                            ))}
                        </TableAcuerdo>
                        <div className="panel-footer clearfix pull-right">
                            <Pagination
                                activePage={activePage}
                                itemsCountPerPage={limit}
                                totalItemsCount={parseInt(totalItemsCount)}
                                pageRangeDisplayed={3}
                                onChange={handlePageChange}
                            ></Pagination>
                        </div>
                        </>
                        )
                    }
                
            </div>
            {mostrarPartPopup && <MParticipante closeventana={cerrarPartModal} codacta={codPlanoPopup} participante={participantesPopup} 
                                handleUpdateClick={handleUpdateClick} listadovalores={listaEstadoActividad} />}
          </WraperLarge>  
    </>
);
};
export default Acuerdo;
