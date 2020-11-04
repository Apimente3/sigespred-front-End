import React, { useState } from "react";
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
import MultipleUpload from "../../components/uploader/MultipleUpload";

import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";

const { $ } = window;
const Axios = initAxiosInterceptors();

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
      let dataEq = await helperGets.helperGetListEquipos(e.target.value);
      setDataEquipo(dataEq);
    } else {
      setDataEquipo(null);
    }
  };
  // const handleChangeProyecto = async (e) => {
  //   if (e.target.value) {
  //     let data = await helperGets.helperGetListTramos(e.target.value);
  //     console.log('-***********************-*>')
  //     console.log(data)
  //     // setDataTramo(data);
  //   } else {
  //     // setDataTramo(null);
  //   }
  // };

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
                      "Se produjo un error cargando el tipo de documento"
                    ) : resListaTipoDocInterno.loading ? (
                      "Cargando..."
                    ) : (
                      <select
                        className="form-control input-sm"
                        id="tipodocumentoid"
                        name="tipodocumentoid"
                        required
                        value={documentosInternos.tipodocumentoid}
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
                    />
                  </div>
                  {/* <label className="col-lg-2 control-label">
                    Adjuntar Documento
                  </label> */}
                  {/* <div className="form-group col-lg-6"> */}

                    <div className="col-lg-6">
                      <div className="form-group">
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
                  

                  {/* </div> */}
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
