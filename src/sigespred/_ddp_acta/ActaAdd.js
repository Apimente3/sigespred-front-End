import React, { useState, useEffect, useRef } from "react";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {REGISTRO_ACTA_BREADCRUM} from "../../config/breadcrums";
import { Link } from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import { toastr } from "react-redux-toastr";
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import MAddEditInvitado from "./MAddEditInvitado";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import TableActividad from "./TableActividad";
import TableParticipante from "./TableParticipante";
import TableAgenda from "./TableAgenda";
import TableInvitado from "./TableInvitado";
import { act } from "react-dom/test-utils";

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

async function getEquipo(id) {
  const {data} = await Axios.get(`/equipo/${id}`);
  return data;
}

async function getActividades(id) {
  const {data} = await Axios.get(`/actividades?id=${id}`);
  return data;
}

async function getCodigoActa() {
  const {data} = await Axios.get(`/actacodigo`);
  return data;
}



const ActaAdd = ({ history }) => {
  
  const resListaEquipos = useAsync(obtenerEquipo, []);

  const [acta, set_Acta] = useState({duracion:'', ActaParticipante:[]});
  const [monitor, set_Monitor] = useState('');
  const [profesionales, set_profesionales] = useState({users:[]});
  const [actividades, set_actividades] = useState({ActaParticipante:[]});
  const [participantes, set_participantes] = useState({});
  const [fecha, set_fecha ] = useState(new Date());
  const [codigoacta,set_Codigoacta]  =  useState('')
  const [tema, set_tema] = useState({tema:''});
  const [agenda, set_agenda] = useState([]); 
  const [accion, set_accion] = useState('Agregar'); 
  const [listaactividades, set_listaactividades] = useState([]);
  const [listaAsistencia, setListaAsitencia] = useState([]);
  const [modalInvitado, setModalInvitado] = useState(false);
  const [listaInvitados, setListaInvitados] = useState([]);
  const listaTipoActividad = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOACTAACTIVIDAD]);
    
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const cabeceraActividad = ["ID", "PROCESO","DESCRIPCION","RESPONSABLE", "FECHA ENTREGA", "PRODUCTO", "ACCIONES"];
  const cabeceraTema = ["NRO", "TEMA","ACCIONES"];
    
    
  const registrar = async e => {
    let dur = `${('0' + timeLeft.hours).slice(-2)} : ${('0' + timeLeft.mins).slice(-2)} : ${('0' + timeLeft.seconds).slice(-2)}`;
    acta.duracion=dur;
    e.preventDefault();
    if(agenda.length==0){
      toastr.warning(`Advertencia !!! Ingrese un tema de agenda como minimo.`);
      return;
    }

    for(let item of actividades.ActaParticipante)  {
        if(listaAsistencia.some(p => p.id === item.usuarioid)){
            let elementoAsistencia = listaAsistencia.find(p => {return p.id === item.usuarioid});
            item.asistencia = elementoAsistencia.asistencia;
        }
    }
    
    acta.asistentes = listaAsistencia;
    acta.invitados = listaInvitados;
    acta.ActaParticipante=actividades.ActaParticipante;

    $('#btnguardar').button('loading');
    try {
        await addActa(acta);
        toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'})
        history.push("/acta-list")

    }
    catch (e) {
        toastr.error('Registro de Acta', e.message, {position: 'top-center'})
    }
    $('#btnguardar').button('reset');
  }

  const calculateTimeLeft = () => {
    let de=new Date();
    let duracion = {};
    let difference =(de.getTime() - fecha.getTime()) ;
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
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    async function init() {
        try {
          let generarcodigo = await getCodigoActa();
          const toastrConfirmOptions = {
            onOk: () => {
              set_Codigoacta(generarcodigo[0].codigo);
              set_fecha(new Date());
            },
            onCancel: () => history.push('/acta-list')
          };
          toastr.confirm(`Se registrará el acta 
                          nro ${generarcodigo[0].codigo}`, toastrConfirmOptions);
        } catch (e) {
            toastr.error('Actualización del acta', e.message, {position: 'top-right'})
        }
    }
    init();
}, []);

 
//   const limpiarForm = () => {
//     set_Acta({});
//   };

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
      if(!filterList.length>0){
        toastr.warning(`Advertencia !!! No tiene monitor asignado, seleccione otro equipo.`);
        set_Monitor('');
        set_profesionales({users:[]});
        return;
      }
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
          foto: cabeza.foto,
          asistencia: false 
      }));
      
      set_profesionales({
          users: user
      });
      
    }else{
      set_Monitor('');
    }
    
  }

  const handleInputChangePart = async (e) => {
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
      let listact = await getActividades(e.target.value);
      set_listaactividades(listact);
      set_participantes({
        ...participantes,
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

const updatevaluesinvitado=(invitado)=>{
    setListaInvitados([...listaInvitados,invitado])
    setModalInvitado(false);
}

const deleteInvitado = key => {
    var data = $.grep(listaInvitados, function(e){
        return e.id !== key;
   });
   setListaInvitados(data);

};

const cerrarModal=(estado)=>{
    setModalInvitado(estado);
}

  const handleClickAddEditInvitado = (e) => {
    setModalInvitado(true);
  }

  const handleClick = (e) => {
    if (!(participantes.usuarioid && participantes.actividad && participantes.descripcion && participantes.fechacomp &&
        participantes.producto)) {
        toastr.error('Actividades', 'Es necesario agregar todos los campos para la actividad', {position: 'top-center'});
        return;
    }

    if(accion === 'Agregar'){
      set_actividades({
        ActaParticipante: [
           ...actividades.ActaParticipante,
           participantes
        ]
      });
    }else{
      const key = actividades.ActaParticipante.findIndex(x => x.usuarioid == participantes.usuarioid);
      let { ActaParticipante } = actividades;
      ActaParticipante[key]= participantes;
      set_actividades({
        ActaParticipante: [...ActaParticipante]
      });
      set_accion('Agregar');
    }
  }

  const handleClickTema = (e) => {
      if (!tema.tema || tema.tema.trim() === "") {
        toastr.error('Añadir Tema', 'El tema no puede ser un valor vacío', {position: 'top-right'})
        return;
      }
    
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

  const updateActividad = async key => {
    let { ActaParticipante } = actividades;
    set_accion('Actualizar');
    set_participantes(ActaParticipante[key])
    let listact = await getActividades(ActaParticipante[key].usuarioid);
    set_listaactividades(listact);
 };

  const deleteTema = key => {
    agenda.splice(key, 1);
  };

  const checkAsistencia = (key,e) => {
    const { checked } = e.target
    profesionales.users[key].asistencia = checked;
    
    if(listaAsistencia.some(p => p.id === profesionales.users[key].id)){
        const nextState = listaAsistencia.map(p => p.id === profesionales.users[key].id ? { ...p, 'asistencia': profesionales.users[key].asistencia } : p);
        setListaAsitencia(nextState);
    } else{
        setListaAsitencia([...listaAsistencia,{id: profesionales.users[key].id, asistencia: profesionales.users[key].asistencia} ])
    }
  };


  return (
    <>
      <WraperLarge titleForm={`Registro del Acta Nro ${codigoacta}`} listbreadcrumb={REGISTRO_ACTA_BREADCRUM}>

        <fieldset className="mleft-20">
            <legend>Agenda</legend>
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
                        <div className="col-lg-12 text-right">
                            <button className="btn btn-sm btn-info" type="button" onClick={handleClickTema}>
                                <i className="fa fa-plus fa-lg" /> Añadir Tema</button>
                        </div>
                </div> 
            </div>
            <div className="form-group col-lg-6">
                <div className="col-lg-2"></div>
                <div className="col-lg-10">
                    <div className="panel panel-default">
                    <TableAgenda 
                        cabecera={cabeceraTema} 
                        data={agenda}
                        deleteTema={deleteTema}>
                    </TableAgenda>
                    </div>
                </div>
            </div>
        </fieldset>

          <form onSubmit={registrar}>
            <fieldset className="mleft-20" disabled={agenda.length > 0 ? false: true}><legend>Equipos</legend>
            <div className="col-lg-offset-1 col-lg-10 text-center">
                <div className="form-group col-md-1 text-center"></div>
                <div className="form-group col-md-3 text-center">
                    <label className="control-label"><span className="obligatorio">* </span>Equipo</label>
                    <select
                      className="form-control input-sm-3"
                      id="equipoid"
                      name="equipoid"
                      required
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
                <div className="form-group col-md-1 text-center"></div>
                <div className="form-group col-md-3 text-center">
                    <label className="control-label">Monitor</label>
                    <input mayuscula="true" 
                      className="form-control input-sm-3" type="text"
                      id="monitor"
                      name="monitor"
                      value={monitor || ""}>
                    </input>
                </div>
                <div className="form-group col-md-1 text-center"></div>
                <div className="form-group col-md-3 text-center">
                    <label className="control-label"><span className="obligatorio">* </span>Medio</label>                    
                        <select
                        className="form-control input-sm-3"
                        name="medioid"
                        id="medioid"
                        required
                        onChange={handleInputChangeActa}
                        >
                            <option value="">--SELECCIONE--</option>
                            <option value="1">ZOOM</option>
                            <option value="2">SKYPE</option>
                            <option value="3">MEET</option>
                        </select>
                </div>
                </div>
                <div className="col-lg-offset-1 col-lg-10 text-center">
                  <div className="form-group col-md-4 text-center">
                    <label className="control-label"><i
                                        className="fa fa-calendar fa-2x"
                                    /> {` ${fecha.getDate()} ${meses[fecha.getMonth()]}`}</label>
                  </div>
                  <div className="form-group col-md-4 text-center">
                    <label className="control-label"><i
                                        className="fa fa-clock-o fa-2x"
                      /> Hora de inicio : {`${('0' + fecha.getHours()).slice(-2)} : ${('0' + fecha.getMinutes()).slice(-2)} : ${('0' + fecha.getSeconds()).slice(-2)}`}</label>
                  </div>
                  <div className="form-group col-md-4 text-center">
                    <label className="control-label"><i
                                        className="fa fa-hourglass-half fa-2x"
                                    /> Duración : {`${('0' + timeLeft.hours).slice(-2)} : ${('0' + timeLeft.mins).slice(-2)} : ${('0' + timeLeft.seconds).slice(-2)}`}</label>
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

            <fieldset className="mleft-20 mbot-20" disabled={agenda.length > 0 ? false: true}><legend>Invitados</legend>
                <div>
                    <div className="col-lg-10">
                        <TableInvitado 
                            data={listaInvitados}
                            deleteinvitado={deleteInvitado}>
                        </TableInvitado>
                    </div>
                    <div className="col-lg-2 text-right">
                        <button className="btn btn-sm btn-info" type="button" value={accion} onClick={handleClickAddEditInvitado}>
                            <i className="fa fa-user-plus fa-lg"/> Añador Invitado</button>
                    </div>
                </div>
            </fieldset>

            <fieldset className="mleft-20" disabled={agenda.length > 0 ? false: true}><legend>Actividades</legend>

            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Responsable</label>
                <div className="col-lg-4">
                  <select className="form-control input-sm" id="usuarioid" name="usuarioid" 
                      title="El area es requerido"
                      onChange={handleInputChangePart}
                      value={participantes.usuarioid}
                      >
                      <option value="">--SELECCIONE--</option>
                      {profesionales.users.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}  
                  </select>
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Actividad</label>
                <div className="col-lg-4">
                  <select className="form-control input-sm" id="actividad" name="actividad" 
                      onChange={handleInputChangePart}
                      value={participantes.actividad || ""}
                      >
                      <option value="">--SELECCIONE--</option>
                      {listaTipoActividad.result ? 
                        <ComboOptions data={listaTipoActividad.result} valorkey="valorcodigo" valornombre="valortexto" /> 
                        : "Cargando..."}
                      
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
                    value={participantes.fechainicio}
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
                    value={participantes.fechacomp}
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
                  required
                  className="form-control input-sm "
                  rows={3}
                  onChange={handleInputChangePart}
                  value={participantes.descripcion}
                  placeholder="Ingrese la descripcion"
                  >
                </textarea>
                
                  
                </div>
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                    Producto a Entregar</label>
                <div className="col-lg-4">
                  <input mayuscula="true" required
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
                
              <div className="col-lg-10 text-right">
                  <button className="btn btn-sm btn-info" type="button" value={accion} onClick={handleClick}><i
                                        className="fa fa-plus fa-lg"
                                    /> {accion} Actividad </button>
              </div>
            </div>
            
            <div className="panel panel-default">
              <TableActividad 
                cabecera={cabeceraActividad} 
                data={actividades}
                deleteActividad={deleteActividad}
                updateActividad={updateActividad}>
              </TableActividad>
            </div>
            </fieldset>
            <div className="panel-body">
              <div className="form-group ">
                <div className="col-lg-offset-2 col-lg-10 text-right">
                    <Link to={`/acta-list`} className="btn btn-default btn-sm btn-control" >
                        Cancelar
                    </Link>
                    <button id="btnguardar" type="submit" className="btn btn-danger btn-sm btn-control" >
                        Guardar
                    </button>
                </div>
              </div>
            </div>
        </form>
        {modalInvitado && <MAddEditInvitado closeventana={cerrarModal} usevalue={updatevaluesinvitado} /> }
      </WraperLarge>
    </>
  );
};

export default ActaAdd;
