import React, {useEffect, useState} from "react";
import {initAxiosInterceptors} from '../../config/axios';
import { EDICION_PREDIOS_BREADCRUM } from "../../config/breadcrums";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {
    Form,
    FormGroup,
    Row6,
    Row12,
    RowForm,
    Select,
    Input,
    Options,
    FormControl,
    InputInline,
    FormFooter,
    Table
} from "../../components/forms";
import {useForm} from "../../hooks/useForm"
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import ComboOptions from "../../components/helpers/ComboOptions";
import MapRegistroPredio from "../../components/helpers/maps/MapRegistroPredio";
import SingleUpload from "../../components/uploader/SingleUpload";
import {FilesGestionPredial} from "../../config/parameters";
import PredioLinks from "./PredioLinks";
import {useDispatch} from 'react-redux';
import { actualizar } from '../../actions/_ddp_variable/Actions';
import MAddAreasLinderos from "./MAddAreasLinderos";
import { TableLinderoPredio } from "./TableLinderoPredio";

const {$} = window;
const Axios = initAxiosInterceptors();

async function getDatoGen(id) {
    const {data} = await Axios.get(`/predio/${id}`);
    return data;
}

async function obtenerDatosPredio(id) {
    const { data } = await Axios.get(`/prediodatotec/${id}`); //?id=
    return data;
  }

async function savePredioDatoTecnico(id, body) {
    const {data} = await Axios.put(`/prediodatotec/${id}`,body);
    return data;
}

async function addPredioDatoTecnico(datoTecnico) {
    const {data} = await Axios.post(`/prediodatotec`,datoTecnico);
    return data;
}

