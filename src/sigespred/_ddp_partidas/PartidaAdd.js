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
import { useForm } from "../../hooks/useForm";
import MultipleUpload from "../../components/uploader/MultipleUpload";

const { $ } = window;
const Axios = initAxiosInterceptors();
const directorioPartidas = "FilesDDP/Partidas";

const PartidaAdd = ({ history }) => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPOPRED,
  ]);

  //const [partida, set_partida] = useState({ observacion: "Nuevo Registro" });
  const [partida, set_partida, handleInputChange, reset] = useForm({}, [""]);

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

  

  const registrar = async (e) => {
    console.log(partida);
    e.preventDefault();
    
    try {
      await agregarPartidaComp(partida);

      
      toastr.success("Registro Correcto", "Se registro correctamente.", {
        position: "top-right",
      });
      history.push("/partidas");
      
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
        <form onSubmit={registrar} className={"form-horizontal"}>
          <fieldset className="mleft-20">
            <div className="form-group">
              <legend>Datos de Generales</legend>
              <label className="col-lg-2 control-label">
                <span className="obligatorio">* </span> Proyecto
              </label>
              <div className="col-lg-4">
                <select
                  id="infraestructuraid"
                  className="form-control input-sm"
                  name="infraestructuraid"
                  // value={partida.infraestructuraid}
                  onChange={(e) => {
                    handleChangeProyecto(e);
                    handleInputChange(e);
                  }}
                  required
                  title="El proyecto es requerido"
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
                  value={partida.nropartida || ""}
                  autoComplete="off"
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
                  value={partida.tramoid}
                  onChange={handleInputChange}
                  title="El tramo es requerido"
                >
                  <option value="">--SELECCIONE--</option>
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
                  value={partida.subtramoid}
                ></input>
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
                  value={partida.fechaatencion || ""}
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
                  value={partida.gravamentpredio}
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
                  value={partida.cargapredio}
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
                  value={partida.transferenciaspredio}
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
                  value={partida.observacionrespuesta}
                  
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
                  form={partida}
                  setForm={set_partida}
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
      </WraperLarge>
    </>
  );
};

export default PartidaAdd;
