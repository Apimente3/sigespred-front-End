import React, { useState, useEffect, useRef } from "react";
import Wraper from "../m000_common/formContent/Wraper";
import {REGISTRO_AREA_BREADCRUM} from "../../config/breadcrums";
import { Link } from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useDispatch, useSelector } from "react-redux";
//import { agregar } from "../../actions/_ddp_partida/Actions";

const { $ } = window;
const Axios = initAxiosInterceptors();

// api para insertar
async function addArea(area) {
  const {data} = await Axios.post(`/area`,area);
  return data;
}
const obtenerArea = async () => {
  const {data:areas } = await Axios.get(`/areajerarquizado?busqueda=`);
  console.log({areas});
  return {areas};
};

const AreaAdd = ({ history }) => {

    const resListaSubAreas = useAsync(obtenerArea, []);
    const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, []);

    const [area, set_area] = useState();
    const [selectedDisabled, setSelectedDisabled] = useState(true);
    
    
    const registrar = async e => {
      e.preventDefault();
      try {
          await addArea(area);
          const toastrConfirmOptions = {
              onOk: () => limpiarForm(),
              onCancel: () => history.push('/area-list')
          };
          toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);

      }
      catch (e) {
          alert(e.message)
      }
    }


    function handleSelectChange(e) {
        if(e.target.value == '0') setSelectedDisabled(true)
        else setSelectedDisabled(false)
    }

    function handleInputChange(e) {
        if (['nombre','descripcion'].includes(e.target.name)) {
          set_area({
              ...area,
              [e.target.name]: e.target.value.toUpperCase()
          });
        } 
        if(['subareaid'].includes(e.target.name)) {
            if(selectedDisabled){
                set_area({
                    ...area,
                    subareaid: 0
                });
            }else{
                set_area({
                    ...area,
                    subareaid: e.target.value
                });
            }
        }
    }

    
    function setSolicitante(idLocador,text) {
        set_area({
            ...area,
            usuarioid: idLocador
        });
      console.log(text);
    }

 
  const limpiarForm = () => {
    set_area({});
    setSelectedDisabled(true);
  };


  return (
    <>
      <Wraper titleForm={"Registrar Area"} listbreadcrumb={REGISTRO_AREA_BREADCRUM}>
      <form onSubmit={registrar}>
            <fieldset><legend>Tipo de Registro</legend>
                <div className="form-group">
                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                        Dependencia</label>
                    <div className="col-lg-4">
                        <select
                        className="form-control input-sm"
                        name="dependencia"
                        id="dependecia"
                        onChange={handleSelectChange}
                        >
                            <option value="0">--SELECCIONE--</option>
                            <option value="0">AREA</option>
                            <option value="1">AREA DEPENDIENTE</option>
                        </select>
                    </div>
                </div>
            </fieldset>
            <fieldset><legend>Datos de Area/SubArea</legend>
            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Nombre</label>
                <div className="col-lg-4">
                    <input mayuscula="true" required
                      className="form-control input-sm " type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ingrese el nombre del area"
                      onChange={handleInputChange}>
                    </input>
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Profesional</label>
                <div className="col-lg-4">
                    {resListaSolicitantes.error
                      ? "Se produjo un error cargando los locadores"
                      : resListaSolicitantes.loading
                      ? "Cargando..."
                      : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} />}
                </div>
            </div>
            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Descripcion</label>
                <div className="col-lg-4">
                    <input mayuscula="true" required
                      className="form-control input-sm " type="text"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Ingrese la descripcion del area"
                      onChange={handleInputChange}>
                    </input>
                </div>
                <label className="col-lg-2 control-label">
                    Area</label>
                <div className="col-lg-4">
                    <select
                      className="form-control input-sm"
                      id="subareaid"
                      name="subareaid"
                      onChange={handleInputChange}
                      disabled={selectedDisabled}
                    >
                      <option value="">--SELECCIONE--</option>
                      {resListaSubAreas.error ? (
                        "Se produjo un error cargando las areas"
                      ) : resListaSubAreas.loading ? (
                        "Cargando..."
                      ) : (
                        <ComboOptions
                          data={resListaSubAreas.result}
                          valorkey="id"
                          valornombre="nombre"
                        />
                      )}
                    </select>
                </div>
            </div>
            </fieldset>
            <div className="panel-body">
              <div className="form-group ">
                <div className="col-lg-offset-2 col-lg-10 text-right">
                  <button
                    id="btnguardar"
                    type="submit"
                    className="btn btn-danger btn-sm btn-control"
                  >
                    Guardar
                  </button>
                  <Link
                    to={`/area-list`}
                    className="btn btn-default btn-sm btn-control"
                  >
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
      </form>
      </Wraper>
    </>
  );
};

export default AreaAdd;
