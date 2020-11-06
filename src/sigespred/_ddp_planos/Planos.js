import React, {useEffect, useState} from 'react';
import { useAsync } from "react-async-hook";
import {toastr} from 'react-redux-toastr';
import TablePlano from "./TablePlano";
import PlanoRow from "./PlanoRow";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import MArcDigital from './MArcDigital';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {LISTADO_PLANO_BREADCRUM} from "../../config/breadcrums";

const Axios = initAxiosInterceptors();
const {alasql}=window;
const {$} = window;
const queryString = require('query-string');

async function buscarPlano(query) {
     const {data} = await Axios.get(`/plano/buscar?`+ query);
     return data;
 }

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
    const [dataTramo, setDataTramo] = useState(null);
    const [contentMessage, set_contentMessage] = useState('');
    const [reiniciarSolicitante, setReiniciarSolicitante] = useState(false);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [codPlanoPopup, setCodPlanoPopup] = useState('');
    const [archivosPopup, setArchivosPopup] = useState([]);

    const [busqueda, setBusqueda] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalItemsCount, settotalItemsCount] = useState(3);
    const [activePage, setactivePage] = useState(1);
    const [dataPlanos, setDataPlanos] = useState({"count":5,"rows":[]});

    useEffect(() => {
        async function initialLoad() {
            try {
                set_busquedaLocal(false);

                let query =  await  queryString.stringify({busqueda, page, limit});
                let listPlanos = await buscarPlano(query);
                setDataPlanos(listPlanos)
                settotalItemsCount(listPlanos.count)
            } catch (error) {
                console.log(error);
            }
        }
        initialLoad();
    }, []);

    const handleChangeProyecto = async(e) => {
        if (e && e.target.value) {
            let data = await helperGets.helperGetListTramos(e.target.value);
            setDataTramo(data);
        } else {
            setDataTramo(null);
        }
    }

    function handleChangeDepartmento(e) {
        if(e && !resListaProvincia.loading){
            let data = resListaProvincia.result;
            let provList = data[Object.keys(data)[0]].filter( o => o.id_dpto === e.target.value);
            set_dataProv({data: provList});
            set_dataDist(null);
        } else {
            set_dataProv(null);
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
        switch(e.target.name){
            case 'codplano':
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value.toUpperCase()
                });
                break;
            case 'gestionpredialid':
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value,
                    tramoid: ''
                });
                break;
            case 'departamentoid':
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value,
                    provinciaid: '',
                    distritoid: ''
                });
                break;
                case 'provinciaid':
                    set_filtros({
                        ...filtros,
                        [e.target.name]: e.target.value.toUpperCase(),
                        distritoid: ''
                    });
                    break;
            default:
                set_filtros({
                    ...filtros,
                    [e.target.name]: e.target.value
                });
        }
        //TODO: remover console
        console.log(filtros);
        
    }

    function setSolicitante(idLocador, nameLocador) {
        setReiniciarSolicitante(false);
        set_filtros({
            ...filtros,
            profesionalid: idLocador
        });
        console.log(filtros);
    }

    const limpiarPlanosFilter =(e)=>{
        $('#codplano').val('');
        $('#gestionpredialid').val('');
        $('#fechainicio').val('');
        $('#fechafin').val('');
        $('#contienedigital').val('');
        $('#subtramoid').val('');
        $('#tipoplanoid').val('');
        $('#departamentoid').val('');
    
        handleChangeProyecto('');
        handleChangeDepartmento('');
        
        set_filtros({});
        setReiniciarSolicitante(true);
        ejecutarPlanosFilter('');
    }

    const cargarPopupDigitales = (codplano, archivos) => {
        setCodPlanoPopup(codplano);
        setArchivosPopup(archivos);
        setMostrarPopup(true);
    }

    const cerrarModal=(estado)=>{
        setMostrarPopup(estado);
    }

    const ejecutarEliminar = (id) => {
        Axios.delete(`/plano/${id}`)
        .then(() => {
            ejecutarPlanosFilter(busqueda);
        })
        .catch(error => {
            console.log(error)
        });
    }    

    const callbackEliminarPlano = (idplano, codplano) => {
        try {
            console.log(idplano);
            const toastrConfirmOptions = {
                onOk: () => ejecutarEliminar(idplano),
            };
            toastr.confirm(`¿Desea eliminar el plano: ${codplano}?`, toastrConfirmOptions);
        }
        catch (e) {
            toastr.error('Búsqueda de Planos', "Se encontró un error: " +  e.message);
        }
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
        ejecutarPlanosFilter(valorFiltros);
    }

    const ejecutarPlanosFilter=async (datosfiltro)=>{
        set_busquedaLocal(true)
        setBusqueda(datosfiltro);
        await setPage(1)
        setactivePage(1)
        let query =  await  queryString.stringify({page:1, limit});
        if(datosfiltro) {
            query += `&${datosfiltro}`;
        }
        let listPlanos = await buscarPlano(query);
        setDataPlanos(listPlanos);
        settotalItemsCount(listPlanos.count);
        set_busquedaLocal(false)
    }

    const handlePageChange = async (pageNumber) => {
        await setPage(pageNumber)
        setactivePage(pageNumber)
        setPage(pageNumber)
        
        let query =  await  queryString.stringify({page:pageNumber, limit});
        if(busqueda) {
            query += `&${busqueda}`;
        }

        let listPlanos = await buscarPlano(query);
        setDataPlanos(listPlanos);
        settotalItemsCount(listPlanos.count);
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

    const cabecerasTabla = ["","ID", "CÓDIGO DEL PLANO", "PROYECTO", "PROFESIONAL", "FECHA DE ELABORACIÓN", "UBICACIÓN","DIGITAL", "ANTECEDENTE","ACCIONES"]
    return (
        <>
        <WraperLarge titleForm={"Listado de Planos"} listbreadcrumb={LISTADO_PLANO_BREADCRUM}>
            <legend className="mleft-20"><i class="fa fa-filter"></i> Filtros de Búsqueda de Planos</legend>
            <div className="form-group">
                <label className="col-lg-2 control-label">Código de Plano</label>
                <div className="col-lg-4">
                    <input type="text" className="form-control input-sm" id="codplano" name="codplano" 
                    placeholder="Código del plano" onBlur={handleInputChange}/>
                </div>
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
            </div>
            <div className="form-group">
                <label className="col-lg-2 control-label">Fecha de Creación - Inicio</label>
                <div className="col-lg-4">
                    <input className="form-control input-sm" type="date" style={{ lineHeight: "1.43" }}
                    id="fechainicio"
                    name="fechainicio"
                    placeholder="Ingrese fecha inicio"
                    onChange={handleInputChange}
                    ></input>
                </div>

                <label className="col-lg-2 control-label">Fecha de Creación - Fin</label>
                <div className="col-lg-4">
                    <input className="form-control input-sm" type="date" style={{ lineHeight: "1.43" }}
                    id="fechafin"
                    name="fechafin"
                    placeholder="Ingrese fecha inicio"
                    onChange={handleInputChange}
                    ></input>
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">¿Contiene Archivo Dígital?</label>
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
                    : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} resetContenido={reiniciarSolicitante} />}
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">Proyecto</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="gestionpredialid" name="gestionpredialid" 
                    onChange={(e) => {handleChangeProyecto(e); handleInputChange(e);}}>
                        <option value="">--SELECCIONE--</option>
                        {resListaProyectos.error
                        ? "Se produjo un error cargando los tipos de plano"
                        : resListaProyectos.loading
                        ? "Cargando..."
                        : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion" />}
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
                <label className="col-lg-2 control-label">Tramo</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm"  id="tramoid" name="tramoid" 
                    onChange={handleInputChange}>
                        <option value="">--SELECCIONE--</option>
                        {dataTramo &&
                            <ComboOptions data={dataTramo} valorkey="id" valornombre="descripcion" />}
                    </select>
                </div>
                <label className="col-lg-2 control-label">Provincia</label>
                <div className="col-lg-4">
                    <select className="form-control input-sm" id="provinciaid" name="provinciaid" 
                    onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}>
                        <option value="0">--SELECCIONE--</option>
                        <ComboOptions data={dataProv} valorkey="id_prov" valornombre="nombre" />
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label className="col-lg-2 control-label">Subtramo</label>
                <div className="col-lg-4">
                    <input type="text" className="form-control input-sm" id="subtramoid" name="subtramoid" placeholder="Ingrese el subtramo"
                    onChange={handleInputChange} />
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
                        <button type="button" onClick={limpiarPlanosFilter} className="btn btn-default btn-sm fullborder">
                            <i className="fa fa-eraser"></i> Limpiar Filtro(s)
                        </button>
                        <button type="button" onClick={buscarPlanosFilter} className="btn btn-info  btn-sm  fullborder">
                            <i className="fa fa-search"></i> Aplicar Filtro(s)
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 form-group">
                <div className="col-lg-6">
                    <legend className="fullborder">Resultados de Búsqueda de Planos</legend>
                </div>
                <div className="col-lg-6 text-right">
                    {/* <button type="button" onClick={descarxls} className="btn btn-default btn-sm fullborder">
                        <i className="fa fa-file-excel-o"></i> TODO: Descargar Excel
                    </button> */}
                    <Link to={`/plano-grupo`} className="btn btn-danger btn-sm fullborder">
                        <i className="fa fa-clone"></i>  Generación de Códigos
                    </Link>
                    <Link to={`/plano-add`} className="btn btn-danger btn-sm fullborder">
                        <i className="fa fa-plus-circle"></i>  Agregar Plano
                    </Link>
                    
                </div>
            </div>
            <div className="panel panel-default">
                {
                (busquedaLocal)?
                    console.log('cargando datos de planos...')
                    :
                    (
                    <>
                    <TablePlano cabecera={cabecerasTabla}>
                        {dataPlanos.rows.map((plano, i) => (
                            <PlanoRow nro={i} plano={plano} callback={callbackEliminarPlano} loadfiles={cargarPopupDigitales}></PlanoRow>
                        ))}
                    </TablePlano>
                    <div className="panel-footer clearfix pull-right">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={limit}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={3}
                            onChange={handlePageChange}
                        ></Pagination>
                    </div>
                    </>
                    )
                }
            </div>
            {mostrarPopup && <MArcDigital closeventana={cerrarModal} codplano={codPlanoPopup} archivosdescargar={archivosPopup}/>}
        </WraperLarge>
        </>
    );

}

export default Planos;