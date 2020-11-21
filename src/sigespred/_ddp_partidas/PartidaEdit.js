import { initAxiosInterceptors } from "../../config/axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ACTUALIZAR_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import ComboOptions from "../../components/helpers/ComboOptions";
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { editar } from "../../actions/_ddp_partida/Actions";
import MultipleUpload from "../../components/uploader/MultipleUpload";

const { $ } = window;
const axios = initAxiosInterceptors();
const directorioPartidas = "FilesDDP/Partidas";

const obtenerPartida = async (id) => {
  const { data } = await axios.get(`/partidaregistral?id=${id}`);
  console.log('--------------------------------')
  console.log(id);
  return data;
};

const PartidaEdit = ({ history, match }) => {
  const [partidaEdicion, setPartidaEdicion] = useState({});
  const editarPartidaAction = (partida) => dispatch(editar(partida));

  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPOPRED,
  ]);
  const [partidaEditado, set_partidaEditado] = useState({});
  const [dataTramo, setDataTramo] = useState(null);
  //const { id } = useParams();
  const {id} = match.params;

  function handleInputChange(e) {
    if (e.target.name) {
      partidaEdicion[e.target.name] = e.target.value;
      set_partidaEditado({
        ...partidaEditado,
        [e.target.name]: e.target.value,
      });
    }
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
        listbreadcrumb={ACTUALIZAR_PARTIDA_BREADCRUM}
      >
        <form onSubmit={actualizar}>
        <fieldset className="mleft-20">
        <legend>Datos de Generales</legend>
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
              <span className="obligatorio">* </span>Número de Partida
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
            <label className="col-lg-2 control-label">Tramo</label>
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
          </div>

          <div className="form-group">
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
                pattern="\d{1,5}"
              ></input>
            </div>

            <label className="col-lg-2 control-label">Observación</label>
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
          </fieldset>


          <fieldset className="mleft-20">
            <legend>Datos de Respuesta</legend>
            <div className="form-group ">

            <label className="col-lg-2 control-label">
                Fecha de Atención
              </label>
              <div className="col-lg-4">
                <input
                  style={{ lineHeight: "1.43" }}
                  type="date"
                  id="fechaatencion"
                  name="fechaatencion"
                  className="form-control"
                  value={partidaEdicion.fechaatencion || ""}
                  onChange={handleInputChange}
                />
              </div>

              <label className="col-lg-2 control-label">
                Gravamen del Predio
              </label>
              <div className="col-lg-4">
                <select
                  id="gravamentpredio"
                  className="form-control"
                  name="gravamentpredio"
                  onChange={handleInputChange}
                  value={partidaEdicion.gravamentpredio}
                >
                  <option value="">--SELECCIONE--</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-2 control-label">
                Carga {" "}
              </label>
              <div className="col-lg-4">
                <select
                  id="cargapredio"
                  className="form-control"
                  name="cargapredio"
                  onChange={handleInputChange}
                  value={partidaEdicion.cargapredio}
                >
                  <option value="">--SELECCIONE--</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                </select>
              </div>

              <label className="col-lg-2 control-label">
                Transferencias del Predio
              </label>
              <div className="col-lg-4">
                <input
                  className="form-control input-sm"
                  type="text"
                  name="transferenciaspredio"
                  id="transferenciaspredio"
                  onChange={handleInputChange}
                  placeholder="Ingrese la transferencia del predio"
                  value={partidaEdicion.transferenciaspredio}
                ></input>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-2 control-label">Observación</label>
              <div className="col-lg-4">
                <input
                  className="form-control input-sm"
                  type="text"
                  name="observacionrespuesta"
                  id="observacionrespuesta"
                  onChange={handleInputChange}
                  placeholder="Ingrese alguna observación"
                  value={partidaEdicion.observacionrespuesta}
                  
                ></input>
              </div>
            </div> 
            
          </fieldset>

          <div className="form-group col-lg-6">
            <fieldset className="mleft-20">
              <legend>Archivos</legend>

              <div className="form-group">
                <MultipleUpload
                  key="multiple"
                  accept={".*"}
                  folderSave={directorioPartidas}
                  form={partidaEdicion}
                  setForm={setPartidaEdicion}
                  nameUpload={"archivos"}
                ></MultipleUpload>
              </div>
            </fieldset>
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
