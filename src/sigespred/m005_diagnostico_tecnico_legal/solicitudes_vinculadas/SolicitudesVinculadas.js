import React, {useEffect, useState} from 'react';
import Header from "../../m000_common/headers/Header";
import SiderBarDiagnostico from "../../m000_common/siderbars/SiderBarDiagnostico";
import {Link} from "react-router-dom";
import Solicitud from "./Solicitud";
import {initAxiosInterceptors,} from '../../../config/axios';
import BoxNoEncontrado from "../../../components/helpers/BoxNoEncontrado";


const Axios = initAxiosInterceptors();

async function listarSolicitud(codigo_proyecto) {
    const {data} = await Axios.get(`/buscarsolicitud-proyecto?codigo_proyecto=${codigo_proyecto}`);
    return data;
}

const SolicitudesVinculadas = ({history,match}) => {


    const {codigo_predio} = match.params;
    /*Estado de las solcitudes referenciadas al proyecto*/
    const [solicitudes, setSolicitudes] = useState([]);
    const [busqueda, setBusqueda] = useState([]);
    
    /*Inicializacion del listado de solicitudes vinculadas*/
    useEffect(() => {
        async function cargarListadoSolicitudes() {
            try {
                let listadoSolcitud = await listarSolicitud(codigo_predio);
                setSolicitudes(listadoSolcitud);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        cargarListadoSolicitudes();
    }, []);
    
    const buscarProyecto=()=>{
        
    }
    
    
    return (
        <div>
            <Header></Header>
            <SiderBarDiagnostico proyecto={codigo_predio}/>

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

                                <label className={'titleform'}>LISTADO DE PETICIONES DE GESTION PREDIAL</label>
                                <Link to={`/solicitud-add`}
                                      className="btn btn-default pull-right btn-sm fullborder btn-control">
                                    + Registrar </Link>
                            </legend>

                        </fieldset>

                    </form>
                    <div className="row">

                        <div className="col-md-12">


                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <div className="form-group">

                                        <div className="row">

                                            <div>
                                                <form onSubmit={buscarProyecto}>
                                                    <div className="col-md-8">
                                                        <div className="input-group">

                                                            <input type="text" className="form-control "
                                                                   placeholder="Ingrese el nombre del Proyecto."
                                                                   value={busqueda}
                                                                   onChange={setBusqueda}
                                                            >

                                                            </input>
                                                            <span className="input-group-btn">
												   <button className="btn btn-default " type="submit">
                                                       <i className="fa fa-search"></i>
                                                   </button>
											        </span>

                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="col-md-4">


                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>


                                <ul className="list-group">
                                    { solicitudes.length==0?<BoxNoEncontrado mensaje1={'No existen solicitudes vinculadas a este Proyecto'} mensaje2={''}/>:
                                        solicitudes.map(solicitud => (
                                            <Solicitud
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
        </div>
    );
};

export default SolicitudesVinculadas;