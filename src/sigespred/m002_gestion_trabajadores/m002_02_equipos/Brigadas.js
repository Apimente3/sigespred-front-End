import React, {useEffect, useState} from 'react';
import SidebarAdm from "../../m000_common/siderbars/SidebarAdm";
import {useDispatch, useSelector} from 'react-redux';
import { agregar_equipo,listar_equipos } from '../../../actions/equipos/Actions';
import {Link} from "react-router-dom";
import Header from "../../m000_common/headers/Header";
import Brigada from "./Brigada";
import MBrigadaAdd from "./MBrigadaAdd";
import {buscarTrabajador} from "../../../actions/trabajador/Actions";
import NoEcontrado from "./NoEncontrado";
const {alasql}=window;

const Brigadas = () => {
    
    const [busqueda, setBusqueda] = useState('');
    const [addBrigada, setAddBrigada] = useState(false);

    /*Utilizando para el redux del selector*/
        const dispatch = useDispatch();
   
    const listar_equipos_action = (busqueda) => dispatch(listar_equipos(busqueda));
    
    /*Obteniendo los Estados en REDUX*/
    const equipos = useSelector(state => state.equipo.equipos);

    
    /*Obteniendo la lista de los esquipos*/
    useEffect(() => {
        listar_equipos_action('');
    }, []);
    
    
    /*Funcion que me permite la buscar  en la lista de los equipos*/
    const buscar=async (e)=>{
      e.preventDefault();
        listar_equipos_action(busqueda);
      
    }
    
    const openAddEquipos = (e)=>{
        e.preventDefault();
        setAddBrigada(true)
    }
    const closeAddEquipos=(estado)=>{
        setAddBrigada(estado)
    }

    const descarxls=()=>{

        let listexportexcel = equipos;
        var resultgeojson = alasql(`SELECT *
                 FROM ? `, [listexportexcel])
        var opts = [{
            sheetid: 'Reporte',
            headers: true
        }];
        var res = alasql('SELECT INTO XLSX("ListadoBrigadas.xlsx",?) FROM ?', [opts, [resultgeojson]]);
        return false;
    }


    return (
        <div>
            <Header/>
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
                      
                        <Link to={'/brigada-list'} type="button" className="btn btn-default active">
                            <i className="fa fa-users"></i> Equipos de Trabajo</Link>
                        <Link  to={'/list-trabajadores'} type="button" className="btn btn-default ">  <i className="fa fa-user"></i>  Trabajadores </Link>
                    
                      
                    </div>
                    </center>
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext "> <label className={'titleform'}>LISTADO DE EQUIPOS DE TRABAJO</label>
                                <a onClick={openAddEquipos} href='#' className="btn btn-default pull-right btn-sm fullborder">
                                 + Agregar Equipo  
                                </a>
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
                                    <form onSubmit={buscar}>
                                        <div className="form-group">
                                            <div className="row">
                                                <div>
                                                    <div className="col-md-8">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control "
                                                                   placeholder="Nombre nombre de la Brigada"
                                                                   onChange={e=>setBusqueda(e.target.value)}>
                                                            </input>
                                                            <span className="input-group-btn">
                                                                <button className="btn btn-default " type="submit" >
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

                                    <table className="table table-bordered table-condensed table-hover table-striped">
                                        <thead>
                                        <tr>
                                            <th ></th>
                                            <th >Nº</th>
                                            <th >Brigada</th>
                                            <th>Fecha creación</th>
                                            <th>Cant. Integrantes</th>
                                            <th>Coordinador</th>
                                     
                                            <th className="pull-right">Acciones</th>
                                            <th ></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                    
                                    {equipos.length==0 ? <NoEcontrado/>: 
                                        
                                        equipos.map((equipo,i)=>(
                                            <Brigada num={i} key={equipo.id} equipo={equipo} />   
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
            {addBrigada? <MBrigadaAdd  closeAddEquipos={closeAddEquipos}/>:null}
           
        </div>
       
    );
};

export default Brigadas

