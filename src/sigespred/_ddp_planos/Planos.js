import React, {useEffect, useState} from 'react';
import moment from 'moment';
import { useAsync } from "react-async-hook";
import {useDispatch, useSelector} from 'react-redux';
import GridPlano from "../m000_common/grids/GridPlano";
import TablePlano from "./TablePlano";
import PlanoRow from "./PlanoRow";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import { listar } from '../../actions/_ddp_plano/Actions';
import Wraper from "../m000_common/formContent/Wraper";
import {REGISTRO_PLANO_BREADCRUM} from "../../config/breadcrums";

const {alasql}=window;
const {$} = window;

const Planos = ({history}) => {
    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaTipoPlano = useAsync(helperGets.helperGetListTipoPlano, []);
    const resListaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const resListaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    const resListaDistrito = useAsync(helperGets.helperGetListDistrito,[]);
    const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, []);

    const [filtros, set_filtros] = useState({});
    const [busquedaLocal, set_busquedaLocal] = useState(true);
    const [dataProv, set_dataProv] = useState(null);
    const [dataDist, set_dataDist] = useState(null);
    const [contentMessage, set_contentMessage] = useState('');

    const dispatch = useDispatch();
    const buscarPlanosAction = (filtros) => dispatch(listar(filtros));
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
                provinciaid: '',
                distritoid: ''
            });
        } else if (['provinciaid'].includes(e.target.name)) {
            set_filtros({
                ...filtros,
                [e.target.name]: e.target.value.toUpperCase(),
                distritoid: ''
            });
        } else {
            set_filtros({
                ...filtros,
                [e.target.name]: e.target.value
            });
        }
        console.log(filtros);
        
    }

    function setSolicitante(idLocador) {
        set_filtros({
            ...filtros,
            profesionalid: idLocador
        });
        console.log(filtros);
    }

    const buscarPlanosFilter=async (e)=>{

        if ((filtros.fechainicio && !filtros.fechafin) || (!filtros.fechainicio && filtros.fechafin)){
            set_contentMessage('El filtro Fecha de Creación, debe tener un inicio y fin');
            return;
        } else {
            set_contentMessage('');
        }

        if (filtros.fechainicio && filtros.fechafin){
            let resultFechaInicio = funcGlob.helperValidarFecha(filtros.fechainicio, true);
            let resultFechaFin = funcGlob.helperValidarFecha(filtros.fechafin, true);
            
            if (resultFechaFin < resultFechaInicio) {
                set_contentMessage('La Fecha de Creación de inicio no puede ser mayor a la de fin');
                return;
            } else {
                set_filtros({
                    ...filtros,
                    fechainicio: resultFechaInicio,
                    fechafin: resultFechaFin
                });
                $.each(filtros, function(key, value){
                    if (key === "fechainicio"){
                        filtros[key] = resultFechaInicio;
                    }
                    if (key === "fechafin"){
                        filtros[key] = resultFechaFin;
                    }
                });

            }
        }

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

    const cabecerasTabla = ["#","ID", "Código del Plano", "Proyecto", "Profesional", "Fecha de Creación", "Ubicación","Digital", "Antecedente","Acciones"]
    return (
        <>
        <Wraper titleForm={"Listado de Planos"} listbreadcrumb={REGISTRO_PLANO_BREADCRUM}>
            <div className="form-group">
                <label className="col-lg-2 control-label">Código de Plano</label>
                <div className="col-lg-4">
                    <input type="text" className="form-control input-sm" id="codplano" name="codplano" 
                    placeholder="Código del plano" onBlur={handleInputChange}/>
                </div>

                <label className="col-lg-2 control-label">Proyecto</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="gestionpredialid" name="gestionpredialid" 
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
            <div className="form-group">
                <label className="col-lg-2 control-label">Fecha de Creación - Inicio</label>
                <div className="col-lg-4">
                    <input className="form-control input-sm" type="date"
                    id="fechainicio"
                    name="fechainicio"
                    placeholder="Ingrese fecha inicio"
                    onChange={handleInputChange}
                    ></input>
                </div>

                <label className="col-lg-2 control-label">Fecha de Creación - Fin</label>
                <div className="col-lg-4">
                    <input className="form-control input-sm" type="date"
                    id="fechafin"
                    name="fechafin"
                    placeholder="Ingrese fecha inicio"
                    onChange={handleInputChange}
                    ></input>
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">¿Contiene Dígital?</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="contienedigital" name="contienedigital" 
                    onChange={handleInputChange}>
                        <option value="">--SELECCIONE--</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <label className="col-lg-2 control-label">Solicitante</label>
                <div className="col-lg-4">
                    {resListaSolicitantes.error
                    ? "Se produjo un error cargando los locadores"
                    : resListaSolicitantes.loading
                    ? "Cargando..."
                    : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} />}
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">Tramo</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm"  id="tramoid" name="tramoid" 
                    onChange={handleInputChange}>
                        <option value="">--SELECCIONE--</option>
                    </select>
                </div>

                <label className="col-lg-2 control-label">Subtramo</label>
                <div className="col-lg-4">
                    <input type="text" className="form-control input-sm" id="subtramoid" name="subtramoid" placeholder="Ingrese el subtramo"/>
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">Tipo de Plano</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="tipoplanoid" name="tipoplanoid" 
                    onChange={handleInputChange}>
                        <option value="">--SELECCIONE--</option>
                        {resListaTipoPlano.error
                        ? "Se produjo un error cargando los tipos de plano"
                        : resListaTipoPlano.loading
                        ? "Cargando..."
                        : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                    </select>
                </div>
                <label className="col-lg-2 control-label">Departamento</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="departamentoid" name="departamentoid" 
                        onChange={(e) => {handleChangeDepartmento(e); handleInputChange(e);}}>
                        <option value="">--SELECCIONE--</option>
                        {resListaDepartmento.error
                        ? "Se produjo un error cargando los departamentos"
                        : resListaDepartmento.loading
                        ? "Cargando..."
                        : <ComboOptions data={resListaDepartmento.result} valorkey="id_dpto" valornombre="nombre" />}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">Provincia</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="provinciaid" name="provinciaid" 
                    onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}>
                        <option value="0">--SELECCIONE--</option>
                        <ComboOptions data={dataProv} valorkey="id_prov" valornombre="nombre" />
                    </select>
                </div>
                <label className="col-lg-2 control-label">Distrito</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="distritoid" name="distritoid" 
                    onChange={handleInputChange}>
                        <option value="0">--SELECCIONE--</option>
                        <ComboOptions data={dataDist} valorkey="id_dist" valornombre="nombre" />
                    </select>
                </div>
            </div>
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-lg-6 text-center">
                    {contentMessage && (
                        <label className="alert alert-danger">{contentMessage}</label>
                    )}  
                    </div>
                    <div className="col-lg-6 text-right">
                        <button type="button" onClick={buscarPlanosFilter} className="btn btn-info  btn-sm  fullborder">
                            <i className="fa fa-search"></i> Aplicar Filtro(s)
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 form-group">
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6 text-right">
                        <button type="button" onClick={descarxls} className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-file-excel-o"></i> Descargar Excel
                        </button>
                        <Link to={`/plano-add`} className="btn btn-danger btn-sm fullborder">
                            <i className="fa fa-plus-circle"></i>  Agregar Plano
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-12">
                            {
                                (busquedaLocal)?
                                    console.log('cargando datos de planos...')
                                    :
                                    <GridPlano datos={planos}/>
                                }              
                    </div>
                </div>
            </div>

            {/* <div className="panel panel-default">
                {
                (busquedaLocal)?
                    console.log('cargando datos de planos...')
                    :
                    <TablePlano cabecera={cabecerasTabla}>
                       {planos.map((plano, i) => (
                            <PlanoRow nro={i} plano={plano}></PlanoRow>
                        ))}
                    </TablePlano>
                }
            </div> */}
        </Wraper>
        </>
    );

}

export default Planos;