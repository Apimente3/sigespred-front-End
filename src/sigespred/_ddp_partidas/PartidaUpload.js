import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Row6 } from "../../components/forms";
import { REGISTRO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/Wraper";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import ComboOptions from "../../components/helpers/ComboOptions";
import { useForm } from "../../hooks/useForm";
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import { toastr } from "react-redux-toastr";
import { initAxiosInterceptors } from "../../config/axios";



const { $ } = window;
const Axios = initAxiosInterceptors();



export const PartidaUpload = () => {
  var partidasArray = [];
  //const [partida, setPartida, handleInputChange, reset] = useForm({}, []);
  const [partida, setPartida] = useState([]);
  const [totalcargado, setTotalcargado] = useState(0);
  const [totalnocargado, setTotalnocargado] = useState(0);
  //const [numCargado, setnumCargado] = useState([])
  const [resultado, setResultado] = useState([]);
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const [itemExcel, setItemExcel] = useState([]);
  const [dataTramo, setDataTramo] = useState(null);
  const [mostrarData, setMostrarData] = useState(false);
  const [procesando, setProcesando] = useState(false); // no sabemos si hay un usuario autenticado

  function handleInputChange(e) {
    setPartida({
      ...partida,
      [e.target.name]: e.target.value,
    });
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItemExcel(d);
    });
  };

  async function addPartidasImport(partidas) {
    const { data } = await Axios.post(`/partidaregistral/partidas`, partidas);

    console.log(data);
    return data;
  }

  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      let data = await helperGets.helperGetListTramos(e.target.value);
      setDataTramo(data);
    } else {
      setDataTramo(null);
    }
  };

  const registrar = async (e) => {
    e.preventDefault();
    setProcesando(true);
    $("#btnguardar").button("loading");
    // console.log("ENTROOOO");
    // console.log(itemExcel);

    // console.log(partida)

    partida.partidas = itemExcel;

    try {
      //let existe = awaitBuscarPartida()
      let { resultados, countnotupload, countupload } = await addPartidasImport(
        partida
      );
      setTotalcargado(countupload);
      setTotalnocargado(countnotupload);
      setResultado(resultados);
      setMostrarData(true);
      setProcesando(false);
      toastr.success(
        "Proceso Finalizado",
        "Revise el listado para obtener las partidas generadas",
        { position: "top-right" }
      );
    } catch (e) {
      alert(e.message);
    }

    $("#btnguardar").button("reset");
  };

  return (
    <>
      <WraperLarge
        titleForm={"Carga Masiva de Partidas Registrales"}
        listbreadcrumb={REGISTRO_PARTIDA_BREADCRUM}
      >
        <Form onSubmit={registrar} autoComplete={false}>
          <div className="form-group col-lg-12">
            <fieldset className="mleft-20">
              <legend>Datos Generales</legend>
            </fieldset>
          </div>
          {/* <Row6 title={""}>
            <FormGroup
              label={"Proyecto"}
              require={true}
              withControl={6}
              withLabel={6}
              ayuda={"Proyecto"}
            >
              <Input
                required={true}
                // value={usuario.contraseniaAnterior}
                onChange={handleInputChange}
                autocomplete={"off"}
                name={"contraseniaAnterior"}
                placeholder={"Nueva anterior"}
                type={"password"}
              ></Input>
            </FormGroup>
          </Row6> */}

          <div className="form-group">
            <div className="form-group col-lg-6">
              <fieldset className="mleft-20">
                {/* <legend>Datos Generales</legend> */}
                <div className="form-group">
                  <label className="col-lg-4 control-label">
                    <span className="obligatorio">* </span>Proyecto
                  </label>
                  <div className="col-lg-8">
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
                </div>

                <div className="form-group">
                  <label className="col-lg-4 control-label">Tramo</label>
                  <div className="col-lg-8">
                    <select
                      id="tramoid"
                      name="tramoid"
                      className="form-control input-sm"
                      onChange={handleInputChange}
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
                </div>

                <div className="form-group">
                  <label className="col-lg-4 control-label">Sub Tramo</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="subtramo"
                      name="subtramo"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-4 control-label">
                    Seleccione archivo
                  </label>
                  <div className="col-lg-8">
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file);
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-lg-4 control-label"></label>
                  <div className="col-lg-8">
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
                      Importar
                    </button>
                  </div>
                </div>
                {mostrarData && (
                  <div className="form-group">
                    <fieldset className="mleft-20">
                      <legend>Información de Carga</legend>
                      <div class="rTable"></div>
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th> Total partidas cargadas:</th>
                            <th>
                              <input
                                type="text"
                                readOnly
                                name="totalcargado"
                                value={totalcargado}
                              />
                            </th>
                          </tr>
                          <tr>
                            <th> Total partidas no cargadas:</th>
                            <th>
                              <input
                                type="text"
                                readOnly
                                name="totalnocargado"
                                value={totalnocargado}
                              />
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </fieldset>
                  </div>
                )}
                {mostrarData && (
                  <div className="form-group">
                    <div className="form-group col-lg-12">
                      <table className="table container">
                        <thead>
                          <tr>
                            <th scope="col"># Partida</th>
                            <th scope="col">Mensaje</th>
                            <th scope="col">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultado.map((d) => (
                            <tr key={d.id}>
                              <th>{d.numpartida}</th>
                              <th>{d.mensaje}</th>
                              <th>
                                {d.estado == "Cargado" ? (
                                  <span class="label label-success">
                                    {d.estado}
                                  </span>
                                ) : (
                                  <span class="label label-danger">
                                    {d.estado}
                                  </span>
                                )}
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </fieldset>
            </div>
          </div>
        </Form>
      </WraperLarge>
    </>
  );
};
