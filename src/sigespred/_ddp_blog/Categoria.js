import React, { useEffect, useState } from "react";
import { initAxiosInterceptors } from "../../config/axios";
import { Loading } from '../../components/forms';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import { useTable } from '../../hooks/useTable';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import { CategoriaRow } from './CategoriaRow';
import { TableCategoria } from './TableCategoria';
import Pagination from "react-js-pagination";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";

const queryString = require("query-string");
const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

async function buscarCategoria(query) {
  
    const { data } = await Axios.get(`/categoria1/buscarcategoria?` + query);
    return data;
  }

  
export const Categoria = () => {
    const [cargandoGrid, set_cargandoGrid] = useState(true);
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();
    const [busqueda, setBusqueda] = useState("");
    const [filtros, set_filtros] = useState({});

    useEffect( () => {
        async function initiaLoad(){
            try{
                let query = await queryString.stringify({ busqueda, page: activePage, limit });
                let listCategorias = await buscarCategoria(query);
                changePage(activePage, listCategorias);
                set_cargandoGrid(false);
            } catch (error){
                console.log(error)
            }
        }
        initiaLoad();
    }, []);

    function handleInputChange(e) {
        set_filtros({
            ...filtros,
            [e.target.name]: e.target.value.toUpperCase(),
          });
    }
    const handlePageChange = async (pageNumber) => {

        let query = await queryString.stringify({ page: pageNumber, limit });
        if (busqueda) {
          query += `&${busqueda}`;
        }
    
        let listCategorias = await buscarCategoria(query);
        changePage(pageNumber, listCategorias)
      };

    const ejecutarEliminar = (id) => {
        Axios.delete(`/categoria/${id}`)
          .then(() => {
            ejecutarCategoriaFilter(busqueda);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const buscarCategoriaFilter = async (e) => {
        let valorFiltros = "";
        if (filtros) {
          $.each(filtros, function (key, value) {
            if (value === "" || value === null) {
              delete filtros[key];
            }
          });
          valorFiltros = $.param(filtros);
    
        }
    
        ejecutarCategoriaFilter(valorFiltros);
    }

    const ejecutarCategoriaFilter = async (datosfiltro) => {
        
        set_cargandoGrid(true);
        setBusqueda(datosfiltro);
        let query = await queryString.stringify({ page: 1, limit });
        if (datosfiltro) {
          query += `&${datosfiltro}`;
        }
        let listCategorias = await buscarCategoria(query);
        changePage(1, listCategorias);
        set_cargandoGrid(false);
      };
    
    const limpiarCategoriaFilter = (e) => {
        $("#descripcion").val("");
        set_filtros({});
        ejecutarCategoriaFilter("");
    }

    // const cerrarModal = (estado) => {
    //     setMostrarPopup(estado);
    //   };
    
    const callbackEliminarCategoria = (idcategoria) => {
        try {
    
          const toastrConfirmOptions = {
            onOk: () => ejecutarEliminar(idcategoria),
          };
          toastr.confirm(
            `¿Desea eliminar el Documento interno: ${idcategoria}?`,
            toastrConfirmOptions
          );
        } catch (e) {
          toastr.error(
            "Búsqueda de Categoria",
            "Se encontró un error: " + e.message
          );
        }
      };
    const cabecerasTabla = [
        "#",
        "ID",
        "NOMBRE CATEGORIA",
        "USUARIO REGISTRO",
        "FECHA REGISTRO",
        "ACCIONES",
      ];

    return (
        <>
        <WraperLarge titleForm={"Listado de Categoria"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
            <form className={"form-horizontal"}>
                <legend className="mleft-20">
                    <i class="fa fa-filter"></i> Filtro de Busqueda de Categoria
                </legend>
                <div className="form-group">
                    <label className="col-lg-2 control-label">
                      Categoria
                    </label>
                    <div className="col-lg-4">
                    <input
                        type="text"
                        className="form-control input-sm"R
                        id="descripcion"
                        name="descripcion"
                        placeholder="Categoria"
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
                             onClick={limpiarCategoriaFilter}
                            className="btn btn-default btn-sm fullborder  btn-control"
                            >
                            <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                            </button>
                            <button
                            type="button"
                            onClick={buscarCategoriaFilter}
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
                        Resultados de Búsqueda de Categorias
                        </legend>
                    </div>
                    {/* </div> */}
                    <div className="col-md-6 text-right">

                        <Link
                        to={`/categoria-add`}
                        className="btn btn-danger btn-sm fullborder  btn-control"
                        >
                        <i className="fa fa-plus-circle"></i> Agregar
                        </Link>
                    </div>
                    </div>
                </div>
                    {/* Grilla de resultados */}
                    <div className="panel panel-default">
                        {cargandoGrid ? (
                            <Loading></Loading>
                        ): (
                            <>
                        <TableCategoria cabecera={cabecerasTabla}>
                            {list.rows.map((categoria,i)=>(
                                <CategoriaRow
                                nro={i}
                                categoria = {categoria}
                                callback = {callbackEliminarCategoria}
                                >
                                </CategoriaRow> 
                            )
                            )}
                        </TableCategoria>
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
                </form>
            </WraperLarge>
            
        </>
    )
}
