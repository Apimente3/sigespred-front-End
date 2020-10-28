import { initAxiosInterceptors } from "../../config/axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { REGISTRO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import { useForm } from "./useForm";
import ComboOptions from "../../components/helpers/ComboOptions";
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { editar } from "../../actions/_ddp_partida/Actions";

const { $ } = window;
const axios = initAxiosInterceptors();

const obtenerPartida = async (id) => {
  const { data } = await axios.get(`/partidaregistral?id=${id}`);
  return data;
};

const PartidaEdit = ({ history, match }) => {
  //const {id} = match.params;
  const [partidaEdicion, setPartidaEdicion] = useState({});
  const editarPartidaAction = (partida) => dispatch(editar(partida));
  //   const [formValues, handleInputChange] = useForm ({

  //   });
  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPOPRED,
  ]);
  const [partidaEditado, set_partidaEditado] = useState({});
  const [dataTramo, setDataTramo] = useState(null);
  const { id } = useParams();

  function handleInputChange(e) {
    if (e.target.name) {
      partidaEdicion[e.target.name] = e.target.value;
      set_partidaEditado({
        ...partidaEditado,
        [e.target.name]: e.target.value,
      });
    }
    //TODO: remover console
  }

  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      let data = await helperGets.helperGetListTramos(e.target.value);
      setDataTramo(data);
    } else {
      setDataTramo(null);
    }
  };

  useEffect(() => {
    const getPartida = async (idpartida) => {
      let partidaDB = await obtenerPartida(idpartida);
      setPartidaEdicion(partidaDB);
      let data = await helperGets.helperGetListTramos(
        partidaDB.infraestructuraid
      );
      setDataTramo(data);
    };
    getPartida(id);
  }, []);

  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);

  const dispatch = useDispatch();

  const actualizar = async (e) => {
    e.preventDefault();

    set_partidaEditado({
      ...partidaEditado,
    });

    $("#btnguardar").button("loading");
    try {
      await editarPartidaAction(partidaEdicion);
      toastr.success(
        "Actualización de Partida",
        "La partida fue actualizado correctamente."
      );
      $("#btnguardar").button("reset");
      history.push("/partidas");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <>
      <Wraper
        titleForm={"Edición de Partida: " + partidaEdicion.id}
        listbreadcrumb={REGISTRO_PARTIDA_BREADCRUM}
      >
        <form onSubmit={actualizar}>
          <div className="form-group">
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span> Proyecto
            </label>
            <div className="col-lg-4">
              <select
                id="infraestructuraid"
                className="form-control input-sm"
                name="infraestructuraid"
                value={partidaEdicion.infraestructuraid}
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
                value={partidaEdicion.nropartida}
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
                value={partidaEdicion.tramoid}
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
                value={partidaEdicion.subtramoid}
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
                value={partidaEdicion.tipopredioid}
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
                value={partidaEdicion.areapredio}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Asiento</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="nroasiento"
                id="nroasiento"
                onChange={handleInputChange}
                placeholder="Ingrese numero de asiento"
                value={partidaEdicion.nroasiento}
              ></input>
            </div>

            <label className="col-lg-2 control-label">Observacion</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="observacion"
                id="observacion"
                onChange={handleInputChange}
                placeholder="Ingrese alguna observacion"
                value={partidaEdicion.observacion}
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
      </Wraper>
    </>
  );
};

export default PartidaEdit;
