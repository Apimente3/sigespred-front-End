import React, {useEffect, useState} from 'react';

import SidebarAdm from "../../m000_common/siderbars/SidebarAdm";
import Header from "../../m000_common/headers/Header";
import {Link} from "react-router-dom";
import Trabajador from "./Trabajador";

import {useDispatch, useSelector} from 'react-redux';
import { buscarTrabajador } from '../../../actions/trabajador/Actions';
import TrabajadorNoEcontrado from "./TrabajadorNoEcontrado";
import TrabajadorLoad from "./TrabajadorLoad";
const {alasql}=window;




const Trabajadores = ({history}) => {
    

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
    
    const descarxls=()=>{
    
        let listexportexcel = trabajadores;
        var resultgeojson = alasql(`SELECT *
                 FROM ? `, [listexportexcel])
        var opts = [{
            sheetid: 'Reporte',
            headers: true
        }];
        var res = alasql('SELECT INTO XLSX("ListadoTrabajadores.xlsx",?) FROM ?', [opts, [resultgeojson]]);
        return false;
    }

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
                    <center>
                        <div className="btn-group"style={{marginTop:'15px'}}>

                            <Link to={'/brigada-list'} type="button" className="btn btn-default ">
                                <i className="fa fa-users"></i> Equipos de Trabajo</Link>
                            <Link  to={'/list-trabajadores'} type="button" className="btn btn-default active ">  <i className="fa fa-user"></i>  Trabajadores </Link>


                        </div>
                    </center>
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext "> <label className={'titleform'}>LISTADO DE TRABAJADORES </label>
                                <Link to={`/trabajador-add`} className="btn btn-danger pull-right btn-sm fullborder">
                                    <i className="fa fa-plus"></i>  Agregar Trabajador</Link>
                                <button type="button" onClick={descarxls} className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
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

                                    <table className="table table-bordered table-condensed table-hover table-striped">
                                        <thead>
                                        <tr>
                                            <th ></th>
                                            <th >Nº</th>
                                            <th >Nombres</th>
                                            <th>Profesion</th>
                                            <th>DNI</th>
                                            <th>Rol</th>
                                            <th>Telefonos</th>
                                            <th className="pull-right">Acciones</th>
                                            <th ></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                       

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
                                        trabajadores.map((trabajador,i) => (
                                            <Trabajador num={i+1}
                                                key={trabajador.id}
                                                trabajador={trabajador}
                                            />
                                        ))
                                    }

                                        </tbody>
                                    </table>
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