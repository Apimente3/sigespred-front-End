import React, { createContext, useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";

import Wraper from "../m000_common/formContent/Wraper";
import { LISTADO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import { useDispatch, useSelector } from "react-redux";

import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";
import GridPartida from "../m000_common/grids/GridPartida";
import { buscarPartida } from "../../actions/_ddp_partida/Actions";
import * as PARAMS from "../../config/parameters";
import TablePartida from "./TablePartida";
import PartidarRow from "./PartidaRow";
import Pagination from "react-js-pagination";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
const queryString = require("query-string");

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;


export const Partida = () => {
  const WizardContext = createContext();

  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPOPRED,
  ]);

  const [filtros, set_filtros] = useState("");
  const [busquedaLocal, set_busquedaLocal] = useState(true);
  const dispatch = useDispatch();
  
  const [contentMessage, set_contentMessage] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [activePage, setactivePage] = useState(1);
  const [partidas, setPartidas] = useState({ count: 5, rows: [] });

  const context = {
    nropagina: 1,
  };

  async function buscarPartida(query) {
    // alert(query)
     const {data} = await Axios.get(`/partidaregistral/buscar?`+ query);
     return data;
 }

  useEffect(() => {
    async function initialLoad() {
      try {
        let partidasDB = await buscarPartida("");
        set_busquedaLocal(false);
        setPartidas({ count: 50, rows: partidasDB })
      } catch (error) {
        console.log(error);
      }
    }
    initialLoad();
  }, []);

  const definirFiltro = () => {
    let valFiltro = "";
    let valorNroPartida = $("#nropartida").val().trim();
    if (valorNroPartida) {
      valFiltro = `nropartida=${valorNroPartida}`;
    }

    console.log(valFiltro);
  };

  function handleInputChange(e) {
    if (["nropartida"].includes(e.target.name)) {
      set_filtros({
        ...filtros,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else if (["tramoid"].includes(e.target.name)) {
      set_filtros({
        ...filtros,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      set_filtros({
        ...filtros,
        [e.target.name]: e.target.value,
      });
    }
    console.log(filtros);
  }
  const [proyectos, set_proyectos] = useState([]);

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

    if (filtros.fechainicio && filtros.fechafin) {
      let resultFechaInicio = funcGlob.helperValidarFecha(
        filtros.fechainicio,
        true
      );
      let resultFechaFin = funcGlob.helperValidarFecha(filtros.fechafin, true);

      if (resultFechaFin < resultFechaInicio) {
        set_contentMessage(
          "La Fecha de Creación de inicio no puede ser mayor a la de fin"
        );
        return;
      } else {
        set_filtros({
          ...filtros,
          fechainicio: resultFechaInicio,
          fechafin: resultFechaFin,
        });
        $.each(filtros, function (key, value) {
          if (key === "fechainicio") {
            filtros[key] = resultFechaInicio;
          }
          if (key === "fechafin") {
            filtros[key] = resultFechaFin;
          }
        });
      }
    }
    e.preventDefault();
    set_busquedaLocal(true);

    let valorFiltros = "";
    if (filtros) {
      $.each(filtros, function (key, value) {
        if (value === "" || value === null) {
          delete filtros[key];
        }
      });
      valorFiltros = $.param(filtros);
      console.log("valorFiltros");
      console.log(valorFiltros);
    }

    e.preventDefault();
    set_busquedaLocal(true);
    let dataFiltrada = await buscarPartida(valorFiltros);
    setPartidas({ count: 50, rows: dataFiltrada })
    set_busquedaLocal(false);
  };

  const descarxls = () => {
    let listexportexcel = proyectos;
    var resultgeojson = alasql(
      `SELECT *
                 FROM ? `,
      [listexportexcel]
    );
    var opts = [
      {
        sheetid: "Reporte",
        headers: true,
      },
    ];
    var res = alasql('SELECT INTO XLSX("ListadoProyectos.xlsx",?) FROM ?', [
      opts,
      [resultgeojson],
    ]);
    return false;
  };

  const handlePageChange = async (pageNumber) => {
    await setPage(pageNumber);
    //alert(pageNumber)
    setactivePage(pageNumber);
    setPage(pageNumber);
    console.log(`active page is ${pageNumber}`);
    let query = await queryString.stringify({
      busqueda,
      page: pageNumber,
      limit,
    });
    // let trabajadores=await buscarTrabajador(query)
    // setTrabajadores(trabajadores)
  };

  const cabecerasTabla = [
    "#",
    "ID",
    "Denominación",
    "Nº Partida",
    "Tramo",
    "Sub Tramo",
    "Tipo Predio",
    "Fecha Atención",
    "Observación",
    "Estato Atención",
    "Acciones",
  ];
  return (
    <>
      {/* <WizardContext.Provider value={context}> */}
        <Wraper
          titleForm={"Listado de Partidas Registrales"}
          listbreadcrumb={LISTADO_PARTIDA_BREADCRUM}
        >
          <form onSubmit={buscarPartidasFilter}>
          <div className="form-group">
            <label className="col-lg-2 control-label">Nro Partida</label>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control "
                id="nropartida"
                name="nropartida"
                placeholder="Numero de Partida Registral"
                onBlur={definirFiltro}
              />
            </div>
            <label className="col-lg-2 control-label">Proyecto</label>
            <div className="col-lg-4">
              <select
                className="form-control"
                id="proyectoid"
                name="proyectoid"
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
              <select className="form-control" id="tramoid" name="tramoid">
                <option value="">--SELECCIONE--</option>
                <option value="1">TRAMO 01</option>
                <option value="2">TRAMO 02</option>
                <option value="3">TRAMO 03</option>
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
                onBlur={definirFiltro}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">
              Fecha Creacion Inicio
            </label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="date"
                id="fechainicio"
                name="fechainicio"
                placeholder="Ingrese fecha inicio"
                onChange={handleInputChange}
              ></input>
            </div>
            <label className="col-lg-2 control-label">Fecha Creacion Fin</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="date"
                id="fechafin"
                name="fechafin"
                placeholder="Ingrese fecha inicio"
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

            <div className="col-lg-6 text-right">
              <button
                type="submit"
                className="btn btn-info"
              >
                <i className="fa fa-search"></i> Aplicar Filtro(s)
              </button>
            </div>
          </div>
          </form>
          <div className="form-group">
            <div className="col-lg-12 text-right">
              <Link
                to={`/partida-add`}
                className="btn btn-danger pull-right btn-sm fullborder"
              >
                <i className="fa fa-plus"></i> Agregar Partida
              </Link>
              <button
                type="button"
                onClick={descarxls}
                className="btn btn-default pull-right btn-sm fullborder"
              >
                <i className="fa fa-file-excel-o"></i> Descargar Excel
              </button>
            </div>
          </div>
          {/* <fieldset className={"fielsettext"}> */}
          {/* <form onSubmit={buscarPartidasFilter}> */}

          {/* </form> */}
          {/* </fieldset> */}
          <div className="panel panel-default">
            <TablePartida cabecera={cabecerasTabla}>
              {partidas.rows.map((partida, i) => (
                <PartidarRow nro={i} partida={partida}></PartidarRow>
              ))}
            </TablePartida>
            <div className="panel-footer clearfix pull-right">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={limit}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
              ></Pagination>
            </div>
          </div>


        </Wraper>
      {/* </WizardContext.Provider> */}
    </>
  );
};
export default Partida;
