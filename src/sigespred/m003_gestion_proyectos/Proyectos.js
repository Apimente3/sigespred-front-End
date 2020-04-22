import React, {useEffect, useState} from 'react';

import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import Proyecto from "./Proyecto";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import BoxNoEncontrado from "../../components/helpers/BoxNoEncontrado";

const Axios = initAxiosInterceptors();
const {alasql}=window;
/*Lista los proyectos de acuerdo a una busqueda*/
async function getListProyectos(busqueda = '') {
    const {data: proyectos} = await Axios.get(`/list-proyectos?busqueda=` + busqueda);
    const {data: resumen} = await Axios.get(`/resumen-proyectos`);
    return {proyectos, resumen};
}

const Proyectos = ({history}) => {

    const [proyectos, set_proyectos] = useState([]);
    const [resumen, set_resumen] = useState([]);
    const [busqueda, set_busqueda] = useState("");

    useEffect(() => {
        async function init() {
            try {
                let {proyectos, resumen} = await getListProyectos();
                set_proyectos(proyectos);
                set_resumen(resumen);
            }
            catch (error) {
            }
        }

        init();
    }, []);
    
    const buscarProyecto =async (e)=>{
        e.preventDefault()
        let {proyectos, resumen} = await getListProyectos(busqueda);
        set_proyectos(proyectos);
    }

    const setBusqueda =async (e)=>{
       set_busqueda(e.target.value)
    }
    
    const filtroCategoria=async (busqueda)=>{
  
            let {proyectos} = await getListProyectos(busqueda);
            set_proyectos(proyectos);
       
    }

    const descarxls=()=>{

        let listexportexcel = proyectos;
        var resultgeojson = alasql(`SELECT *
                 FROM ? `, [listexportexcel])
        var opts = [{
            sheetid: 'Reporte',
            headers: true
        }];
        var res = alasql('SELECT INTO XLSX("ListadoProyectos.xlsx",?) FROM ?', [opts, [resultgeojson]]);
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
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">

                                <label className={'titleform'}>LISTADO DE PROYECTOS</label>
                                <Link to={`/proyecto-add`}
                                      className="btn btn-default pull-right btn-sm fullborder btn-control">
                                    + Registrar </Link>
                                <button type="button" onClick={descarxls} className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
                            </legend>

                        </fieldset>

                    </form>

                    <div className="row">
                        <div className="col-md-12">
                            <form>
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
                                <div className="grey-container shortcut-wrapper">
                                    {resumen.map(res =>
                                        <ItemResumen filtroCategoria={filtroCategoria} item={res}></ItemResumen>
                                    )}
                                </div>


                            </form>

                            <div className="row" style={{marginTop: '15px'}}>
                                {
                                    proyectos.length==0? <BoxNoEncontrado/>:
                                    proyectos.map((proyecto, i) =>
                                    <Proyecto key={proyecto.codigo} proyecto={proyecto}/>
                                    )
                                }
                            </div>
                            <div style={{height: '50px'}}></div>

                        </div>
                    </div>

                </div>

            </div>
            <FooterProcess/>
        </div>
    );

}


const ItemResumen = ({filtroCategoria,item}) => {
    
    const {denominacion, count, icono} = item;
    let categoria=denominacion;
    return (<>
        <a href="#" className="shortcut-link" onClick={()=>{filtroCategoria(categoria)}}>
					<span className="shortcut-icon">
						<label style={{fontSize: '30px'}} htmlFor="" dangerouslySetInnerHTML={{__html: icono}}></label>
						<span className="shortcut-alert" style={{left: '30px'}}>
                            {count}
						</span>	
					</span>
            <span className="text" >{denominacion}</span>
        </a>
    </>)
}

export default Proyectos;