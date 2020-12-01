import React, { useEffect, useState } from "react";

import { REGISTRO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import ComboOptions from "../../components/helpers/ComboOptions";
import { useForm } from "../../hooks/useForm";
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import { toastr } from "react-redux-toastr";
import { initAxiosInterceptors } from "../../config/axios";
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

const { $ } = window;
const Axios = initAxiosInterceptors();

export const PartidaUpload = () => {

  const [partida, setPartida, handleInputChange, reset] = useForm({}, []);
  const [totalcargado, setTotalcargado] = useState(0);
  const [totalnocargado, setTotalnocargado] = useState(0);
  const [resultado, setResultado] = useState([]);
  const listaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const [listaTramos, setListaTramos] = useState(null);

  const [itemExcel, setItemExcel] = useState([]);
  const [mostrarData, setMostrarData] = useState(false);
  const [procesando, setProcesando] = useState(false); // no sabemos si hay un usuario autenticado



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
    return data;
  }
  const cargarChildrenProyecto = async (idProyecto) => {
    if (idProyecto) {
      let dataTramos = await helperGets.helperGetListTramos(idProyecto);

      setListaTramos(dataTramos);
    } else {
      setListaTramos(null);
    }
  };


  const handleFiltrarChildrenProyecto = async (e) => {
    cargarChildrenProyecto(e.target.value);
  };

  const registrar = async (e) => {
    e.preventDefault();
    // setProcesando(true);
    $("#btnguardar").button("loading");

    partida.partidas = itemExcel;

    try {
      let { resultados, countnotupload, countupload } = await addPartidasImport(
        partida
      );
      setTotalcargado(countupload);
      setTotalnocargado(countnotupload);
      setResultado(resultados);
      setMostrarData(true);
    //   setProcesando(false);
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
          <RowForm>
            <Row12 title={"Datos Generales"}>
              <Row6>
                <FormGroup
                  label={"Proyecto"}
                  require={true}
                  ayuda={"Proyecto"}
                >
                  <Select
                    required={true}
                    value={partida.infraestructuraid || ""}
                    onChange={(e) => {
                      handleFiltrarChildrenProyecto(e);
                      handleInputChange(e);
                    }}
                    name={"infraestructuraid"}
                  >
                    {listaProyectos.result ? (
                      <ComboOptions
                        data={listaProyectos.result}
                        valorkey="id"
                        valornombre="denominacion"
                      />
                    ) : (
                      "Cargando..."
                    )}
                  </Select>
                </FormGroup>
                <FormGroup label={"Tramo"}>
                  <Select
                    value={partida.tramoid || ""}
                    onChange={handleInputChange}
                    name={"tramoid"}
                  >
                    <ComboOptions
                      data={listaTramos}
                      valorkey="id"
                      valornombre="descripcion"
                    />
                  </Select>
                </FormGroup>
                <FormGroup label={"Subtramo"}>
                  <Input
                    value={partida.subtramo || ""}
                    onChange={handleInputChange}
                    name={"subtramo"}
                    placeholder={"Ingrese el subtramo"}
                    type={"text"}
                  ></Input>

                </FormGroup>
                <FormGroup label={"Plantilla de Carga"} require={true} ayuda={"Seleccione el Excel a importar"}>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file);
                    }}
                    required
                  />



                </FormGroup>
                  <FormGroup>
                      <a href="/templates/cargaPartidasPlantilla.xlsx" type="button" className="btn btn-success" data-container="body" data-toggle="popover"
                              data-placement="top"
                              data-content="Formato que tendra que se llenar para la carga masiva de las partidas registrales."
                              data-original-title="" title="">
                          <i className="fas fa-file-excel"></i> Plantilla
                      </a>
                  </FormGroup>
                <FormGroup>
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
                </FormGroup>
              </Row6>
            </Row12>
            {mostrarData && (
              <Row12 title={"Información de Carga "}>
                <Row6> 
                  <FormGroup
                    label={"Total de Partidas Cargadas"}
                    withLabel={6}
                    withControl={6}
                  >
                    <Input
                      value={totalcargado}
                      name={"totalcargado"}
                      type={"text"}
                      readOnly
                    ></Input>
                  </FormGroup>
                  <FormGroup
                    label={"Total de Partidas no cargadas"}
                    withLabel={6}
                    withControl={6}
                  >
                    <Input
                      value={totalnocargado}
                      name={"totalnocargado"}
                      type={"text"}
                      readOnly
                    ></Input>
                  </FormGroup>
                  <div className="form-group">
                    <table className="tableInside">
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
                </Row6>
              </Row12>
            )}
          </RowForm>
        </Form>
      </WraperLarge>
    </>
  );
};
