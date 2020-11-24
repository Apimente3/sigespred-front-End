import React, { useEffect, useState } from "react";
import { useTable } from "../../hooks/useTable";
import { useAsync } from "react-async-hook";
import { LISTADO_PREDIOS_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import * as helperGets from "../../components/helpers/LoadMaestros";
import ComboOptions from "../../components/helpers/ComboOptions";
import { initAxiosInterceptors } from "../../config/axios";
import { Link } from "react-router-dom";
import { Table } from "../../components/forms";
import { toastr } from "react-redux-toastr";
import { PredioRow } from "./PredioRow";
import Pagination from "react-js-pagination";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;
const queryString = require("query-string");

async function buscarPredios(query) {
  const { data } = await Axios.get(`/predio?` + query);
  return data;
}

const PredioList = ({history,  match}) => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const [filtros, setFiltros] = useState({});
  const [contentMessage, set_contentMessage] = useState("");
  const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();
  const [busqueda, setBusqueda] = useState("");
  const [cargandoGrid, setCargandoGrid] = useState(true);

  useEffect(() => {
    async function initialLoad() {
      try {
        let query = queryString.stringify({
          busqueda,
          page: activePage,
          limit,
        });
        let listPredios = await buscarPredios(query);
        changePage(activePage, listPredios);
        setCargandoGrid(false);
      } catch (e) {
          toastr.error('Listado de Predios', `Se ha encontrado un error: ${e.message}`, {position: 'top-right'})
      }
    }
    initialLoad();
  }, []);

const handlePageChange = async (pageNumber) => {
    let query = await queryString.stringify({ page: pageNumber, limit });
    if (busqueda) {
      query += `&${busqueda}`;
    }

    let listPredios = await buscarPredios(query);
    changePage(pageNumber, listPredios);
};

const limpiarPrediosFilter =(e)=>{
    $('#gestionpredialid').val('');
    $('#codigopredio').val('');
    setFiltros({});
    ejecutarPrediosFilter('');
}

const buscarPrediosFilter =async (e)=>{
    let valorFiltros = '';
    if (filtros) {
        $.each(filtros, function(key, value){
            if (value === "" || value === null){
                delete filtros[key];
            }
        });
        valorFiltros = $.param(filtros);
    }
    ejecutarPrediosFilter(valorFiltros);
}

const ejecutarPrediosFilter=async (datosfiltro)=>{
    setBusqueda(datosfiltro);
    setCargandoGrid(true);
    let query =  await  queryString.stringify({page:1, limit});
    if(datosfiltro) {
        query += `&${datosfiltro}`;
    }
    let listPredios= await buscarPredios(query);
    changePage(1, listPredios);
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

const descargarXls=()=>{

    let listexportexcel = list.rows;
    
    var resultjson = alasql(`SELECT id, codigopredio, gestionpredial, tramo, tipopredio, fechacreacion 
                            FROM ? `, [listexportexcel])
    var opts = [{
        sheetid: 'Reporte',
        headers: true
    }];
    var res = alasql('SELECT INTO XLSX("ListadoPredios.xlsx",?) FROM ?', [opts, [resultjson]]);
    return false;
}

  const cabecerasTabla = [
    "",
    "ID",
    "CÓDIGO",
    "PROYECTO",
    "TRAMO",
    "TIPO DE PREDIO",
    "FECHA DE CREACIÓN",
    "ACCIONES",
  ];
  return (
    <>
        <Wraper titleForm={"Listado de Predios"} listbreadcrumb={LISTADO_PREDIOS_BREADCRUM} >
            <legend className="mleft-20">
                <i className="fa fa-filter"></i> Filtros de Búsqueda de Predios
            </legend>
            <div className="form-group">
                <label className="col-lg-2 control-label">Proyecto</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm"
                    id="gestionpredialid"
                    name="gestionpredialid"
                    onChange={handleInputChange}
                    >
                    <option value="">--SELECCIONE--</option>
                    {resListaProyectos.result ? (
                        <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion" />
                    ) : ("Cargando...")}
                    </select>
                </div>
                <label className="col-lg-2 control-label">Código del Predio</label>
                <div className="col-lg-4">
                    <input
                    type="text"
                    className="form-control input-sm"
                    id="codigopredio"
                    name="codigopredio"
                    placeholder="Código del Predio"
                    onBlur={handleInputChange}
                    />
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
                    <button type="button" onClick={limpiarPrediosFilter} className="btn btn-default btn-sm fullborder">
                        <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                    </button>
                    <button type="button" onClick={buscarPrediosFilter} className="btn btn-info  btn-sm  fullborder">
                        <i className="fa fa-search"></i> Aplicar Filtro(s)
                    </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 form-group">
                <div className="row">
                    <div className="col-md-6">
                    <legend className="fullborder">
                        Resultados de Búsqueda de Predios
                    </legend>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" onClick={descargarXls} className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-file-excel-o"></i> Descargar Excel
                        </button>
                        <Link to={`/predio-add`} className="btn btn-danger btn-sm fullborder" >
                            <i className="fa fa-plus-circle"></i> Agregar Predio
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                {
                (cargandoGrid)?
                    <div className="alert alert-danger text-center">Cargando...</div>
                    :
                    (
                    <>
                    <Table cabecera={cabecerasTabla}>
                        {list.rows.map((predio, i) => (
                            <PredioRow nro={i} predio={predio}></PredioRow>
                        ))}        
                    </Table>
                    <div className="panel-footer clearfix pull-right">
                        <Pagination
                        activePage={activePage}
                        itemsCountPerPage={limit}
                        totalItemsCount={parseInt(totalItemsCount)}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={handlePageChange}
                        ></Pagination>
                    </div>
                    </>
                    )
                }
            </div>
      </Wraper>
    </>
  );
}
export default PredioList;