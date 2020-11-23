import React, {useState, useEffect, useRef} from 'react';
import Wraper from "../m000_common/formContent/WraperLarge";
import {ACTUALIZAR_AREA_BREADCRUM} from "../../config/breadcrums";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import { useAsync } from "react-async-hook";
import { initAxiosInterceptors } from '../../config/axios';


const Axios = initAxiosInterceptors();
const {$} = window;

async function getArea(id) {
    const {data} = await Axios.get(`/area/${id}`);
    return data;
}

const obtenerArea = async () => {
  const {data:areas } = await Axios.get(`/areajerarquizado?busqueda=`);
  console.log({areas});
  return {areas};
};

async function updateArea(area) {
    const {data} = await Axios.put(`/area/${area.id}`,area);
    return data;
}



const AreaEdit = ({history, match}) => {

    const {id} = match.params;

    const resListaSubAreas = useAsync(obtenerArea, []);
    const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, []);

    const [area, set_area] = useState({ observacion: 'Nuevo Registro'});
    const [selectedDisabled, setSelectedDisabled] = useState(true);

    useEffect(() => {
      async function init() {
          try {
              let area = await getArea(id)
              set_area(area)
              console.log(area);
              if(area.subareaid==0) setSelectedDisabled(true)
              else setSelectedDisabled(false)

          } catch (error) {
              alert('Ocurrio un error')
              console.log(error);
          }
      }
      init();
  }, []);

    const actualizar = async e => {

        e.preventDefault();
        try {
            await updateArea(area);
            const toastrConfirmOptions = {
                onOk: () => history.push('/area-list'),
                onCancel: () => history.push(`/area-list`)
            };
            toastr.confirm('¿ Desea seguir actualizando ?', toastrConfirmOptions);
        }
        catch (e) {
            alert(e.message);
        }
    }


    function handleSelectChange(e) {

        if(e.target.value == '0') setSelectedDisabled(true)
        else setSelectedDisabled(false)
    }

    function handleInputChange(e) {

        if (['nombre','descripcion'].includes(e.target.name)){
          set_area({
              ...area,
              [e.target.name]: e.target.value.toUpperCase()
          });
        };
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

   return (
        <>
          <Wraper titleForm={"Actualizar Area"} listbreadcrumb={ACTUALIZAR_AREA_BREADCRUM}>
          <form onSubmit={actualizar}>
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
                                <option value="-">--SELECCIONE--</option>
                                <option value="0">AREA</option>
                                <option value="1">AREA DEPENDIENTE</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset><legend>Datos de Area/SubArea</legend>
                <div className="form-group">
                    <label className="col-lg-2 control-label"><span className="obligatorio">*</span>
                        Nombre</label>
                    <div className="col-lg-4">
                        <input mayuscula="true" required
                          className="form-control input-sm " type="text"
                          id="nombre"
                          name="nombre"
                          placeholder="Ingrese el nombre del area"
                          value={area.nombre}
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
                          : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} valorinit={area.usuarioid} />}
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
                          value={area.descripcion}
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
                          value={area.subareaid}
                        >
                          <option value="0">--SELECCIONE--</option>
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

}



export default AreaEdit;
