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
import ComboOptions from "../../components/helpers/ComboOptions";
import * as helperGets from "../../components/helpers/LoadMaestros";

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
    const [dataProv, set_dataProv] = useState(null);
    const [dataDist, set_dataDist] = useState(null);
    

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


    // function handleInputChange(e) {
    //     //console.log(plano);
    //     if (['nroexpediente'].includes(e.target.name)) {
    //         set_plano({
    //             ...plano,
    //             [e.target.name]: e.target.value.toUpperCase()
    //         });
    //     }else{
    //         set_plano({
    //             ...plano,
    //             [e.target.name]: e.target.value
    //         });
    //     }
    //     //console.log(plano);
    // }
    

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

    const setBusqueda =async (e)=>{
       set_busqueda(e.target.value)
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
                                                    <input type="text" className="form-control " id="codplano" name="codplano" placeholder="Código del plano" onBlur={definirFiltro}/>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Proyecto</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-control" id="proyectoid" name="proyectoid">
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
                                                    <select className="form-control" id="tipoplanoid" name="tipoplanoid">
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
                                                    <select className="form-control"  id="tramoid" name="tramoid">
                                                        <option value="">--SELECCIONE--</option>
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
                                                    <select className="form-control" id="departamentoid" name="departamentoid" onChange={handleChangeDepartmento}>
                                                    <option value="">--SELECCIONE--</option>
                                                    {resListaDepartmento.error
                                                    ? "Se produjo un error cargando los tipos de plano"
                                                    : resListaDepartmento.loading
                                                    ? "Cargando..."
                                                    : <ComboOptions data={resListaDepartmento.result} valorkey="id_dpto" valornombre="nombre" />}
                                                </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="control-label">Provincia</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <select id="provinciaid" name="provinciaid" className="form-control" onChange={handleChangeProvincia}>
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
                                                    <select id="distritoid" name="distritoid" className="form-control">
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

export default Planos;