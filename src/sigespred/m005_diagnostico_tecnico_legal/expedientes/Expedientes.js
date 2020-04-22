import React, {useEffect, useState} from 'react';
import Header from "../../m000_common/headers/Header";
import {Link} from "react-router-dom";
import Expediente from "./Expediente";
import {initAxiosInterceptors,} from '../../../config/axios';

import SidebarPredios from "../../m000_common/siderbars/SidebarPredios";
import MInformeFinalDiagnostico from "../modals/MInformeFinalDiagnostico";
import ModalAddExpediente from "./ModalAddExpediente";
import {toastr} from "react-redux-toastr";

const Axios = initAxiosInterceptors();

async function listarSolicitud() {
    const {data} = await Axios.get(`/buscarsolicitud`);

    console.log(data)
    return data;
}

async function getPredio(codigo) {
    const {data} = await Axios.get(`/obtener_sujetopasivo/${codigo}`);
    return data;
}

async function listadoExpediente(codigo_predio) {
    const {data} = await Axios.get(`/expedientespredio?codigo_predio=${codigo_predio}`);
    return data;
}


const Expedientes = ({history, match}) => {

    const [expedientes, set_expedientes] = useState([]);

    const [modalAdd, set_ModalAdd] = useState(false);
    const {codigo} = match.params;
    const [propietario, set_propietario] = useState(null);
    const [combopropietario, set_combopropietario] = useState(null);
    const [addExpediente, setExpediente] = useState(false);

    /*Efecto para realizar el cargo de los resposablmes*/
    useEffect(() => {
        async function cargarListadoSolicitudes() {
            try {
                //  let listadoSolcitud = await listarSolicitud();
                let propietarios = await getPredio(codigo);
            
               
                if (typeof propietarios.integrantes=="undefined"|| (propietarios.integrantes.length == 0 & propietarios.poseedores.length == 0 & propietarios.ocupantes.length == 0)) {
                    toastr.error('Ingrese al menos un sujeto Pasivo')
                    history.push('/propietarios-predio/' + codigo);
                } else {
                    set_propietario(propietarios)
                }
                let listexp = await listadoExpediente(codigo);
                set_expedientes(listexp);
                //  setSolicitudes(listadoSolcitud);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }

        cargarListadoSolicitudes();
    }, []);


    const generarResumenTitulares = (property) => {
        var sujetopasivo = []
        /*Titular*/
        let rtitular = '';
        let rdocumento = '';
        for (let titular of property.integrantes) {
            if (titular.tipo_documento == 'RUC') {
                rtitular = rtitular + titular.razon_social + ' ' + titular.nro_documento + ' ,'
            } else {
                rtitular = rtitular + titular.nombres + ' ' + titular.apellidos + ' ' + titular.nro_documento + ' ,'
            }
            rdocumento = rdocumento + titular.nro_documento + ','
        }
        sujetopasivo.push(
            {tipo: 'PROPIETARIO', sujetopasivo: rtitular, antiguedad: 0, nro_documento: rdocumento}
        )

        /*Agregando Poseedores*/
        for (let poseedor of property.poseedores) {
            if (poseedor.tipo_documento == 'RUC') {
                sujetopasivo.push({
                    tipo: 'POSEEDOR',
                    sujetopasivo: poseedor.razon_social + ' ' + poseedor.nro_documento,
                    nro_documento: poseedor.nro_documento,
                    antiguedad: poseedor.tipo_poseedor
                })
            } else {
                sujetopasivo.push({
                    tipo: 'POSEEDOR',
                    sujetopasivo: poseedor.nombres + ' ' + poseedor.apellidos + ' ' + poseedor.nro_documento,
                    nro_documento: poseedor.nro_documento,
                    antiguedad: poseedor.tipo_poseedor
                })
            }
        }
        /*Agregando los ocupantes*/
        for (let ocupante of property.ocupantes) {
            if (ocupante.tipo_documento == 'RUC') {
                sujetopasivo.push({
                    tipo: 'OCUPANTE',
                    sujetopasivo: ocupante.razon_social + ' ' + ocupante.nro_documento,
                    nro_documento: ocupante.nro_documento,
                    antiguedad: 0
                })
            } else {
                sujetopasivo.push({
                    tipo: 'OCUPANTE',
                    sujetopasivo: ocupante.nombres + ' ' + ocupante.apellidos + ' ' + ocupante.nro_documento,
                    nro_documento: ocupante.nro_documento,
                    antiguedad: 0

                })
            }
        }

        return sujetopasivo;

    }

    /*Para cerrar el modal de agregar expediente*/
    const closeModalAddExp = () => {
        setExpediente(false);
    }

    /*Para cerrar el modal de agregar expediente*/
    const openModalAddExp = () => {
        set_combopropietario(generarResumenTitulares(propietario));
        setExpediente(true);
    }

    /**/
    const getPredataExpediente = () => {
        return {};
    }

    return (
        <div>
            <Header></Header>
            <SidebarPredios codigopredio={codigo}></SidebarPredios>
            <div>
                <div id="breadcrumb">
                    <ul className="breadcrumb">
                        <li><i className="fa fa-home"></i><a href="#"> Proyectos</a></li>
                        <li className="active">Busqueda de Proyectos</li>
                    </ul>
                </div>
                <div className="padding-md container">
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">
                                <label className={'titleform'}>LISTADO DE EXPEDIENTES DE GESTION PREDIAL</label>
                                <a onClick={openModalAddExp}
                                   className="btn btn-default pull-right btn-sm fullborder btn-control">
                                    + Registrar
                                </a>
                            </legend>
                        </fieldset>
                    </form>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <form className="form-inline no-margin">
                                        <div className="form-group margin-form-search">

                                            <div className="input-group">
                                                <input type="text"
                                                       placeholder="Ingrese Código del Exp. o Nombres y Apellidos de los Titulares."
                                                       className="datepicker form-control" style={{width: '500px'}}/>
                                                <span className="input-group-addon"><i
                                                    className="fa fa-search"></i></span>
                                            </div>
                                        </div>
                                        <div className="checkbox margin-form-search">
                                            <label className="label-checkbox">
                                            </label>
                                        </div>
                                        <button to={'/'} type="submit"
                                                className="btn btn-sm btn-danger pull-right margin-form-boton  btn-control">
                                            <i className="fa fa-search"></i> Buscar
                                        </button>
                                    </form>
                                </div>


                                <ul className="list-group">
                                    {
                                        expedientes.map(solicitud => (
                                            <Expediente
                                                key={solicitud.id}
                                                props={solicitud}
                                            />
                                        ))
                                    }


                                </ul>
                                <div className="panel-footer text-right">
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {
                propietario ?

                    addExpediente ?
                        <ModalAddExpediente propietario={combopropietario} getPredataExpediente={getPredataExpediente}
                                            closeModal={closeModalAddExp}/> : null
                    : null

            }
        </div>
    );
};

export default Expedientes;