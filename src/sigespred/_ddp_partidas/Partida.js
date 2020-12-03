import React, { createContext, useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import WraperLarge from "../m000_common/formContent/WraperLarge";

import { LISTADO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import TablePartida from "./TablePartida";
import PartidarRow from "./PartidaRow";
import Pagination from "react-js-pagination";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";

import { Loading } from "../../components/forms";
import {getselectProyecto} from '../../utils';
import { useTable } from "../../hooks/useTable";
import { toastr } from "react-redux-toastr";

const queryString = require("query-string");
const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

export const Partida = (history) => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOPRED,]);
  const [filtros, set_filtros] = useState({});
  const [contentMessage, set_contentMessage] = useState("");
  const [cargandoGrid, set_cargandoGrid] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [dataTramo, setDataTramo] = useState(null);
  const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();
  
  async function buscarPartida(query) {
    const { data } = await Axios.get(`/partidaregistral/buscar?` + query);
    return data;
  }

  useEffect(() => {
    async function initialLoad() {
      try {
        
        //set_busquedaLocal(false);
       let query = await queryString.stringify({ busqueda, page: activePage, limit });
        var datosProyecto = getselectProyecto();
        if (datosProyecto) {
            set_filtros({
                ...filtros,
                gestionpredialid: datosProyecto.idproyecto
            });
            setValoresTramo(datosProyecto.idproyecto);
            query =  await  queryString.stringify({busqueda, page: activePage, limit, gestionpredialid:datosProyecto.idproyecto});
        }

        let listaPartidas = await buscarPartida(query);
        changePage(activePage, listaPartidas);
        set_cargandoGrid(false);
      } catch (error) {
        console.log(error);
      }
    }
    initialLoad();
  }, []);

  const handleChangeProyecto = async (e) => {
    if (e && e.target.value) {
      setValoresTramo(e.target.value);
      // let data = await helperGets.helperGetListTramos(e.target.value);
      // setDataTramo(data);
    } else {
      setDataTramo(null);
    }
  };

  const setValoresTramo = async(idgestionpredial) => {
    let data = await helperGets.helperGetListTramos(idgestionpredial);
    setDataTramo(data);
}

  function handleInputChange(e) {
    switch (e.target.name) {
      case "gestionpredialid":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value,
        });
        break;
      case "tramoid":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value,
        });
        break;
      case "subtramoid":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value.toUpperCase(),
        });
        break;
      default:
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value,
        });
    }
  }

  const buscarPartidasFilter = async (e) => {
    if (
      (filtros.fechainicio && !filtros.fechafin) ||
      (!filtros.fechainicio && filtros.fechafin)
    ) {
      set_contentMessage(
        "El filtro Fecha de Creación, debe tener un inicio y fin"
      );
      return;
    } else {
      set_contentMessage("");
    }
    let filtrosEnviar = Object.assign({}, filtros);

    if (filtrosEnviar.fechainicio && filtrosEnviar.fechafin) {

        var resultFechaInicio = funcGlob.helperValidarFecha(filtrosEnviar.fechainicio, true);
        var resultFechaFin = funcGlob.helperValidarFecha(filtrosEnviar.fechafin, true);
        
        if (resultFechaFin < resultFechaInicio) {
            set_contentMessage('La Fecha de Creación de inicio no puede ser mayor a la de fin');
            return;
        } else {
            filtrosEnviar.fechainicio = resultFechaInicio;
            filtrosEnviar.fechafin = resultFechaFin;
        }
    }

    let valorFiltros = "";
    if (filtrosEnviar) {
      $.each(filtrosEnviar, function (key, value) {
        if (value === "" || value === null) {
          delete filtrosEnviar[key];
        }
      });
      valorFiltros = $.param(filtrosEnviar);
    }

    ejecutarPartidasFilter(valorFiltros);
  };

  const ejecutarPartidasFilter = async (datosfiltro) => {
    set_cargandoGrid(true);
    setBusqueda(datosfiltro);
    //await setPage(1);
    //setactivePage(1);
    let query = await queryString.stringify({ page: 1, limit });
    if (datosfiltro) {
      query += `&${datosfiltro}`;
    }
    let listaPartidas = await buscarPartida(query);
    changePage(1,listaPartidas);
    //settotalItemsCount(listaPartidas.count);
    set_cargandoGrid(false);
  };

  const limpiarPartidaFilter = (e) => {
    $("#nropartida").val("");
    $("#gestionpredialid").val("");
    $("#fechainicio").val("");
    $("#fechafin").val("");
    $("#tramoid").val("");
    $("#subtramoid").val("");
    $("#tipopredio").val("");
    $("#estadoatencion").val("");

    // handleChangeProyecto("");

    set_filtros({});

    ejecutarPartidasFilter("");
  };

  const handlePageChange = async (pageNumber) => {
    //await setPage(pageNumber);
    //setactivePage(pageNumber);
    //setPage(pageNumber);
    let query = await queryString.stringify({
      page: pageNumber,
      limit,
    });

    if (busqueda) {
      query += `&${busqueda}`;
    }

    let listPartidas = await buscarPartida(query);
    changePage(pageNumber,listPartidas);
    //settotalItemsCount(listPartidas.count);
  };

  const descargarXls = async() => {
    let numfilas = list.count;
    if (!numfilas || numfilas === "0") {
      toastr.warning ("Busqueda de Partidas Registrales","No se encontraron registros", { position: 'top-center'});
    }

    let query = await queryString.stringify({page: 1 , numfilas});

    if (busqueda) {
      query += `&${busqueda}`;
    }

    let listaPartidasRegistrales = await buscarPartida(query);


    debugger;
    // let numfilas = list.count;
    // let query = await queryString.stringify({page:1, numfilas});
    // debugger;

    let listexportexcel = listaPartidasRegistrales.rows;
    
    var resultjson = alasql(`SELECT *  FROM ? ORDER BY id DESC`, [listexportexcel])
    var opts = [{
      sheetid: 'Reporte',
      headers: true
  }];
  var res = alasql('SELECT INTO XLSX("ListadoPartidas.xlsx",?) FROM ?', [opts, [resultjson]]);
  return false;
  }

  const cabecerasTabla = [
    "#",
    "ID",
    "Nº PARTIDA",
    "PROYECTO",
    "TRAMO",
    "SUB TRAMO",
    "TIPO PREDIO",
    "FECHA ATENCIÓN",
    "OBSERVACIÓN",
    "ESTADO ATENCIÓN",
    "USUARIO REGISTRO",
    "FECHA REGISTRO",
    "ACCIONES",
  ];
  return (
    <>
      {/* <WizardContext.Provider value={context}> */}
      <WraperLarge titleForm={"Listado de Partidas Registrales"} listbreadcrumb={LISTADO_PARTIDA_BREADCRUM} >
      <form className={"form-horizontal"}>
        <legend className="mleft-20">
          <i class="fa fa-filter"></i> Filtro de Busqueda de Partidas
          Registrales
        </legend>
        <div className="form-group">
          <label className="col-lg-2 control-label">Nro Partida</label>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control "
              id="nropartida"
              name="nropartida"
              placeholder="Numero de Partida Registral"
              // onChange={handleInputChange}
              onBlur={handleInputChange}
            />
          </div>
          <label className="col-lg-2 control-label">Proyecto</label>
          <div className="col-lg-4">
            <select
              className="form-control"
              id="gestionpredialid"
              value={filtros.gestionpredialid || ""}
              name="gestionpredialid"
              onChange={(e) => {
                handleChangeProyecto(e);
                handleInputChange(e);
              }}
            >
              <option value="">--SELECCIONE--</option>
              {resListaProyectos.error ? (
                "Se produjo un error cargando los tipos de plano"
              ) : resListaProyectos.loading ? (
                "Cargando..."
              ) : (
                <ComboOptions
                  data={resListaProyectos.result}
                  valorkey="id"
                  valornombre="denominacion"
                />
              )}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-2 control-label">Tramo</label>
          <div className="col-lg-4">
            <select
              className="form-control"
              id="tramoid"
              name="tramoid"
              onChange={handleInputChange}
            >
              <option value="">--SELECCIONE--</option>
              {dataTramo && (
                <ComboOptions
                  data={dataTramo}
                  valorkey="id"
                  valornombre="descripcion"
                />
              )}
            </select>
          </div>
          <label className="col-lg-2 control-label">Sub Tramo</label>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control "
              id="subtramoid"
              name="subtramoid"
              placeholder="Ingrese el subtramo"
              onBlur={handleInputChange}
              // onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-2 control-label">Fecha Desde</label>
          <div className="col-lg-4">
            <input
              className="form-control input-sm"
              type="date"
              id="fechainicio"
              name="fechainicio"
              placeholder="Ingrese fecha "
              onChange={handleInputChange}
            ></input>
          </div>
          <label className="col-lg-2 control-label">Fecha Hasta</label>
          <div className="col-lg-4">
            <input
              className="form-control input-sm"
              type="date"
              id="fechafin"
              name="fechafin"
              placeholder="Ingrese fecha "
              onChange={handleInputChange}
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-2 control-label">Tipo Predio</label>
          <div className="col-lg-4">
            <select
              id="tipopredioid"
              className="form-control"
              name="tipopredioid"
              onChange={handleInputChange}
            >
              <option value="">--SELECCIONE--</option>
              {resListaTipoPredio.error ? (
                "Se produjo un error cargando los tipos de plano"
              ) : resListaTipoPredio.loading ? (
                "Cargando..."
              ) : (
                <ComboOptions
                  data={resListaTipoPredio.result}
                  valorkey="valorcodigo"
                  valornombre="valortexto"
                />
              )}
            </select>
          </div>

          <label className="col-lg-2 control-label">Estado de Atención</label>
          <div className="col-lg-4">
            <select
              id="estadoatencion"
              className="form-control"
              name="estadoatencion"
              onChange={handleInputChange}
            >
              <option value="">--SELECCIONE--</option>
              <option value="true">ATENDIDO</option>
              <option value="false">PENDIENTE</option>
            </select>
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
          </div>
          <label className="col-lg-12 text-right">
            <button
              type="button"
              onClick={limpiarPartidaFilter}
              className="btn btn-default btn-sm fullborder"
            >
              <i className="fa fa-eraser"></i> Limpiar Filtro(s)
            </button>
            <button
              type="button"
              className="btn btn-info btn-sm fullborder "
              onClick={buscarPartidasFilter}
            >
              <i className="fa fa-search"></i> Aplicar Filtro(s)
            </button>
          </label>
        </div>
        <div className="mt-4  form-group">
          <div className="row">
            <div className="col-lg-6">
              <legend className="fullborder">
                Resultados de Búsqueda de Partidas Registrales
              </legend>
            </div>
            <div className="col-lg-6 text-right">
              <Link
                to={`/partida-add`}
                className="btn btn-danger pull-right btn-sm fullborder"
              >
                <i className="fa fa-plus"></i> Agregar Partida
              </Link>
              <Link
                to={`/partida-upload`}
                className="btn btn-danger pull-right btn-sm fullborder"
              >
                <i className="fa fa-clone"></i> Carga Masiva
              </Link>
              <button type="button" onClick={descargarXls} className="btn btn-default btn-sm fullborder">
                <i className="fa fa-file-excel-o"></i> Descargar Excel
              </button>
            </div>
          </div>
        </div>
        {/* </form> */}

        <div className="panel panel-default">
          {cargandoGrid ? (
            <Loading></Loading>
          ) : (
            <>
              <TablePartida cabecera={cabecerasTabla}>
                {list.rows.map((partida, i) => (
                  <PartidarRow nro={i} partida={partida}></PartidarRow>
                ))}
              </TablePartida>
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
          )}
        </div>
      </WraperLarge>
    </>
  );
};
export default Partida;
