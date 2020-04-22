import React, {useState, useEffect, useRef} from 'react';
import Header from "../../m000_common/headers/Header";

import {Link} from "react-router-dom";
import FooterProcess from "../../m000_common/footers/FooterProcess";
import SidebarAdm from "../../m000_common/siderbars/SidebarAdm";
import FileBase64 from 'react-file-base64';


import {obtener, editar, setFoto} from '../../../actions/trabajador/Actions';
import {useDispatch, useSelector} from 'react-redux';

import {toastr} from 'react-redux-toastr'




const {$} = window;
const TrabajadorEdit = ({history, match}) => {
    
    const [trabajadorEdit,setTrabajadorEdit]= useState({});

    const [rolState, guardarRolState] = useState('');
    const [changeRol,guardarChangeRol]=useState(false)
    /*Declarando las referencias */
    
    const dniRef = useRef('');
    const nombresRef = useRef('');
    const apellidosRef = useRef('');
    const direccionRef = useRef('');
    const telefonosRef = useRef('');
    const fech_vigenciaRef = useRef('');
    const cargoRef = useRef('');
    const correoRef = useRef('');
    const rolRef = useRef('');
    const constraseniaRef = useRef('');
    const observacionRef = useRef('');


    const editarTrabajadorComp = (trabajador) => dispatch(editar(trabajador));
    const setFotoComp = (foto) => dispatch(setFoto(foto));   
    const ObtenerTrabajadorComp = (id) => dispatch(obtener(id));

    const {id} = match.params;

    const dispatch = useDispatch();

    const getFiles = (files) => {
        setFotoComp(files[0].base64)
    }



    useEffect(() => {
        const getTrabajador=async (id)=>{
           await ObtenerTrabajadorComp(id)
        }
        getTrabajador((id))
        setTrabajadorEdit(trabajador)

    }, []);

 

    const trabajador = useSelector(state => state.trabajador.trabajador);
    const foto = useSelector(state => state.trabajador.foto);
 
    

    /*Guardado el rol al en el camvio de rol*/

    const saveRol = (e) => {
        
        e.preventDefault();
        guardarChangeRol(true);
        guardarRolState(e.target.value)
       //
      
    }


    const actualizar = async e => {
        e.preventDefault();
        toastr.success('The title', 'The message');
        $('#btnguardar').button('loading');
        try {
            let trabajador = {
                id,
                foto,
                dni: dniRef.current.value,
                nombres: nombresRef.current.value.toUpperCase(),
                apellidos: apellidosRef.current.value.toUpperCase(),
                direccion: direccionRef.current.value.toUpperCase(),
                telefonos: telefonosRef.current.value,
                fech_vigencia: fech_vigenciaRef.current.value,
                cargo: cargoRef.current.value.toUpperCase(),
                correo: correoRef.current.value,
                rol: rolState,
                contrasenia: correoRef.current.value,
                observacion: observacionRef.current.value
            };
            console.log(trabajador)
            await editarTrabajadorComp(trabajador);
            $('#btnguardar').button('reset');
           
            history.push('/list-trabajadores');
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


            <form onSubmit={actualizar}>


                <div className="container mtop-20">
                    <h4 className="headline ">
                        Modificación del Trabajador
                        <span className="line"></span>
                    </h4>

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
                                            <img src={foto} alt="User Avatar"
                                                 className="img-thumbnail"></img>
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

                                           Value={trabajador.dni}
                                           title="El DNI debe ser numerico y tener 8 digitos"
                                           placeholder="Ingrese DNI de Trabajador" pattern="\d\d\d\d\d\d\d\d"
                                           maxLength={8}
                                           autoComplete="off"
                                           ref={dniRef}

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
                                           Value={trabajador.nombres}
                                           ref={nombresRef}
                                           placeholder="Ingrese Nombres"
                                           autoComplete="off"

                                    ></input>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Apellidos</label>
                                <div className="col-lg-4">
                                    <input mayuscula="true" required
                                           className="form-control input-sm uppercaseinput" type="text"
                                           name="apellidos"
                                           Value={trabajador.apellidos}
                                           ref={apellidosRef}
                                           autoComplete="off"
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
                                           Value={trabajador.direccion}
                                           ref={direccionRef}
                                           autocomplete="off"
                                           placeholder="Ingrese Direccion de Trabajador"></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Correo</label>
                                <div className="col-lg-4">
                                    <input id="correo" required className="form-control input-sm" type="email"
                                           name="correo"
                                           ref={correoRef}
                                           autoComplete="off"
                                           Value={trabajador.correo}
                                           placeholder="Ingrese correo"></input>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Telefonos</label>
                                <div className="col-lg-4">


                                    <div className="input-group">
                                        <span className="input-group-addon">+51</span>
                                        <input id="telefonos" required className="form-control input-sm" type="text"
                                               title="Ingrese formato de telefono 999999999" name="telefonos"
                                               ref={telefonosRef}
                                               pattern="\d\d\d\d\d\d\d\d\d"
                                               autocomplete="off"
                                               Value={trabajador.telefonos}
                                               placeholder="Ingrese Telefonos">
                                        </input>

                                    </div>


                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Fecha Fin Vigencia</label>
                                <div className="col-lg-4">
                                    <input required className="form-control input-sm" type="date"
                                           name="fech_vigencia"
                                           ref={fech_vigenciaRef}
                                           placeholder="Ingrese correo"
                                           Value={trabajador.fech_vigencia}
                                    ></input>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Cargo</label>
                                <div className="col-lg-4">
                                    <input mayuscula="true" required
                                           className="form-control input-sm uppercaseinput" type="text" name="cargo"
                                           ref={cargoRef}
                                           placeholder="Ingrese Cargo"
                                           Value={trabajador.cargo}
                                    ></input>

                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Rol de Trabajador</label>
                                <div className="col-lg-4">
                                    <select id="tipopredio" className="form-control input-sm" name="rol"
                                            onChange={saveRol}
                                            value={(changeRol)? rolState :trabajador.rol}
                                            ref={rolRef}
                                    >

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
                                           ref={constraseniaRef}
                                           placeholder="Ingrese Clave"
                                           autoComplete="off"
                                           Value={trabajador.contrasenia}
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
                                          ref={observacionRef}
                                >
                                  
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


export default TrabajadorEdit; 
