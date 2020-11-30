import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import { Link, useParams } from "react-router-dom";
import ComboOptions from "../../components/helpers/ComboOptions";
import UploadMemo from "../../components/helpers/uploaders/UploadMemo";
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
} from "../../components/forms";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useForm } from "../../hooks/useForm";

import { initAxiosInterceptors } from "../../config/axios";
import { ACTUALIZAR_DOCINTERNOS_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import { useAsync } from "react-async-hook";
import MultipleUpload from "../../components/uploader/MultipleUpload";
import ComboOptionsGroup from "../../components/helpers/ComboOptionsGroup";

const Axios = initAxiosInterceptors();
const { $ } = window;
const directorioDocInterno = "FilesDDP/DocumentoInterno";

async function obtenerDocumentoInterno(id) {
  const { data } = await Axios.get(`/docinterno?id=${id}`);
  return data;
}

async function updateDocumentoInterno(documentosInternos) {
  const { data } = await Axios.put(
    `/docinterno/${documentosInternos.id}`,
    documentosInternos
  );
  return data;
}

const DocInternoEdit = ({ match, history }) => {
  const { id } = match.params;
  const [
    documentosInternos,
    setDocumentosInternos,
    handleInputChange,
    reset,
  ] = useForm({ archivos: [] }, ["comentario"]);
  //const [documentosInternos, setDocumentosInternos] = useState({});
  const [showRespuesta, setShowRespuesta] = useState(false)
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const [documentosInternosEditado, set_DocumentosInternosEditado] = useState(
    {}
  );
  const resListaReqArea = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.REQAREALIST,
  ]);
  const resListaTipoDocInterno = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPODOCINTER,
  ]);
  const [dataEquipo, setDataEquipo] = useState(null);
  const resListaSubAreas = useAsync(helperGets.helperGetListaSubAreas, []);

  /*Valiables Globales*/
  useEffect(() => {
    const init = async () => {
      let docInterno = await obtenerDocumentoInterno(id);
      cargarEquipo(docInterno.gestionpredialid);
      setDocumentosInternos(docInterno);
      if (docInterno.respuesta == 'EN ATENCION'){
        setShowRespuesta(true)
      }else{
        setShowRespuesta(false)
      }
    };
    init();
  }, []);


  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      let dataEq = await helperGets.helperGetListEquipos(e.target.value);
      setDataEquipo(dataEq);
    } else {
      setDataEquipo(null);
    }
  };

  const handleRespuesta = async (e) => {
    if (e.target.value == 'EN ATENCION'){
      setShowRespuesta(true)
    } else {
      setShowRespuesta(false)
    }
  }
  

  const cargarEquipo = async (idProyecto) => {
    if (idProyecto) {
      let data = await helperGets.helperGetListEquipos(idProyecto);
      setDataEquipo(data);
    } else {
      setDataEquipo(null);
    }
  };

  const actualizar = async (e) => {
    e.preventDefault();

    set_DocumentosInternosEditado({
      ...documentosInternosEditado,
    });

    //$("#btnguardar").button("loading");
    try {
      await updateDocumentoInterno(documentosInternos);
      toastr.success(
        "Actualización del documento interno",
        "El documento interno fue actualizado correctamente.",
        { position: "top-right" }
      );
      //$("#btnguardar").button("reset");
      history.push("/docinternos");
    } catch (e) {
      toastr.error("Registro Incorrecto", JSON.stringify(e), {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Wraper
        titleForm={"Edicion del Documento interno " + documentosInternos.id}
        listbreadcrumb={ACTUALIZAR_DOCINTERNOS_BREADCRUM}
      >
        <form onSubmit={actualizar} className={"form-horizontal"}>
          <div className="form-group">
            <div className="form-group col-lg-12">
              <fieldset className="mleft-20">
                <legend>Datos de Generales</legend>
                <div className="form-group">
                  <label className="col-lg-2 control-label">
                    <span className="obligatorio">* </span>Proyecto
                  </label>
                  <div className="col-lg-4">
                    <select
                      className="form-control"
                      id="gestionpredialid"
                      name="gestionpredialid"
                      required
                      onChange={(e) => {
                        handleChangeProyecto(e);
                        handleInputChange(e);
                      }}
                      value={documentosInternos.gestionpredialid || ""}
                      readOnly
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
                  <label className="col-lg-2 control-label">
                    <span className="obligatorio">* </span> Equipo
                  </label>
                  <div className="col-lg-4">
                    <select
                      className="form-control input-sm"
                      id="equipoid"
                      name="equipoid"
                      required
                      // title="El Tipo de Plano es requerido"
                      onChange={handleInputChange}
                      value={documentosInternos.equipoid || ""}
                    >
                      <option value="">--SELECCIONE--</option>
                      {dataEquipo && (
                        <ComboOptions
                          data={dataEquipo}
                          valorkey="id"
                          valornombre="equipo"
                        />
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-2 control-label">
                    <span className="obligatorio">* </span> Tipo de Documento
                  </label>
                  <div className="col-lg-4">
                    {resListaTipoDocInterno.error ? (
                      "Se produjo un error cargando los tipos de documento"
                    ) : resListaTipoDocInterno.loading ? (
                      "Cargando..."
                    ) : (
                      <select
                        className="form-control input-sm"
                        id="tipodocumento"
                        name="tipodocumento"
                        value={documentosInternos.tipodocumento}
                        onChange={handleInputChange}
                      >
                        <option value="">--SELECCIONE--</option>
                        <ComboOptions
                          data={resListaTipoDocInterno.result}
                          valorkey="valorcodigo"
                          valornombre="valortexto"
                        />
                      </select>
                    )}
                  </div>
                  <label className="col-lg-2 control-label">
                    Código STD
                  </label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="codigostd"
                      name="codigostd"
                      placeholder="Codigo STD"
                      title="El codigo STD  es requerido"
                      autoComplete="off"
                      value={documentosInternos.codigostd || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-2 control-label">
                     Respuesta
                  </label>
                  <div className="col-lg-4">
                    {/* {resListaTipoDocInterno.error ? (
                      "Se produjo un error cargando el tipo de documento"
                    ) : resListaTipoDocInterno.loading ? (
                      "Cargando..."
                    ) : ( */}
                    <select
                      className="form-control input-sm"
                      id="respuesta"
                      name="respuesta"
                      value={documentosInternos.respuesta}
                      onChange={(e) => {
                        handleInputChange(e);
                        handleRespuesta(e);
                      }}
                    >
                      <option value="">--SELECCIONE--</option>
                      <option value="EN ATENCION">EN ATENCION</option>
                      <option value="EN CONOCIMIENTO">EN CONOCIMIENTO</option>
                      {/* <ComboOptions
                          data={resListaTipoDocInterno.result}
                          valorkey="valorcodigo"
                          valornombre="valortexto"
                        /> */}
                    </select>
                    {/* )} */}
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="form-group col-lg-12">
              <fieldset className="mleft-20">
                <legend>Recepción</legend>
                <div className="form-group">
                  <label className="col-lg-2 control-label">
                    Fecha Recepción
                  </label>
                  <div className="col-lg-4">
                    <input
                      style={{ lineHeight: "1.43" }}
                      type="date"
                      id="fecharecepcion"
                      name="fecharecepcion"
                      className="form-control input-sm"
                      value={documentosInternos.fecharecepcion || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <label className="col-lg-2 control-label">
                    Nro Documento
                  </label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="numdocrecepcion"
                      name="numdocrecepcion"
                      placeholder="Nro Documento"
                      //title="El codigo STD  es requerido"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={documentosInternos.numdocrecepcion || ""}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-2 control-label">Asunto</label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="asuntorecepcion"
                      name="asuntorecepcion"
                      placeholder="asunto"
                      title="ingrese el asunto"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={documentosInternos.asuntorecepcion || ""}
                    />
                  </div>

                  <label className="col-lg-2 control-label">Referencia</label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="referencia"
                      name="referencia"
                      placeholder="referencia"
                      title="El codigo STD  es requerido"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={documentosInternos.referencia || ""}
                    />
                  </div>
                </div>

                <div className="form-group">
                <label className="col-lg-2 control-label">Áreas</label>
                  <div className="col-lg-4">
                    <select
                      className="form-control input-sm"
                      id="areaid"
                      name="areaid"
                      // required
                      // title="El area es requerido"
                      onChange={handleInputChange}
                      value={documentosInternos.areaid || ""}
                    >
                      <option value="">--SELECCIONE--</option>
                      {resListaSubAreas.error ? (
                        "Se produjo un error cargando las sub areas"
                      ) : resListaSubAreas.loading ? (
                        "Cargando..."
                      ) : (
                        <ComboOptionsGroup
                          data={resListaSubAreas.result}
                          valorkey="id"
                          valornombre="nombre"
                          valornombregrupo="nombre"
                          grupojson="SubArea"
                        />
                      )}
                    </select>
                  </div>
                  <div className="col-lg-4">
                    <MultipleUpload
                      key="multiple"
                      accept={".*"}
                      folderSave={directorioDocInterno}
                      form={documentosInternos}
                      setForm={setDocumentosInternos}
                      nameUpload={"archivorecepcion"}
                    ></MultipleUpload>
                  </div>
                </div>
              </fieldset>
            </div>
            {showRespuesta && 
              <div className="form-group col-lg-12">
                <fieldset className="mleft-20">
                <legend>Respuesta</legend>
                <div className="form-group">
                  <label className="col-lg-2 control-label">
                    Fecha Respuesta
                  </label>
                  <div className="col-lg-4">
                    <input
                      style={{ lineHeight: "1.43" }}
                      type="date"
                      id="fecharespuesta"
                      name="fecharespuesta"
                      className="form-control input-sm"
                      value={documentosInternos.fecharespuesta}
                      onChange={handleInputChange}
                    />
                  </div>
                  <label className="col-lg-2 control-label">
                    Nro Documento
                  </label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="numdocrespuesta"
                      name="numdocrespuesta"
                      placeholder="Nro Documento"
                      //title="El codigo STD  es requerido"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={documentosInternos.numdocrespuesta}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-2 control-label">
                    Adjuntar Documento
                  </label>
                  <div className="col-lg-4">
                    <MultipleUpload
                      key="multiple"
                      accept={".*"}
                      folderSave={directorioDocInterno}
                      form={documentosInternos}
                      setForm={setDocumentosInternos}
                      nameUpload={"archivorespuesta"}
                    ></MultipleUpload>
                  </div>

                  <label className="col-lg-2 control-label">Asunto</label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="asuntorespuesta"
                      name="asuntorespuesta"
                      placeholder="Asunto"
                      //title="El codigo STD  es requerido"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={documentosInternos.asuntorespuesta}
                    />
                  </div>
                </div>
                </fieldset>
              </div>
            }
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
      </Wraper>
    </>
  );
};

export default DocInternoEdit;
