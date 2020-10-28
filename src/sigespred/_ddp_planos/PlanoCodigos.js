import React, {useState} from 'react';
import {REGISTRO_PLANO_BREADCRUM} from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import { useAsync } from "react-async-hook";
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import MCodigoPlanos from "./MCodigoPlanos";
import {initAxiosInterceptors} from '../../config/axios';

const {$} = window;
const Axios = initAxiosInterceptors();

const PlanoCodigos = ({history,  match}) => {
    var planosArray = [];
    const [plano1, setPlano1] = useState({});
    const [plano2, setPlano2] = useState({});
    const [plano3, setPlano3] = useState({});
    const [plano4, setPlano4] = useState({});
    const [plano5, setPlano5] = useState({});
    const [plano, set_plano] = useState({});
    const [mCodigoPlano, setMCodigoPlano] = useState(false);
    const [dataListaCodigos, setDataListaCodigos] = useState([]);
    
    const resListaTipoPlano = useAsync(helperGets.helperGetListTipoPlano, [""]);
    const resListaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const resListaAnios = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.ANIO]);
    const resListaProcesos = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.PROCESOSGPRED]);
    const resListaSolicitantes = useAsync(helperGets.helperGetListaLocadores, [])

    function handleInputChange(e) {
        var numControl = e.target.name.slice(-2);

        switch(numControl){
            case '_1':
                setPlano1({
                    ...plano1,
                    [e.target.name.slice(0, -2)]: e.target.value.toUpperCase()
                });
                break;
            case '_2':
                setPlano2({
                    ...plano2,
                    [e.target.name.slice(0, -2)]: e.target.value.toUpperCase()
                });
                break;
            case '_3':
                setPlano3({
                    ...plano3,
                    [e.target.name.slice(0, -2)]: e.target.value.toUpperCase()
                });
                break;
            case '_4':
                setPlano4({
                    ...plano4,
                    [e.target.name.slice(0, -2)]: e.target.value.toUpperCase()
                });
                break;
            default:
                setPlano5({
                    ...plano5,
                    [e.target.name.slice(0, -2)]: e.target.value.toUpperCase()
                });
        }
    }



    function setSolicitante(idLocador) {
        set_plano({
            ...plano,
            profesionalid: idLocador
        });
    }

