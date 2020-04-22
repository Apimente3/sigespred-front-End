import React, {useEffect, useRef, useState} from 'react';

import {Link} from "react-router-dom";
import Header from "../../m000_common/headers/Header";
import SidebarAdm from "../../m000_common/siderbars/SidebarAdm";
import FooterProcess from "../../m000_common/footers/FooterProcess";
import {useDispatch, useSelector} from 'react-redux';

import Integrante from "./Integrante";
import {detalle_equipo} from "../../../actions/equipos/Actions";
import Resposable from "./Responsable";
import MIntegrante from "./MIntegrante";
import {initAxiosInterceptors} from "../../../config/axios";
import {toastr} from "react-redux-toastr";


const Axios = initAxiosInterceptors();

async function eliminarIntegranteServer(id) {
    const {data} = await Axios.post(`/eliminarintegrante`, {id: id});
    return data;
}

const BrigadaAdd = ({history, match}) => {
    /*================OBTENIENDO LOS PARAMETROS DE LA URL =============*/
    const {idequipo} = match.params;

    const [mintegrante, SetMintegrante] = useState(false);

    /*================DECLARANDO LOS ESTADOS DEL COMPONENTE =============*/
    // const [rolState, guardarRolState] = useState('');


    /*================DECLARANDO LOS REF DEL COMPONENTE==================================*/
    //const apellidosRef = useRef('');


    /*================VINCULADO A FUNCIONES LOCALES LOS ACTIONS===============*/
    const dispatch = useDispatch();
    const detalle_equipo_comp = (equipo_id) => dispatch(detalle_equipo(equipo_id));

    /*================OBTENIENDO LOS ESTADOS DEL LOS REDUCERS==================================*/
    const state_detalle_equipo = useSelector(state => state.equipo.detalle_equipo);

    /*================DECLARANDO LOS HOOKS DE EFECTOS===============*/
    useEffect(() => {
        async function mostrarDetalleEquipo() {
            try {
                await detalle_equipo_comp(idequipo);
                console.log('5555555555555555555555555555555555555555555555555555555555555');
                console.log(state_detalle_equipo);

            } catch (error) {
                console.log(error);
            }
        }

        mostrarDetalleEquipo();

    }, []);


    /*================ DECLARANDO LAS FUNCIONES DE COMPONENTES ===============*/
    const openModalAddIntegrante = () => {
        SetMintegrante(true)
    }
    const closeModalAddIntegrante = () => {
        SetMintegrante(false)
    }

    /*================ ELIMINANDO INTEGRANTE ===============*/
    const eliminarIntegrante = async (idIntegrante) => {

        try {
            await eliminarIntegranteServer(idIntegrante);
            toastr.info('Se encontro el Polygono del Proyecto en la Base Gráfica');
            detalle_equipo_comp(idequipo);
        } catch (e) {

        }

    }
    return (
        <div>
            <Header></Header>
            <SidebarAdm/>

            <form>


                <div className="container mtop-20">

                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">
                                <label className={'titleform'}>GESTION EQUIPO DE TRABAJO</label>
                            </legend>
                        </fieldset>
                    </form>

                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <h5></h5>
                        </div>
                        <div className="panel-body">


                            <div className="form-group">

                                <div className="col-lg-12">
                                    <center>
                                        <h3>EQUIPO:{state_detalle_equipo.equipo.denominacion}
                                        </h3>
                                    </center>

                                </div>

                            </div>
                            <form>
                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext">Coordinador</legend>
                                </fieldset>
                                <div className="row">

                                    <Resposable resposable={state_detalle_equipo.resposable}/>
                                </div>

                            </form>
                            <form>
                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext">Equipo de Trabajo</legend>
                                </fieldset>
                                <div className="form-group ">
                                    <div className="col-lg-offset-0 col-lg-12 ">
                                        <button onClick={openModalAddIntegrante} type="button"
                                                className="btn btn-danger btn-sm btn-control pull-right ">+ Agregar
                                        </button>

                                        <Link to={'/brigada-list'} 
                                                className="btn btn-default btn-sm btn-control pull-right "> <i className="fa fa-angle-left"></i> Atras
                                        </Link>


                                    </div>

                                </div>
                            </form>

                            <div className="row">
                                {state_detalle_equipo.integrantes.map(integrante =>
                                    <Integrante eliminarIntegrante={eliminarIntegrante} key={integrante.id}
                                                integrante={integrante}/>
                                )}

                            </div>


                        </div>
                    </div>
                </div>
                <div className="row margin-button-form "></div>

            </form>
            <FooterProcess/>

            {mintegrante ? <MIntegrante closeModalAddIntegrante={closeModalAddIntegrante} equipo_id={idequipo}/> : null}

        </div>
    );
};

export default BrigadaAdd;