import React, {Component, useEffect, useState} from 'react';
import FooterAdmin from "../FooterAdmin";
import SidebarAdm from "../SidebarAdm";
import Header from "../../header/Header";
import HeaderSearch from "../../proyectos/HeaderSearch";
import FilterPred from "../../proyectos/FilterPred";
import Busqueda from "../../proyectos/Busqueda";
import Proyecto from "./Proyecto";
import Ordering from "../../proyectos/Ordering";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../../config/axios";

const Axios = initAxiosInterceptors();


async function getListProyectos(busqueda = '') {
    const {data:proyectos} = await Axios.get(`/list-proyectos?busqueda=` + busqueda);
    const {data:resumen} = await Axios.get(`/resumen-proyectos`);
    return {proyectos,resumen};
}

const Proyectos = ({history}) => {


    const [proyectos, set_proyectos] = useState([]);
    const [resumen, set_resumen] = useState([]);

    useEffect(() => {
        async function init() {
            try {
                let {proyectos,resumen} = await getListProyectos();
                set_proyectos(proyectos);
                set_resumen(resumen);
            }
            catch (error) {
            }
        }

        init();
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

                                <label className={'titleform'}>LISTADO DE PROYECTOS</label>
                                <Link to={`/proyecto-add`}
                                      className="btn btn-default pull-right btn-sm fullborder btn-control">
                                    + Registrar </Link>
                            </legend>

                        </fieldset>

                    </form>


                    <div className="row">

                        <div className="col-md-12">

                            <form>
                                <div className="form-group">
                                   
                                    <div className="row">

                                        <div>
                                            <div className="col-md-8">
                                                <div className="input-group">
                                                    <input type="text" className="form-control "
                                                           placeholder="Ingrese el nombre del Proyecto."

                                                    ></input>
                                                    <span className="input-group-btn">
												<button className="btn btn-default " type="submit"><i
                                                    className="fa fa-search"></i></button>
											</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">


                                            </div>
                                        </div>

                                    </div>


                                </div>
                                <div className="grey-container shortcut-wrapper">

                                    { resumen.map(res=>
                                        <ItemResumen item={res}></ItemResumen>
                                    )}


                                </div>


                            </form>

                            {proyectos.map(proyecto =>
                                <Proyecto proyecto={proyecto}/>
                            )}


                        </div>
                    </div>

                </div>

            </div>
            <FooterAdmin/>
        </div>
    );

}

const ItemResumen=({item})=>{
    
    const {denominacion,count,icono}=item;
    return (<>
        <a href="#" className="shortcut-link">
					<span className="shortcut-icon">
						<label style={{fontSize:'30px'}} htmlFor="" dangerouslySetInnerHTML={{__html: icono}}></label>
						<span className="shortcut-alert" style={{left:'30px'}}>
                            {count}
						</span>	
					</span>
            <span className="text">{denominacion}</span>
        </a>
    </>)
}

export default Proyectos;