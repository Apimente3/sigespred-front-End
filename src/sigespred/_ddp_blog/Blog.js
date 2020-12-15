import React, { useEffect, useState } from 'react'
import ComboOptions from '../../components/helpers/ComboOptions';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import { initAxiosInterceptors } from "../../config/axios";
import { Link } from 'react-router-dom';
import { Loading, Options } from '../../components/forms';
import { TableBlog } from './TableBlog';
import { useTable } from '../../hooks/useTable';
import { BlogRow } from './BlogRow';
import { toastr } from 'react-redux-toastr';
import { useAsync } from 'react-async-hook';
import * as helperGets from "../../components/helpers/LoadMaestros";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;
const queryString = require("query-string");

async function buscarBlog(query) {
  const { data } = await Axios.get(`/blog1/buscar?` + query);
  return data;
}

export const Blog = () => {
    const [filtros, set_filtros] = useState({});
    const [contentMessage, set_contentMessage] = useState("");
    const [cargandoGrid, set_cargandoGrid] = useState(false);
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();
    const [busqueda, setBusqueda] = useState("");
    const resListaCategorias = useAsync(helperGets.helperGetListCategorias,[])
    

    useEffect(() => {
      async function initialLoad(){
          try {
            let query = await queryString.stringify({ busqueda, page: activePage, limit });
            let listaBlog = await buscarBlog(query);

            changePage(activePage, listaBlog);
            set_cargandoGrid(false);

          } catch (error) {
              console.log(error);
          }
      }
      initialLoad();
    }, []);
    
  const buscarBlogFilter = async (e) => {
    debugger;
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

    ejecutarBlogFilter(valorFiltros);
  };

  
  function handleInputChange(e) {
    switch (e.target.name) {
      case "titulo":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value.toUpperCase(),
        });
        break;
      case "categoria":
        set_filtros({
          ...filtros,
          [e.target.name]: e.target.value,
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

  const ejecutarBlogFilter = async (datosfiltro) => {
    set_cargandoGrid(true);
    setBusqueda(datosfiltro);
    let query = await queryString.stringify({ page: 1, limit });
    if (datosfiltro) {
      query += `&${datosfiltro}`;
    }
    let listaBlog = await buscarBlog(query);
    changePage(1, listaBlog);
    set_cargandoGrid(false);
  }

  

    const ejecutarEliminar = (id) => {
      Axios.delete(`/blog/${id}`)
        .then(() => {
          ejecutarBlogFilter(busqueda);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const callbackEliminarBlog = (idblog) => {
      try {
  
        const toastrConfirmOptions = {
          onOk: () => ejecutarEliminar(idblog),
        };
        toastr.confirm(
          `¿Desea eliminar el Blog: ${idblog}?`,
          toastrConfirmOptions
        );
      } catch (e) {
        toastr.error(
          "Búsqueda de Blog",
          "Se encontró un error: " + e.message
        );
      }
    };

    const limpiarBlogFilter = (e) => {

      $("#titulo").val("");
      $("#categoria").val("");
      $("#fechainicio").val("");
      $("#fechafin").val("");
      set_filtros({});
      ejecutarBlogFilter("");
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
                            {resListaCategorias.result && 
                              <Options options={resListaCategorias.result} index={"descripcion"} valor={"descripcion"}></Options>
                             }
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
                                onClick={limpiarBlogFilter}
                                className="btn btn-default btn-sm fullborder  btn-control"
                                >
                                <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                                </button>
                                <button
                                type="button"
                                onClick={buscarBlogFilter}
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
                              <Link to={`/categoria`} className="btn btn-danger btn-sm fullborder">
                                  <i className="fa fa-clone"></i>  Categorias
                              </Link>
                              <Link
                              to={`/blog-add`}
                              className="btn btn-danger btn-sm fullborder  btn-control">
                              <i className="fa fa-plus-circle"></i> Agregar
                              </Link>
                          </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                    {cargandoGrid ? (
                      <Loading></Loading>
                      ) : (
                        <>
                          <TableBlog cabecera={cabecerasTabla}>
                          {list.rows.map((blog, i) => (
                            <BlogRow nro={i} blog={blog} callback={callbackEliminarBlog} ></BlogRow>
                            ))}
                          </TableBlog>
                        </>
                      )
                    }
                    </div>
                </form>

            </WraperLarge>
        </>
    )
}
