import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";
import GridEquipo from "../m000_common/grids/GridEquipo";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

export const Equipo = () => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);

  const definirFiltro = () => {
    let valFiltro = "";
    let valorNumPartida = $("#numequipo")
      .val()
      .trim();
    if (valorNumPartida) {
      valFiltro = `numequipo=${valorNumPartida}`;
    }

    console.log(valFiltro);
  };

  const [proyectos, set_proyectos] = useState([]);

 

  return (
    <>
      <SidebarAdm />
      <div>
        <div id="breadcrumb">
          <ul className="breadcrumb">
            <li>
              <i className="fa fa-home"></i>
              <a href="#"> Partida</a>
            </li>
            <li className="active">Búsqueda de Equipos</li>
          </ul>
        </div>
        <div className="padding-md container">
        <fieldset className={"fielsettext"}>
            <legend align="mtop-25 center fielsettext ">
              <label className={"titleform"}>
                LISTADO DE EQUIPOS
              </label>
              <Link
                to={`/equipo-add`}
                className="btn btn-danger pull-right btn-sm fullborder"
              >
                <i className="fa fa-plus"></i> Agregar Equipo
              </Link>
              <button
                type="button"
                className="btn btn-default pull-right btn-sm fullborder"
              >
                <i className="fa fa-file-excel-o"></i> Descargar Excel
              </button>
            </legend>
          </fieldset>
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <form>
                    <div className="form-group">
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <label className="control-label">
                            FILTRO
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control "
                            id="campofiltro"
                            name="campofiltro"
                            placeholder="Ingrese campo de filtro"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div>
                  <GridEquipo />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          PARTIDA REGISTRAL---------------------------------------------------
        </div> */}
      </div>
      <FooterProcess />
    </>
  );
};
export default Equipo;
