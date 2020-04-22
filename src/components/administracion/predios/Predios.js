import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Sidebar from "../diagnostico/SiderBarDiagnostico";
import Header from "../../header/Header";

import Predio from "./Predio";
import ModalAddPredio from "./ModalAddPredio";
import {initAxiosInterceptors} from "../../../config/axios";
import {listar} from "../../../actions/predios/Actions";

const Axios = initAxiosInterceptors();

async function cargarDatosSolicitud(denominacion) {
    const {data} = await Axios.get(`/datos-solicitud?denominacion=${denominacion}`);
    return data;
}


const Predios = ({history, match}) => {

    const {codsolicitud: solicitud} = match.params;
    const [add, setAdd] = useState(false);
    const [solcitud, setSolicitud] = useState({});
    
    /*Redux*/

    const dispatch = useDispatch();
    const listar_action = (busqueda) => dispatch(listar(busqueda));

    const showModal = () => {
        setAdd(true)
    }

    const closeModal = () => {
        setAdd(false)
    }

    /*Efecto para traer lo datos del sistema*/
    useEffect(() => {
        async function getSolcitud() {
            try {
                const [soli] = await cargarDatosSolicitud(solicitud);
                if (soli) {
                    setSolicitud(soli);
                    await listar_action(soli.id);
                } else {
                    history.push('/no-encontrado')
                }
            } catch (error) {
                console.log(error);
            }
        }

        getSolcitud();

    }, []);

    const listaPredios = useSelector(state => state.predio.predios);


    return (
        <div>
            <Header/>
            <Sidebar solicitud={solcitud.denominacion}/>
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
                            <legend align="mtop-25 center fielsettext "><label className={'titleform'}>LISTADO DE
                                PREDIOS</label>
                                <a onClick={showModal} href='#'
                                   className="btn btn-default pull-right btn-sm fullborder">
                                    + Agregar Predio
                                </a>
                            </legend>

                        </fieldset>
                    </form>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <form>
                                        <div className="form-group">
                                            <div className="row">
                                                <div>
                                                    <div className="col-md-8">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control "
                                                                   placeholder="Ingrese el codigo del Predio"

                                                            >
                                                            </input>
                                                            <span className="input-group-btn">
                                                                <button className="btn btn-default " type="submit">
                                                                    <i className="fa fa-search"></i>
                                                                </button>
											                </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <ul className="list-group">
                                    {
                                        listaPredios.map(predio => (
                                            <Predio key={predio.id} predio={predio}/>
                                        ))
                                    } 
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {add ? <ModalAddPredio solicitud={solcitud} closeModal={closeModal}/> : null}

        </div>

    );
};

export default Predios

