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

import PredioLinks from "./PredioLinks";
import {useDispatch} from 'react-redux';
import { actualizar } from '../../actions/_ddp_variable/Actions';
import MAddAreasLinderos from "./MAddAreasLinderos";
import { TableLinderoPredio } from "./TableLinderoPredio";
import { TableAgricola } from "./TableAgricola";
import { TableGanaderia } from "./TableGanaderia";
import { MAddGanadera } from "./MAddGanadera";
import { MAddAgricola } from "./MAddAgricola";

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
    const listaCodigoUso = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOCODIGOUSO]);
    const listaClasificacionUso = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOCLASIFICACIONUSO]);
    const listaConstruccion = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.LISTACONSTRUCCION]);
    const listaRiesgo = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.LISTARIESGO]);
    const listaTipoAgrigcola = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.LISTAAGRICOLA]);
    const listaTipoGanaderia = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.LISTAGANADERIA]);
    
    const listaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const listaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    const listaDistrito = useAsync(helperGets.helperGetListDistrito,[]);
    
    const [listaLinderos, setListaLinderos] = useState([]);
    const [listaAgricola, setListaAgricola] = useState([]);
    const [listaGanadera, setListaGanadera] = useState([]);
    const [showRural, setShowRural] = useState(false);
    const [linderoEdit, setLinderoEdit] = useState([]);
    const [AgricolaEdit, setAgricolaEdit] = useState([]);
    const [GanaderiaEdit, setGanaderiaEdit] = useState([]);
    const [modalLinderos, setModalLinderos] = useState(false);
    const [modalAgricola, setModalAgricola] = useState(false);
    const [modalGanadera, setModalGanadera] = useState(false);
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
            if(datosTecnicoObtenidos.Ganadera){
                setListaGanadera(datosTecnicoObtenidos.Ganadera)
            }
            if(datosTecnicoObtenidos.Agricola){
                setListaAgricola(datosTecnicoObtenidos.Agricola)
            }
            if ( datosTecnicoObtenidos.tipoarea == 8) { // RURAl
                setShowRural(true)
            }else {
                setShowRural(false)
            }
        }
        
        };
        init();  
    }, []);


    const showModalLinderos = () => {
        setModalLinderos(true);
     }

     
    const showModalAgricola = () => {
        setModalAgricola(true);
     }
     
    const showModalGanadera = () => {
        setModalGanadera(true);
     }
     
     const cerrarModal=(estado)=>{
        setLinderoEdit(null);
        setModalLinderos(estado);

    }
    const cerrarModalAgricola=(estado)=>{
        setAgricolaEdit(null);
        setModalAgricola(estado);

    }
    const cerrarModalGanadera=(estado)=>{
        setGanaderiaEdit(null);
        setModalGanadera(estado);

    }

    const updatevalueslinderos=(lindero)=>{
        var linderoindex = listaLinderos.findIndex(x => x.id === lindero.id);
        

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

    const updatevaluesAgricolas=(agricola)=>{
        var ganaderaindex = listaAgricola.findIndex(x => x.id === agricola.id);

        if (ganaderaindex >= 0 ) {
             listaAgricola[ganaderaindex].tipoagricola = agricola.tipoagricola;
             listaAgricola[ganaderaindex].descripcion = agricola.descripcion;
             listaAgricola[ganaderaindex].porcentaje = agricola.porcentaje;
            

            setListaAgricola(listaAgricola);

        } else {
            setListaAgricola([...listaAgricola,agricola])
        }
        
        setAgricolaEdit(null);
        setModalAgricola(false);
    }
    
    
    const updatevaluesGanaderas=(ganadera)=>{
        var ganaderaindex = listaGanadera.findIndex(x => x.id === ganadera.id);
        

        if (ganaderaindex >= 0 ) {
             listaGanadera[ganaderaindex].tipoganadero = ganadera.tipoganadero;
             listaGanadera[ganaderaindex].cantidad = ganadera.cantidad;
         

            setListaGanadera(listaGanadera);

        } else {
            setListaGanadera([...listaGanadera,ganadera])
        }
        
        setGanaderiaEdit(null);
        setModalGanadera(false);
    }
    

    const cargarEditarLindero = (linderoid) => {
        var  linderovalue =  listaLinderos.find(x => x.id === linderoid);

        setLinderoEdit(linderovalue);
        setModalLinderos(true);
    }

    const cargarEditarAgricola = (agricolaid) => {
        var  agricolavalue =  listaAgricola.find(x => x.id === agricolaid);

        setAgricolaEdit(agricolavalue);
        setModalAgricola(true);
    }
    const cargarEditarGanadero = (ganaderoid) => {
        var  ganaderovalue =  listaGanadera.find(x => x.id === ganaderoid);

        setGanaderiaEdit(ganaderovalue);
        setModalGanadera(true);
    }

    const deleteLindero = key => {
        var data = $.grep(listaLinderos, function(e){
            return e.id !== key;
       });
       setListaLinderos(data);
    };

    const deleteAgricola = key => {
        var data = $.grep(listaAgricola, function(e){
            return e.id !== key;
       });
       setListaAgricola(data);
    };

    
    const deleteGanadera = key => {
        var data = $.grep(listaGanadera, function(e){
            return e.id !== key;
       });
       setListaGanadera(data);
    };

    const handleTipoArea = async (e) => {
        if (e.target.value == 8){ // Rural
          setShowRural(true)
        } else {
            setShowRural(false)
        }
      }

    const registrar = async e => {
        
        e.preventDefault();
        $('#btnguardar').button('loading');
        datoTecnico.lindero = listaLinderos;
        datoTecnico.agricola = listaAgricola;
        datoTecnico.ganadera = listaGanadera;
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
                                            onChange= { (e) => {
                                                handleInputChange(e);
                                                handleTipoArea(e); 
                                            } }
                                            name={"tipoarea"}>
                                            {listaTipoPredio.result?
                                            <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                            : "Cargando..."}  
                                        </Select>
                                    </FormGroup>
                                </Row6>
                                {
                                    !showRural && 
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
                                }
                            </fieldset>
                        </div>
                        {
                            showRural && 
                            <div className="col-lg-12">
                                <fieldset className="mleft-20">
                                    <legend>Descripcion del predio</legend>
                                    <Row6>
                                        <FormGroup label={"Condicion de uso del predio"} >
                                            <Select 
                                                required={true} 
                                                value={datoTecnico.condicionusopredio || ""}
                                                onChange={handleInputChange}
                                                name={"condicionusopredio"}>
                                                {listaCodigoUso.result?
                                                <ComboOptions data={listaCodigoUso.result} valorkey="id" valornombre="valortexto" />
                                                : "Cargando..."} 
                                            </Select>
                                        </FormGroup>
                                    </Row6>
                                    <Row6>
                                        <FormGroup label={"Clasificacion de uso actual"} >
                                            <Select 
                                                required={true} 
                                                value={datoTecnico.clasificacionusoactual || ""}
                                                onChange={handleInputChange}
                                                name={"clasificacionusoactual"}>
                                                {listaClasificacionUso.result?
                                                <ComboOptions data={listaClasificacionUso.result} valorkey="id" valornombre="valortexto" />
                                                : "Cargando..."} 
                                            </Select>
                                        </FormGroup>
                                    </Row6>
                                </fieldset>  
                            </div>
                        }
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
                                    {
                                        showRural ? ( 
                                            <div>
                                                <FormGroup label={"Nombre del Valle"} >
                                                    <Input 
                                                        value={datoTecnico.nombrevalle || ""} onChange={handleInputChange}
                                                        name={"nombrevalle"} placeholder={"Ingrese la denominación "}
                                                        type={"text"}>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup label={"Nombre del Sector o Caserio"}>
                                                    <Input 
                                                        value={datoTecnico.nombresector || ""} onChange={handleInputChange}
                                                        name={"nombresector"} placeholder={"Ingrese el sector o caseiro "}
                                                        type={"text"}>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup label={"Nombre del predio"}>
                                                    <Input 
                                                        value={datoTecnico.nombrepredio || ""} onChange={handleInputChange}
                                                        name={"nombrepredio"} placeholder={"Ingrese el nombre del predio "}
                                                        type={"text"}>
                                                    </Input>
                                                </FormGroup>
                                              
                                            </div>
                                         
                                        ) : (
                                            <div>
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
                                            </div>
                                        )
                                        
                                    }
                                   
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
                                {
                                    showRural ? (
                                        <div>
                                            <FormGroup label={"Unidad Catastral"} >
                                                <Input 
                                                    value={datoTecnico.unidadcatastral || ""} onChange={handleInputChange}
                                                    name={"unidadcatastral"}
                                                    type={"text"}>
                                                </Input>
                                            </FormGroup>

                                            <FormGroup label={"Fecha"} >
                                                <Input 
                                                    value={datoTecnico.fechadocumento || ""} onChange={handleInputChange}
                                                    name={"fechadocumento"}
                                                    type={"date"}>
                                                </Input>
                                            </FormGroup>

                                        </div>
                                    ) : (
                                        <div>
                                          
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

                                        </div>

                                    )

                                }
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
                        {
                            !showRural &&
                        
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
                        }
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Caracteristicas tecnicas del predio</legend>
                              
                                         <div>
                                            <Row6>
                                                {/* <FormGroup label={"Metros cuadrados"} >
                                                    <Input 
                                                        value={datoTecnico.metroscuadrados || ""} 
                                                        onChange={handleInputChange}
                                                        name={"metroscuadrados"} placeholder={"Metros cuadrados"}
                                                        type={"checkbox"}>
                                                    </Input>
                                                </FormGroup> */}
                                                {/* </Row6><FormGroup label={"Area del terreno (m" + <sup>2</sup> + ")"} > */}
                                                <div class="form-group ">
                                                    { showRural ?
                                                        <label className="col-lg-4 control-label">Área del terreno - (Ha)</label>
                                                        :
                                                        <label className="col-lg-4 control-label">Área del terreno - m<sup>2</sup></label>
                                                    }
                                                <div className="col-lg-8">
                                                    <Input 
                                                        value={datoTecnico.areaterreno || ""} 
                                                        onChange={handleInputChange}
                                                        name={"areaterreno"} placeholder={"Codigo del predio"}
                                                        pattern="^\d{1,10}(\.\d{1,6})?$"
                                                        type={"text"}>
                                                    </Input>
                                                    </div>
                                                </div>

                                                {
                                                    showRural && 
                                                    <div>
                                                        <div class="form-group ">
                                                            <label className="col-lg-4 control-label">Área declarada - (Ha)</label>
                                                            <div className="col-lg-8">
                                                                <Input 
                                                                    value={datoTecnico.areadeclarada || ""} 
                                                                    onChange={handleInputChange}
                                                                    name={"areadeclarada"} placeholder={"Area declarada (Ha)"}
                                                                    pattern="^\d{1,10}(\.\d{1,6})?$"
                                                                    type={"text"}>
                                                                </Input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </Row6>
                                            <Row6>
                                                {
                                                    showRural ? (
                                                        <div>
                                                             <div class="form-group ">
                                                                <label className="col-lg-4 control-label">Construcciones e instalaciones</label>
                                                                <div className="col-lg-8">
                                                                    <Select 
                                                                        required={true} 
                                                                        value={datoTecnico.construccionesinstalaciones || ""}
                                                                        onChange={handleInputChange}
                                                                        name={"construccionesinstalaciones"}>
                                                                        {listaConstruccion.result?
                                                                        <ComboOptions data={listaConstruccion.result} valorkey="id" valornombre="valortexto" />
                                                                        : "Cargando..."} 
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    : 
                                                    <div>
                                                        <div class="form-group ">
                                                            <label className="col-lg-4 control-label">Perimetro - m<sup>2</sup></label>
                                                            <div className="col-lg-8">
                                                                <Input
                                                                    value={datoTecnico.perimetro || ""} 
                                                                    onChange={handleInputChange}
                                                                    name={"perimetro"} placeholder={"Perimetro (m)"}
                                                                    pattern="^\d{1,10}(\.\d{1,6})?$"
                                                                    type={"text"}>
                                                                </Input>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="form-group ">
                                                            <label className="col-lg-4 control-label">Area Remanente - m<sup>2</sup> ó ha</label>
                                                            <div className="col-lg-8">
                                                            <Input
                                                                value={datoTecnico.arearemanente || ""} 
                                                                onChange={handleInputChange}
                                                                name={"arearemanente"} placeholder={"Area Remanente"}
                                                                pattern="^\d{1,10}(\.\d{1,6})?$"
                                                                type={"text"}>
                                                            </Input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                
                                            </Row6>
                                        </div>
                                     
                            </fieldset>
                        </div>
                        {showRural &&
                            <div>
                                <div className="col-lg-12">
                                        <fieldset className="mleft-20">
                                            <legend>Explotación económica Agricola</legend>
                                            <div className="col-lg-10">
                                                { (listaAgricola && Array.isArray(listaAgricola) && listaAgricola.length > 0 ) &&
                                                    <TableAgricola
                                                        data= {listaAgricola}
                                                        deleteAgricola = {deleteAgricola}
                                                        editarAgricola = {cargarEditarAgricola}>
                                                    </TableAgricola>
                                                }
                                            </div>
                                            <div className="col-lg-2 text-right">
                                                <button className="btn btn-sm btn-info" type="button" onClick={showModalAgricola} >
                                                <i className="fa fa-plus fa-lg" /> Añadir Agricola</button>
                                            </div> 
                                        </fieldset>
                                </div>
                                
                                <div className="col-lg-12">
                                        <fieldset className="mleft-20">
                                            <legend>Explotación económica Ganadera / Crianza</legend>
                                            <div className="col-lg-10">
                                                { (listaGanadera && Array.isArray(listaGanadera) && listaGanadera.length > 0 ) &&
                                                    <TableGanaderia
                                                        data= {listaGanadera}
                                                        deleteGanaderia = {deleteGanadera}
                                                        editarGanaderia = {cargarEditarGanadero}>
                                                    </TableGanaderia>
                                                }
                                            </div>
                                            <div className="col-lg-2 text-right">
                                                <button className="btn btn-sm btn-info" type="button" onClick={showModalGanadera} >
                                                <i className="fa fa-plus fa-lg" /> Añadir Ganaderia</button>
                                            </div> 
                                        </fieldset>
                                </div>

                                <Row6>
                                    <label className="col-lg-4 control-label">Riego</label>
                                    <div className="col-lg-8">
                                        <Select 
                                            required={true} 
                                            value={datoTecnico.riego || ""}
                                            onChange={handleInputChange}
                                            name={"riego"}>
                                            {listaRiesgo.result?
                                            <ComboOptions data={listaRiesgo.result} valorkey="id" valornombre="valortexto" />
                                            : "Cargando..."} 
                                        </Select>
                                    </div>
                                </Row6>


                            </div>
                              }
                              
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
            {
                modalAgricola && <MAddAgricola closeventana={cerrarModalAgricola} usevalue={updatevaluesAgricolas} listaTipoAgricola = {listaTipoAgrigcola.result}  dataagricola = {AgricolaEdit} />
            }
             {
                modalGanadera && <MAddGanadera closeventana={cerrarModalGanadera} usevalue={updatevaluesGanaderas} listaTipoGanadero = {listaTipoGanaderia.result}  dataganadero = {GanaderiaEdit} />
            }
        </WraperLarge>
    </>
  );
};

export default PredioEditTec;

