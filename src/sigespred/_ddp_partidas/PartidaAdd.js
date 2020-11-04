import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useDispatch, useSelector } from "react-redux";
import { agregar } from "../../actions/_ddp_partida/Actions";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import { REGISTRO_PARTIDA_BREADCRUM } from "../../config/breadcrums";

const { $ } = window;
const Axios = initAxiosInterceptors();

const PartidaAdd = ({ history }) => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPOPRED,
  ]);

  const [partida, set_partida] = useState({ observacion: "Nuevo Registro" });
  const [dataTramo, setDataTramo] = useState(null);
  const dispatch = useDispatch();
  const agregarPartidaComp = (partida) => dispatch(agregar(partida));

  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      let data = await helperGets.helperGetListTramos(e.target.value);
      setDataTramo(data);
    } else {
      setDataTramo(null);
    }
  };

  const limpiarForm = () => {
    set_partida({ observacion: "Nuevo Registro" });
  };

  const obtenerTramos = async () => {
    const { data } = await Axios.get(`/tramo`);
    return data;
  };

  // useEffect(() => {
  //   console.log("Hey");
  // }, [partida]);

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
    switch (target.name) {
      case "gestionpredialid":
        set_partida({
          ...partida,
          [target.name]: target.value,
          tramoid: "",
        });
        break;
      default:
        set_partida({
          ...partida,
          [target.name]: target.value.toUpperCase(),
        });
    }
  };

  const registrar = async (e) => {
    console.log(partida);
    e.preventDefault();
    //$("#btnguardar").button("loading");
    try {
      await agregarPartidaComp(partida);

      //$("#btnguardar").button("reset");
      toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'})
      history.push("/partidas")
      // const toastrConfirmOptions = {
      //   onOk: () => limpiarForm(),
      //   onCancel: () => history.push("/partidas"),
      // };
      // toastr.confirm("¿ Desea seguir registrando ?", toastrConfirmOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <WraperLarge
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
                id="infraestructuraid"
                className="form-control input-sm"
                name="infraestructuraid"
                value={partida.infraestructuraid}
                onChange={(e) => {
                  handleChangeProyecto(e);
                  handleInputChange(e);
                }}
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
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span>Numero de Partida
            </label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                required
                type="text"
                name="nropartida"
                id="nropartida"
                onChange={handleInputChange}
                placeholder="Ingrese numero de Partida"
                value={partida.nropartida}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span>Tramo
            </label>
            <div className="col-lg-4">
              <select
                className="form-control input-sm"
                name="tramoid"
                id="tramoid"
                value={partida.tramoid}
                onChange={handleInputChange}
              >
                <option value="0">--SELECCIONE--</option>
                {dataTramo && (
                  <ComboOptions
                    data={dataTramo}
                    valorkey="id"
                    valornombre="descripcion"
                  />
                )}
              </select>
            </div>
            <label className="col-lg-2 control-label">Sub Tramo</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="subtramoid"
                id="subtramoid"
                onChange={handleInputChange}
                placeholder="Ingrese el sub tramo"
                value={partida.subtramoid}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Tipo de Predio</label>
            <div className="col-lg-4">
              <select
                id="tipopredioid"
                className="form-control input-sm"
                name="tipopredioid"
                id="tipopredio"
                value={partida.tipopredioid}
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
            <label className="col-lg-2 control-label">Asiento</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="nroasiento"
                id="nroasiento"
                onChange={handleInputChange}
                placeholder="Ingrese numero de asiento"
                value={partida.nroasiento}
              ></input>
            </div>
          </div>

          <div className="form-group">
         

            <label className="col-lg-2 control-label">Observación</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="observacion"
                id="observacion"
                onChange={handleInputChange}
                placeholder="Ingrese alguna observacion"
                value={partida.observacion}
              ></input>
            </div>
          </div>

          <div className="panel-body">
            <div className="form-group ">
              <div className="col-lg-offset-2 col-lg-10 text-right">
                <Link
                  to={`/partidas`}
                  className="btn btn-default btn-sm btn-control"
                >
                  Cancelar
                </Link>
                <button
                  id="btnguardar"
                  type="submit"
                  className="btn btn-danger btn-sm btn-control"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </form>
      </WraperLarge>
    </>
  );
};

export default PartidaAdd;
