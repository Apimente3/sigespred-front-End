import React, { useEffect, useState } from "react";
import { LISTADO_DOCINTERNOS_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import TableDocInterno from "./TablaDocInterno";
import Pagination from "react-js-pagination";
import { initAxiosInterceptors } from "../../config/axios";
import ComboOptions from "../../components/helpers/ComboOptions";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import DocInternoRow from "./DocInternoRow";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { Loading } from "../../components/forms";
import {getselectProyecto} from '../../utils';

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;
const queryString = require("query-string");

async function buscarDocumentosInternos(query) {
  const { data } = await Axios.get(`/docinterno/buscar?` + query);
  return data;
}

const DocInternos = () => {
  // const [gestionPredial, setGestionPredial,handleInputChange, reset ] = useForm({archivos:[]}, ['resoministerial','nrodocumento']);
  //const [filtros, set_filtros] = useState({gestionpredialid:getselectProyecto().idproyecto});
  const [filtros, set_filtros] = useState({});
  const [contentMessage, set_contentMessage] = useState("");
  const [busquedaLocal, set_busquedaLocal] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [activePage, setactivePage] = useState(1);
  const [dataDocInteno, setDataDocInteno] = useState({
    count: 5,
    rows: [],
  });
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const resListaTipoDocInterno = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPODOCINTER,
  ]);
  const [dataEquipo, setDataEquipo] = useState(null);
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);

  useEffect(() => {
    async function initialLoad() {
      try {
        set_busquedaLocal(false);
        
        let query = await queryString.stringify({ busqueda, page, limit });
          var datosProyecto = getselectProyecto();
        if (datosProyecto) {
          set_filtros({
            ...filtros,
            gestionpredialid: datosProyecto.idproyecto
          });
          setValoresEquipo(datosProyecto.idproyecto);
          query =  await  queryString.stringify({busqueda, page: activePage, limit, gestionpredialid:datosProyecto.idproyecto});
        }

        let listDocumentosInternos = await buscarDocumentosInternos(query);
        setDataDocInteno(listDocumentosInternos);
        settotalItemsCount(listDocumentosInternos.count);
      } catch (error) {
        console.log(error);
      }
    }
    initialLoad();
  }, []);

  const handleChangeProyecto = async (e) => {
    if (e && e.target.value) {
      //let dataEq = await helperGets.helperGetListEquipos(e.target.value);
      setValoresEquipo(e.target.value);
      // setDataEquipo(dataEq);
    } else {
      setDataEquipo(null);
    }
  };

  const setValoresEquipo = async(idgestionpredial) => {
    let data = await helperGets.helperGetListEquipos(idgestionpredial);
    setDataEquipo(data);
}


  const handlePageChange = async (pageNumber) => {
    await setPage(pageNumber);
    setactivePage(pageNumber);
    setPage(pageNumber);

    let query = await queryString.stringify({ page: pageNumber, limit });
    if (busqueda) {
      query += `&${busqueda}`;
    }

    let listDocumentosInternos = await buscarDocumentosInternos(query);
    setDataDocInteno(listDocumentosInternos);
    settotalItemsCount(listDocumentosInternos.count);
  };

  const buscarDocumentosInternosFilter = async (e) => {
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

    let valorFiltros = "";
    if (filtros) {
      $.each(filtros, function (key, value) {
        if (value === "" || value === null) {
          delete filtros[key];
        }
      });
      valorFiltros = $.param(filtros);

    }

    ejecutarDocInternosFilter(valorFiltros);
  };

  const ejecutarDocInternosFilter = async (datosfiltro) => {
    set_busquedaLocal(true);
    setBusqueda(datosfiltro);
    await setPage(1);
    setactivePage(1);
    let query = await queryString.stringify({ page: 1, limit });
    if (datosfiltro) {
      query += `&${datosfiltro}`;
    }
    let listDocinternos = await buscarDocumentosInternos(query);
    setDataDocInteno(listDocinternos);
    settotalItemsCount(listDocinternos.count);
    set_busquedaLocal(false);
  };

  function handleInputChange(e) {
    switch (e.target.name) {
      case "equipoid":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value,
        });
        break;
      case "monitorid":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value,
        });
        break;
      case "tipodocumento":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value,
        });
        break;
      case "codigostd":
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
    //TODO: remover console

  }

  const limpiarDocumentacionInternaFilter = (e) => {
    $("#gestionpredialid").val("");
    $("#equipoid").val("");
    $("#monitorid").val("");
    $("#fechainicio").val("");
    $("#fechafin").val("");
    $("#tipodocumento").val("");
    $("#codigostd").val("");
    $("#fecharecepcion").val("");
    $("#numdocrecepcion").val("");
    $("#reqareaid").val("");
    $("#recibirespuesta").val("");

    // handleChangeProyecto('');
    // handleChangeDepartmento('');

    set_filtros({});
    ejecutarDocInternosFilter("");
  };

  const cerrarModal = (estado) => {
    setMostrarPopup(estado);
  };

  const ejecutarEliminar = (id) => {
    Axios.delete(`/docinterno/${id}`)
      .then(() => {
        ejecutarDocInternosFilter(busqueda);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callbackEliminarDocumentoInterno = (iddocinterno, coddocinterno) => {
    try {

      const toastrConfirmOptions = {
        onOk: () => ejecutarEliminar(iddocinterno),
      };
      toastr.confirm(
        `¿Desea eliminar el Documento interno: ${coddocinterno}?`,
        toastrConfirmOptions
      );
    } catch (e) {
      toastr.error(
        "Búsqueda de Documento interno",
        "Se encontró un error: " + e.message
      );
    }
  };

  const cabecerasTabla = [
    "",
    "ID",
    "GRUPO TRABAJO",
    "TIPO DOCUMENTO",
    "CODIGO STD",
    "FECHA RECEPCION",
    "NRO DOCUMENTO",
    "REMITIR RESPUESTA",
    "USUARIO REGISTRO",
    "FECHA REGISTRO",
    "ACCIONES",
  ];
  return (
    <>
      <WraperLarge
        titleForm={"Listado de Documentos internos"}
        listbreadcrumb={LISTADO_DOCINTERNOS_BREADCRUM}
      >
        <form className={"form-horizontal"}>
          <legend className="mleft-20">
            <i class="fa fa-filter"></i> Filtro de Busqueda de Documentos
            internos
          </legend>
          <div className="form-group">
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span>Proyecto
            </label>
            <div className="col-lg-4">
              <select
                className="form-control"
                value={filtros.gestionpredialid || ""}
                id="gestionpredialid"
                name="gestionpredialid"
                required
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
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span> Equipo
            </label>
            <div className="col-lg-4">
              <select
                className="form-control input-sm"
                id="equipoid"
                name="equipoid"
                required
                // title="El Tipo de Plano es requerido"
                onChange={handleInputChange}
              >
                <option value="">--SELECCIONE--</option>
                {dataEquipo && (
                  <ComboOptions
                    data={dataEquipo}
                    valorkey="id"
                    valornombre="equipo"
                  />
                )}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Tipo de Documento</label>
            <div className="col-lg-4">
              <select
                className="form-control input-sm"
                id="tipodocumento"
                name="tipodocumento"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              >
                <option value="">--SELECCIONE--</option>
                {resListaTipoDocInterno.error ? (
                  "Se produjo un error cargando los tipos de documento"
                ) : resListaTipoDocInterno.loading ? (
                  "Cargando..."
                ) : (
                  <ComboOptions
                    data={resListaTipoDocInterno.result}
                    valorkey="valorcodigo"
                    valornombre="valortexto"
                  />
                )}
              </select>
            </div>
            <label className="col-lg-2 control-label">Código STD</label>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control input-sm"
                id="codigostd"
                name="codigostd"
                placeholder="Código del plano"
                onBlur={handleInputChange}
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
                placeholder="Ingrese fecha de inicio Recepcion"
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
                placeholder="Ingrese fecha de finalizacion Recepcion"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Nro Documento</label>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control input-sm"
                id="numdocrecepcion"
                name="numdocrecepcion"
                placeholder="Numero de documento"
                onBlur={handleInputChange}
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
                  onClick={limpiarDocumentacionInternaFilter}
                  className="btn btn-default btn-sm fullborder  btn-control"
                >
                  <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                </button>
                <button
                  type="button"
                  onClick={buscarDocumentosInternosFilter}
                  className="btn btn-info  btn-sm  fullborder  btn-control"
                >
                  <i className="fa fa-search"></i> Aplicar Filtro(s)
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 form-group">
            <div className="row">
              {/* <div className="col-md-6"> */}
              <div className="col-md-6">
                <legend className="fullborder">
                  Resultados de Búsqueda de Partidas Registrales
                </legend>
              </div>
              {/* </div> */}
              <div className="col-md-6 text-right">
                <Link
                  to={`/docinternos-add`}
                  className="btn btn-danger btn-sm fullborder  btn-control"
                >
                  <i className="fa fa-plus-circle"></i> Agregar
                </Link>
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            {busquedaLocal ? (
              <Loading></Loading>
            ) : (
              <>
                <TableDocInterno cabecera={cabecerasTabla}>
                  {dataDocInteno.rows.map((docinterno, i) => (
                    <DocInternoRow
                      nro={i}
                      docinterno={docinterno}
                      callback={callbackEliminarDocumentoInterno}
                    ></DocInternoRow>
                  ))}
                </TableDocInterno>
                <div className="panel-footer clearfix pull-right">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                  ></Pagination>
                </div>
              </>
            )}
          </div>
        </form>
      </WraperLarge>
    </>
  );
};

export default DocInternos;
