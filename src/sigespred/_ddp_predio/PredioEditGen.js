import React, {useState, useEffect} from "react";
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
    FormFooter
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

async function getDatoGen(id) {
    const {data} = await Axios.get(`/predio/${id}`);
    return data;
}

async function saveDatoGen(id, body) {
    const {data} = await Axios.put(`/predio/${id}`,body);
    return data;
}

const PredioEditGen = ({history,  match}) => {
    const {id} = match.params;
    const {codpred}=match.params;
    const dispatch = useDispatch();
    const dataPredio = { predioid:id, codigopredio:codpred};
    const setIdPredioAccion = (variable) => dispatch(actualizar(variable));
    setIdPredioAccion(dataPredio);

    const [predioGen, setPredioGen, handleInputChange, reset ] = useForm({},["cuc"]);
    const listaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const [listaTramos, setListaTramos] = useState(null);
    const listaTipoPredio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOPRED]);
    const listaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const listaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    const listaDistrito = useAsync(helperGets.helperGetListDistrito,[]);
    const listaSistemaCoordenadas = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.SISTCORDENADAS]);

    useEffect(() => {
        const init = async () => {
            
            let datoGeneral= await getDatoGen(id);
            console.log('FRELIXXXXX')
            console.log(datoGeneral)
            setPredioGen(datoGeneral);
            cargarFiltroTramo(datoGeneral.gestionpredialid);
        };
        init();
    }, []);

    const cargarFiltroTramo = async(idProyecto) => {
        if (idProyecto) {
            let dataTramos = await helperGets.helperGetListTramos(idProyecto);
            setListaTramos(dataTramos);
        }
    }

    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');

        try {    
            await saveDatoGen(predioGen.id, predioGen);
            toastr.success(`Los datos del predio: ${codpred}`, 'Se actualizarón correctamente.', {position: 'top-center'})
            
        }
        catch (e) {
            toastr.error('Se encontrarón errores al intentar realizar el registro de datos', JSON.stringify(e), {position: 'top-right'})
        }

        $('#btnguardar').button('reset');
    }

    return (
        <>
        <WraperLarge titleForm={"PREDIO: " + codpred + " / DATOS GENERALES"} listbreadcrumb={EDICION_PREDIOS_BREADCRUM} >
            <PredioLinks active="1"></PredioLinks>
            <Form onSubmit={registrar}>
                <div className="mtop-35"></div>
                <RowForm>
                        <Row6>
                            <FormGroup label={"Código de Predio (DDP)"}>
                                <Input value={predioGen.codigopredio || ""} readonly={true}
                                    name={"codigopredio"} placeholder={"Ingrese el código de referencia catastral"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Proyecto"}>
                                <Select readonly={true} value={predioGen.gestionpredialid || ""}
                                        name={"gestionpredialid"}>
                                    {listaProyectos.result?
                                    <ComboOptions data={listaProyectos.result} valorkey="id" valornombre="denominacion"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Sector / Tramo"}>
                                <Select value={predioGen.tramoid || ""} readonly={true}
                                        name={"tramoid"}>
                                    <ComboOptions data={listaTramos} valorkey="id" valornombre="descripcion" />
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Sub-sector / Sub-tramo"}>
                                <Input value={predioGen.subtramo || ""} onChange={handleInputChange}
                                        name={"subtramo"} placeholder={"Ingrese el sub-sector o sub-tramo"}
                                        type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Tipo de Predio"}>
                            <Select value={predioGen.tipopredioid || ""} readonly={true}
                                        name={"tipopredioid"}>
                                    {listaTipoPredio.result?
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Sistema de Referencia de Coordenadas"}>
                                <Select value={predioGen.sistcoordenadasid || ""}
                                    onChange={handleInputChange}
                                    name={"sistcoordenadasid"}>
                                    {listaSistemaCoordenadas.result?
                                    <ComboOptions data={listaSistemaCoordenadas.result} valorkey="id" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Departamento"}>
                                <Select value={predioGen.departamentoid || ""} readonly={true}
                                    name={"departamentoid"}>
                                    {listaDepartmento.result?
                                    <ComboOptions data={listaDepartmento.result} valorkey="id_dpto" valornombre="nombre"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Provincia"}>
                                <Select value={predioGen.provinciaid || ""} readonly={true}
                                    name={"provinciaid"}>
                                    {listaProvincia.result?
                                    <ComboOptions data={listaProvincia.result} valorkey="id_prov" valornombre="nombre"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Distrito"}>
                                <Select value={predioGen.distritoid || ""} readonly={true}
                                        name={"distritoid"}>
                                    {listaDistrito.result?
                                    <ComboOptions data={listaDistrito.result} valorkey="id_dist" valornombre="nombre"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Progresiva - Inicio (Km)"}>
                                <Input value={predioGen.progreinicio || ""} onChange={handleInputChange}
                                    name={"progreinicio"} placeholder={"Ingrese el valor de inicio de la progresiva"}
                                    pattern="^\d{1,10}(\.\d{1,6})?$"
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Progresiva - Final (Km)"}>
                                <Input value={predioGen.progrefinal || ""} onChange={handleInputChange}
                                    name={"progrefinal"} placeholder={"Ingrese el valor de fin de la progresiva"}
                                    pattern="^\d{1,10}(\.\d{1,6})?$"
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Archivo con Geometría del Predio"}>
                                <SingleUpload
                                            key="archivopredio"
                                            accept={'.*'}
                                            folderSave={FilesGestionPredial.FilesPredios}
                                            form={predioGen}
                                            setForm={setPredioGen}
                                            nameUpload={"archivopredio"}
                                                >
                                </SingleUpload>
                            </FormGroup>
                        </Row6>
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

export default PredioEditGen;