import React, { useState, useEffect, useRef } from "react";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";

const { $ } = window;

const PartidaAdd = ({ history }) => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);

  //   function handleInputChange(e) {
  //     if (['nroexpediente'].includes(e.target.name)) {
  //         set_plano({
  //             ...plano,
  //             [e.target.name]: e.target.value.toUpperCase()
  //         });
  //     }else{
  //         set_plano({
  //             ...plano,
  //             [e.target.name]: e.target.value
  //         });
  //     }
  //     //TODO: remover console
  //     console.log(plano);
  // }

  return (
    <>
      <SidebarAdm />
      <form onSubmit>
        <div className="container mtop-20">
          <fieldset className={"fielsettext"}>
            <legend align="mtop-25 center fielsettext ">
              <label className={"titleform"}>REGISTRAR PARTIDA REGISTRAL</label>
            </legend>
          </fieldset>
          <div className="form-group mtop-25">
            <div className="row">
              <div className="col-md-6">
                {/* <fieldset> */}
                {/* <legend>TEST</legend> */}
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">
                      <span className="obligatorio">* </span>Proyecto
                    </label>
                  </div>
                  <div className="col-md-8">
                    <div className="col-md-8">
                      <select
                        className="form-control"
                        id="gestionpredialid"
                        name="gestionpredialid"
                        required
                        title="El Proyecto es requerido"
                        // onChange={handleInputChange}
                      >
                        <option value="">--SELECCIONE--</option>
                        {resListaProyectos.error ? (
                          "Se produjo un error cargando los proyectos"
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
                </div>
                {/* </fieldset> */}
              </div>
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">Asiento</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      id="asiento"
                      name="asiento"
                      placeholder="Ingrese numero de asiento"
                      //   onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">Tramo</label>
                  </div>
                  <div className="col-md-8">
                    <select
                      id="tramo"
                      name="tramo"
                      className="form-control"
                    //   onChange={handleInputChange}
                    >
                      <option value="0">--SELECCIONE--</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PartidaAdd;
