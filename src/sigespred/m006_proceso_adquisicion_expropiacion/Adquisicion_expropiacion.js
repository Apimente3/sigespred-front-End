import React, {useState, useCallback, useEffect, useMemo} from "react";
import {Link} from "react-router-dom";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import {Toolbar, Data, Filters, Editors} from "react-data-grid-addons";
import Header from "../m000_common/headers/Header";
import UploadFile from "../../components/helpers/uploaders/UploadExpFiles";
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import GridTratoDirectoExpropiacion from "../m000_common/grids/GridTratoDirectoExpropiacion";
import {initAxiosInterceptors} from "../../config/axios";

const Axios = initAxiosInterceptors();

//Obtiene los datos de los productos
async function obtenerProyecto(codproy) {
    const {data} = await Axios.get(`/proyecto/${codproy}`);
    return data;
}

//Obtiene la lista de los proyectos
async function getListProyectos(opcion, idproyecto, busqueda) {
    const {data} = await Axios.get(`/expedientesSearch?opcion=${opcion}&idproyecto=${idproyecto}&busqueda=${busqueda}`);
    return data
}


const Adquisicion_expropiacion = ({history, match}) => {
    //creamos los estados de codigo predio 
    const {codigo_proyecto} = match.params;
    const {listadoExpedientes,set_ListadoExpedientes} = useState([]);
    const [state, set_state] = useState({idproyecto: 0, opcion: '0', busqueda: '', data: []});

    useEffect(() => {
        async function init() {
            try {
                let result = await obtenerProyecto(codigo_proyecto);
                set_state({...state, idproyecto: result.id})
            } catch (error) {
                console.log(error);
            }
        }
        init();
    }, []);

    //Funcion de cambio de informacion
    function handleInputChange(e) {
        set_state({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const buscarExpedientes =async  (e) => {
        e.preventDefault();
        set_state({...state, data: []})
        let resultado = await getListProyectos(state.opcion, state.idproyecto, state.busqueda);
       // alert(JSON.stringify(resultado));
         //set_ListadoExpedientes(resultado);
        set_state({...state, data: resultado})
    }


    /*const listExpedientes = useMemo(() => {
        return state.data
    } , [state]);*/


    return (
        <>
            <Header></Header>
            <SiderBarDiagnostico proyecto={codigo_proyecto}/>
            <div id="main-container" style={{padding: '20px', marginLeft: '220px', marginTop: '55px'}}>
                <legend align="mtop-25 center fielsettext "><label className={'titleform'}>
                    REGISTRO DE LA BASE GRAFICA
                </label>

                </legend>
                <div className="panel panel-default">
                    <form className="form-horizontal no-margin form-border" id="formWizard2" noValidate="">
                        <div className="panel-tab clearfix">
                            <ul className="tab-bar wizard-demo" id="wizardDemo2">
                                <li className="active">
                                    <Link to={'/configuraciones-proyecto/'}>
                                        <i className="fa fa-cogs"></i> Trato Directo y Expropiacion</Link>
                                </li>
                                <li className="">
                                    <Link to={'/base-grafica-ubicacion/'}>
                                        <i className="fa fa-map-marker"></i> Transferencia Interestatal</Link>
                                </li>
                                <li className="">
                                    <Link to={'/base-grafica-adjuntos/'}>
                                        <i className="fa fa-pagelines" aria-hidden="true"></i> Reconocimiento de
                                        Mejoras</Link>
                                </li>
                                <li>
                                    <Link to={'/brigadas-proyecto/'}>
                                        <i className="fa fa-users"></i> Liberacion de Interferencias</Link>

                                </li>

                            </ul>
                        </div>
                        <div className="panel-body">
                            <div className="tab-content">
                                <div className="tab-pane fade in active" id="first">

                                    <legend align=" center fielsettext "><label className={'titleform'}>
                                        Listado de Expedientes de Trato Directo y Expropiacion</label>
                                    </legend>

                                    <form onSubmit={buscarExpedientes}>
                                        <div className="row">
                                            <label className="col-lg-1 control-label">Tipo de Búsqueda</label>
                                            <div className="col-lg-2">
                                                <select className="form-control" onChange={handleInputChange}
                                                        name="opcion"
                                                        value={state.opcion}>
                                                    <option value='0'>-- Seleccione Tipo de Busqueda --</option>
                                                    <option value='1'>Codigo de Expediente</option>
                                                    <option value='2'>Nombre y Apellidos del Titular</option>
                                                    <option value='3'>DNI ó RUC del Titular</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="text" className="form-control" name="busqueda"
                                                       onChange={handleInputChange} value={state.busqueda}
                                                       placeholder="Ingrese la búsqueda."/>
                                                <div className="seperator"></div>
                                            </div>
                                            <div className="col-lg-3">
                                                <button type="submit"
                                                        className="btn btn-default btn-sm  btn-control"><i
                                                    className="fa fa-search"></i> Buscar
                                                </button>
                                                <button type="button"
                                                        className="btn btn-default btn-sm  btn-control"><i
                                                    className="fa fa-file-excel-o"></i> Descargar Excel
                                                </button>
                                            </div>
                                            <div className="col-lg-1">

                                            </div>
                                        </div>
                                    </form>
                                    <legend align=" center fielsettext ">
                                        Resultados de la Búsqueda
                                    </legend>
                                    
                                    {
                                        (!state.data || state.data.length==0) ?  '' 
                                            : <GridTratoDirectoExpropiacion data={state.data} buscarExpedientes={buscarExpedientes}>
                                            </GridTratoDirectoExpropiacion>
                                    }
                                       
                                </div>

                            </div>
                            <br/>

                        </div>

                    </form>
                </div>


            </div>


        </>

    );
};


export default Adquisicion_expropiacion;