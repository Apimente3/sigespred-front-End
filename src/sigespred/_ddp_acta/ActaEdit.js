import React, { useState, useEffect, useRef } from "react";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {ACTUALIZAR_ACTA_BREADCRUM} from "../../config/breadcrums";
import { Link } from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import { useDispatch, useSelector } from "react-redux";
import TableActividad from "./TableActividad";
import TableParticipante from "./TableParticipante";
import TableAgenda from "./TableAgenda";
//import { agregar } from "../../actions/_ddp_partida/Actions";

const { $ } = window;
const Axios = initAxiosInterceptors();



async function getActa(id) {
    const {data} = await Axios.get(`/acta/${id}`);
    return data;
}

async function updateActa(acta) {
    const {data} = await Axios.put(`/acta/${acta.id}`,acta);
    return data;
}

const obtenerEquipo = async () => {
  const {data:equipo } = await Axios.get(`/equipolista`);
  return {equipo};
};

async function getEquipo(id) {
  const {data} = await Axios.get(`/equipo/${id}`);
  return data;
}



const ActaEdit = ({history, match}) => {

  const {id} = match.params;
  
  const resListaEquipos = useAsync(obtenerEquipo, []);

  const [acta, set_Acta] = useState({duracion:'', ActaParticipante:[]});
  const [monitor, set_Monitor] = useState('');
  const [profesionales, set_profesionales] = useState({users:[]});
  const [actividades, set_actividades] = useState({ActaParticipante:[]});
  const [participantes, set_participantes] = useState({});
  const [fecha, set_fecha ] = useState(new Date());
  const [codigoacta,set_Codigoacta]  =  useState('');
  const [tema, set_tema] = useState({tema:''});
  const [agenda, set_agenda] = useState([]);  
    
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const cabeceraActividad = ["ID", "ACTIVIDAD","DESCRIPCION","RESPONSABLE", "FECHA ENTREGA", "PRODUCTO", "ACCIONES"];
  const cabeceraTema = ["NRO", "TEMA","ACCIONES"];
    
    const actualizar = async e => {
        e.preventDefault();
        if(agenda.length==0){
        toastr.warning(`Advertencia !!! Ingrese un tema de agenda como minimo.`);
        return;
        }
        acta.agenda = agenda;
        acta.codigoacta = codigoacta;
        acta.ActaParticipante = actividades.ActaParticipante;
        console.log(acta);
        //$('#btnguardar').button('loading');
        try {
            await updateActa(acta);
            toastr.success('Actualización del acta', `El acta ${codigoacta} fue actualizado correctamente.`);
            history.push('/acta-list');
        }
        catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        async function init() {
            try {
                let acta = await getActa(id);
                set_agenda(acta.agenda);
                set_Codigoacta(acta.codigoacta);
                set_Monitor(acta.monitor);
                set_fecha(new Date(acta.fecha));
                set_Acta({
                    id: acta.id,
                    equipoid : acta.equipoid,
                    medioid: acta.medioid,
                    fecha: acta.fecha,
                    codigoacta: codigoacta,
                    estado: acta.estado,
                    monitor: acta.monitor,
                    agenda: agenda,
                    duracion: acta.duracion
                });
                let equipo = await getEquipo(acta.equipoid);

                let user = [];
                equipo.UsuarioInEquipo.forEach(function (cabeza,i) {
                    let filterList = acta.ActaParticipante.filter((user) => {
                        if(user.usuarioid == cabeza.equipousuario.trabajadorid) {
                           return true;
                        }
                        return false;
                    })
                    let asistencia=false;
                    if(typeof filterList[0].asistencia === 'undefined'){
                        asistencia = false;
                    }else{
                        asistencia = filterList[0].asistencia;
                    }
                    
                    let pro={ 
                        id: cabeza.equipousuario.trabajadorid,
                        nombre: cabeza.nombres + ' ' + cabeza.apellidos,
                        monitor:cabeza.equipousuario.monitor,
                        asistencia: asistencia 
                    };
                    user.push(pro);
                });
                set_profesionales({
                    users: user
                });

                const ar_participantes = [];
                acta.ActaParticipante.forEach((item,i) => {
                let a={
                    id: item.id,
                    actaid: item.actaid,
                    usuarioid: item.usuarioid,
                    actividad: item.actividad,
                    producto: item.producto,
                    descripcion: item.descripcion,
                    fechacomp: item.fechacomp,
                    asistencia: item.asistencia,
                    fechainicio: item.fechainicio,
                    estadocomp: item.estadocomp,
                    nombre: `${item.Usuario.nombres} ${item.Usuario.apellidos}`
                };
                ar_participantes.push(a);
                });
                set_actividades({
                    ActaParticipante: ar_participantes
                });
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        init();
    }, []);

 
  const limpiarForm = () => {
    set_Acta({});
  };

  const handleSelectChange = async (e) => {
    e.preventDefault();
    if(e.target.value != ''){
      let equipo = await getEquipo(e.target.value);
      if(typeof equipo.UsuarioInEquipo === 'undefined'){
        toastr.warning(`Advertencia !!! No tiene profesionales asignados, seleccione otro equipo.`);
        set_Monitor('');
        set_profesionales({users:[]});
        return;
      } 
      let filterList = equipo.UsuarioInEquipo.filter((user) => {
        if(user.equipousuario.monitor){
          return true
        }
        return false
      });
      set_Monitor(`${filterList[0].nombres} ${filterList[0].apellidos}`);
      set_Acta({
          equipoid : e.target.value,
          fecha: fecha.toJSON().slice(0,10).replace(/-/g,'/'),
          codigoacta: codigoacta,
          estado: 'PENDIENTE',
          monitor: `${filterList[0].nombres} ${filterList[0].apellidos}`,
          agenda: agenda
      });
      let user = equipo.UsuarioInEquipo.map(cabeza => (
          { 
          id: cabeza.equipousuario.trabajadorid,
          nombre: cabeza.nombres + ' ' + cabeza.apellidos,
          monitor:cabeza.equipousuario.monitor,
          asistencia: false 
      }));
      
      set_profesionales({
          users: user
      });
      console.log(profesionales);
      
    }else{
      set_Monitor('');
    }
    
  }

  const handleInputChangePart = (e) => {
    if (['producto','descripcion','actividad'].includes(e.target.name)) {
      set_participantes({
        ...participantes,
        [e.target.name]: e.target.value.toUpperCase()
      });
    }else{
      set_participantes({
        ...participantes,
        [e.target.name]: e.target.value
      });
    }
    if(['usuarioid'].includes(e.target.name)){
      let filterList = profesionales.users.filter((user) => {
        if(user.id == e.target.value) {
           return true;
        }
        return false;
      });
      set_participantes({
        ...participantes,
        actaid: id,
        usuarioid: e.target.value,
        nombre: e.target.options[e.target.selectedIndex].text,
        asistencia: filterList[0].asistencia
      });
    }
    
  }

  const handleInputChangeActa = (e) => {
    set_Acta({
      ...acta,
      [e.target.name]: e.target.value
    });
  }

  const handleInputChangeTema = (e) => {
    set_tema({
      [e.target.name]: e.target.value.toUpperCase()
    })
  }


  const handleClick = (e) => {
    
    set_actividades({
      ActaParticipante: [
         ...actividades.ActaParticipante,
         participantes
      ]
    });
    console.log(actividades);
  }

  const handleClickTema = (e) => {
    set_agenda(agenda => [...agenda, tema]);
    set_tema({tema:''});
  }

  const deleteActividad = key => {
    let { ActaParticipante } = actividades;
    ActaParticipante.splice(key, 1);
    set_actividades({
      ActaParticipante: [...ActaParticipante]
    });
  };

  const deleteTema = key => {
    let ag = agenda.splice(key, 1);
    set_agenda(ag);
    
  };

  const checkAsistencia = (key,e) => {
    const { checked } = e.target
    profesionales.users[key].asistencia = checked;
    //console.log(profesionales.users[key])
  };


  return (
    <>
      <WraperLarge titleForm={`Registro del Acta Nro ${codigoacta}`} listbreadcrumb={ACTUALIZAR_ACTA_BREADCRUM}>
        
          <fieldset className="mleft-20"><legend>Agenda</legend>
            <div className="form-group col-lg-6">
              <div className="form-group">
                <label className="col-lg-4 control-label"><span className="obligatorio">* </span>
                    Tema</label>
                <div className="col-lg-8">
                  <input mayuscula="true" required
                      className="form-control input-sm " type="text"
                      id="tema"
                      name="tema"
                      placeholder="Ingrese el tema de agenda"
                      value={tema.tema}
                      onChange={handleInputChangeTema}
                      >
                  </input>
                </div>
              </div>
              <div className="form-group">
                <div class="col-lg-12 text-right">
                  <button class="btn btn-sm btn-info" type="button" onClick={handleClickTema}><i
                                        class="fa fa-plus fa-lg"
                                    /> Añadir Tema </button>
                </div>
              </div> 
            </div>
            <div className="form-group col-lg-6">
            <div className="col-lg-2"></div>
              <div className="col-lg-10">
                  <div class="panel panel-default">
                    <TableAgenda 
                      cabecera={cabeceraTema} 
                      data={agenda}
                      deleteTema={deleteTema}>
                    </TableAgenda>
                  </div>
                  
                </div>
            </div>
          </fieldset>
          <form onSubmit={actualizar}>
            <fieldset className="mleft-20" disabled={agenda.length > 0 ? false: true}><legend>Equipos</legend>
            <div class="col-lg-offset-1 col-lg-10 text-center">
                <div class="form-group col-md-1 text-center"></div>
                <div class="form-group col-md-3 text-center">
                    <label className="control-label"><span className="obligatorio">* </span>Equipo</label>
                    <select
                      className="form-control input-sm-3"
                      id="equipoid"
                      name="equipoid"
                      required
                      onChange={handleSelectChange}
                      value={acta.equipoid}
                    >
                      <option value="">--SELECCIONE--</option>
                      {resListaEquipos.error ? (
                        "Se produjo un error cargando los equipos"
                      ) : resListaEquipos.loading ? (
                        "Cargando..."
                      ) : (
                        <ComboOptions
                          data={resListaEquipos.result}
                          valorkey="id"
                          valornombre="equipo"
                        />
                      )}
                    </select>
                </div>
                <div class="form-group col-md-1 text-center"></div>
                <div class="form-group col-md-3 text-center">
                    <label className="control-label">Monitor</label>
                    <input mayuscula="true" 
                      className="form-control input-sm-3" type="text"
                      id="monitor"
                      name="monitor"
                      value={monitor}>
                    </input>
                </div>
                <div class="form-group col-md-1 text-center"></div>
                <div class="form-group col-md-3 text-center">
                    <label className="control-label"><span className="obligatorio">* </span>Medio</label>                    
                        <select
                        className="form-control input-sm-3"
                        name="medioid"
                        id="medioid"
                        required
                        onChange={handleInputChangeActa}
                        value={acta.medioid}
                        >
                            <option value="">--SELECCIONE--</option>
                            <option value="1">ZOOM</option>
                            <option value="2">SKYPE</option>
                            <option value="3">MEET</option>
                        </select>
                </div>
                </div>
                <div class="col-lg-offset-1 col-lg-10 text-center">
                  <div class="form-group col-md-4 text-center">
                    <label className="control-label"><i
                                        class="fa fa-calendar fa-2x"
                                    /> {` ${fecha.getDate()} ${meses[fecha.getMonth()]}`}</label>
                  </div>
                  <div class="form-group col-md-4 text-center">
                    <label className="control-label"><i
                                        class="fa fa-clock-o fa-2x"
                      /> Hora de inicio : {acta.fecha}</label>
                  </div>
                  <div class="form-group col-md-4 text-center">
                    <label className="control-label"><i
                                        class="fa fa-hourglass-half fa-2x"
                                    /> Duración : {acta.duracion}</label>
                  </div>
                </div>
            </fieldset>
            
            <fieldset className="mleft-20" disabled={agenda.length > 0 ? false: true}><legend>Participantes</legend>
            <div className="panel panel-default">
            <TableParticipante  
                data={profesionales.users}
                checkAsistencia={checkAsistencia}>
            </TableParticipante>                   
											
													
            </div>
            </fieldset>
            <fieldset className="mleft-20" disabled={agenda.length > 0 ? false: true}><legend>Actividades</legend>

            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Actividad</label>
                <div className="col-lg-4">
                    <input type="text" list="data" 
                    className="form-control"
                    id="actividad" 
                    name="actividad"  
                    placeholder="Ingrese la actividad"
                    value={participantes.actividad}
                    onChange={handleInputChangePart}
                    />
                    <datalist id="data">
                        {actividades.ActaParticipante.map((item, key) =>
                        <option key={key} value={item.actividad} />
                        )}
                    </datalist>
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Responsable</label>
                <div className="col-lg-4">
                  <select className="form-control input-sm" id="usuarioid" name="usuarioid" 
                        title="El area es requerido"
                        onChange={handleInputChangePart}
                        >
                        <option value="">--SELECCIONE--</option>
                        {profesionales.users.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}  
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Fecha de Inicio</label>
                <div className="col-lg-4">
                  <input
                    style={{ lineHeight: "1.43" }}
                    type="date"
                    id="fechainicio"
                    name="fechainicio"
                    className="form-control"
                    onChange={handleInputChangePart}
                  />
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Fecha de Compromiso</label>
                <div className="col-lg-4">
                  <input
                    style={{ lineHeight: "1.43" }}
                    type="date"
                    id="fechacomp"
                    name="fechacomp"
                    className="form-control"
                    onChange={handleInputChangePart}
                  />
                </div>
            </div>
            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Descripción</label>
                <div className="col-lg-4">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-control input-sm "
                  rows={3}
                  onChange={handleInputChangePart}
                  value={participantes.descripcion}
                  placeholder="Ingrese la descripcion"
                  >
                </textarea>
                
                  
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Producto a Entrega</label>
                <div className="col-lg-4">
                  <input mayuscula="true"
                      className="form-control input-sm " type="text"
                      id="producto"
                      name="producto"
                      placeholder="Ingrese el producto"
                      value={participantes.producto}
                      onChange={handleInputChangePart}
                      >
                  </input>
                </div>
            </div>
            
            <div className="form-group">
                
              <div class="col-lg-10 text-right">
                  <button class="btn btn-sm btn-info" type="button" onClick={handleClick}><i
                                        class="fa fa-plus fa-lg"
                                    /> Añadir Actividad </button>
              </div>
            </div>
            
            <div className="panel panel-default">
              <TableActividad 
                cabecera={cabeceraActividad} 
                data={actividades}
                deleteActividad={deleteActividad}>
              </TableActividad>
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
                    to={`/acta-list`}
                    className="btn btn-default btn-sm btn-control"
                  >
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
           
        </form>
      </WraperLarge>
    </>
  );
};

export default ActaEdit;
