import React, { useState } from "react";
import { REGISTRO_PLANO_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import TableDocInterno from "./TablaDocInterno";
import Pagination from "react-js-pagination";
import { initAxiosInterceptors } from "../../config/axios";
import ComboOptions from "../../components/helpers/ComboOptions";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;
const queryString = require("query-string");

const DocInternos = () => {
  const [activePage, setactivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [page, setPage] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  const handlePageChange = async (pageNumber) => {
    await setPage(pageNumber);
    setactivePage(pageNumber);
    setPage(pageNumber);

    let query = await queryString.stringify({ page: pageNumber, limit });
    if (busqueda) {
      query += `&${busqueda}`;
    }

    // let listPlanos = await buscarPlano(query);
    // setDataPlanos(listPlanos);
    // settotalItemsCount(listPlanos.count);
  };

  const cabecerasTabla = [
    "",
    "ID",
    "GRUPO TRABAJO",
    "MONITOR",
    "TIPO DOCUMENTO",
    "CODIGO STD",
    "FECHA RECEPCION",
    "NRO DOCUMENTO",
    "REMITIR RESPUESTA",
    "ACCIONES",
  ];
  return (
    <>
      <WraperLarge
        titleForm={"Listado de Documentos internos"}
        listbreadcrumb={REGISTRO_PLANO_BREADCRUM}
      >
        <div className="form-group">
          <label className="col-lg-2 control-label">Equipo de Trabajo</label>
          <div className="col-lg-4">
            <select
              className="form-control input-sm"
              id="equipotrabajoid"
              name="equipotrabajoid"
              onChange={(e) => {
                // handleChangeProyecto(e);
                // handleInputChange(e);
              }}
            >
              <option value="">--SELECCIONE--</option>
              {/* {resListaProyectos.error ? (
                "Se produjo un error cargando los tipos de plano"
              ) : resListaProyectos.loading ? (
                "Cargando..."
              ) : ( */}
              <ComboOptions
                //   data={resListaProyectos.result}
                valorkey="id"
                valornombre="denominacion"
              />
              {/* )} */}
            </select>
          </div>

          <label className="col-lg-2 control-label">Monitor</label>
          <div className="col-lg-4">
            <select
              className="form-control input-sm"
              id="monitor"
              name="monitor"
              onChange={(e) => {
                // handleChangeProyecto(e);
                // handleInputChange(e);
              }}
            >
              <option value="">--SELECCIONE--</option>
              {/* {resListaProyectos.error ? (
                "Se produjo un error cargando los tipos de plano"
              ) : resListaProyectos.loading ? (
                "Cargando..."
              ) : ( */}
              <ComboOptions
                //   data={resListaProyectos.result}
                valorkey="id"
                valornombre="denominacion"
              />
              {/* )} */}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-2 control-label">Tipo de Documento</label>
          <div className="col-lg-4">
            <select
              className="form-control input-sm"
              id="equipotrabajoid"
              name="equipotrabajoid"
              onChange={(e) => {
                // handleChangeProyecto(e);
                // handleInputChange(e);
              }}
            >
              <option value="">--SELECCIONE--</option>
              {/* {resListaProyectos.error ? (
                "Se produjo un error cargando los tipos de plano"
              ) : resListaProyectos.loading ? (
                "Cargando..."
              ) : ( */}
              <ComboOptions
                //   data={resListaProyectos.result}
                valorkey="id"
                valornombre="denominacion"
              />
              {/* )} */}
            </select>
          </div>
          <label className="col-lg-2 control-label">Fecha de Recepcion</label>
          <div className="col-lg-4">
            <input
              className="form-control input-sm"
              type="date"
              id="fecharecepcion"
              name="fecharecepcion"
              placeholder="Ingrese fecha de Recepcion"
              // onChange={handleInputChange}
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-2 control-label">Código STD</label>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control input-sm"
              id="codigostd"
              name="codigostd"
              placeholder="Código del plano"
              //   onBlur={handleInputChange}
            />
          </div>
          <label className="col-lg-2 control-label">Nro Documento</label>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control input-sm"
              id="numdocumento"
              name="numdocumento"
              placeholder="Numero de documento"
              //   onBlur={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="row mb-3">
            <div className="col-lg-6 text-center">
              {/* {contentMessage && (
                <label className="alert alert-danger">{contentMessage}</label>
              )} */}
            </div>
            <div className="col-lg-6 text-right">
              <button
                type="button"
                // onClick={limpiarPlanosFilter}
                className="btn btn-default btn-sm fullborder"
              >
                <i className="fa fa-eraser"></i> Limpiar Filtro(s)
              </button>
              <button
                type="button"
                // onClick={buscarPlanosFilter}
                className="btn btn-info  btn-sm  fullborder"
              >
                <i className="fa fa-search"></i> Aplicar Filtro(s)
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 form-group">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right">
              {/* <button type="button" onClick={descarxls} className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-file-excel-o"></i> TODO: Descargar Excel
                        </button> */}
              <Link
                to={`/docinternos-add`}
                className="btn btn-danger btn-sm fullborder"
              >
                <i className="fa fa-plus-circle"></i> Agregar 
              </Link>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <TableDocInterno cabecera={cabecerasTabla}></TableDocInterno>
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
      </WraperLarge>
    </>
  );
};

export default DocInternos;
