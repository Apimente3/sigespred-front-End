import React, {useEffect, useState} from 'react';

import SidebarAdm from "../SidebarAdm";
import Header from "../../header/Header";
import {Link} from "react-router-dom";
import Trabajador from "./Trabajador";

import {useDispatch, useSelector} from 'react-redux';
import { buscarTrabajador } from '../../../actions/trabajador/Actions';
import TrabajadorNoEcontrado from "./TrabajadorNoEcontrado";
import TrabajadorLoad from "./TrabajadorLoad";
import Spinner from "../../helpers/Spinner";



const Trabajadores = ({history}) => {
    
 /*   if(!history){
     return <Spinner/>   
    }*/

    const [busqueda, setBusqueda] = useState('');
    const [busquedalocal, setBusquedalocal] = useState(true);

    const dispatch = useDispatch();
    const buscarTrabajadorAction = (dni) => dispatch(buscarTrabajador(dni));
    useEffect(() => {
        // Productos cuando el componente este listo
      
        buscarTrabajadorAction('');
        setBusquedalocal(false);
        
    }, []);
    
    
    const buscarTrabadorFilter=async (e)=>{
        e.preventDefault();
        setBusquedalocal(true)
       await buscarTrabajadorAction(busqueda);
        setBusquedalocal(false)
    }


    const trabajadores = useSelector(state => state.trabajador.trabajadors);
    const loading = useSelector(state => state.trabajador.cargando);

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
                            <legend align="mtop-25 center fielsettext "> <label className={'titleform'}>LISTADO DE TRABAJADORES </label>
                                <Link to={`/trabajador-add`} className="btn btn-default pull-right btn-sm fullborder">+
                                    Agregar Trabajador</Link>
                            </legend>

                        </fieldset>

                    </form>
                    <div className="row">

                        <div className="col-md-12">


                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <form onSubmit={e=>buscarTrabadorFilter(e)}>
                                        <div className="form-group">
                                            <div className="row">
                                                <div>
                                                    <div className="col-md-8">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control "
                                                                   placeholder="Nombre del Trabajador o DNI"
                                                                   onChange={e=>setBusqueda(e.target.value)}
                                                            ></input>
                                                            <span className="input-group-btn">
												<button className="btn btn-default " type="submit" ><i
                                                    className="fa fa-search"></i></button>
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
                                        (busquedalocal)?
                                            <>
                                                <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            <TrabajadorLoad/>
                                            </>

                                            :
                                            
                                        (trabajadores.length==0)? 
                                            <TrabajadorNoEcontrado/>
                                            :
                                        trabajadores.map(trabajador => (
                                            <Trabajador
                                                key={trabajador.id}
                                                trabajador={trabajador}
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

}


export default Trabajadores;