import React, {useState,useEffect,useRef} from 'react';
import Header from "../../header/Header";
import {Link} from "react-router-dom";
import FooterProcess from "../../gestionPredios/FooterProcess";
import SidebarAdm from "../SidebarAdm";
import FileBase64 from 'react-file-base64';

import {toastr} from 'react-redux-toastr'
import {agregar,setcontinuarAgregar} from '../../../actions/trabajador/Actions';


import { useDispatch, useSelector } from 'react-redux';

const {$} = window;

const TrabajadorAdd = ({history}) => {

    const [foto, guardarFoto] = useState('img/userblank.jpg');
    const [dni, guardarDni] = useState('');
    const [nombres, guardarNombres] = useState('');
    const [apellidos, guardarApellidos] = useState('');
    const [direccion, guardarDireccion] = useState('');
    const [telefonos, guardarTelefonos] = useState('');
    const [nroscontacto, guardarnroscontacto] = useState('');
    const [fech_vigencia, guardarFech_vigencia] = useState('');
    const [cargo, guardarCargo] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [correopersonal, guardarCorreoPersonal] = useState('');
    const [rol, guardarRol] = useState('');
    const [contrasenia, guardarContrasenia] = useState('');
    const [observacion, guardarObservacion] = useState('Nuevo Registro');
    
    const dispatch = useDispatch();
    const agregarTrabajadorComp = (trabajador) => dispatch(  agregar(trabajador) );
    const setcontinuarAgregarComp = (estado) => dispatch(  setcontinuarAgregar(estado) );

    const getFiles = (files) => {
        console.log(files)
        guardarFoto(files[0].base64)
    }

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip()
        setcontinuarAgregarComp(true)
            
    }, []);
    
    const limpiarForm=()=>{
        
            guardarFoto('img/userblank.jpg');
            guardarDni('');
            guardarNombres('');
            guardarApellidos('');
            guardarDireccion('');
            guardarTelefonos('');
            guardarnroscontacto('');
            guardarFech_vigencia('');
            guardarCargo('');
            guardarCorreo('');
            guardarRol('');
            guardarContrasenia('');
            guardarObservacion('');
    }

    const  registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        try {
            let trabajador={
                foto,dni,nombres,apellidos,direccion,telefonos,fech_vigencia,cargo,correo,rol,contrasenia,observacion,nroscontacto,correopersonal
            }
   
            await agregarTrabajadorComp(trabajador);
            
            $('#btnguardar').button('reset');

           // let person =  window.confirm("¿Desea seguir registrando ?");

            const toastrConfirmOptions = {
                onOk: () =>  limpiarForm(),
                onCancel: () =>  history.push('/predios-list')
            };
            toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);

          
          
        }
        catch (e) {
            alert(e.message)
        }


    }


    // const {foto} = this.state;
    return (
        <div>
           

            <Header></Header>
            <SidebarAdm/>


            <form onSubmit={registrar}>


                <div className="container mtop-20">
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">
                                <label className={'titleform'}>REGISTRO DE TRABAJADOR</label>
                            </legend>
                        </fieldset>
                    </form>

                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <h5></h5>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Foto</label>
                                <div className="col-lg-4">
                                    <div className="col-xs-6 col-sm-12 col-md-6 text-center">
                                        <a href="#">
                                            <img src={foto} alt="User Avatar" className="img-thumbnail"></img>
                                        </a>
                                        <center>
                                            <form className="md-form">
                                                <div className="file-field">

                                                    <div className="file-path-wrapper">
                                                        <div className="input-group">

                                                            <div className="input-group-btn">
                                                                <div className="fileUpload btn btn-success">
                                                                        <span><i
                                                                            className="glyphicon glyphicon-upload"></i> Subir</span>

                                                                    <FileBase64 className="upload"
                                                                                multiple={true}
                                                                                onDone={getFiles.bind(this)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </center>
                                    </div>

                                </div>


                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    DNI</label>
                                <div className="col-lg-4">
                                    <input required type="text" className="form-control input-sm " name="dni"
                                           onChange={e=>guardarDni(e.target.value)}
                                           value={dni}
                                           title="El DNI debe ser numerico y tener 8 digitos"
                                           placeholder="Ingrese DNI de Trabajador" pattern="\d\d\d\d\d\d\d\d"
                                           maxLength={8}
                                           autocomplete="off"

                                    >
                                    </input>

                                </div>
                                <div className="col-lg-1">
                                    <a className="btn btn-default btn-sm dropdown-toggle pull-left"
                                       data-toggle="dropdown" data-toggle="tooltip"
                                       data-original-title={`Permite Sincronizar con la RENIEC`}>
                                        <i className="fa fa-refresh"></i></a>
                                </div>

                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Nombres</label>
                                <div className="col-lg-4">
                                    <input mayuscula="true" required
                                           className="form-control input-sm uppercaseinput" type="text"
                                           name="nombres"
                                           value={nombres}
                                           onChange={e=>guardarNombres(e.target.value.toUpperCase())}
                                           placeholder="Ingrese Nombres"
                                           autocomplete="off"
                                         
                                    ></input>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Apellidos</label>
                                <div className="col-lg-4">
                                    <input mayuscula="true" required
                                           className="form-control input-sm uppercaseinput" type="text"
                                           name="apellidos"
                                           value={apellidos}
                                           onChange={e=>guardarApellidos(e.target.value.toUpperCase())}
                                           autocomplete="off"
                                           placeholder="Ingrese Apellidos"></input>
                                </div>
                            </div>

                            <div className="form-group">

                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Direccion</label>
                                <div className="col-lg-4">
                                    <input mayuscula="true" required
                                           className="form-control input-sm uppercaseinput" type="text"
                                           name="direccion"
                                           value={direccion}
                                           onChange={e=>guardarDireccion(e.target.value.toUpperCase())}
                                           autocomplete="off"
                                           placeholder="Ingrese Direccion de Trabajador"></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Correo Institucional</label>
                                <div className="col-lg-4">
                                    <input id="correo" required className="form-control input-sm" type="email"
                                           name="correo"
                                           onChange={e=>guardarCorreo(e.target.value)}
                                           autocomplete="off"
                                           value={correo}
                                           placeholder="Ingrese correo"></input>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Telefono</label>
                                <div className="col-lg-4">


                                    <div className="input-group">
                                        <span className="input-group-addon">+51</span>
                                        <input id="telefonos" required className="form-control input-sm" type="text"
                                               title="Ingrese formato de telefono 999999999" name="telefonos"
                                               onChange={e=>guardarTelefonos(e.target.value)}
                                               pattern="\d\d\d\d\d\d\d\d\d"
                                               autocomplete="off"
                                               value={telefonos}
                                               placeholder="Ingrese Telefonos">
                                        </input>

                                    </div>


                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Correo Personal</label>
                                <div className="col-lg-4">
                                    <input id="correo" required className="form-control input-sm" type="email"
                                           name="correo"
                                           onChange={e => guardarCorreoPersonal(e.target.value)}
                                           autoComplete="off"
                                           value={correopersonal}
                                           placeholder="Ingrese correo"></input>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Telefono de Contactos</label>
                                <div className="col-lg-4">


                                    
                                       
                                        <input id="telefonos" required className="form-control input-sm" type="text"
                                               title="Ingrese formato de telefono 999999999" name="telefonos"
                                               onChange={e => guardarnroscontacto(e.target.value)}
                                               pattern="\d\d\d\d\d\d\d\d\d"
                                               autoComplete="off"
                                               value={nroscontacto}
                                               placeholder="Ingrese los telefonos de contacto del Trabajador.">
                                        </input>

                                  


                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Fecha Fin Vigencia</label>
                                <div className="col-lg-4">
                                    <input required className="form-control input-sm" type="date"
                                           name="fech_vigencia"
                                           onChange={e=>guardarFech_vigencia(e.target.value)}
                                           placeholder="Ingrese correo"
                                           value={fech_vigencia}
                                    ></input>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Profesión</label>
                                <div className="col-lg-4">
                                    <input mayuscula="true" required
                                           className="form-control input-sm uppercaseinput" type="text" name="cargo"
                                           onChange={e=>guardarCargo(e.target.value.toUpperCase())}
                                           placeholder="Ingrese Cargo"
                                           value={cargo}
                                    ></input>

                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Rol de Trabajador</label>
                                <div className="col-lg-4">
                                    <select id="tipopredio" className="form-control input-sm" name="rol"    value={rol}
                                            onChange={e=>guardarRol(e.target.value)}
                                    >
                                        <option value="0">--SELECCIONE--</option>
                                        <option value="1">ADMINISTRADOR</option>
                                        <option value="2">COORDINADOR</option>
                                        <option value="3">BRIGADISTA</option>

                                    </select>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Contraseña</label>
                                <div className="col-lg-4">
                                    <input required className="form-control input-sm" type="password"
                                           name="contrasenia"
                                           onChange={e=>guardarContrasenia(e.target.value)}
                                           placeholder="Ingrese Clave"
                                           autocomplete="off"
                                           value={contrasenia}
                                    ></input>
                                </div>
                            </div>


                            <hr></hr>


                            <div className="form-group ">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Observaciones </label>
                                <div className="col-lg-6">
                                <textarea required className="form-control input-sm" placeholder="Observaciones"
                                          name="observacion"
                                          onChange={e=>guardarObservacion(e.target.value)}
                                >
                                    {observacion}
                                </textarea>
                                </div>

                            </div>
                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">
                                        <button id="btnguardar" type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>
                                        <Link to={`/list-trabajadores`}
                                              className="btn btn-default btn-sm btn-control">Cancelar</Link>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-button-form "></div>

            </form>
            <FooterProcess/>
        </div>
    );

}


export default TrabajadorAdd; 
