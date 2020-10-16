import React, {useState, useEffect, useRef} from 'react';
import Header from "../../m000_common/headers/Header";
import SidebarAdm from "../../m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../m000_common/footers/FooterProcess";

import {Link} from "react-router-dom";
import FileBase64 from 'react-file-base64';
import {toastr} from 'react-redux-toastr'
import {agregar, setcontinuarAgregar} from '../../../actions/trabajador/Actions';


import {useDispatch, useSelector} from 'react-redux';
import UploadMemo from "../../../components/helpers/uploaders/UploadMemo";
import {serverFile} from "../../../config/axios";

const {$} = window;

const TrabajadorAdd = ({history}) => {


    const [trabajador, set_trabajador] = useState({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'});
    const dispatch = useDispatch();
    const agregarTrabajadorComp = (trabajador) => dispatch(agregar(trabajador));
    const setcontinuarAgregarComp = (estado) => dispatch(setcontinuarAgregar(estado));

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip()
        setcontinuarAgregarComp(true)
    }, []);

    const limpiarForm = () => {
        set_trabajador({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'})
    }

    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        try {

            await agregarTrabajadorComp(trabajador);

            $('#btnguardar').button('reset');

            // let person =  window.confirm("¿Desea seguir registrando ?");

            const toastrConfirmOptions = {
                onOk: () => limpiarForm(),
                onCancel: () => history.push('/list-trabajadores')
            };
            toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);


        }
        catch (e) {
            alert(e.message)
        }


    }


    /*Permite el cambio del los datos del trabajador*/

    function handleInputChange(e) {
        if (['nombres', 'apellidos', 'direccion','cargo'].includes(e.target.name)) {
            set_trabajador({
                ...trabajador,
                [e.target.name]: e.target.value.toUpperCase()
            });
        }else{
            set_trabajador({
                ...trabajador,
                [e.target.name]: e.target.value
            });
        }

    }

        /*Guardando la foto del trbajador*/
        const saveFotoPortada = (pmd) => {
            // alert(JSON.stringify(pmd))
            set_trabajador({
                ...trabajador,
                "foto": pmd.path
            });
        }
        // const {foto} = this.state;
    /*Guardando la foto del trbajador*/
    const eliminarFotoPortada = () => {
        // alert(JSON.stringify(pmd))
        set_trabajador({
            ...trabajador,
            "foto": ''
        });
    }



        return (
            <div>


                <Header/>
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
                                    <div className="col-lg-8">
                                        <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                                            <a href="#">
                                                <img style={{height: '200px'}} src={(trabajador.foto!=='img/userblank.jpg')?serverFile + trabajador.foto:trabajador.foto}
                                                     alt="User Avatar" className="img-thumbnail"></img>
                                            </a>
                                            <center>
                                                <form className="md-form">


                                                    <UploadMemo key="upload_portada_imagen" file={{urlDocumento:''}}
                                                                accept={'.jpg,.png,.gif'}
                                                                setFile={saveFotoPortada} folderSave={"FotosUsuarios"} eliminar={eliminarFotoPortada}></UploadMemo>

                                                </form>
                                            </center>
                                        </div>

                                    </div>


                                </div>


                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                        DNI</label>
                                    <div className="col-lg-4">
                                        <input required type="text" className="form-control input-sm "
                                               name="dni"
                                               onChange={handleInputChange}
                                               value={trabajador.dni}
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
                                               className="form-control input-sm " type="text"
                                               name="nombres"
                                               value={trabajador.nombres}
                                               onChange={handleInputChange}
                                               placeholder="Ingrese Nombres"
                                               autocomplete="off"

                                        ></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                        Apellidos</label>
                                    <div className="col-lg-4">
                                        <input mayuscula="true" required
                                               className="form-control input-sm " type="text"
                                               name="apellidos"
                                               value={trabajador.apellidos}
                                               onChange={handleInputChange}
                                               autocomplete="off"
                                               placeholder="Ingrese Apellidos"></input>
                                    </div>
                                </div>

                                <div className="form-group">

                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                        Direccion</label>
                                    <div className="col-lg-4">
                                        <input mayuscula="true" required
                                               className="form-control input-sm" type="text"
                                               name="direccion"
                                               value={trabajador.direccion}
                                               onChange={handleInputChange}
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
                                               onChange={handleInputChange}
                                               autocomplete="off"
                                               value={trabajador.correo}
                                               placeholder="Ingrese correo"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                        Telefono</label>
                                    <div className="col-lg-4">


                                        <div className="input-group">
                                            <span className="input-group-addon">+51</span>
                                            <input id="telefonos" required className="form-control input-sm" type="text"
                                                   title="Ingrese formato de telefono 999999999" name="telefonos"
                                                   onChange={handleInputChange}
                                                   pattern="\d\d\d\d\d\d\d\d\d"
                                                   autocomplete="off"
                                                   value={trabajador.telefonos}
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
                                               name="correopersonal"
                                               onChange={handleInputChange}
                                               autoComplete="off"
                                               value={trabajador.correopersonal}
                                               placeholder="Ingrese correo"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                        Telefono de Contactos</label>
                                    <div className="col-lg-4">


                                        <input id="telefonos" required className="form-control input-sm" type="text"
                                               title="Ingrese formato de telefono 999999999" name="nroscontacto"
                                               onChange={handleInputChange}

                                               autoComplete="off"
                                               value={trabajador.nroscontacto}
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
                                               onChange={handleInputChange}
                                               placeholder="Ingrese correo"
                                               value={trabajador.fech_vigencia}
                                        ></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                        Profesión</label>
                                    <div className="col-lg-4">
                                        <input mayuscula="true" required
                                               className="form-control input-sm uppercaseinput" type="text" name="cargo"
                                               onChange={handleInputChange}
                                               placeholder="Ingrese Cargo"
                                               value={trabajador.cargo}
                                        ></input>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Rol de Trabajador</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                                value={trabajador.rol}
                                                onChange={handleInputChange}
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
                                               onChange={handleInputChange}
                                               placeholder="Ingrese Clave"
                                               autocomplete="off"
                                               value={trabajador.contrasenia}
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
                                          onChange={handleInputChange}
                                >
                                    {trabajador.observacion}
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
