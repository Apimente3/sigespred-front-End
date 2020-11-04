import React, { useState, useEffect, useRef } from "react";
import Wraper from "../m000_common/formContent/Wraper";
import {REGISTRO_ACTA_BREADCRUM} from "../../config/breadcrums";
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
//import { agregar } from "../../actions/_ddp_partida/Actions";

const { $ } = window;
const Axios = initAxiosInterceptors();

// api para insertar
async function addActa(acta) {
  const {data} = await Axios.post(`/acta`,acta);
  return data;
}
const obtenerEquipo = async () => {
  const {data:equipo } = await Axios.get(`/equipolista`);
  return {equipo};
};
const d = new Date();
async function getEquipo(id) {
  const {data} = await Axios.get(`/equipo/${id}`);
  return data;
}

const ActaAdd = ({ history }) => {

  const resListaEquipos = useAsync(obtenerEquipo, []);
  const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, []);

  const [acta, set_Acta] = useState();
  const [monitor, set_Monitor] = useState('');
  const [profesionales, set_profesionales] = useState({users:[]});
  //const [equipo, set_Equipo] = useState({activo: false, profesionales:[]});
  const [actividades, set_actividades] = useState({ActaParticipante:[]});
  const [participantes, set_participantes] = useState({});
  const [hora, set_hora ] = useState({date: new Date()})
    
    
    
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const cabeceraActividad = ["ID", "PROCESO","DESCRIPCION","RESPONSABLE", "FECHA ENTREGA", "PRODUCTO", "ACCIONES"];
    
    
  const registrar = async e => {
    e.preventDefault();
    try {
        await addActa(acta);
        const toastrConfirmOptions = {
            onOk: () => limpiarForm(),
            onCancel: () => history.push('/acta-list')
        };
        toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);

    }
    catch (e) {
        alert(e.message)
    }
  }

  const calculateTimeLeft = () => {
    let de=new Date();
    let duracion = {};
    let difference =(de.getTime() - d.getTime()) ;
    if(difference>0){
      duracion ={
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return duracion;
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      set_hora({date: new Date()});
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });


    
  function setSolicitante(idLocador,text) {
      /*set_area({
          ...area,
          usuarioid: idLocador
      });*/
    console.log(text);
  }

 
  const limpiarForm = () => {
    set_Acta({});
  };

  const handleSelectChange = async (e) => {
    e.preventDefault();
    if(e.target.value != ''){
      let equipo = await getEquipo(e.target.value);
      //set_Equipo(equipo); 
      let filterList = equipo.UsuarioInEquipo.filter((user) => {
        if(user.equipousuario.monitor){
          return true
        }
        return false
      });
      set_Monitor(`${filterList[0].nombres} ${filterList[0].apellidos}`);
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
    if (['producto','descripcion'].includes(e.target.name)) {
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
        nombre: e.target.options[e.target.selectedIndex].text,
        asistencia: filterList[0].asistencia
      });
    }
    
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

  const deleteUser = key => {
    let { users } = actividades;
    users.splice(key, 1);
    set_actividades({
      ActaParticipante: [...users]
    });
  };

  const checkAsistencia = (key,e) => {
    const { checked } = e.target
    let { users } = profesionales;
    profesionales.users[key].asistencia = checked;
    //console.log(profesionales.users[key])
  };


  return (
    <>
      <Wraper titleForm={"Registrar Acta"} listbreadcrumb={REGISTRO_ACTA_BREADCRUM}>
      <form onSubmit={registrar}>
            <fieldset><legend>Equipos</legend>
            <div class="col-lg-offset-1 col-lg-10 text-center">
            
                <div class="form-group col-md-4 text-center">
                    <label className="control-label" for="exampleInputEmail1">Equipo</label>
                    <select
                      className="form-control input-sm-3"
                      id="equipoid"
                      name="equipoid"
                      onChange={handleSelectChange}
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
                <div class="form-group col-md-4 text-center">
                    <label className="control-label" for="exampleInputEmail1">Monitor</label>
                    <input mayuscula="true" 
                      className="form-control input-sm-3" type="text"
                      id="monitor"
                      name="monitor"
                      value={monitor}>
                    </input>
                </div>
                <div class="form-group col-md-4 text-center">
                    <label className="control-label" for="exampleInputEmail1">Medio</label>                    
                    
                        <select
                        className="form-control input-sm-3"
                        name="medioid"
                        id="medioid"
                        >
                            <option value="0">--SELECCIONE--</option>
                            <option value="ZOOM">ZOOM</option>
                            <option value="SKYPE">SKYPE</option>
                            <option value="MEET">MEET</option>
                        </select>
                </div>
                </div>
                <div class="col-lg-offset-1 col-lg-10 text-center">
                  <div class="form-group col-md-4 text-center">
                    <label className="control-label" for="exampleInputEmail1"><i
                                        class="fa fa-calendar fa-3x"
                                    />{` ${d.getDate()} ${meses[d.getMonth()]}`}</label>
                  </div>
                  <div class="form-group col-md-4 text-center">
                    <label className="control-label" for="exampleInputEmail1"><i
                                        class="fa fa-clock-o fa-3x"
                      /> Hora de inicio: {`${('0' + d.getHours()).slice(-2)} : ${('0' + d.getMinutes()).slice(-2)} : ${('0' + d.getSeconds()).slice(-2)}`}</label>
                  </div>
                  <div class="form-group col-md-4 text-center">
                    <label className="control-label" for="exampleInputEmail1"><i
                                        class="fa fa-group fa-3x"
                                    /> Duración :{`${('0' + timeLeft.hours).slice(-2)} : ${('0' + timeLeft.mins).slice(-2)} : ${('0' + timeLeft.seconds).slice(-2)}`}</label>
                  </div>
                </div>
            </fieldset>
            
            <fieldset><legend>Participantes</legend>
            <div className="panel panel-default">
            <TableParticipante  
                data={profesionales.users}
                checkAsistencia={checkAsistencia}>
            </TableParticipante>                   
											
													
            </div>
            </fieldset>
            <fieldset><legend>Actividades</legend>

            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Actividad</label>
                <div className="col-lg-4">
                  <select className="form-control input-sm" id="actividadid" name="actividadid" 
                      required
                      title="El area es requerido"
                      onChange={handleInputChangePart}
                      >
                      <option value="">--SELECCIONE--</option>
                            <option value="1">ACTIVIDAD 1</option>
                            <option value="2">ACTIVIDAD 2</option>
                            <option value="3">ACTIVIDAD 2</option>  
                  </select>
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Responsable</label>
                <div className="col-lg-4">
                  <select className="form-control input-sm" id="usuarioid" name="usuarioid" 
                        required
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
                  <input mayuscula="true" required
                      className="form-control input-sm " type="text"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Ingrese la descripcion"
                      onChange={handleInputChangePart}
                      >
                  </input>
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Producto a Entrega</label>
                <div className="col-lg-4">
                  <input mayuscula="true" required
                      className="form-control input-sm " type="text"
                      id="producto"
                      name="producto"
                      placeholder="Ingrese el producto"
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
            </fieldset>
            <div className="panel panel-default">
              <TableActividad 
                cabecera={cabeceraActividad} 
                data={actividades}
                deleteUser={deleteUser}>
              </TableActividad>
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

export default ActaAdd;
