import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listar} from "../../../actions/predios/Actions";
import Header from "../../m000_common/headers/Header";
import SiderBarDiagnostico from "../../m000_common/siderbars/SiderBarDiagnostico";
import BoxNoEncontrado from "../../../components/helpers/BoxNoEncontrado";
import Predio from "../m005_01_predios/Predio";
import ModalAddInterferencia from "../m005_02_interferencias/ModalAddInterferencia";

const Interferencias =  ({history, match}) => {

    const {codigo_proyecto} = match.params;
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

                await listar_action(codigo_proyecto);

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
            <SiderBarDiagnostico proyecto={codigo_proyecto}/>
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
                                INTERFERENCIAS</label>
                                <Link to={`/registro-interferencia/`+codigo_proyecto}  href='#'
                                   className="btn btn-default pull-right btn-sm fullborder  btn-control">
                                    + Agregar Interferencia
                                </Link>
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
                                                                   placeholder="Ingrese el codigo o nombre de la interferencia"

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
                                    {listaPredios.length==0?<BoxNoEncontrado mensaje2={''} mensaje1={'NO existen PREDIOS registrados para este Proyecto o el codigo no coencide con la búsqueda'}/>:
                                        listaPredios.map((predio,i) => (
                                            <Predio key={predio.id} predio={predio} number={i}/>
                                        ))
                                    }


                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {add ? <ModalAddInterferencia proyecto={codigo_proyecto} closeModal={closeModal}/> : null}

        </div>

    );
};
                                                            
export default Interferencias;