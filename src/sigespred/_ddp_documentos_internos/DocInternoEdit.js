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
import { REGISTRO_PLANO_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import { useAsync } from "react-async-hook";
import MultipleUpload from "../../components/uploader/MultipleUpload";


const Axios = initAxiosInterceptors();
const { $ } = window;

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
  ] = useForm({ archivos: [] }, ['comentario']);
  //const [documentosInternos, setDocumentosInternos] = useState({});
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
  

    /*Valiables Globales*/
    useEffect(() => {
      const init = async () => {
        let docInterno = await obtenerDocumentoInterno(id);
        cargarEquipo(docInterno.gestionpredialid);
        setDocumentosInternos(docInterno);
      };
      init();
    }, []);
  //const { id } = useParams();

  // useEffect(() => {
  //   const getPartida = async (idpartida) => {
  //     let partidaDB = await obtenerPartida(idpartida);
  //     cargarTramo(partidaDB.infraestructuraid);
  //     setPartidaRespuesta(partidaDB);
  //     if (partidaDB.archivos) {
  //       set_listaArchivos(partidaDB.archivos);
  //     }
  //   };
  //   getPartida(id);
  // }, []);

  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      let dataEq = await helperGets.helperGetListEquipos(e.target.value);
      setDataEquipo(dataEq);
    } else {
      setDataEquipo(null);
    }
  };
  // function handleInputChange(e) {
  //   if (e.target.name) {
  //     documentosInternos[e.target.name] = e.target.value;
  //     set_DocumentosInternosEditado({
  //       ...documentosInternosEditado,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // }

  // function handleInputChange(e) {
  //   if (e.target.name) {
  //     documentosInternos[e.target.name] = e.target.value;
  //     set_DocumentosInternosEditado({
  //       ...documentosInternosEditado,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // }

  // useEffect(() => {
  //   const getDocumentoInterno = async (idDocInterno) => {
  //     let documentoInternoDB = await obtenerDocumentoInterno(idDocInterno);
  //     setDocumentosInternos(documentoInternoDB);
  //   };
  //   getDocumentoInterno(id);
  // }, []);




  
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
      // history.push("/docinternos");
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
        listbreadcrumb={REGISTRO_PLANO_BREADCRUM}
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
                      readonly
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
                      id="equipoid"
                      name="equipoid"
                      value={documentosInternos.equipoid}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    >
                      <option value="">--SELECCIONE--</option>
                      <option value="1">SISTEMATIZACION</option>
                      <option value="2">diagnostico tecnico legal</option>
                      {/* <ComboOptions
                        //   data={resListaProyectos.result}
                        valorkey="id"
                        valornombre="denominacion"
                      /> */}
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
                      id="monitorid"
                      name="monitorid"
                      value={documentosInternos.monitorid}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    >
                      <option value="">--SELECCIONE--</option>
                      <option value="4">ERICK SIMON ESCALANTE OLANO </option>
                      {/* <ComboOptions
                        //   data={resListaProyectos.result}
                        valorkey="id"
                        valornombre="denominacion"
                      /> */}
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
                    {resListaTipoDocInterno.error ? (
                      "Se produjo un error cargando los tipos de documento"
                    ) : resListaTipoDocInterno.loading ? (
                      "Cargando..."
                    ) : (
                      <select
                        className="form-control input-sm"
                        id="tipodocumentoid"
                        name="tipodocumentoid"
                        value={documentosInternos.tipodocumentoid}
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
                      value={documentosInternos.codigostd || ""}
                      onChange={handleInputChange}
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
                      value={documentosInternos.comentariorecepcion || ""}
                    />
                  </div>

                  <div className="col-lg-4">
                    {/* <UploadMemo
                      key="upload_portada_imagen"
                      file={{ urlDocumento: "" }}
                      accept={".*"}
                      //   setFile={setFilesArchivodigital}
                      //   folderSave={FilesGestionPredial.FilesSolicitud}
                      //   eliminar={deleteFilesArchivodigital}
                    >
                      {" "}
                    </UploadMemo> */}

                    <MultipleUpload
                      key="multiple"
                      accept={".*"}
                      folderSave={"FotosUsuarios"}
                      form={documentosInternos}
                      setForm={setDocumentosInternos}
                      nameUpload={"archivorecepcion"}
                    ></MultipleUpload>
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

export default DocInternoEdit;
