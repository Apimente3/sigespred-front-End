import React, { useEffect, useState } from "react";
import moment from 'moment';
import { useAsync } from "react-async-hook";
import { Link, useParams } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import { ACTUALIZAR_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import ComboOptions from "../../components/helpers/ComboOptions";
import UploadMemo from "../../components/helpers/uploaders/UploadMemo";
import SubLista from './SubListaDelete';
import { toastr } from "react-redux-toastr";
import { editar } from "../../actions/_ddp_partida/Actions";
import { useDispatch } from "react-redux";

const { $ } = window;
const axios = initAxiosInterceptors();

const obtenerPartida = async (id) => {
  const { data } = await axios.get(`/partidaregistral?id=${id}`);
  return data;
};

const PartidaRespuesta = (history) => {
  const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
  const resListaTipoPredio = useAsync(helperGets.helperGetListDetalle, [
    PARAMS.LISTASIDS.TIPOPRED,
  ]);
  const [partidaArchTmp, set_partidaArchTmp] = useState({archivodigital: ''});
  const [partidaRespuesta, setPartidaRespuesta] = useState({});
  const [partidaEditado, set_partidaEditado] = useState({});
  const [dataTramo, setDataTramo] = useState(null);
  const [listaArchivos, set_listaArchivos] = useState([]);
  const [reiniciarValMemoria, setReiniciarValMemoria] = useState(false);
  const [reiniciarValDigital, setReiniciarValDigital] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getPartida = async (idpartida) => {
      let partidaDB = await obtenerPartida(idpartida);
      cargarTramo(partidaDB.infraestructuraid);
      setPartidaRespuesta(partidaDB);
    };
    getPartida(id);
  }, []);

  
  const agregarPartidaRespuestaAction = (partida) =>
    dispatch(editar(partidaRespuesta));



  function handleInputChange(e) {
    if (e.target.name) {
      partidaRespuesta[e.target.name] = e.target.value;
      set_partidaEditado({
        ...partidaEditado,
        [e.target.name]: e.target.value,
      });
    }
  }

  const handleChangeArchivos = (e) => {
    var uidDate = moment().format("YYYYMMDDHHmmss");
    set_partidaArchTmp({
        ...partidaArchTmp,
        "descripcion": e.target.value,
        "archivoid": uidDate,

    });
}

const saveArchivoDigital = (file) => {
  setReiniciarValDigital(false);
  set_partidaArchTmp({
      ...partidaArchTmp,
      "archivodigital": file.path
  });
}

