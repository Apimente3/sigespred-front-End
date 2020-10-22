import React, {useState, useEffect, useRef} from 'react';
import {REGISTRO_TRABAJADOR_BREADCRUM} from "../../../config/breadcrums";

import Wraper from "../../m000_common/formContent/Wraper";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'


import UploadMemo from "../../../components/helpers/uploaders/UploadMemo";

import {FilesUsuario} from "../../../config/parameters";

import {initAxiosInterceptors, serverFile} from '../../../config/axios';
const Axios = initAxiosInterceptors();

const {$} = window;



/*Para registrar el trabajador*/
async function addTrabajador(usuario) {
    const {data} = await Axios.post(`/usuario`,usuario);
    return data;
}


const TrabajadorAdd = ({history}) => {

    const [trabajador, set_trabajador] = useState({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'});

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip()
       // setcontinuarAgregarComp(true)
    }, []);

    const limpiarForm = () => {
        set_trabajador({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'})
    }

    const registrar = async e => {
        e.preventDefault();
        // $('#btnguardar').button('loading');
        try {
            await addTrabajador(trabajador);
            toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'})
            history.push('/list-trabajadores')
        }
        catch (e) {
            alert(e.message)
        }
    }


    /*Permite el cambio del los datos del trabajador*/

    function handleInputChange(e) {
        if (['nombres', 'apellidos', 'direccion', 'cargo'].includes(e.target.name)) {
            set_trabajador({
                ...trabajador,
                [e.target.name]: e.target.value.toUpperCase()
            });
        } else {
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
        <Wraper titleForm={"Registro de Trabajador"} listbreadcrumb={REGISTRO_TRABAJADOR_BREADCRUM}>
            <form onSubmit={registrar}>
                <div className="form-group">
                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                        Foto</label>
                    <div className="col-lg-8">
                        <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                            <a href="#">
                                <img style={{height: '200px'}}
                                     src={(trabajador.foto !== 'img/userblank.jpg') ? serverFile + trabajador.foto : trabajador.foto}
                                     alt="User Avatar" className="img-thumbnail"></img>
                            </a>
                            <center>
                                <form className="md-form">


                                    <UploadMemo key="upload_portada_imagen" file={{urlDocumento: ''}}
                                                accept={'.jpg,.png,.gif'}
                                                setFile={saveFotoPortada} folderSave={FilesUsuario.fotosUsuario}
                                                eliminar={eliminarFotoPortada}></UploadMemo>

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
                               autoComplete="off"

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
                               autoComplete="off"

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
                               autoComplete="off"
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
                               autoComplete="off"
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
                               autoComplete="off"
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
                                   autoComplete="off"
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
                               name="fechvigenvia"
                               onChange={handleInputChange}
                               placeholder="Ingrese correo"
                               value={trabajador.fechvigenvia}
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
                               autoComplete="off"
                               value={trabajador.contrasenia}
                        ></input>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="form-group ">
                        <div className="col-lg-offset-2 col-lg-10">
                            <Link to={`/list-trabajadores`}
                                  className="btn btn-default btn-sm btn-control">Cancelar</Link>
                            <button id="btnguardar" type="submit"
                                    className="btn btn-danger btn-sm btn-control">Guardar
                            </button>


                        </div>

                    </div>

                </div>

            </form>
        </Wraper>
    );

}


export default TrabajadorAdd;
