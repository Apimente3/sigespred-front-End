import React, {useState, useEffect, useRef} from 'react';
import {REGISTRO_TRABAJADOR_BREADCRUM} from "../../../config/breadcrums";

import Wraper from "../../m000_common/formContent/WraperLarge";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr';


import SingleUpload from "../../../components/uploader/SingleUpload";
import ComboOptionsGroup from "../../../components/helpers/ComboOptionsGroup";
import {FilesUsuario} from "../../../config/parameters";
import * as helperGets from "../../../components/helpers/LoadMaestros";
import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {
    Form,
    FormGroup,
    Row6,
    Row12,
    RowForm,
    Select,
    Input,
    Options,
    FormControl,
    InputInline,
    FormFooter
} from "../../../components/forms";
import {useAsync} from "react-async-hook";

const Axios = initAxiosInterceptors();
const {$} = window;


/*Definiendo estilos componenet internos*/


/*Para registrar el trabajador*/
async function addTrabajador(usuario) {

    const {data} = await Axios.post(`/usuario`, usuario);
    return data;


}

async function loadAreas() {
    const {data: areas} = await Axios.get(`/areajerarquizado?busqueda=`);

    return areas;
}


async function loadRoles() {
    const {data: roles} = await Axios.get(`/rol`);

    return roles;
}


const TrabajadorAdd = ({history}) => {

    const [trabajador, set_trabajador] = useState({observacion: 'Nuevo Registro'});
    const [listAreas, setListAreas] = useState([]);
    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {

        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
            setListAreas(await loadAreas())
            setListRoles(await loadRoles())
        }
        init();
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
            toastr.error('Registro Incorrecto', e.response.data, {position: 'top-center'})
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

            <form onSubmit={registrar} className={"form-horizontal"}>
                <legend>{"Datos del Trabajador  "}</legend>
                <div className="form-group">
                    <label className="col-lg-2 control-label">
                        <span className="obligatorio">*</span>
                        Foto
                    </label>
                    <div className="col-lg-4">
                        {
                            !trabajador.foto ? <h3>Ingrese la Foto</h3> :
                                <img src={serverFile + trabajador.foto.path} className="img-circle" alt="User Avatar"
                                     height="150"></img>
                        }

                    </div>
                </div>
                <div className="form-group">
                    <label className="col-lg-2 control-label"></label>
                    <div className="col-lg-4">
                        <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                            <a href="#">

                            </a>

                            <SingleUpload
                                key="upload_foto"
                                accept="image/*"
                                folderSave={FilesUsuario.fotosUsuario}
                                form={trabajador}
                                setForm={set_trabajador}
                                nameUpload={"foto"}
                            >
                            </SingleUpload>


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
                        <a className="btn btn-default btn-sm dropdown-toggle pull-left" disabled
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
                <legend>{"Área y Cargo  "}</legend>
                <div className="form-group">
                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                        Area de Trabajo</label>
                    <div className="col-lg-4">
                        <Select required={true}
                                value={trabajador.areaid}
                                onChange={handleInputChange}
                                name={"areaid"}
                        >
                            <Options options={listAreas} index={"id"} valor={"path"}></Options>
                        </Select>
                    </div>
                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                        Cargo </label>
                    <div className="col-lg-4">
                        <input mayuscula="true" required
                               className="form-control input-sm uppercaseinput" type="text" name="cargo"
                               onChange={handleInputChange}
                               placeholder="Ingrese Cargo"
                               value={trabajador.cargo}
                        >
                        </input>

                    </div>

                </div>


                <legend>{"Usuario y Roles  "}</legend>
                <div className="form-group">
                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                        Usuario</label>
                    <div className="col-lg-4">
                        <input readonly className="form-control input-sm" type="text"
                               value={trabajador.dni}
                        ></input>
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

                <div className="form-group">
                    <label className="col-lg-2 control-label"><span
                        className="obligatorio">* </span> Rol de Trabajador</label>
                    <div className="col-lg-4">

                        <Select required={true}
                                value={trabajador.rolid}
                                onChange={handleInputChange}
                                name={"rolid"}
                        >
                            <Options options={listRoles} index={"id"} valor={"nombre"}></Options>
                        </Select>

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
                </div>

                <FormFooter>
                    <Link to={`/list-trabajadores`}
                          className="btn btn-default btn-sm btn-control">Cancelar</Link>
                    <button id="btnguardar" type="submit"
                            className="btn btn-danger btn-sm btn-control">Registrar
                    </button>

                </FormFooter>


            </form>
        </Wraper>
    );

}


export default TrabajadorAdd;
