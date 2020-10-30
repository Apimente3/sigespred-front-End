import React from "react";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import { initAxiosInterceptors } from "../../config/axios";
import { REGISTRO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import ComboOptions from "../../components/helpers/ComboOptions";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  Form,
  FormGroup,
  Row6,
  Row12,
  RowForm,
  Select,
  Input,
  Options,
  FormControl,
  InputInline,
  FormFooter,
  FormGroupInline,
} from "../../components/forms";

import UploadMemo from "../../components/helpers/uploaders/UploadMemo";

const { $ } = window;
const Axios = initAxiosInterceptors();

const DocInternoAdd = () => {
  const registrar = async (e) => {
    e.preventDefault();
    try {
      // await saveGestioPredial(gestionPredial)
      toastr.success("Registro Correcto", "Se registro correctamente.", {
        position: "top-right",
      });
    } catch (e) {
      toastr.error("Registro Incorrecto", JSON.stringify(e), {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <WraperLarge
        titleForm={"Registro de Documentacion interna "} // + partidaRespuesta.id}
        listbreadcrumb={REGISTRO_PARTIDA_BREADCRUM}
      >
        <form onSubmit={registrar}>
          <div className="form-group">
            <div className="form-group col-lg-11">
              <fieldset className="mleft-20">
                <legend>Datos de Generales</legend>
                <div className="form-group">
                  {/* <div className="form-group"> */}
                  <label className="col-lg-2 control-label">
                    <span className="obligatorio">* </span> Equipo de Trabajo
                  </label>
                  <div className="col-lg-4">
                    {/* {resListaProyectos.error ? (
                  "Se produjo un error cargando los proyectos"
                ) : resListaProyectos.loading ? (
                  "Cargando..."
                ) : ( */}
                    <select
                      className="form-control input-sm"
                      id="infraestructuraid"
                      name="infraestructuraid"
                      // value={partidaRespuesta.infraestructuraid || ""}
                    >
                      <option value="">--SELECCIONE--</option>
                      <ComboOptions
                        //   data={resListaProyectos.result}
                        valorkey="id"
                        valornombre="denominacion"
                      />
                    </select>
                    {/* )} */}
                  </div>
                  <label className="col-lg-2 control-label">
                    <span className="obligatorio">* </span>Monitor
                  </label>
                  <div className="col-lg-4">
                    {/* {resListaProyectos.error ? (
                  "Se produjo un error cargando los proyectos"
                ) : resListaProyectos.loading ? (
                  "Cargando..."
                ) : ( */}
                    <select
                      className="form-control input-sm"
                      id="monitor"
                      name="monitor"
                      // value={partidaRespuesta.infraestructuraid || ""}
                    >
                      <option value="">--SELECCIONE--</option>
                      <ComboOptions
                        //   data={resListaProyectos.result}
                        valorkey="id"
                        valornombre="denominacion"
                      />
                    </select>
                    {/* )} */}
                  </div>
                  {/* </div> */}
                </div>

                <div className="form-group">
                  <label className="col-lg-2 control-label">
                    <span className="obligatorio">* </span> Tipo de Documento
                  </label>
                  <div className="col-lg-4">
                    {/* {resListaProyectos.error ? (
                  "Se produjo un error cargando los proyectos"
                ) : resListaProyectos.loading ? (
                  "Cargando..."
                ) : ( */}
                    <select
                      className="form-control input-sm"
                      id="monitor"
                      name="monitor"
                      // value={partidaRespuesta.infraestructuraid || ""}
                    >
                      <option value="">--SELECCIONE--</option>
                      <ComboOptions
                        //   data={resListaProyectos.result}
                        valorkey="id"
                        valornombre="denominacion"
                      />
                    </select>
                    {/* )} */}
                  </div>
                  <label className="col-lg-2 control-label">
                    <span className="obligatorio">* </span> Codigo STD
                  </label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="codigostd"
                      name="codigostd"
                      placeholder="Codigo STD"
                      required
                      title="El codigo STD  es requerido"
                      autoComplete="off"
                      //   onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="form-group col-lg-11">
              <fieldset className="mleft-20">
                <legend>Recepcion</legend>
                <div className="form-group">
                  <label className="col-lg-2 control-label">
                    Fecha Recepcion
                  </label>
                  <div className="col-lg-4">
                    <input
                      style={{ lineHeight: "1.43" }}
                      type="date"
                      id="fecharecepcion"
                      name="fecharecepcion"
                      className="form-control input-sm"
                      //   onChange={handleInputChange}
                    />
                  </div>
                  <label className="col-lg-2 control-label">
                    Nro Documento
                  </label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="numdocumento"
                      name="numdocumento"
                      placeholder="Nro Documento"
                      //   title="El codigo STD  es requerido"
                      autoComplete="off"
                      //   onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-2 control-label">Comentario</label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="comentario"
                      name="comentario"
                      placeholder="comentario"
                      //   title="El codigo STD  es requerido"
                      autoComplete="off"
                      //   onChange={handleInputChange}
                    />
                  </div>
                  <label className="col-lg-2 control-label">
                    Adjuntar Documento
                  </label>
                  <div className="col-lg-4">
                    <UploadMemo
                      key="upload_portada_imagen"
                      file={{ urlDocumento: "" }}
                      accept={".*"}
                      //   setFile={setFilesArchivodigital}
                      //   folderSave={FilesGestionPredial.FilesSolicitud}
                      //   eliminar={deleteFilesArchivodigital}
                    >
                      {" "}
                    </UploadMemo>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <FormFooter>
            <Link
              to={`/docinternos`}
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
          </FormFooter>
        </form>
      </WraperLarge>
    </>
  );
};

export default DocInternoAdd;
