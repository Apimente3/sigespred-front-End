import React, {useEffect, useRef, useState} from 'react';
import Header from "../../header/Header";
import SidebarAdm from "../SidebarAdm";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";

/*Traer las funciones de los actios */
import {getTrabajadores} from '../../../actions/brigada/Actions';
import FooterProcess from "../../gestionPredios/FooterProcess";
import IntegranteAdd from "./BrigadistaAdd";
import Integrante from "./Integrante";
import {detalle_equipo} from "../../../actions/equipos/Actions";
import Resposable from "./Responsable";
import MIntegrante from "./MIntegrante";


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

    return (
        <div>
            <Header></Header>
            <SidebarAdm/>

            <form>


                <div className="container mtop-20">
                    <h4 className="headline ">
                        Registro de Equipo de Trabajo
                        <span className="line"></span>
                    </h4>

                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <h5></h5>
                        </div>
                        <div className="panel-body">


                            <div className="form-group">

                                <div className="col-lg-12">
                                    <h2><i className="fa fa-users"> : </i>{state_detalle_equipo.equipo.denominacion}
                                    </h2>

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
                                                className="btn btn-default btn-sm btn-control pull-right ">+ Agregar
                                        </button>


                                    </div>

                                </div>
                            </form>

                            <div className="row">
                                { state_detalle_equipo.integrantes.map(integrante=>
                                    <Integrante key={integrante.id} integrante={integrante}/>
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