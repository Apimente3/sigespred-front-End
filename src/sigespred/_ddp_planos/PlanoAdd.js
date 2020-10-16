import React, {useState, useEffect, useRef} from 'react';
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import {Link} from "react-router-dom";
import FileBase64 from 'react-file-base64';
import {toastr} from 'react-redux-toastr'
import { useAsync } from "react-async-hook";
import {agregar, setcontinuarAgregar} from '../../actions/trabajador/Actions';
import ComboOptions from "../../components/helpers/ComboOptions";
import  {helperGetListProyectos, helperGetListTipoPlano, helperGetListDepartamento, helperGetListProvincia, helperGetListDetalle} from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";

import {useDispatch, useSelector} from 'react-redux';
import UploadFile from "../../components/helpers/uploaders/Upload";
import {serverFile} from "../../config/axios";

const {$} = window;

const PlanoAdd = ({history}) => {
    const [plano, set_plano] = useState({foto: 'img/userblank.jpg', observaciones: 'Nuevo Registro'});
    const resListaTipoPlano = useAsync(helperGetListTipoPlano, [""]);
    const resListaProyectos = useAsync(helperGetListProyectos, []);
    const resListaAnios = useAsync(helperGetListDetalle, [PARAMS.LISTASIDS.ANIO]);

    const limpiarForm = () => {
        set_plano({foto: 'img/userblank.jpg', observaciones: 'Nuevo Registro'})
    }

    function handleInputChange(e) {
        //console.log(plano);
        if (['nroexpediente'].includes(e.target.name)) {
            set_plano({
                ...plano,
                [e.target.name]: e.target.value.toUpperCase()
            });
        }else{
            set_plano({
                ...plano,
                [e.target.name]: e.target.value
            });
        }
        //console.log(plano);
    }

    const saveArchivo = (pmd) => {
        // alert(JSON.stringify(pmd))
        set_plano({
            ...plano,
            "foto": pmd.filename
        });
        console.log('archivo');
        console.log(JSON.stringify(pmd));
        console.log(plano);
        console.log('archivo fin');
    }   



    
    
    
    
    const [trabajador, set_trabajador] = useState({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'});
    const dispatch = useDispatch();
    const agregarTrabajadorComp = (trabajador) => dispatch(agregar(trabajador));
    const setcontinuarAgregarComp = (estado) => dispatch(setcontinuarAgregar(estado));

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip()
        setcontinuarAgregarComp(true)
    }, []);



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

    

        /*Guardando la foto del trbajador*/
        const saveFotoPortada = (pmd) => {
            // alert(JSON.stringify(pmd))
            set_trabajador({
                ...trabajador,
                "foto": pmd.filename
            });
        }
        // const {foto} = this.state;
        return (
            <div>


                {/* <Header/> */}
                <SidebarAdm/>


                <form onSubmit={registrar}>
                    <div className="container mtop-20">
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">
                                <label className={'titleform'}>REGISTRAR PLANO</label>
                            </legend>
                        </fieldset>
                        <div className="form-group mtop-25">
                            <div className="row">
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Datos de Codificación</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Tipo de Plano</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className="form-control" id="tipoplanoid" name="tipoplanoid"
                                                required
                                                title="El Tipo de Plano es requerido"
                                                onChange={handleInputChange}
                                                >
                                                    <option value="">--SELECCIONE--</option>
                                                    {resListaTipoPlano.error
                                                    ? "Se produjo un error cargando los tipos de plano"
                                                    : resListaTipoPlano.loading
                                                    ? "Cargando..."
                                                    : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Proyecto</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className="form-control" id="gestionpredialid" name="gestionpredialid" 
                                                required
                                                title="El Proyecto es requerido"
                                                onChange={handleInputChange}
                                                >
                                                    <option value="">--SELECCIONE--</option>
                                                    {resListaProyectos.error
                                                    ? "Se produjo un error cargando los proyectos"
                                                    : resListaProyectos.loading
                                                    ? "Cargando..."
                                                    : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Nro. de Expediente</label>
                                            </div>
                                            <div className="col-md-8">
                                                {/* <input type="text" className="form-control " id="codplano" name="codplano" placeholder="Código del plano" onBlur={definirFiltro}/> */}
                                                <input type="text" className="form-control " id="nroexpediente" name="nroexpediente" 
                                                placeholder="Número de expediente"
                                                required
                                                title="El Número de Expediente es requerido"
                                                autoComplete = "off"
                                                onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Año</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className="form-control" id="periodoid" name="periodoid" 
                                                required
                                                title="El Año es requerido"
                                                onChange={handleInputChange}
                                                >
                                                    <option value="0">--SELECCIONE--</option>
                                                    {resListaAnios.error
                                                    ? "Se produjo un error cargando los tipos de plano"
                                                    : resListaAnios.loading
                                                    ? "Cargando..."
                                                    : <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label"><span className="obligatorio">* </span>Proceso</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="proceso" name="proceso" className="form-control">
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Datos Generales</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Profesional Solicitante</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="profesional" name="profesional" className="form-control">
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Estado del Plano</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="estadoplano" name="estadoplano" className="form-control">
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Plano Antecedente</label>
                                            </div>
                                            <div className="col-md-8">
                                                {/* <input type="text" className="form-control " id="codplano" name="codplano" placeholder="Código del plano" onBlur={definirFiltro}/> */}
                                                <input type="text" className="form-control" id="antecedente" name="antecedente" readOnly/>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Fecha de Creación</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input style={{lineHeight: '1.43'}} type="date" id="fechacreacion" name="fechacreacion" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Observaciones</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" id="observaciones" name="observaciones"/>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Ubicación</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Tramo</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="tramo" name="tramo" className="form-control">
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Subtramo</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" id="subtramo" name="subtramo"/>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Departamento</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="departamento" name="departamento" className="form-control">
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Provincia</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="provincia" name="provincia" className="form-control">
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Distrito</label>
                                            </div>
                                            <div className="col-md-8">
                                                <select id="distrito" name="distrito" className="form-control">
                                                    <option value="0">--SELECCIONE--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Referencia Geográfica</label>
                                            </div>
                                            <div className="col-md-8">
                                                <form>
                                                    <UploadFile key="refgeo" file={trabajador.foto}
                                                        accept={'.jpg,.png,.gif'}
                                                        setFile={saveFotoPortada}></UploadFile>
                                                </form>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Archivos</legend>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Plano Dígital</label>
                                            </div>
                                            <div className="col-md-8">
                                                <form className="md-form">
                                                <UploadFile key="upload_portada_imagen" file={plano.foto}
                                                            accept={'.jpg,.png,.gif'}
                                                            setFile={saveArchivo}></UploadFile>

                                                </form>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4 text-right">
                                                <label className="control-label">Memoría Descriptiva</label>
                                            </div>
                                            <div className="col-md-8">
                                                <form className="md-form">
                                                    <UploadFile key="memoria_digital" file={trabajador.foto}
                                                        accept={'.jpg,.png,.gif'}
                                                        setFile={saveFotoPortada}></UploadFile>
                                                </form>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        
                        </div>





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


                                                    <UploadFile key="upload_portada_imagen" file={trabajador.foto}
                                                                accept={'.jpg,.png,.gif'}
                                                                setFile={saveFotoPortada}></UploadFile>

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
                                            <Link to={`/planos`}
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


    export default PlanoAdd; 
