import React, {useEffect, useState} from 'react';
import Header from "../../header/Header";
import SidebarAdm from "../SidebarAdm";
import {Link} from "react-router-dom";
import Solicitud from "./Solicitud";
import {initAxiosInterceptors,} from '../../../config/axios';
import HeaderSolicitud from "./HeaderSolicitud";
import Trabajador from "../trabajadores/Trabajador";

const Axios = initAxiosInterceptors();

async function listarSolicitud() {
    const {data} = await Axios.get(`/buscarsolicitud`);
  
    console.log(data)
    return data;
}

const Solicitudes = ({history}) => {

    const [solicitudes, setSolicitudes] = useState([]);

    /*Efecto para realizar el cargo de los resposablmes*/
    useEffect(() => {
        async function cargarListadoSolicitudes() {
            try {
                let listadoSolcitud = await listarSolicitud();
                setSolicitudes(listadoSolcitud);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        cargarListadoSolicitudes();
    }, []);

    return (
        <div>
            <Header></Header>
            <SidebarAdm/>

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
                                    <form className="form-inline no-margin">
                                        <div className="form-group margin-form-search">
                                            <label className="label-checkbox">

                                                Fecha Inicio<br></br>
                                            </label>
                                            <input type="date" className="form-control input-sm"
                                                   placeholder="Email Address"></input>
                                        </div>

                                        <div className="form-group margin-form-search">
                                            <label className="label-checkbox">

                                                Fecha Fin<br></br>
                                            </label>
                                            <input type="date" className="form-control input-sm"
                                                   placeholder="Password"></input>
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
                                        solicitudes.map(solicitud => (
                                            <Solicitud
                                                key={solicitud.id}
                                                props={solicitud}
                                            />
                                        ))
                                    }
                                   
                                  
                                </ul>
                              
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Solicitudes;