import React, {useEffect, useState} from 'react';
import moment from 'moment';
import { useAsync } from "react-async-hook";
import FooterProcess from "../../sigespred/m000_common/footers/FooterProcess";
import Header from "../../sigespred/m000_common/headers/Header";
import SidebarAdm from "../../sigespred/m000_common/siderbars/SidebarAdm";
import Plano from "./Plano";
import PlanoLoad from "./PlanoLoad";
import PlanoNoEcontrado from "./PlanoNoEcontrado";
import GridPlano from "../m000_common/grids/GridPlano";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import ComboData from "../../components/helpers/ComboData";
import  {helperGetListProyectos, helperGetListTipoPlano, helperGetListDepartamento, helperGetListProvincia} from "../../components/helpers/LoadMaestros";

import BoxNoEncontrado from "../../components/helpers/BoxNoEncontrado";

const Axios = initAxiosInterceptors();
const {alasql}=window;
const {$} = window;

/*Lista los proyectos de acuerdo a una busqueda*/
async function getListProyectos(busqueda) {

    const {data:proyectos} = await Axios.get(`/gestionpredial`);
    
    return {proyectos};
}


/*Lista los planos de acuerdo a una busqueda*/
async function getListPlanos(busqueda = '') {
    const {data: planos} = await Axios.get(`/plano/buscar`);
    return {planos};
    
    // const {data: proyectos} = await Axios.get(`/list-proyectos?busqueda=` + busqueda);
    // const {data: resumen} = await Axios.get(`/resumen-proyectos`);
    // return {proyectos, resumen};
}


function alertTest(){
    alert('por aqui se paso');
}

