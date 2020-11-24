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

const {$} = window;
const Axios = initAxiosInterceptors();

async function obtenerDatosPredio(id) {
    const { data } = await Axios.get(`/docinterno?id=${id}`);
    return data;
  }

const PredioEditTec = ({history,  match}) => {
    const listaTipoPredio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOPRED]);
    // const resListaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const [datoTecnico, setDatoTecnico, handleInputChange, reset ] = useForm({},[""]);
    const {id} = match.params;
    const dispatch = useDispatch();
    const setIdPredioAccion = (variable) => dispatch(actualizar(variable));
    setIdPredioAccion(id);
    console.log('ed');
    console.log(id)

    useEffect(() => {
        const init = async () => {
        let  datosObtenidos = await obtenerDatosPredio(id);
        };
        init();  
    }, []);

    async function addPredioDatoTecnico(datoTecnico) {
        const {data} = await Axios.post(`/prediodatotecnico`,datoTecnico);
        return data;
    }



    const registrar = async e => {
        e.preventDefault();

        $('#btnguardar').button('loading');
        try {

            //let resultPlano = await addPredioDatoTecnico(datoTecnico);
            $('#btnguardar').button('reset');
            toastr.success('Registro de Datos Tecnicos', `La solicitud fue ingresada correctamente.`);
            history.push('/predio-list');
        }
        catch (e) {
            toastr.error('Registro Datos Tecnicos ', "Se encontró un error: " +  e.message);
            $('#btnguardar').button('reset');
        }
    }



    const cabecerasTabla = ["","LINDEROS","COLINDANCIAS ","TRAMO","LONGITUD (m)","NUMERACION MUNICIPAL"];

    return (
        <>
            <WraperLarge listbreadcrumb={EDICION_PREDIOS_BREADCRUM} >
            <Form onSubmit={registrar}>
                <PredioLinks active="2"></PredioLinks>
                <RowForm>
                    <Row12 title={"Codificación del predio"}>
                        <Row6>
                            <FormGroup label={"Codigo del predio"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"codigopredio"} placeholder={"Codigo del predio"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"CUC"}>
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"cuc"} placeholder={"Ingrese el código unico catastral"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Código referencial catastral"}>
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"codrefcat"} placeholder={"Ingrese el código referencia catastral"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12 title={"Caracteristicas del predio"}>
                        <Row6>
                            <FormGroup label={"Tipo de predio"}>
                                <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"tipopredioid"}>
                                    {listaTipoPredio.result?
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    : "Cargando..."} 
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Tipo de Area"}>
                                <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"tipopredioid"}>
                                    {/* {listaTipoPredio.result? */}
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    {/* : "Cargando..."}  */}
                                </Select>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Usos compatibles"}>
                                <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"usoscompatibles"}>
                                    {/* {listaTipoPredio.result? */}
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    {/* : "Cargando..."}  */}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Zonificacion"}>
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"usocompatible"} placeholder={"Ingrese la zonificacion "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12 title={"Ubicacion/Direccion"}>
                        <Row6>
                            <FormGroup label={"Codigo del predio"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"codigopredio"} placeholder={"Codigo del predio"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Unidad Catastral"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"unidadcatastral"} placeholder={"Unidad Catastral"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Departamento"}>
                                {/* <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"tipopredioid"}>
                                    {listaTipoPredio.result?
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    : "Cargando..."}  
                                </Select> */}
                            </FormGroup>
                            <FormGroup label={"Distrito"}>
                                <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"tipopredioid"}>
                                    {/* {listaTipoPredio.result? */}
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    {/* : "Cargando..."}  */}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Provincia"}>
                                <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"tipopredioid"}>
                                    {/* {listaTipoPredio.result? */}
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    {/* : "Cargando..."}  */}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Denominacion"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"denominacion"} placeholder={"Ingrese ??? "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Sector"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"sector"} placeholder={"Ingrese numero sector "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Manzana"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"manzana"} placeholder={"Ingrese numero manzana "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Lote"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"lote"} placeholder={"Ingrese numero lote "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Etapa/Zona"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"etapazona"} placeholder={"Ingrese etapa / zona "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Fecha de Inspeccion"} >
                                <Input 
                                    // value={solicitud.fechaelaboficio || ""} onChange={handleInputChange}
                                    name={"fechainspeccion"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"IT"} ayuda={"????"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"it"} placeholder={"??????"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Tipo de via"}>
                                <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"tipopredioid"}>
                                    {/* {listaTipoPredio.result? */}
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    {/* : "Cargando..."}  */}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Direccion"} ayuda={"Direccion"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"direccion"} placeholder={"Ingrese la direccion"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Nro"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"nrodireccion"} placeholder={"Ingrese el numero "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                           
                            <FormGroup label={"Bloque"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"bloque"} placeholder={"Ingrese numero bloque"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Interior"} >
                                <Select 
                                    required={true} 
                                    // value={solicitud.tramoid || ""}
                                    // onChange={handleInputChange}
                                    name={"tipopredioid"}>
                                    {/* {listaTipoPredio.result? */}
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto" />
                                    {/* : "Cargando..."}  */}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Habilitacion"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"Interior"} placeholder={"Ingrese ??? "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Documento"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"Interior"} placeholder={"Ingrese ??? "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Fecha"} >
                                <Input 
                                    // value={solicitud.fechaelaboficio || ""} onChange={handleInputChange}
                                    name={"Fecha"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Referencia"} >
                                <Input 
                                    // value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"Interior"} placeholder={"Ingrese ??? "}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12 title={"Areas y linderos tecnicos del predio"}>
                        <Table cabecera={cabecerasTabla}>
                        </Table>                
                    </Row12>
                    <Row12>

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
            </WraperLarge>
        </>
  );
};

export default PredioEditTec;