const PredioEditTec = ({history,  match}) => {
    const {id} = match.params;
    const {codpred}=match.params;
    const dispatch = useDispatch();
    const listaTipoPredio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOPRED]);
    const listaTipoUsosCompatibles = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOUSOSCOMPATIBLES]);
    const listaTipoZonificacion = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOZONIFICACION]);
    const listaTipoVia = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOVIAS]);
    const listaTipoInterior = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOINTERIOR]);
    const listaTipoLinderos = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOLINDEROS]);
    const listaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const listaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    const listaDistrito = useAsync(helperGets.helperGetListDistrito,[]);
    const [listaLinderos, setListaLinderos] = useState([]);
    
    const [linderoEdit, setLinderoEdit] = useState([]);
    const [modalLinderos, setModalLinderos] = useState(false);
    const [datoTecnico, setDatoTecnico, handleInputChange, reset ] = useForm({},[""]);
    const [nuevoDatoTec, setNuevoDatoTec] = useState(true);
    const [datogeneral, setDatoGeneral] = useState([]);
    const dataPredio = { predioid:id, codigopredio:codpred};
    const setIdPredioAccion = (variable) => dispatch(actualizar(variable));
    setIdPredioAccion(dataPredio);

    useEffect(() => {
        const init = async () => {
        let  datosTecnicoObtenidos = await obtenerDatosPredio(id);
        let datoGeneral= await getDatoGen(id);
        setDatoGeneral(datoGeneral);

        if (datosTecnicoObtenidos) {
            setNuevoDatoTec(false);
            setDatoTecnico(datosTecnicoObtenidos);
            if(datosTecnicoObtenidos.Lindero){
                setListaLinderos(datosTecnicoObtenidos.Lindero);
            }
        }
        };
        init();  
    }, []);


    const showModalLinderos = () => {
        setModalLinderos(true);
     }

     const cerrarModal=(estado)=>{
        setLinderoEdit(null);
        setModalLinderos(estado);

    }

    const updatevalueslinderos=(lindero)=>{
        var linderoindex = listaLinderos.findIndex(x => x.id === lindero.id);
        debugger;

        if (linderoindex >= 0 ) {
            listaLinderos[linderoindex].colindancia = lindero.colindancia;
            listaLinderos[linderoindex].longitud = lindero.longitud;
            listaLinderos[linderoindex].nummunicipal = lindero.nummunicipal;
            listaLinderos[linderoindex].tipolindero = lindero.tipolindero;
            listaLinderos[linderoindex].tramo = lindero.tramo;

            setListaLinderos(listaLinderos);

        } else {
            setListaLinderos([...listaLinderos,lindero])
        }
        
        setLinderoEdit(null);
        setModalLinderos(false);
    }
    
    const cargarEditarLindero = (linderoid) => {
        var  linderovalue =  listaLinderos.find(x => x.id === linderoid);

        setLinderoEdit(linderovalue);
        setModalLinderos(true);
    }

    const deleteLindero = key => {
        var data = $.grep(listaLinderos, function(e){
            return e.id !== key;
       });
       setListaLinderos(data);
    };



    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        datoTecnico.lindero = listaLinderos;

        try {
            if (nuevoDatoTec){
                datoTecnico.id = id;
            
                await addPredioDatoTecnico(datoTecnico);
                toastr.success(`Los datos registrales del predio: ${id}`, 'Se generarón correctamente.', {position: 'top-center'})
            } else {
                await savePredioDatoTecnico(datoTecnico.id, datoTecnico);
                toastr.success(`Los datos registrales del predio: ${id}`, 'Se actualizarón correctamente.', {position: 'top-center'})
            }

        }
        catch (e) {
            toastr.error('Se encontrarón errores al intentar realizar el registro de datos registrales', JSON.stringify(e), {position: 'top-right'})
        }
        $('#btnguardar').button('reset');
    }



    

    return (
        <>
            <WraperLarge titleForm={"PREDIO: " + codpred + " / DATOS TÉCNICOS"} listbreadcrumb={EDICION_PREDIOS_BREADCRUM} >
            <PredioLinks active="2"></PredioLinks>
                <Form onSubmit={registrar}>
                <div className="mtop-35"></div>
                    <RowForm>
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Caracteristicas del predio</legend>
                                <Row6>
                                    <FormGroup label={"Tipo de Area"}>
                                        <Select 
                                            required={true} 
                                            value={datoTecnico.tipoarea || ""}
                                            onChange={handleInputChange}
                                            name={"tipoarea"}>
                                            {listaTipoPredio.result?
                                            <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                            : "Cargando..."}  
                                        </Select>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <FormGroup label={"Usos compatibles"}>
                                        <Select 
                                            required={true} 
                                            value={datoTecnico.usoscompatibles || ""}
                                            onChange={handleInputChange}
                                            name={"usoscompatibles"}>
                                            {listaTipoUsosCompatibles.result?
                                            <ComboOptions data={listaTipoUsosCompatibles.result} valorkey="id" valornombre="valortexto" />
                                            : "Cargando..."}  
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Zonificacion"}>
                                        <Select 
                                            required={true} 
                                            value={datoTecnico.zonificacion || ""}
                                            onChange={handleInputChange}
                                            name={"zonificacion"}>
                                            {listaTipoZonificacion.result?
                                            <ComboOptions data={listaTipoZonificacion.result} valorkey="id" valornombre="valortexto" />
                                            : "Cargando..."}  
                                        </Select>
                                    </FormGroup>
                                </Row6>
                            </fieldset>
                        </div>
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Ubicacion/Dirección</legend>
                                <Row6>
                                    <FormGroup label={"Código del predio"} >
                                        <Input 
                                            value={datogeneral.codigopredio || ""} 
                                            // onChange={handleInputChange}
                                            name={"codigopredio"} placeholder={"Codigo del predio"}
                                            readonly={true}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Departamento"}>
                                        <Select 
                                            required={true} 
                                            value={datogeneral.departamentoid || ""}
                                            readonly={true}
                                            // onChange={(e) => {handleChangeDepartmento(e); handleInputChange(e);}}
                                            name={"departamentoid"}>
                                            {listaDepartmento.result?
                                            <ComboOptions data={listaDepartmento.result} valorkey="id_dpto" valornombre="nombre" />
                                            : "Cargando..."}  
                                        </Select> 
                                    </FormGroup>
                                    <FormGroup label={"Provincia"}>
                                        <Select 
                                            required={true} 
                                            value={datogeneral.provinciaid || ""}
                                            readonly={true}
                                            // onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}
                                            name={"provinciaid"}>
                                            {listaProvincia.result?
                                            <ComboOptions data={listaProvincia.result} valorkey="id_prov" valornombre="nombre" />
                                            : "Cargando..."} 
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Distrito"}>
                                        <Select 
                                            required={true} 
                                            value={datogeneral.distritoid || ""}
                                            readonly={true}
                                            // onChange={handleInputChange}
                                            name={"distritoid"}>
                                            {listaDistrito.result?
                                            <ComboOptions data={listaDistrito.result} valorkey="id_dist" valornombre="nombre" />
                                            : "Cargando..."}  
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Denominacion"} >
                                        <Input 
                                            value={datoTecnico.denominacion || ""} onChange={handleInputChange}
                                            name={"denominacion"} placeholder={"Ingrese la denominación "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Sector"} >
                                        <Input 
                                            value={datoTecnico.sector || ""} onChange={handleInputChange}
                                            name={"sector"} placeholder={"Ingrese numero sector "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Manzana"} >
                                        <Input 
                                            value={datoTecnico.manzana || ""} onChange={handleInputChange}
                                            name={"manzana"} placeholder={"Ingrese numero manzana "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Lote"} >
                                        <Input 
                                            value={datoTecnico.lote || ""} onChange={handleInputChange}
                                            name={"lote"} placeholder={"Ingrese numero lote "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Etapa/Zona"} >
                                        <Input 
                                            value={datoTecnico.etapazona || ""} onChange={handleInputChange}
                                            name={"etapazona"} placeholder={"Ingrese etapa / zona "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <FormGroup label={"Fecha de Inspección"} >
                                        <Input 
                                            value={datoTecnico.fechainspeccion || ""} onChange={handleInputChange}
                                            name={"fechainspeccion"}
                                            type={"date"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Num. Informe Tecnico"} ayuda={"Número de informe técnico"} >
                                        <Input 
                                            value={datoTecnico.it || ""} onChange={handleInputChange}
                                            name={"it"} placeholder={"Ingrese el número de informe técnico"}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Tipo de via"}>
                                        <Select 
                                            required={true} 
                                            value={datoTecnico.tipovia || ""}
                                            onChange={handleInputChange}
                                            name={"tipovia"}>
                                            {listaTipoVia.result? 
                                            <ComboOptions data={listaTipoVia.result} valorkey="id" valornombre="valortexto" />
                                            : "Cargando..."}  
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Direccion"} ayuda={"Direccion"} >
                                        <Input 
                                            value={datoTecnico.direccion || ""} onChange={handleInputChange}
                                            name={"direccion"} placeholder={"Ingrese la direccion"}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Nro"} >
                                        <Input 
                                            value={datoTecnico.numero || ""} onChange={handleInputChange}
                                            name={"numero"} placeholder={"Ingrese el numero "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                
                                    <FormGroup label={"Bloque"} >
                                        <Input 
                                            value={datoTecnico.bloque || ""} onChange={handleInputChange}
                                            name={"bloque"} placeholder={"Ingrese numero bloque"}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Interior"} >
                                        <Select 
                                            required={true} 
                                            value={datoTecnico.interior || ""}
                                            onChange={handleInputChange}
                                            name={"interior"}>
                                            {listaTipoInterior.result?
                                            <ComboOptions data={listaTipoInterior.result} valorkey="id" valornombre="valortexto" />
                                            : "Cargando..."} 
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Urbanización"} >
                                        <Input 
                                            value={datoTecnico.habilitacion || ""} onChange={handleInputChange}
                                            name={"habilitacion"} placeholder={"Ingrese la urbanización "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Documento"} >
                                        <Input 
                                            value={datoTecnico.documento || ""} onChange={handleInputChange}
                                            name={"documento"} placeholder={"Ingrese el número de documento "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Referencia"} >
                                        <Input 
                                            value={datoTecnico.referencia || ""} onChange={handleInputChange}
                                            name={"referencia"} placeholder={"Ingrese la referencia "}
                                            type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>             

                            </fieldset>
                        </div>
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Areas y linderos tecnicos del predio</legend>
                                <div className="col-lg-10">
                                    { (listaLinderos && Array.isArray(listaLinderos) && listaLinderos.length > 0 ) &&
                                        <TableLinderoPredio
                                            data= {listaLinderos}
                                            deletelindero = {deleteLindero}
                                            editarlindero = {cargarEditarLindero}>
                                        </TableLinderoPredio>
                                    }
                                </div>
                                <div className="col-lg-2 text-right">
                                    <button className="btn btn-sm btn-info" type="button" onClick={showModalLinderos} >
                                    <i className="fa fa-plus fa-lg" /> Añadir Areas y Linderos</button>
                                </div> 
                                </fieldset>
                        </div>
                        
                        <Row12>
                            <Row6>
                                
                            </Row6>
                        </Row12>
                    </RowForm>
                    <FormFooter>
                            <Link to={`/predio-list`}
                                className="btn btn-default btn-sm btn-control">Cancelar</Link>
                            <button id="btnguardar" type="submit"
                                    className="btn btn-danger btn-sm btn-control">Guardar
                            </button>
                        </FormFooter>
            </Form>  
            {
                modalLinderos && <MAddAreasLinderos closeventana={cerrarModal} usevalue={updatevalueslinderos} listaTipoLindero = {listaTipoLinderos.result}  datalindero = {linderoEdit} />
            }
        </WraperLarge>
    </>
  );
};

export default PredioEditTec;
