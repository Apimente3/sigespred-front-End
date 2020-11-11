import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { LISTADO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import TablePlano from "../_ddp_planos/TablePlano";

const OrdenServicio = () => {

  async function buscarOrdenServicio(query) {
    const { data } = await Axios.get(`/ordenservicio/buscar?` + query);
    return data;
  }

  const cabecerasTabla = [
    "",
    "ID",
    "APELLIDOS Y NOMBRES",
    "AÑO",
    "MES",
    "Nº REQUERIMIENTO",
    "Nº O/S",
    "PERIODO SERVICIO",
    "VENCIMIENTO O/S",
    "COORDINADOR",
    "EQUIPO TRABAJO",
    "ACCIONES",
  ];
  return (
    <>
      <WraperLarge
        titleForm={"Listado de Ordenes de Servicios"}
        listbreadcrumb={LISTADO_PARTIDA_BREADCRUM}
      >
        <legend className="mleft-20">
          <i class="fa fa-filter"></i> Filtro de Busqueda de Ordenes de servicio
        </legend>

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
          <div className="col-lg-6">
            <legend className="fullborder">Resultados de Búsqueda de Ordenes de Servicios</legend>
          </div>
          <div className="col-lg-6 text-right">
            <Link
              to={`/orden-add`}
              className="btn btn-danger btn-sm fullborder"
            >
              <i className="fa fa-plus-circle"></i> Agregar Orden Servicio
            </Link>
          </div>
        </div>

        <div className="alert alert-info text-center">
              cargando...
        </div>

        <div className="panel panel-default">
          <TablePlano cabecera={cabecerasTabla}>
            {/* {dataPlanos.rows.map((plano, i) => (
                            <PlanoRow nro={i} plano={plano} callback={callbackEliminarPlano} loadfiles={cargarPopupDigitales}></PlanoRow>
                        ))} */}
          </TablePlano>
        </div>
      </WraperLarge>
    </>
  );
};

export default OrdenServicio;