const Planos = ({history}) => {
    const resListaProyectos = useAsync(helperGetListProyectos, []);    
    const resListaTipoPlano = useAsync(helperGetListTipoPlano, [""]);
    const resListaDepartmento = useAsync(helperGetListDepartamento, []);
    const resListaProvincia = useAsync(helperGetListProvincia,["02"]);

    const [loadingProv, setLoadingProv] = useState(true);
    const [filtros, setfiltros] = useState('');

    const definirFiltro=()=>{
        let valFiltro = '';
        let valorCodPlano = $('#codplano').val().trim();
        if (valorCodPlano){
            valFiltro = `codplano=${valorCodPlano}`;
        }
        let departamentoId = $('#departamento').val();
        if (departamentoId){
            valFiltro += valFiltro.length > 0 ?  `&departamentoid=${departamentoId}`: `departamentoid=${departamentoId}`;
        }
        let proyectoId = $('#proyecto').val();
        if (proyectoId){
            valFiltro += valFiltro.length > 0 ?  `&gestionpredialid=${proyectoId}`: `departamentoid=${proyectoId}`;
        }
        console.log(valFiltro);
    }

    

    const [planos, set_planos] = useState([]);
    const [proyectos, set_proyectos] = useState([]);

    const [resumen, set_resumen] = useState([]);
    const [busqueda, set_busqueda] = useState("");
    
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

    const cargarprovincia = () => {
        let departamentoId = $('#departamento').val();
        if (departamentoId){
            setLoadingProv(false);
            resListaProvincia.result = helperGetListProvincia(departamentoId);
            console.log(resListaProvincia.value);
        } else {
            setLoadingProv(true);
        }
        console.log('I have been clicked')
        console.log($('#departamento').val());
        definirFiltro();
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
                                <Link to={`/plano-add`} className="btn btn-danger pull-right btn-sm fullborder">
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
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Código de Plano</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control " id="codplano" name="codplano" placeholder="Código del plano" onBlur={definirFiltro}/>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Proyecto</label>
                                                </div>
                                                <div className="col-md-4">
                                                    {resListaProyectos.error
                                                    ? "Failed to load resource A"
                                                    : resListaProyectos.loading
                                                    ? "Loading A..."
                                                    : <ComboData id="proyecto" name="proyecto" data={resListaProyectos.result} valorkey="id" valornombre="denominacion" nombrefuncion={definirFiltro}/>}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Fecha de Creación</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                <DateRangePicker initialSettings={{
                                                    locale: {
                                                      cancelLabel: 'Limpiar',
                                                      applyLabel: 'Aplicar',
                                                      weekLabel: 'S',
                                                      customRangeLabel: 'Rango Personalizado',
                                                      daysOfWeek: [ 'Do',
                                                      'Lu',
                                                      'Ma',
                                                      'Mi',
                                                      'Ju',
                                                      'Vi',
                                                      'Sá'],
                                                      monthNames: [ 'Enero',
                                                      'Febrero',
                                                      'Marzo',
                                                      'Abril',
                                                      'Mayo',
                                                      'Junio',
                                                      'Julio',
                                                      'Agosto',
                                                      'Setiembre',
                                                      'Octubre',
                                                      'Noviembre',
                                                      'Diciembre' ],
                                                    },
                                                    ranges: {
                                                        Hoy: [moment().toDate(), moment().toDate()],
                                                        Ayer: [
                                                        moment().subtract(1, 'days').toDate(),
                                                        moment().subtract(1, 'days').toDate(),
                                                        ],
                                                        'Últimos 7 días': [
                                                        moment().subtract(6, 'days').toDate(),
                                                        moment().toDate(),
                                                        ],
                                                        'Últimos 30 días': [
                                                        moment().subtract(29, 'days').toDate(),
                                                        moment().toDate(),
                                                        ],
                                                        'Este mes': [
                                                        moment().startOf('month').toDate(),
                                                        moment().endOf('month').toDate(),
                                                        ],
                                                        'Último mes': [
                                                        moment().subtract(1, 'month').startOf('month').toDate(),
                                                        moment().subtract(1, 'month').endOf('month').toDate(),
                                                        ],
                                                    },
                                                    }}>
                                                    <input id="fechacreacion" type="text" className="form-control" />
                                                    </DateRangePicker>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">¿Contiene Dígital?</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select id="condigital" className="form-control" name="rol">
                                                        <option value="">--SELECCIONE--</option>
                                                        <option value="true">Sí</option>
                                                        <option value="falseL">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Solicitante</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select id="profesional" className="form-control" name="rol">
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
                                                    {resListaTipoPlano.error
                                                    ? "Failed to load resource A"
                                                    : resListaTipoPlano.loading
                                                    ? "Loading A..."
                                                    : <ComboData id="tipoplano" name="tipoplano" data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Tramo</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <select id="tramo" className="form-control" name="rol">
                                                        <option value="0">--SELECCIONE--</option>
                                                        <option value="RURAL">AQUISICION DE PREDIOS</option>
                                                        <option value="RURAL">LIBERACION DE INTERFERENCIAS</option>
                                                        <option value="RURAL">PAGO DE MEJORAS</option>
                                                        <option value="RURAL">TRANFERENCIA INTERESTATALES</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Subtramo</label>
                                                </div>
                                                <div className="col-md-4">
                                                <input type="text" className="form-control " id="subtramo" name="subtramo" placeholder="Ingrese el subtramo"/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Departamento</label>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    {resListaDepartmento.error
                                                    ? "Failed to load resource A"
                                                    : resListaDepartmento.loading
                                                    ? "Loading A..."
                                                    : <ComboData id="departamento" name="departamento" data={resListaDepartmento.result} valorkey="id_dpto" valornombre="nombre" nombrefuncion={cargarprovincia}/>}
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Provincia</label>
                                                </div>
                                                <div className="col-md-4">
                                                    {loadingProv 
                                                    ?"Cargando Provincias..." 
                                                    : "Listas"}
                                                    
                                                    {resListaProvincia.error
                                                    ? "Failed to load resource A"
                                                    : resListaProvincia.loading
                                                    ? "Loading A..."
                                                    : <ComboData id="provincia" name="provincia" data={resListaProvincia.result} valorkey="id_prov" valornombre="nombre"/>}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-2">
                                                    <label className="control-label">Distrito</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select id="distrito" className="form-control" name="rol">
                                                        <option value="0">--SELECCIONE--</option>
                                                        <option value="RURAL">AQUISICION DE PREDIOS</option>
                                                        <option value="RURAL">LIBERACION DE INTERFERENCIAS</option>
                                                        <option value="RURAL">PAGO DE MEJORAS</option>
                                                        <option value="RURAL">TRANFERENCIA INTERESTATALES</option>
                                                    </select>
                                                    
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label"></label>
                                                </div>
                                                <div className="col-md-4">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
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