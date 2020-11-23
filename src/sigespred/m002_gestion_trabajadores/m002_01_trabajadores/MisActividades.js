import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import { FormGroup, Input, Row12, Row6 } from "../../../components/forms";
import { initAxiosInterceptors } from "../../../config/axios";
import TableAcuerdo from "../../_ddp_acta/TableAcuerdo";
//import * as funcGlob from "../../../Ccomponents/helpers/FuncionesGlobales";
import * as funcGlob from "../../../components/helpers/FuncionesGlobales";
import * as helperGets from "../../../components/helpers/LoadMaestros";
import * as PARAMS from "../../../config/parameters";
import RowAcuerdo from "../../_ddp_acta/RowAcuerdo";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import ComboOptions from "../../../components/helpers/ComboOptions";
import { useAsync } from "react-async-hook";
const queryString = require('query-string');


const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

export const MisActividades = () => {
  //const [usuario, setusuario, handleInputChange, reset] = useForm({contraseniaAnterior:"",contraseniaNueva1:"",contraseniaNueva2:""}, ['resoministerial', 'abreviatura']);
  //const [actividades, setActividades, handleInputChange, reset] = useForm({},[]);
  const [acuerdos, setAcuerdos] = useState({"count":5,"rows":[]});
  const [filtros, set_filtros] = useState({});
  const [contentMessage, set_contentMessage] = useState('');
  const [busquedaLocal, set_busquedaLocal] = useState(true);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [busqueda, setBusqueda] = useState('');
  const [page, setPage] = useState(1);
  const [activePage, setactivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const listaEstadoActividad = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOACTAACUERDO]);
  
  async function buscarMisActividades(query) {
    const {data} = await Axios.get(`/actaproceso/misactividades?`+ query);
    console.log('---------------')
    console.log(data)
    return data;
}
const cargarPopupParticipantes = (codacta, participantes) => {
    // const ar_participantes = [];
    // ar_participantes.push(participantes)
    // actividades.ActaParticipante=ar_participantes;
    // setCodPlanoPopup(codacta);
    // setParticipantesPopup(actividades.ActaParticipante);
    // setMostrarPartPopup(true);
}

useEffect(() => {
    async function init() {
        
        try {
            set_busquedaLocal(false);
            let query =  await  queryString.stringify({busqueda,page, limit});
            let acuerdo = await buscarMisActividades(query);
            setAcuerdos(acuerdo)
            settotalItemsCount(acuerdo.count)
        }catch (e) {
                toastr.error('Mis Actividades', e.message, {position: 'top-center'})
        }
    }
    init();
    
}, [])

const limpiarAcuerdoFilter =(e)=>{
    $('#fechainicio').val('');
    $('#fechafin').val('');
    
    $('#estadocomp').val('');
    
    set_filtros({});
    ejecutarPlanosFilter('');
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


const ejecutarPlanosFilter=async (datosfiltro)=>{
    console.log('------FMR------')
    console.log(datosfiltro)
    set_busquedaLocal(true)
    setBusqueda(datosfiltro);
    await setPage(1)
    setactivePage(1)
    let query =  await  queryString.stringify({page:1, limit});
    if(datosfiltro) {
        query += `&${datosfiltro}`;
    }
    let listaAcuerdo = await buscarMisActividades(query)
    setAcuerdos(listaAcuerdo)
    settotalItemsCount(listaAcuerdo.count)
    set_busquedaLocal(false)
    
}

const buscarAcuerdoFilter = async (e) => {

    e.preventDefault();
    console.log('FECHA INICIO: ' + filtros.fechainicio)
    console.log('FECHA FIN: ' + filtros.fechafin)
    
    
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
    let acuerdo= await buscarMisActividades(query)
    setAcuerdos(acuerdo)
}

const cabecerasTabla = ["NRO","CÓDIGO ACTA", "PROYECTO","EQUIPO","ACTIVIDAD", "PRODUCTO","DESCRIPCION","ASISTENCIA", "FECHA INCIO", "FECHA COMPROMISO","ALERTA","ESTADO"]

  return (
    <div>
        <Row12 title={"Filtro de Busqueda"}>

        
        <fieldset className={'fielsettext'}>
            <form>
                <div className="form-group">
                    <label className="col-lg-2 control-label">
                        Fecha de Inicio</label>
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
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
                        Estado
                    </label>
                    <div className="col-lg-4">
                        <select className="form-control input-sm" id="estadocomp" name="estadocomp"
                        // value={participantePopup.estadocomp || ""}
                        onChange={handleInputChange}
                        >
                            <option value="">--SELECCIONE--</option>
                            {listaEstadoActividad.result &&
                                <ComboOptions data={listaEstadoActividad.result} valorkey="valorcodigo" valornombre="valortexto"/>
                            }
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
                            <div className="col-lg-6">
                                <button type="button" onClick={buscarAcuerdoFilter} className="btn btn-info pull-right  btn-sm  fullborder">
                                    <i className="fa fa-search"></i> Aplicar Filtro(s)
                                </button>
                                <button type="button" onClick={limpiarAcuerdoFilter} className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                                </button>
                            </div>
                            {/* <div className="col-lg-4">
                                <button type="button" onClick={descarxls}
                                        className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
                            </div> */}
                        </div>
                    </div>
            </form>
        </fieldset>
        </Row12>
        <Row12 title={"Mis Actividades"}>
            <div className="panel panel-default">
                {
                    (busquedaLocal)? 
                    <div className="alert alert-info text-center">Cargando...</div>
                    :
                    (
                        <>
                        <TableAcuerdo cabecera={cabecerasTabla}>
                        {acuerdos.rows.map((acuerdo, i) => (
                            <RowAcuerdo nro={i} acuerdo={acuerdo} loadParticipantes={cargarPopupParticipantes} showaction={true}  ></RowAcuerdo>
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
        </Row12>

    </div>
  );
};