async function addPlanos(planos) {
    const {data} = await Axios.post(`/plano/codigos`,planos);
    return data;
}

    const validarPlano = (plano) => {
        const isEmpty = !Object.values(plano).some(x => (x !== null && x !== ''));
        if (isEmpty) {
            return isEmpty;
        }

        const allFilled = !Object.values(plano).some(x => (x === null || x === ''));

        if (Object.keys(plano).length === 6 && allFilled){
            planosArray.push(plano);
            return true;
        }
        return false;
    }


    const registrar = async e => {

        e.preventDefault();
        $('#btnguardar').button('loading');
        planosArray = [];
        
        if (!plano.profesionalid || (Object.keys(plano1).length === 0 && plano1.constructor === Object &&
        Object.keys(plano2).length === 0 && plano2.constructor === Object &&
        Object.keys(plano3).length === 0 && plano3.constructor === Object &&
        Object.keys(plano4).length === 0 && plano4.constructor === Object &&
        Object.keys(plano5).length === 0 && plano5.constructor === Object)) {
            toastr.error(`Se requiere un profesional y al menos un conjunto de planos para ser codificados.`)
            return;
        }

        if (!validarPlano(plano1) || !validarPlano(plano2) || !validarPlano(plano3)
            || !validarPlano(plano4) ||!validarPlano(plano5)) {
            toastr.error(`Todos los campos de las filas a usar deben tener un valor.`)
            return;
        }

        plano.planos = planosArray;
        try {
            let {result} = await addPlanos(plano);
            setMCodigoPlano(true);
            setDataListaCodigos(result);
            toastr.success('Proceso Finalizado', 'Revise el listado para obtener los códigos generados', {position: 'top-right'})
            //history.push('/list-trabajadores')
        }
        catch (e) {
            alert(e.message)
        }
        $('#btnguardar').button('reset');
    }

        return (
            <>
            <WraperLarge titleForm={"Generación Grupal de Códigos de Plano"} listbreadcrumb={REGISTRO_PLANO_BREADCRUM}>
                <form onSubmit={registrar}>   
                    <div className="form-group col-lg-6">
                        <label className="col-lg-4 control-label">
                            <span className="obligatorio">* </span>Profesional Solicitante
                        </label>
                        <div className="col-lg-8">
                                        {resListaSolicitantes.error
                                        ? "Se produjo un error cargando los locadores"
                                        : resListaSolicitantes.loading
                                        ? "Cargando..."
                                        : <Autocomplete listaDatos={resListaSolicitantes.result} callabck={setSolicitante} />}
                        </div>
                    </div>
                    <div className="form-group col-lg-12">
                        <label className="col-lg-2">
                            <span className="obligatorio">* </span>Tipo de Plano
                        </label>
                        <label className="col-lg-2">
                            <span className="obligatorio">* </span>Proyecto
                        </label>
                        <label className="col-lg-2">
                            <span className="obligatorio">* </span>Nro. de Expediente
                        </label>
                        <label className="col-lg-2">
                            <span className="obligatorio">* </span>Año
                        </label>
                        <label className="col-lg-2">
                            <span className="obligatorio">* </span>Proceso
                        </label>
                        <label className="col-lg-2">
                            <span className="obligatorio">* </span>Cantidad de Planos
                        </label>
                    </div>
                    <div className="form-group col-lg-12">
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="tipoplanoid_1" name="tipoplanoid_1"
                            title="El Tipo de Plano es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaTipoPlano.error
                                ? "Se produjo un error cargando los tipos de plano"
                                : resListaTipoPlano.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="gestionpredialid_1" name="gestionpredialid_1" 
                            title="El Proyecto es requerido"
                            onChange={(e) => {handleInputChange(e);}}>
                                <option value="">--SELECCIONE--</option>
                                {resListaProyectos.error
                                ? "Se produjo un error cargando los proyectos"
                                : resListaProyectos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="text" className="form-control input-sm uppercaseinput" id="nroexpediente_1" name="nroexpediente_1" 
                            placeholder="Número de expediente"
                            title="El Número de Expediente es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="periodoid_1" name="periodoid_1" 
                            title="El Año es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaAnios.error
                                ? "Se produjo un error cargando los años"
                                : resListaAnios.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="procesoid_1" name="procesoid_1"
                            title="El Proceso es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaProcesos.error
                                ? "Se produjo un error cargando los procesos"
                                : resListaProcesos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProcesos.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="number" min="1" step="1" className="form-control input-sm uppercaseinput" id="cantidad_1" name="cantidad_1" 
                            placeholder="Número de Planos"
                            title="El Número de Planos es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    
                    <div className="form-group col-lg-12">
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="tipoplanoid_2" name="tipoplanoid_2"
                            title="El Tipo de Plano es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaTipoPlano.error
                                ? "Se produjo un error cargando los tipos de plano"
                                : resListaTipoPlano.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="gestionpredialid_2" name="gestionpredialid_2" 
                            title="El Proyecto es requerido"
                            onChange={(e) => {handleInputChange(e);}}>
                                <option value="">--SELECCIONE--</option>
                                {resListaProyectos.error
                                ? "Se produjo un error cargando los proyectos"
                                : resListaProyectos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="text" className="form-control input-sm uppercaseinput" id="nroexpediente_2" name="nroexpediente_2" 
                            placeholder="Número de expediente"
                            title="El Número de Expediente es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="periodoid_2" name="periodoid_2" 
                            title="El Año es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaAnios.error
                                ? "Se produjo un error cargando los años"
                                : resListaAnios.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="procesoid_2" name="procesoid_2"
                            title="El Proceso es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaProcesos.error
                                ? "Se produjo un error cargando los procesos"
                                : resListaProcesos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProcesos.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="number" min="1" step="1" className="form-control input-sm uppercaseinput" id="cantidad_2" name="cantidad_2" 
                            placeholder="Número de Planos"
                            title="El Número de Planos es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    
                    <div className="form-group col-lg-12">
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="tipoplanoid_3" name="tipoplanoid_3"
                            title="El Tipo de Plano es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaTipoPlano.error
                                ? "Se produjo un error cargando los tipos de plano"
                                : resListaTipoPlano.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="gestionpredialid_3" name="gestionpredialid_3" 
                            title="El Proyecto es requerido"
                            onChange={(e) => {handleInputChange(e);}}>
                                <option value="">--SELECCIONE--</option>
                                {resListaProyectos.error
                                ? "Se produjo un error cargando los proyectos"
                                : resListaProyectos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="text" className="form-control input-sm uppercaseinput" id="nroexpediente_3" name="nroexpediente_3" 
                            placeholder="Número de expediente"
                            title="El Número de Expediente es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="periodoid_3" name="periodoid_3" 
                            title="El Año es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaAnios.error
                                ? "Se produjo un error cargando los años"
                                : resListaAnios.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="procesoid_3" name="procesoid_3"
                            title="El Proceso es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaProcesos.error
                                ? "Se produjo un error cargando los procesos"
                                : resListaProcesos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProcesos.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="number" min="1" step="1" className="form-control input-sm uppercaseinput" id="cantidad_3" name="cantidad_3" 
                            placeholder="Número de Planos"
                            title="El Número de Planos es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    
                    <div className="form-group col-lg-12">
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="tipoplanoid_4" name="tipoplanoid_4"
                            title="El Tipo de Plano es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaTipoPlano.error
                                ? "Se produjo un error cargando los tipos de plano"
                                : resListaTipoPlano.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="gestionpredialid_4" name="gestionpredialid_4" 
                            title="El Proyecto es requerido"
                            onChange={(e) => {handleInputChange(e);}}>
                                <option value="">--SELECCIONE--</option>
                                {resListaProyectos.error
                                ? "Se produjo un error cargando los proyectos"
                                : resListaProyectos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="text" className="form-control input-sm uppercaseinput" id="nroexpediente_4" name="nroexpediente_4" 
                            placeholder="Número de expediente"
                            title="El Número de Expediente es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="periodoid_4" name="periodoid_4" 
                            title="El Año es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaAnios.error
                                ? "Se produjo un error cargando los años"
                                : resListaAnios.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="procesoid_4" name="procesoid_4"
                            title="El Proceso es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaProcesos.error
                                ? "Se produjo un error cargando los procesos"
                                : resListaProcesos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProcesos.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="number" min="1" step="1" className="form-control input-sm uppercaseinput" id="cantidad_4" name="cantidad_4" 
                            placeholder="Número de Planos"
                            title="El Número de Planos es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="form-group col-lg-12">
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="tipoplanoid_5" name="tipoplanoid_5"
                            title="El Tipo de Plano es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaTipoPlano.error
                                ? "Se produjo un error cargando los tipos de plano"
                                : resListaTipoPlano.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaTipoPlano.result} valorkey="id" valornombre="descripcion" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="gestionpredialid_5" name="gestionpredialid_5" 
                            title="El Proyecto es requerido"
                            onChange={(e) => {handleInputChange(e);}}>
                                <option value="">--SELECCIONE--</option>
                                {resListaProyectos.error
                                ? "Se produjo un error cargando los proyectos"
                                : resListaProyectos.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaProyectos.result} valorkey="id" valornombre="denominacion"/>}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="text" className="form-control input-sm uppercaseinput" id="nroexpediente_5" name="nroexpediente_5" 
                            placeholder="Número de expediente"
                            title="El Número de Expediente es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="periodoid_5" name="periodoid_5" 
                            title="El Año es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaAnios.error
                                ? "Se produjo un error cargando los años"
                                : resListaAnios.loading
                                ? "Cargando..."
                                : <ComboOptions data={resListaAnios.result} valorkey="valorcodigo" valornombre="valortexto" />}
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <select className="form-control input-sm" id="procesoid_5" name="procesoid_5"
                            title="El Proceso es requerido"
                            onChange={handleInputChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                {resListaProcesos.result ?
                                <ComboOptions data={resListaProcesos.result} valorkey="valorcodigo" valornombre="valortexto" />
                                : "Cargando..."
                                }
                            </select>
                        </label>
                        <label className="col-lg-2">
                            <input type="number" min="1" step="1" className="form-control input-sm uppercaseinput" id="cantidad_5" name="cantidad_5" 
                            placeholder="Número de Planos"
                            title="El Número de Planos es requerido"
                            autoComplete = "off"
                            onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="panel-body">
                        <div className="form-group">
                            <div className="col-lg-offset-8 col-lg-4">
                                <Link to={`/planos`} className="btn btn-default btn-sm btn-control">Cancelar
                                </Link>
                                <button id="btnguardar" type="submit"
                                        className="btn btn-danger btn-sm btn-control">Guardar
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </form>
                {mCodigoPlano && <MCodigoPlanos dataMostrar = {dataListaCodigos}/> }
                </WraperLarge>
            </>
        );
    }

    export default PlanoCodigos;