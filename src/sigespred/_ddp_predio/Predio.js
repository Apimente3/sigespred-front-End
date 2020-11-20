import React, { useEffect, useState } from "react";
import { useTable } from "../../hooks/useTable";
import { useAsync } from "react-async-hook";
import { LISTAR_GESTIONPREDIAL_BREADCRUM } from "../../config/breadcrums";
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
  const { data } = await Axios.get(`/predio` + query);
  return data;
}

export const Predio = () => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const [contentMessage, set_contentMessage] = useState("");
  const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();
  const limpiarSolicitudesFilter = (e) => {};
  const [busquedaLocal, set_busquedaLocal] = useState(true);
  const buscarSolicitudesFilter = async (e) => {};
  const [filtros, set_filtros] = useState({});
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function initialLoad() {
      try {
        set_busquedaLocal(false);

        let query = await queryString.stringify({
          busqueda,
          page: activePage,
          limit,
        });
        let listPredios = await buscarPredios(query);
        changePage(activePage, listPredios);
      } catch (error) {
        console.log(error);
      }
    }
    initialLoad();
  }, []);

//   const ejecutarEliminar = (id) => {
//     Axios.delete(`/solicitudentidad/${id}`)
//       .then(() => {
//         ejecutarSolicitudesFilter(busqueda);
//       })
//       .catch((error) => {
//         toastr.error("Eliminar Solicitud", "Se encontró un error: " + error);
//       });
//   };

  const handlePageChange = async (pageNumber) => {
    let query = await queryString.stringify({ page: pageNumber, limit });
    if (busqueda) {
      query += `&${busqueda}`;
    }

    let listPredios = await buscarPredios(query);
    changePage(pageNumber, listPredios);
  };

//   const callbackEliminarPredio = (idpredio, nrooficio) => {
//     try {
//       const toastrConfirmOptions = {
//         onOk: () => ejecutarEliminar(idpredio),
//       };
//       toastr.confirm(
//         `¿Desea eliminar el plano: ${nrooficio}?`,
//         toastrConfirmOptions
//       );
//     } catch (e) {
//       toastr.error(
//         "Búsqueda de Solicitudes",
//         "Se encontró un error: " + e.message
//       );
//     }
//   };

const buscarPrediosFilter =async (e)=>{

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

    ejecutarPrediosFilter(valorFiltros);
}

const ejecutarPrediosFilter=async (datosfiltro)=>{
    set_busquedaLocal(true)
    setBusqueda(datosfiltro);
    let query =  await  queryString.stringify({page:1, limit});
    if(datosfiltro) {
        query += `&${datosfiltro}`;
    }
    let listPredios= await buscarPredios(query);
    changePage(1, listPredios);
    set_busquedaLocal(false)
}

  const cabecerasTabla = [
    "",
    "ID",
    "PROYECTO",
    "CODIGO",
    "DESCRIPCION",
    "ACCIONES",
  ];
  return (
    <>
      <Wraper
        titleForm={"Listado de Predios"}
        listbreadcrumb={LISTAR_GESTIONPREDIAL_BREADCRUM}
      >
        <legend className="mleft-20">
          <i className="fa fa-filter"></i> Filtros de Búsqueda de Predios
        </legend>
        <div className="form-group">
          <label className="col-lg-2 control-label">Proyecto</label>
          <div className="col-lg-4">
            <select
              className="form-control input-sm"
              id="gestionpredialid"
              name="gestionpredialid"
              //   onChange={(e) => {
              //     handleChangeProyecto(e);
              //     handleInputChange(e);
              //   }}
            >
              <option value="">--SELECCIONE--</option>
              {resListaProyectos.result ? (
                <ComboOptions
                  data={resListaProyectos.result}
                  valorkey="id"
                  valornombre="denominacion"
                />
              ) : (
                "Cargando..."
              )}
            </select>
          </div>
          <label className="col-lg-2 control-label">Titular</label>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control input-sm"
              id="titular"
              name="titular"
              placeholder="Nombre del Titular"
              //   onBlur={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-2 control-label">Cod. del Predio</label>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control input-sm"
              id="codpredio"
              name="codpredio"
              placeholder="Codigo del Predio"
              //   onBlur={handleInputChange}
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
              <button
                type="button"
                onClick={limpiarSolicitudesFilter}
                className="btn btn-default btn-sm fullborder"
              >
                <i className="fa fa-eraser"></i> Limpiar Filtro(s)
              </button>
              <button
                type="button"
                onClick={buscarPrediosFilter}
                className="btn btn-info  btn-sm  fullborder"
              >
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
              {/* <button type="button" onClick={descargarXls} className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-file-excel-o"></i> Descargar Excel
                        </button> */}
              <Link
                to={`/modulo-predio-Add`}
                className="btn btn-danger btn-sm fullborder"
              >
                <i className="fa fa-plus-circle"></i> Agregar Predio
              </Link>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <Table cabecera={cabecerasTabla}>
            {/* {list.rows.map((predio, i) => {
              <PredioRow nro={i} predio={predio}></PredioRow>;
            })} */}
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
        </div>
      </Wraper>
    </>
  );
};
