import React, { useEffect, useState } from "react";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import { initAxiosInterceptors } from "../../config/axios";
import { REGISTRO_DOCINTERNOS_BREADCRUM } from "../../config/breadcrums";
import ComboOptions from "../../components/helpers/ComboOptions";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {getselectProyecto} from '../../utils';
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
import MultipleUpload from "../../components/uploader/MultipleUpload";

import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import ComboOptionsGroup from "../../components/helpers/ComboOptionsGroup";

const { $ } = window;
const Axios = initAxiosInterceptors();
const directorioDocInterno = "FilesDDP/DocumentoInterno";
/*Guardar tipo de infraestrucra*/
async function saveDocumentosInternos(body) {
  console.log(body);
  const { data } = await Axios.post(`/docinterno`, body);
  return data;
}

const DocInternoAdd = ({ history }) => {
  const [
    documentosInternos,
    setDocumentosInternos,
    handleInputChange,
    reset,
  ] = useForm({}, [""]);
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const [dataEquipo, setDataEquipo] = useState(null);
  const resListaTipoDocInterno = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPODOCINTER,
  ]);
  const resListaSubAreas = useAsync(helperGets.helperGetListaSubAreas, []);

  useEffect(()=> {
    async function initialLoad() {
        try {
          var datosProyecto =  getselectProyecto();
          if (datosProyecto) {

              setDocumentosInternos({
                ...documentosInternos,
                gestionpredialid: datosProyecto.idproyecto
              });
              setValoresEquipo(datosProyecto.idproyecto);
          }
        } catch (error) {
          console.log(error);
      }
      }
      initialLoad();
    }, []);

  //   /*Valiables Globales*/
  //   useEffect(() => {
  //     const init = async () => {
  //         setlistTipoInfraestructura(await getListTipoInfraestructura());
  //         listInfraestructuraGlobal = await getListInfraestructura()
  //         setlistInfraestructura(listInfraestructuraGlobal);
  //     };
  //     init();
  // }, []);

  const registrar = async (e) => {
    e.preventDefault();
    try {
      await saveDocumentosInternos(documentosInternos);
      toastr.success("Registro Correcto", "Se registro correctamente.", {
        position: "top-right",
      });
      history.push("/docinternos");
    } catch (e) {
      toastr.error("Registro Incorrecto", JSON.stringify(e), {
        position: "top-right",
      });
    }
  };

  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      //let dataEq = await helperGets.helperGetListEquipos(e.target.value);
      //setDataEquipo(dataEq);
      setValoresEquipo(e.target.value);
    } else {
      setDataEquipo(null);
    }
  };

  const setValoresEquipo = async(idgestionpredial) => {
    let dataEq = await helperGets.helperGetListEquipos(idgestionpredial)
    setDataEquipo(dataEq);
}
  return (
    <>
      <WraperLarge
        titleForm={"Registro de Documentación Interna "} // + partidaRespuesta.id}
        listbreadcrumb={REGISTRO_DOCINTERNOS_BREADCRUM}
      >
        <form onSubmit={registrar} className={"form-horizontal"}>
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
                      value={documentosInternos.gestionpredialid || ""}
                      required
                      onChange={(e) => {
                        handleChangeProyecto(e);
                        handleInputChange(e);
                      }}
                    >
                      <option value="">--SELECCIONE--</option>
                      {resListaProyectos.result?
                        <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>
                       : "Cargando..."}
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
                      "Se produjo un error cargando el tipo de documento"
                    ) : resListaTipoDocInterno.loading ? (
                      "Cargando..."
                    ) : (
                      <select
                        className="form-control input-sm"
                        id="tipodocumento"
                        name="tipodocumento"
                        required
                        value={documentosInternos.tipodocumento}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
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

            <div className="form-group col-lg-11">
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
                    />
                  </div>
                  {/* <label className="col-lg-2 control-label">
                    Adjuntar Documento
                  </label> */}
                  {/* <div className="form-group col-lg-6"> */}

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
                    />
                  </div>

                  {/* </div> */}
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
                  <div className="col-lg-6">
                    <div className="form-group">
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
