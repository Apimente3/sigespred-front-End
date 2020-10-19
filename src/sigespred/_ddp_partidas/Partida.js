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
import GridPartida from "../m000_common/grids/GridPartida";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

export const Partida = () => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);

  const definirFiltro = () => {
    let valFiltro = "";
    let valorNumPartida = $("#numpartida")
      .val()
      .trim();
    if (valorNumPartida) {
      valFiltro = `numpartida=${valorNumPartida}`;
    }

    console.log(valFiltro);
  };

  const [proyectos, set_proyectos] = useState([]);

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
            <li className="active">Búsqueda de Partidas Registrales</li>
          </ul>
        </div>
        <div className="padding-md container">
          <fieldset className={"fielsettext"}>
            <legend align="mtop-25 center fielsettext ">
              <label className={"titleform"}>
                LISTADO DE PARTIDAS REGISTRALES
              </label>
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
                            Nro de Partida
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control "
                            id="numpartida"
                            name="numpartida"
                            placeholder="Numero de Partida Registral"
                            onBlur={definirFiltro}
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="control-label">Proyecto</label>
                        </div>
                        <div className="col-md-4">
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
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <label className="control-label">Tramo</label>
                        </div>
                        <div className="col-md-4">
                          <select
                            className="form-control"
                            id="tramoid"
                            name="tramoid"
                          >
                            <option value="">--SELECCIONE--</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="control-label">Sub Tramo</label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control "
                            id="subtramo"
                            name="subtramo"
                            placeholder="Ingrese el subtramo"
                            onBlur={definirFiltro}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <label className="control-label">
                            Fecha de Creación
                          </label>
                        </div>

                        <div className="col-md-4">
                          <DateRangePicker
                            initialSettings={{
                              locale: {
                                cancelLabel: "Limpiar",
                                applyLabel: "Aplicar",
                                weekLabel: "S",
                                customRangeLabel: "Rango Personalizado",
                                daysOfWeek: [
                                  "Do",
                                  "Lu",
                                  "Ma",
                                  "Mi",
                                  "Ju",
                                  "Vi",
                                  "Sá",
                                ],
                                monthNames: [
                                  "Enero",
                                  "Febrero",
                                  "Marzo",
                                  "Abril",
                                  "Mayo",
                                  "Junio",
                                  "Julio",
                                  "Agosto",
                                  "Setiembre",
                                  "Octubre",
                                  "Noviembre",
                                  "Diciembre",
                                ],
                              },
                              ranges: {
                                Hoy: [moment().toDate(), moment().toDate()],
                                Ayer: [
                                  moment()
                                    .subtract(1, "days")
                                    .toDate(),
                                  moment()
                                    .subtract(1, "days")
                                    .toDate(),
                                ],
                                "Últimos 7 días": [
                                  moment()
                                    .subtract(6, "days")
                                    .toDate(),
                                  moment().toDate(),
                                ],
                                "Últimos 30 días": [
                                  moment()
                                    .subtract(29, "days")
                                    .toDate(),
                                  moment().toDate(),
                                ],
                                "Este mes": [
                                  moment()
                                    .startOf("month")
                                    .toDate(),
                                  moment()
                                    .endOf("month")
                                    .toDate(),
                                ],
                                "Último mes": [
                                  moment()
                                    .subtract(1, "month")
                                    .startOf("month")
                                    .toDate(),
                                  moment()
                                    .subtract(1, "month")
                                    .endOf("month")
                                    .toDate(),
                                ],
                              },
                            }}
                          >
                            <input
                              id="fechacreacion"
                              type="text"
                              className="form-control"
                            />
                          </DateRangePicker>
                        </div>
                        <div className="col-md-2">
                          <label className="control-label">Tipo Predio</label>
                        </div>
                        <div className="col-md-4">
                          <select
                            id="condigital"
                            className="form-control"
                            name="rol"
                          >
                            <option value="">--SELECCIONE--</option>
                            <option value="true">URBANO</option>
                            <option value="falseL">RURAL</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div>
                  <GridPartida />
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
export default Partida;
