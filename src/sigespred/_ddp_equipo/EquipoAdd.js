import React, { useState, useEffect, useRef } from "react";
import Wraper from "../m000_common/formContent/Wraper";
import {REGISTRO_EQUIPO_BREADCRUM} from "../../config/breadcrums";
import { Link } from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import ComboOptionsGroup from "../../components/helpers/ComboOptionsGroup";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import EquipoTable from "../_ddp_equipo/EquipoTable";
import { useDispatch, useSelector } from "react-redux";
//import { agregar } from "../../actions/_ddp_partida/Actions";

const { $ } = window;
const Axios = initAxiosInterceptors();

// api para insertar
async function addEquipo(equipo) {
  const {data} = await Axios.post(`/equipo`,equipo);
  return data;
}

const EquipoAdd = ({ history }) => {
    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaSubAreas = useAsync(helperGets.helperGetListaSubAreas, []);
    const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, []);

    const [filtros, set_filtros] = useState();

    const cabeceraEquipo = ["ID", "PROFESIONAL","MONITOR", "ACCIONES"];

    const [equipo, set_equipo] = useState({activo: false, profesionales:[]});
    const [profesionales, set_profesionales] = useState({users:[]});
    const [monitor, set_monitor] = useState({checked: false});
    const [activoequipo, set_activoequipo] = useState({checked: false});


    const registrar = async e => {
      e.preventDefault();
      // $('#btnguardar').button('loading');
      //equipo.profesionales= profesionales.users;
      let objEquipo = {
          equipo:equipo,
          profesionales: profesionales.users    
      };
      var myJSON = JSON.stringify(objEquipo);
      console.log(myJSON);
      try {
          await addEquipo(objEquipo);
          const toastrConfirmOptions = {
              onOk: () => limpiarForm(),
              onCancel: () => history.push('/list-equipos2')
          };
          toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);


      }
      catch (e) {
          alert(e.message)
      }
    }


    const handleCheckChange = (e) => {
      const { checked } = e.target
      set_monitor({
        checked: checked
      })
    }

    const handleCheckActivoChange = (e) => {
      const { checked } = e.target
      set_activoequipo({
        checked: checked
      })
      set_equipo({
        ...equipo,
        [e.target.name]: checked
      });
    }

    function handleInputChange(e) {
        if (['equipo'].includes(e.target.name)) {
          set_equipo({
              ...equipo,
              [e.target.name]: e.target.value.toUpperCase()
          });
      } else {
          set_equipo({
              ...equipo,
              [e.target.name]: e.target.value
          });
      }
    }

    
    function setSolicitante(idLocador,text) {
      
      set_filtros({
          ...filtros,
          id: idLocador,
          nombre: text
      })
      console.log(text);
    }

    const handleClick = (e) => {
      //profesionales.push({id:filtros.id,monitor:monitor.checked});
      
      set_profesionales({
        users: [
           ...profesionales.users,
           {              
              id: filtros.id,
              nombre: filtros.nombre,
              monitor:monitor.checked
           }
        ]
      });
      console.log(profesionales);
    }

    const deleteUser = key => {
      let { users } = profesionales;
      users.splice(key, 1);
      set_profesionales({
         users: [...users]
      });
   };
 
  const limpiarForm = () => {
    set_monitor({checked: false });
    set_activoequipo({ checked: false});
    set_filtros({});
    set_equipo({ activo: false });
    set_profesionales({users:[]});
  };


  return (
    <>
      <Wraper titleForm={"Asignar el equipo"} listbreadcrumb={REGISTRO_EQUIPO_BREADCRUM}>
      <form onSubmit={registrar}>
          <div className="form-group">
            <fieldset><legend>Datos del Equipo</legend>
            <div className="row">
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">
                      <span className="obligatorio">* </span>Proyecto
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <select
                      className="form-control input-sm"
                      id="proyectoid"
                      name="proyectoid"
                      required
                      title="El Proyecto es requerido"
                      onChange={handleInputChange}
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
                {/* </fieldset> */}
              </div>
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">
                    <span className="obligatorio">* </span>Nombre</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control input-sm"
                      required
                      id="equipo"
                      name="equipo"
                      placeholder="Ingrese el nombre del equipo"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">
                    <span className="obligatorio">* </span>Areas</label>
                  </div>
                  <div className="col-md-8">
                    <select className="form-control input-sm" id="areaid" name="areaid" 
                      required
                      title="El area es requerido"
                      onChange={handleInputChange}>
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">Activo</label>
                  </div>
                  <div className="col-md-8">
                    <input type="checkbox" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                            name="activo" onChange={handleCheckActivoChange} defaultChecked={activoequipo.checked}
                    />
                  </div>
                </div>
              </div>
            </div>
            </fieldset>
            <fieldset><legend>Asignar Profesional</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">Profesional</label>
                    </div>
                    <div className="col-md-8">
                      {resListaSolicitantes.error
                      ? "Se produjo un error cargando los locadores"
                      : resListaSolicitantes.loading
                      ? "Cargando..."
                      : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} />}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-4 text-right">
                      <label className="control-label">Monitor</label>
                    </div>
                    <div className="col-md-4">
                      <input type="checkbox" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                            name="monitor" onChange={handleCheckChange} defaultChecked={monitor.checked}
                      />
                    
                    </div>
                    <div class="col-md-4">
                     <button class="btn btn-sm btn-info" type="button" onClick={handleClick}><i
                                            class="fa fa-plus fa-lg"
                                        /> Agregar Profesional</button>
                    </div>
                  </div>
                </div>              
              </div>
            </fieldset>
            <hr></hr>
            <EquipoTable 
              cabecera={cabeceraEquipo} 
              data={profesionales}
              deleteUser={deleteUser}>
            </EquipoTable>
            <hr></hr>
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
                    to={`/list-equipos2`}
                    className="btn btn-default btn-sm btn-control"
                  >
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </form>
      </Wraper>
    </>
  );
};

export default EquipoAdd;
