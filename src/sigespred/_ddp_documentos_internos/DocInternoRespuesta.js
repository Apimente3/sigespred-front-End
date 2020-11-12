import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import { Link, useParams } from "react-router-dom";
import { FormFooter } from "../../components/forms";
import ComboOptions from "../../components/helpers/ComboOptions";
import UploadMemo from "../../components/helpers/uploaders/UploadMemo";
import { initAxiosInterceptors } from "../../config/axios";
import { ACTUALIZAR_DOCINTERNOS_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import MultipleUpload from "../../components/uploader/MultipleUpload";
import { useForm } from "../../hooks/useForm";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useAsync } from "react-async-hook";

const { $ } = window;
const axios = initAxiosInterceptors();
const directorioDocInterno = "FilesDDP/DocumentoInterno";

async function obtenerDocumentoInterno(id) {
  // const { data } = await axios.get(`/docinterno/${id}`);
  const { data } = await axios.get(`/docinterno?id=${id}`);
  return data;
}

async function updateDocumentoInterno(documentosInternos) {
  const { data } = await axios.put(
    `/docinterno/${documentosInternos.id}`,
    documentosInternos
  );
  return data;
}

const DocInternoRespuesta = ({ history }) => {
  const { id } = useParams();
  const [
    documentosInternos,
    setDocumentosInternos,
    handleInputChange,
    reset,
  ] = useForm({}, [""]);
  // const [documentosInternos, setDocumentosInternos] = useState({});
  const [documentosInternosEditado, set_DocumentosInternosEditado] = useState(
    {}
  );
  const [dataEquipo, setDataEquipo] = useState(null);
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const resListaTipoDocInterno = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPODOCINTER,
  ]);
  // function handleInputChange(e) {
  //   if (e.target.name) {
  //     documentosInternos[e.target.name] = e.target.value;
  //     set_DocumentosInternosEditado({
  //       ...documentosInternosEditado,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // }

  useEffect(() => {
    const getDocumentoInterno = async (idDocInterno) => {
      let documentoInternoDB = await obtenerDocumentoInterno(idDocInterno);
      cargarEquipo(documentoInternoDB.gestionpredialid);
      setDocumentosInternos(documentoInternoDB);
    };
    getDocumentoInterno(id);
  }, []);

  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      let dataEq = await helperGets.helperGetListEquipos(e.target.value);
      setDataEquipo(dataEq);
    } else {
      setDataEquipo(null);
    }
  };

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

    $("#btnguardar").button("loading");
    try {
      await updateDocumentoInterno(documentosInternos);
      toastr.success(
        "Actualización del documento interno",
        "El documento interno fue actualizado correctamente."
      );
      $("#btnguardar").button("reset");
      history.push("/docinternos");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <>
      <Wraper
        titleForm={
          "Edicion del Documento interno en respuesta " + documentosInternos.id
        }
        listbreadcrumb={ACTUALIZAR_DOCINTERNOS_BREADCRUM}
      >
        <form onSubmit={actualizar}>
          <div className="form-group">
            <div className="form-group col-lg-11">
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
                      readOnly
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
                        readOnly
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
                      value={documentosInternos.codigostd}
                      onChange={handleInputChange}
                      readOnly
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
                      value={documentosInternos.fecharecepcion}
                      onChange={handleInputChange}
                      readOnly
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
                      value={documentosInternos.numdocrecepcion}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-2 control-label">Comentario</label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="comentariorecepcion"
                      name="comentariorecepcion"
                      placeholder="comentario"
                      title="El codigo STD  es requerido"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={documentosInternos.comentariorecepcion}
                      readOnly
                    />
                  </div>
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
                      nameUpload={"archivorecepcion"}
                      readonly = {true}
                    ></MultipleUpload>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="form-group col-lg-11">
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

                  <label className="col-lg-2 control-label">Comentario</label>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control input-sm uppercaseinput"
                      id="comentariorespuesta"
                      name="comentariorespuesta"
                      placeholder="Nro Documento"
                      //title="El codigo STD  es requerido"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={documentosInternos.comentariorespuesta}
                    />
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
      </Wraper>
    </>
  );
};

export default DocInternoRespuesta;
