import React, { useState } from 'react'
import ComboOptions from '../../components/helpers/ComboOptions';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import { initAxiosInterceptors } from "../../config/axios";
import { Link } from 'react-router-dom';
const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;
const queryString = require("query-string");


export const Blog = () => {
    const [filtros, set_filtros] = useState({});
    const [contentMessage, set_contentMessage] = useState("");





    
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

    //ejecutarDocInternosFilter(valorFiltros);
  };
    function handleInputChange(e) {

    }
    const cabecerasTabla = ["#",
    "ID",
    "TITULO",
    "CONTENIDO",
    "CATEGORIA",
    "ESTADO",
    "USUARIO REGISTRO",
    "FECHA REGISTRO",
    "ACCIONES"];
    
    return (
        <>
            <WraperLarge titleForm={"Bienvenido al blog de la DDP"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
                <form className={"form-horizontal"}>
                    <legend className="mleft-20">
                        <i class="fa fa-filter"></i> Filtro de Busqueda de Contenido del Blog
                    </legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">
                            Titulo
                        </label>
                        <div className="col-lg-4">
                            <input
                                type="text"
                                className="form-control input-sm"
                                id="titulo"
                                name="titulo"
                                placeholder="Titulo del blog"
                                onBlur={handleInputChange}
                            />
                        </div>
                        <label className="col-lg-2 control-label">
                        Categoria
                        </label>
                        <div className="col-lg-4">
                        <select
                            className="form-control input-sm"
                            id="categoria"
                            name="categoria"
                            // title="El Tipo de Plano es requerido"
                            onChange={handleInputChange}
                        >
                            <option value="">--SELECCIONE--</option>
                            {/* {dataEquipo && ( */}
                            <ComboOptions
                                //data={cateroria}
                                valorkey="id"
                                valornombre="equipo"
                            />
                            {/* )} */}
                        </select>
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
                        <div className="row mb-3">
                            <div className="col-lg-6 text-center">
                                {/* {contentMessage && (
                                <label className="alert alert-danger">{contentMessage}</label>
                            )} */}
                            </div>
                            <div className="col-lg-6 text-right">
                                <button
                                type="button"
                                // onClick={limpiarDocumentacionInternaFilter}
                                className="btn btn-default btn-sm fullborder  btn-control"
                                >
                                <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                                </button>
                                <button
                                type="button"
                                // onClick={buscarDocumentosInternosFilter}
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
                            Resultados de Búsqueda de contenido del Blog
                            </legend>
                        </div>
                        {/* </div> */}
                        <div className="col-md-6 text-right">
                            {/* <button type="button" onClick={descargarXls} className="btn btn-default btn-sm fullborder">
                                <i className="fa fa-file-excel-o"></i> Descargar Excel
                            </button> */}
                            <Link
                            to={`/blog-add`}
                            className="btn btn-danger btn-sm fullborder  btn-control">
                            <i className="fa fa-plus-circle"></i> Agregar
                            </Link>
                        </div>
                        </div>
                    </div>
                </form>

            </WraperLarge>
        </>
    )
}
