import React, {useState, useEffect, useRef} from 'react';
import Wraper from "../m000_common/formContent/WraperLarge";
import {ACTUALIZAR_EQUIPO_BREADCRUM} from "../../config/breadcrums";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import ComboOptionsGroup from "../../components/helpers/ComboOptionsGroup";
import * as helperGets from "../../components/helpers/LoadMaestros";
import { useAsync } from "react-async-hook";
import EquipoTable from "../_ddp_equipo/EquipoTable";

import { initAxiosInterceptors } from "../../config/axios";
const Axios = initAxiosInterceptors();

const {$} = window;


async function getEquipo(id) {
    const {data} = await Axios.get(`/equipo/${id}`);
    return data;
}


async function updateEquipo(equipo) {
    const {data} = await Axios.put(`/equipo/${equipo.equipo.id}`,equipo);
    return data;
}



const EquipoEdit = ({history, match}) => {

    const {id} = match.params;

    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaSubAreas = useAsync(helperGets.helperGetListaSubAreas, []);
    const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, []);
    
    const [equipo, set_equipo] = useState({activo: false, profesionales:[]});
    const [profesionales, set_profesionales] = useState({users:[]});
    const [monitor, set_monitor] = useState({checked: false});
    const [activoequipo, set_activoequipo] = useState({checked: false});

    const [filtros, set_filtros] = useState({nombre:null});

    const cabeceraEquipo = ["ID", "PROFESIONAL","MONITOR", "ACCIONES"];

    useEffect(() => {
        async function init() {
            try {
                let equipo = await getEquipo(id)
                set_equipo(equipo);                 
                let user = equipo.UsuarioInEquipo.map(cabeza => (
                    { 
                    id: cabeza.equipousuario.trabajadorid,
                    nombre: cabeza.nombres + ' ' + cabeza.apellidos,
                    monitor:cabeza.equipousuario.monitor 
                }));

                set_profesionales({
                    users: user
                });

                set_activoequipo({
                    checked: equipo.activo
                })

                console.log(user);

                  
                
               
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        init();
    }, []);

    const limpiarForm = () => {
        //set_trabajador({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'})
    }

    const actualizar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        let objEquipo = {
            equipo:equipo,
            profesionales: profesionales.users    
        };
        try {
            await updateEquipo(objEquipo);
            const toastrConfirmOptions = {
                onOk: () => history.push('/list-equipos2'),
                onCancel: () => history.push(`/list-equipos2`)
            };
            toastr.confirm('¿ Desea seguir actualizando ?', toastrConfirmOptions);
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
        let filterList = profesionales.users.filter((user) => {
          if(user.id === filtros.id) {
             return true;
          }
          return false;
        })
        if(filtros.nombre == null){
          toastr.info(`Información !!! Ingrese el profesional.`);
          return;
        }
        if(monitor.checked){
          let filterList = profesionales.users.filter((user) => {
            if(user.monitor == true) {
               return true;
            }
            return false;
          })
          if(filterList.length>0){
            toastr.info(`Información !!! Ya existe un profesional asignado como monitor.`);
            return;
          } 
        }
  
        if(filterList.length>0){
          toastr.info(`Información !!! Ya existe un profesional en el grupo`);
          return;
        }      
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



    // const {foto} = this.state;
    return (
        <>
        <Wraper titleForm={"Actualización del equipo"} listbreadcrumb={ACTUALIZAR_EQUIPO_BREADCRUM}>
          <form onSubmit={actualizar} className={"form-horizontal"}>
            <fieldset><legend>Datos del Equipo</legend>
              <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Proyecto</label>
                <div className="col-lg-4">
                    <select
                      className="form-control input-sm"
                      id="proyectoid"
                      name="proyectoid"
                      required
                      title="El Proyecto es requerido"
                      value={equipo.proyectoid}
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
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Nombre</label>
                <div className="col-lg-4">
                    <input mayuscula="true" required
                      className="form-control input-sm " type="text"
                      id="equipo"
                      name="equipo"
                      placeholder="Ingrese el nombre del equipo"
                      value={equipo.equipo}
                      onChange={handleInputChange}>
                    </input>
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Areas</label>
                <div className="col-lg-4">
                  <select className="form-control input-sm" id="areaid" name="areaid" 
                      required
                      title="El area es requerido"
                      onChange={handleInputChange}
                      value={equipo.areaid}>
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
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Activo</label>
                <div className="col-lg-4">
                  <input type="checkbox" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                    name="activo" onChange={handleCheckActivoChange} checked={activoequipo.checked}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset><legend>Asignar Profesional</legend>
              <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Profesional</label>
                <div className="col-lg-4">
                  {resListaSolicitantes.error
                      ? "Se produjo un error cargando los locadores"
                      : resListaSolicitantes.loading
                      ? "Cargando..."
                      : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} />}
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Monitor</label>
                <div className="col-lg-2">
                  <input type="checkbox" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                      name="monitor" onChange={handleCheckChange} defaultChecked={monitor.checked}
                  />
                </div>
                <div class="col-lg-2">
                  <button class="btn btn-sm btn-info" type="button" onClick={handleClick}><i
                                        class="fa fa-plus fa-lg"
                                    /> Agregar Profesional</button>
                </div>
              </div>
            </fieldset>
            <div className="panel panel-default">
              <EquipoTable 
                cabecera={cabeceraEquipo} 
                data={profesionales}
                deleteUser={deleteUser}>
              </EquipoTable>
            </div>
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
          </form>
        </Wraper>
        </>
    );

}


export default EquipoEdit;