const deleteArchivoDigital = () => {
  set_partidaArchTmp({
      ...partidaArchTmp,
      "archivodigital": ''
  });
}

  const limpiarForm = () => {
    setPartidaRespuesta({ observaciones: "" });
  };

  
  const actualizarLista = () => {
        console.log(partidaArchTmp.descripcion)
        console.log(partidaArchTmp.archivodigital)
        console.log(listaArchivos)
        console.log(partidaArchTmp)
    if (partidaArchTmp.descripcion && partidaArchTmp.archivodigital) {
        set_listaArchivos(listaArchivos => [...listaArchivos, partidaArchTmp]);
        set_partidaArchTmp({
            ...partidaArchTmp,
            "descripcion": '',
            "archivodigital": '',
            "archivoid": ''
        });
        setReiniciarValDigital(true);
        setReiniciarValMemoria(true);
    } else {
        toastr.error(`Se require al menos un identificador del archivo y el archivo digital.`)
    }
}

  const registrar = async (e) => {
    e.preventDefault();
    
    if (Array.isArray(listaArchivos) && listaArchivos.length) {
      partidaRespuesta.archivos = listaArchivos;
      setPartidaRespuesta({
          ...partidaRespuesta,
          archivos: listaArchivos
      });
  }

    $("#btnguardar").button("loading");

    try {
      await agregarPartidaRespuestaAction(partidaRespuesta);

      $("#btnguardar").button("reset");
      const toastrConfirmOptions = {
        onOk: () => limpiarForm(),
        onCancel: () => history.push("/partidas"),
      };
      toastr.confirm("¿ Desea seguir registrando ?", toastrConfirmOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  const removerDeLista = (idArchivo) => {
    var data = $.grep(listaArchivos, function(e){ 
        return e.archivoid != idArchivo; 
   });
   set_listaArchivos(data);
}

  const cargarTramo = async (idProyecto) => {
    if (idProyecto) {
      let data = await helperGets.helperGetListTramos(idProyecto);
      console.log(data);
      setDataTramo(data);
    } else {
      setDataTramo(null);
    }
  };
  const handleChangeProyecto = async (e) => {
    if (e.target.value) {
      let data = await helperGets.helperGetListTramos(e.target.value);
      setDataTramo(data);
    } else {
      setDataTramo(null);
    }
  };

  const cabeceraArchivos = ["Descripcion Archivo", "Archivo", "Eliminar"];

  return (
    <>
      <Wraper
        titleForm={"Respuesta de la Partida: " + partidaRespuesta.id}
        listbreadcrumb={ACTUALIZAR_PARTIDA_BREADCRUM}
      >
        <form onSubmit={registrar}>
          <div className="form-group">
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span> Proyecto
            </label>
            <div className="col-lg-4">
              {resListaProyectos.error ? (
                "Se produjo un error cargando los proyectos"
              ) : resListaProyectos.loading ? (
                "Cargando..."
              ) : (
                <select
                  className="form-control input-sm"
                  id="infraestructuraid"
                  name="infraestructuraid"
                  readOnly
                  value={partidaRespuesta.infraestructuraid || ""}
                >
                  <option value="">--SELECCIONE--</option>
                  <ComboOptions
                    data={resListaProyectos.result}
                    valorkey="id"
                    valornombre="denominacion"
                  />
                </select>
              )}
              {/* {resListaProyectos.result } */}
            </div>
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span>Numero de Partida
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
                value={partidaRespuesta.nropartida}
                readOnly
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span>Tramo
            </label>
            <div className="col-lg-4">
              {dataTramo ? (
                <select
                  id="tramoid"
                  name="tramoid"
                  value={partidaRespuesta.tramoid || ""}
                  onChange={handleInputChange}
                  className="form-control input-sm"
                  readOnly
                >
                  <option value="">--SELECCIONE--</option>
                  <ComboOptions
                    data={dataTramo}
                    valorkey="id"
                    valornombre="descripcion"
                  />
                </select>
              ) : (
                <select
                  id="tramoid"
                  name="tramoid"
                  className="form-control input-sm"
                  readOnly
                >
                  <option value="">--SELECCIONE--</option>
                </select>
              )}
            </div>
            <label className="col-lg-2 control-label">
              <span className="obligatorio">* </span>Sub Tramo
            </label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="subtramoid"
                id="subtramoid"
                onChange={handleInputChange}
                placeholder="Ingrese el sub tramo"
                value={partidaRespuesta.subtramoid}
                readOnly
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Tipo de Predio</label>
            <div className="col-lg-4">
              <select
                id="tipopredio"
                className="form-control input-sm"
                name="tipopredio"
                value={partidaRespuesta.tipopredioid}
                onChange={handleInputChange}
                readOnly
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
            <label className="col-lg-2 control-label">Area del Predio</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="areapredio"
                id="areapredio"
                onChange={handleInputChange}
                placeholder="Ingrese el area del predio"
                value={partidaRespuesta.areapredio}
                readOnly
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
                value={partidaRespuesta.nroasiento}
                readOnly
              ></input>
            </div>

            <label className="col-lg-2 control-label">Observacion</label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="observacion"
                id="observacion"
                onChange={handleInputChange}
                placeholder="Ingrese alguna observacion"
                value={partidaRespuesta.observacion}
                readOnly
              ></input>
            </div>
          </div>

          <hr />

          <div className="form-group">
            <label className="col-lg-2 control-label">Fecha de Atencion </label>
            <div className="col-lg-4">
              <input
                style={{ lineHeight: "1.43" }}
                type="date"
                id="fechacreacion"
                name="fechacreacion input-sm"
                className="form-control"
                value={partidaRespuesta.fechaatencion || ""}
                onChange={handleInputChange}
              />
            </div>

            <label className="col-lg-2 control-label">
              Gravament del Predio
            </label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="gravamentpredio"
                id="gravamentpredio"
                onChange={handleInputChange}
                placeholder="Ingrese el gravament del predio"
                value={partidaRespuesta.gravamentpredio}
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-2 control-label">Carga del Predio </label>
            <div className="col-lg-4">
              <input
                className="form-control input-sm"
                type="text"
                name="cargapredio"
                id="cargapredio"
                onChange={handleInputChange}
                placeholder="Ingrese la carga del predio"
                value={partidaRespuesta.cargapredio}
              ></input>
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
                value={partidaRespuesta.transferenciaspredio}
              ></input>
            </div>
          </div>

          <div className="form-group col-lg-6">
            <fieldset className="mleft-20">
              <legend>Archivos</legend>
              <div className="form-group">
                <label className="col-lg-4 control-label">
                  Descripcion de los Archivos Adjuntos
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control input-sm"
                    id="descripcionarchivo"
                    name="descripcionarchivo"
                    value={partidaArchTmp.descripcion || ""}
                    onChange={handleChangeArchivos}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-4 control-label">
                  Archivo Dígital
                </label>
                <div className="col-lg-6">
                  <UploadMemo
                    key="planodigitaltmp"
                    file={{ urlDocumento: "" }}
                    accept={".jpg,.png,.gif"}
                    resetContenido={reiniciarValDigital}
                    setFile={saveArchivoDigital}
                    folderSave={"FotosUsuarios"}
                    eliminar={deleteArchivoDigital}
                  ></UploadMemo>
                </div>
                <div className="col-lg-2">
                  <a
                    className="btn btn-default btn-sm dropdown-toggle pull-left"
                    title="Agregar a la lista"
                    onClick={actualizarLista}
                  >
                    <i className="fa fa-archive fa-2x"></i>
                  </a>
                </div>
              </div>

              <div className="form-group">
                <SubLista  
                  data={listaArchivos}
                  cabecera={cabeceraArchivos}
                  deleterow={removerDeLista}
                />
              </div>
            </fieldset>
          </div>

          <div className="panel-body">
            <div className="form-group">
              <div className="col-lg-offset-8 col-lg-4">
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

export default PartidaRespuesta;
