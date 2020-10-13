import React, {useEffect, useState} from 'react';

import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import Plano from "./Plano";
import PlanoLoad from "./PlanoLoad";
import PlanoNoEcontrado from "./PlanoNoEcontrado";
import GridPlano from "../m000_common/grids/GridPlano";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import BoxNoEncontrado from "../../components/helpers/BoxNoEncontrado";

const Axios = initAxiosInterceptors();
const {alasql}=window;

/*Lista los planos de acuerdo a una busqueda*/
async function getListProyectos(busqueda = '') {
    const {data: proyectos} = await Axios.get(`/list-proyectos?busqueda=` + busqueda);
    const {data: resumen} = await Axios.get(`/resumen-proyectos`);
    return {proyectos, resumen};
}


/*Lista los planos de acuerdo a una busqueda*/
async function getListPlanos(busqueda = '') {
    const {data: planos} = await Axios.get(`/plano/buscar`);
    return {planos};
    
    // const {data: proyectos} = await Axios.get(`/list-proyectos?busqueda=` + busqueda);
    // const {data: resumen} = await Axios.get(`/resumen-proyectos`);
    // return {proyectos, resumen};
}

const Planos = ({history}) => {

    const [planos, set_planos] = useState([]);

    const [proyectos, set_proyectos] = useState([]);
    const [resumen, set_resumen] = useState([]);
    const [busqueda, set_busqueda] = useState("");

    useEffect(() => {
        async function init() {
            try {
                let {planos} = await getListPlanos();
                set_planos(planos);
            }
            catch (error) {
            }
            
            /*
            try {
                let {proyectos, resumen} = await getListProyectos();
                set_proyectos(proyectos);
                set_resumen(resumen);
            }
            catch (error) {
            }
            */
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
            {/* <Header></Header> */}
            <SidebarAdm/>

            <div>
                <div id="breadcrumb">
                    <ul className="breadcrumb">
                        <li><i className="fa fa-home"></i><a href="#"> Planos</a></li>
                        <li className="active">Búsqueda de Planos</li>
                    </ul>
                </div>
                <div className="padding-md container">
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext "> <label className={'titleform'}>LISTADO DE PLANOS</label>
                                <Link to={`/trabajador-add`} className="btn btn-danger pull-right btn-sm fullborder">
                                    <i className="fa fa-plus"></i>  Agregar Plano</Link>
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
                                    <form >
                                        <div className="form-group">
                                            <div className="row">
                                            <label className="col-md-2 control-label">Código de Plano</label>
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control " id="codplano" name="codplano" placeholder="Código del plano"/>
                                                </div>

                                                <label className="col-md-2 control-label">Proyecto</label>
                                                <div className="col-md-4">
                                                    <select id="tipopredio" className="form-control" name="rol">
                                                        <option value="0">--SELECCIONE--</option>
                                                        <option value="RURAL">AQUISICION DE PREDIOS</option>
                                                        <option value="RURAL">LIBERACION DE INTERFERENCIAS</option>
                                                        <option value="RURAL">PAGO DE MEJORAS</option>
                                                        <option value="RURAL">TRANFERENCIA INTERESTATALES</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div>
                                                    <div className="col-md-8">
                                                        <div className="input-group">
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">


                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </form>
                                </div>

                                {/* <ul className="list-group">

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
                                        (false)?
                                            <>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            <PlanoLoad/>
                                            </>
                                            :
                                            
                                        (planos.length==0)? 
                                            <PlanoNoEcontrado/>
                                            :
                                        planos.map((plano,i) => (
                                            <Plano num={i+1}
                                                key={plano.id}
                                                plano={plano}
                                            />
                                        ))
                                    }

                                        </tbody>
                                    </table>
                                </ul> */}
                                <div>
                                    <GridPlano/>
                                </div>
                            </div>
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

export default Planos;