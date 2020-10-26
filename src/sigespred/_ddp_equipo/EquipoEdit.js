import React, {useState, useEffect, useRef} from 'react';
import Wraper from "../m000_common/formContent/Wraper";
import {REGISTRO_EQUIPO_BREADCRUM} from "../../config/breadcrums";
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

    const [filtros, set_filtros] = useState();

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
                    checked: true
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
                onOk: () => limpiarForm(),
                onCancel: () => history.push('/list-equipos2')
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
        <Wraper titleForm={"Actualización del equipo"} listbreadcrumb={REGISTRO_EQUIPO_BREADCRUM}>
            <form onSubmit={actualizar}>
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
                  <div className="col-md-8">
                    <select
                      className="form-control input-sm"
                      id="proyectoid"
                      name="proyectoid"
                      required
                      title="El Proyecto es requerido"
                      onChange={handleInputChange}
                      value={equipo.proyectoid}
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
                    <label className="control-label">Nombre</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      required
                      type="text"
                      className="form-control input-sm"
                      id="equipo"
                      name="equipo"
                      placeholder="Ingrese el nombre del equipo"
                      onChange={handleInputChange}
                      value={equipo.equipo}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">Areas</label>
                  </div>
                  <div className="col-md-8">
                    <select className="form-control input-sm" id="areaid" name="areaid" 
                      required
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mt-3">
                  <div className="col-md-4 text-right">
                    <label className="control-label">Activo</label>
                  </div>
                  <div className="col-md-8">
                    <input type="checkbox" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                            name="activo" onChange={handleCheckActivoChange} checked={activoequipo.checked}
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
                            name="monitor" onChange={handleCheckChange} checked={monitor.checked}
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

}


export default EquipoEdit;
