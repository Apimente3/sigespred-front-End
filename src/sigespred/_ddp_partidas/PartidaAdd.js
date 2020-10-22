import React, { useState, useEffect, useRef } from "react";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useDispatch, useSelector } from "react-redux";
import { agregar } from "../../actions/_ddp_partida/Actions";
import Wraper from "../m000_common/formContent/Wraper";
import { REGISTRO_PARTIDA_BREADCRUM } from "../../config/breadcrums";

const { $ } = window;
const Axios = initAxiosInterceptors();

const PartidaAdd = ({ history }) => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPOPRED,
  ]);
  const [partida, set_partida] = useState({ observaciones: "Nuevo Registro" });

  const dispatch = useDispatch();
  const agregarPartidaComp = (partida) => dispatch(agregar(partida));

  const obtenerTramos = async () => {
    const { data } = await Axios.get(`/tramo`);
    return data;
  };

  useEffect(() => {
    console.log("Hey");
  }, [partida]);

  function handleChangeProject(e) {
    if (!obtenerTramos.loading) {
      let data = obtenerTramos.result;
      let provList = data[Object.keys(data)[0]].filter(
        (o) => o.id_dpto === e.target.value
      );
      // set_dataProv({data: provList});
      // set_dataDist(null);
    }
  }
  const handleInputChange = ({ target }) => {
    set_partida({
      ...partida,
      [target.name]: target.value,
    });
  };
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
  const limpiarForm = () => {
    set_partida({ observaciones: "Nuevo Registro" });
  };

  const registrar = async (e) => {
    e.preventDefault();
    $("#btnguardar").button("loading");
    try {
      await agregarPartidaComp(partida);

      $("#btnguardar").button("reset");
      const toastrConfirmOptions = {
        onOk: () => limpiarForm(),
        onCancel: () => history.push("/partidaregistral"),
      };
      toastr.confirm("¿ Desea seguir registrando ?", toastrConfirmOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <Wraper
        titleForm={"Registro de Partida Registral"}
        listbreadcrumb={REGISTRO_PARTIDA_BREADCRUM}
      >
        <form onSubmit={registrar}>
          <div className="form-group">
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span> Proyecto
            </label>
            <div className="col-lg-4">
              <select
                id="gestionpredialid"
                className="form-control input-sm"
                name="gestionpredialid"
                // value={trabajador.rol}
                onChange={handleInputChange}
              >
                <option value="0">--SELECCIONE--</option>
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
            <label className="col-lg-2 control-label">Asiento</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="asiento"
                onChange={handleInputChange}
                placeholder="Ingrese numero de asiento"
                // value={trabajador.contrasenia}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Tramo</label>
            <div className="col-lg-4">
              <select
                id="tramo"
                className="form-control input-sm"
                name="tramo"
                id="tramo"
                // value={trabajador.rol}
                onChange={handleInputChange}
              >
                <option value="0">--SELECCIONE--</option>
                <option value="1">TRAMO 01</option>
                <option value="2">TRAMO 02</option>
                <option value="3">TRAMO 03</option>
              </select>
            </div>
            <label className="col-lg-2 control-label">Sub Tramo</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="subtramo"
                id="subtramo"
                onChange={handleInputChange}
                placeholder="Ingrese el sub tramo"
                // value={trabajador.contrasenia}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Tipo de Predio</label>
            <div className="col-lg-4">
              <select
                id="tipopredio"
                className="form-control input-sm"
                name="tramo"
                id="tipopredio"
                // value={trabajador.rol}
                onChange={handleInputChange}
              >
                <option value="0">--SELECCIONE--</option>
                {resListaTipoPredio.error ? (
                  "Se produjo un error cargando los proyectos"
                ) : resListaTipoPredio.loading ? (
                  "Cargando..."
                ) : (
                  <ComboOptions
                    data={resListaTipoPredio.result}
                    valorkey="valorcodigo"
                    valornombre="valortexto"
                  />
                )}
              </select>
            </div>
            <label className="col-lg-2 control-label">Area del Predio</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="areapredio"
                id="areapredio"
                onChange={handleInputChange}
                placeholder="Ingrese el area del predio"
                // value={trabajador.contrasenia}
              ></input>
            </div>
          </div>


          <div className="form-group">
          <label className="col-lg-2 control-label">Observacion</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="observaciones"
                id="observaciones"
                onChange={handleInputChange}
                placeholder="Ingrese alguna observacion"
                // value={trabajador.contrasenia}
              ></input>

            </div>

            <div className="col-lg-4">
            </div>
          </div>


          <div className="container mtop-20">
            <fieldset className={"fielsettext"}>
              <legend align="mtop-25 center fielsettext ">
                <label className={"titleform"}>
                  REGISTRAR PARTIDA REGISTRAL
                </label>
              </legend>
            </fieldset>
            <div className="form-group mtop-25">
              <div className="row">
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">
                        <span className="obligatorio">* </span>Proyecto
                      </label>
                    </div>
                    <div className="col-md-8">
                      <select
                        className="form-control"
                        id="gestionpredialid"
                        name="gestionpredialid"
                        required
                        title="El Proyecto es requerido"
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">Tramo</label>
                    </div>
                    <div className="col-md-8">
                      <select
                        className="form-control"
                        id="tramo"
                        name="tramo"
                        required
                        title="El Proyecto es requerido"
                        //   onChange={(e) => {
                        //         handleChangeProject(e);
                        //   }}
                      >
                        <option value="">--SELECCIONE--</option>
                        <option value="1">TRAMO 01</option>
                        <option value="2">TRAMO 02</option>
                        <option value="3">TRAMO 03</option>
                        {/* {obtenerTramos.error ? (
                        "Se produjo un error cargando los proyectos"
                      ) : obtenerTramos.loading ? (
                        "Cargando..."
                      ) : (
                        <ComboOptions
                          data={obtenerTramos.result}
                          valorkey="id"
                          valornombre="denominacion"
                        />
                      )} */}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">Sub Tramo</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control "
                        id="subtramo"
                        name="subtramo"
                        placeholder="Ingrese el subtramo"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">Tipo Predio</label>
                    </div>
                    <div className="col-md-8">
                      <select
                        className="form-control"
                        id="tipopredio"
                        name="tipopredio"
                        required
                        title="El Proyecto es requerido"
                        onChange={handleInputChange}
                      >
                        <option value="">--SELECCIONE--</option>
                        {resListaTipoPredio.error ? (
                          "Se produjo un error cargando los proyectos"
                        ) : resListaTipoPredio.loading ? (
                          "Cargando..."
                        ) : (
                          <ComboOptions
                            data={resListaTipoPredio.result}
                            valorkey="valorcodigo"
                            valornombre="valortexto"
                          />
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">Area del Predio</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control "
                        id="areapredio"
                        name="areapredio"
                        placeholder="Ingrese el area del predio"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right"></div>
                    <div className="col-md-8"></div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">Observacion 11</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        id="observaciones"
                        name="observaciones"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr></hr>
              <div className="panel-body">
                <div className="form-group ">
                  <div className="col-lg-offset-2 col-lg-10 text-right">
                    <button
                      id="btnguardar"
                      type="submit"
                      className="btn btn-danger btn-sm btn-control"
                    >
                      Guardar
                    </button>
                    <Link
                      to={`/partidas`}
                      className="btn btn-default btn-sm btn-control"
                    >
                      Cancelar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Wraper>
    </>
  );
};

export default PartidaAdd;
