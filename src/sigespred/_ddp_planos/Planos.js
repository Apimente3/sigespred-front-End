import React, {useEffect, useState} from 'react';
import moment from 'moment';
import { useAsync } from "react-async-hook";
import {useDispatch, useSelector} from 'react-redux';
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import Plano from "./Plano";
import PlanoLoad from "./PlanoLoad";
import PlanoNoEcontrado from "./PlanoNoEcontrado";
import GridPlano from "../m000_common/grids/GridPlano";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import DateRange from "../../components/helpers/DateRange";
import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";
import { buscarPlano } from '../../actions/_ddp_plano/Actions';
import BoxNoEncontrado from "../../components/helpers/BoxNoEncontrado";


const Axios = initAxiosInterceptors();
const {alasql}=window;
const {$} = window;

/*Lista los proyectos de acuerdo a una busqueda*/
async function getListProyectos(busqueda) {

    const {data:proyectos} = await Axios.get(`/gestionpredial`);
    
    return {proyectos};
}


const Planos = ({history}) => {
    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaTipoPlano = useAsync(helperGets.helperGetListTipoPlano, []);
    const resListaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const resListaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    const resListaDistrito = useAsync(helperGets.helperGetListDistrito,[]);

    const [filtros, set_filtros] = useState('');
    const [busquedaLocal, set_busquedaLocal] = useState(true);
    const [dataProv, set_dataProv] = useState(null);
    const [dataDist, set_dataDist] = useState(null);

    const dispatch = useDispatch();
    const buscarPlanosAction = (filtros) => dispatch(buscarPlano(filtros));
    const planos = useSelector(state => state.plano.planos);

    useEffect(() => {
        async function initialLoad() {
            try {
                await buscarPlanosAction('');
                set_busquedaLocal(false);
            } catch (error) {
                console.log(error);
            }
        }
        initialLoad();
    }, []);
    

    function handleChangeDepartmento(e) {
        if(!resListaProvincia.loading){
            let data = resListaProvincia.result;
            let provList = data[Object.keys(data)[0]].filter( o => o.id_dpto === e.target.value);
            set_dataProv({data: provList});
            set_dataDist(null);
        }
    }

    function handleChangeProvincia(e) {
        if(!resListaDistrito.loading){
            let data = resListaDistrito.result;
            let distList = data[Object.keys(data)[0]].filter( o => o.id_prov === e.target.value);
            set_dataDist({data: distList});
        }
    }

    function handleInputChange(e) {
        if (['codplano'].includes(e.target.name)) {
            set_filtros({
                ...filtros,
                [e.target.name]: e.target.value.toUpperCase()
            });
        } else if (['departamentoid'].includes(e.target.name)) {
            set_filtros({
                ...filtros,
                [e.target.name]: e.target.value.toUpperCase(),
                ['provinciaid']: '',
                ['distritoid']: ''
            });
        } else if (['provinciaid'].includes(e.target.name)) {
            set_filtros({
                ...filtros,
                [e.target.name]: e.target.value.toUpperCase(),
                ['distritoid']: ''
            });
        } else {
            set_filtros({
                ...filtros,
                [e.target.name]: e.target.value
            });
        }
        console.log(filtros);
        
    }

    function handleRangoFechas() {
        console.log('Aquí modificamos el valor de la fecha');
    }

    const buscarPlanosFilter=async (e)=>{
        let valorFiltros = '';
        if (filtros) {
            $.each(filtros, function(key, value){
                if (value === "" || value === null){
                    delete filtros[key];
                }
            });
            valorFiltros = $.param(filtros);
            console.log('valorFiltros');
            console.log(valorFiltros);
        }

        e.preventDefault();
        set_busquedaLocal(true)
        await buscarPlanosAction(valorFiltros);
        set_busquedaLocal(false)
    }
 
    // TODO: Revisar procedimiento de exportación
    const descarxls=()=>{

        let listexportexcel = resListaProyectos;
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
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext "> <label className={'titleform'}>LISTADO DE PLANOS</label>
                                <Link to={`/plano-add`} className="btn btn-danger pull-right btn-sm fullborder">
                                    <i className="fa fa-plus"></i>  Agregar Plano</Link>
                                <button type="button" onClick={descarxls} className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
                            </legend>

                        </fieldset>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <form >
                                        <div className="form-group">
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Código de Plano</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control " id="codplano" name="codplano" 
                                                    placeholder="Código del plano" onBlur={handleInputChange}/>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Proyecto</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-control" id="proyectoid" name="proyectoid" 
                                                    onChange={handleInputChange}>
                                                        <option value="">--SELECCIONE--</option>
                                                        {resListaProyectos.error
                                                        ? "Se produjo un error cargando los tipos de plano"
                                                        : resListaProyectos.loading
                                                        ? "Cargando..."
                                                        : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion" />}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Fecha de Creación</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                <DateRange id="controlFecha" nombrefuncion={handleRangoFechas}></DateRange>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">¿Contiene Dígital?</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-control" id="contienedigital" name="contienedigital" 
                                                    onChange={handleInputChange}>
                                                        <option value="">--SELECCIONE--</option>
                                                        <option value="true">Sí</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Solicitante</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-control" id="profesionalid" name="profesionalid">
                                                        <option value="0">--SELECCIONE--</option>
                                                        <option value="RURAL">AQUISICION DE PREDIOS</option>
                                                        <option value="RURAL">LIBERACION DE INTERFERENCIAS</option>
                                                        <option value="RURAL">PAGO DE MEJORAS</option>
                                                        <option value="RURAL">TRANFERENCIA INTERESTATALES</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Tipo de Plano</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-control" id="tipoplanoid" name="tipoplanoid" 
                                                    onChange={handleInputChange}>
                                                        <option value="">--SELECCIONE--</option>
                                                        {resListaTipoPlano.error
                                                        ? "Se produjo un error cargando los tipos de plano"
                                                        : resListaTipoPlano.loading
                                                        ? "Cargando..."
                                                        : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Tramo</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <select className="form-control"  id="tramoid" name="tramoid" 
                                                    onChange={handleInputChange}>
                                                        <option value="">--SELECCIONE--</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Subtramo</label>
                                                </div>
                                                <div className="col-md-4">
                                                <input type="text" className="form-control " id="subtramoid" name="subtramoid" placeholder="Ingrese el subtramo"/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Departamento</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <select className="form-control" id="departamentoid" name="departamentoid" 
                                                    onChange={(e) => {handleChangeDepartmento(e); handleInputChange(e);}}>
                                                    <option value="">--SELECCIONE--</option>
                                                    {resListaDepartmento.error
                                                    ? "Se produjo un error cargando los departamentos"
                                                    : resListaDepartmento.loading
                                                    ? "Cargando..."
                                                    : <ComboOptions data={resListaDepartmento.result} valorkey="id_dpto" valornombre="nombre" />}
                                                </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Provincia</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-control" id="provinciaid" name="provinciaid" 
                                                    onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}>
                                                        <option value="0">--SELECCIONE--</option>
                                                        <ComboOptions data={dataProv} valorkey="id_prov" valornombre="nombre" />
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Distrito</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-control" id="distritoid" name="distritoid" 
                                                    onChange={handleInputChange}>
                                                        <option value="0">--SELECCIONE--</option>
                                                        <ComboOptions data={dataDist} valorkey="id_dist" valornombre="nombre" />
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label"></label>
                                                </div>
                                                <div className="col-md-4">
                                                    
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6"></div>
                                                <div className="col-md-6 text-right">
                                                    <button type="button" onClick={buscarPlanosFilter} className="btn btn-danger">
                                                        <i className="fa fa-search"></i> Aplicar Filtro(s)
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                {
                                    (busquedaLocal)?
                                        console.log('cargando datos de planos...')
                                        :
                                        <GridPlano datos={planos}/>
                                    }
                                    
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

export default Planos;