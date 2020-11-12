import React, {useEffect, useState,createContext} from 'react';
import {Link} from "react-router-dom";
import { useAsync } from "react-async-hook";
import Wraper from "../m000_common/formContent/WraperLarge";
import {VALIDA_GESTIONPREDIALPOLIGONO_BREADCRUM} from "../../config/breadcrums";
import {initAxiosInterceptors, serverFile} from '../../config/axios';
import {toastr} from 'react-redux-toastr';
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
import ComboOptions from "../../components/helpers/ComboOptions";
import SingleUpload from "../../components/uploader/SingleUpload";
import MapValidaPoligono from "../../components/helpers/maps/MapValidaPoligono";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";

const Axios = initAxiosInterceptors();
const {$} = window;
const directorioPoligono = "poligonogpredialadmin";

async function addPoligono(valPoligono) {
    const {data} = await Axios.post(`/validagestionpredial`,valPoligono);
    return data;
}

async function savePoligono(id, body) {
    const {data} = await Axios.put(`/validagestionpredial/${id}`,body);
    return data;
}

async function getPoligono(id) {
    const {data} = await Axios.get(`/validagestionpredial?id=${id}`);
    return data;
}

const GestionPredialPoligono = ({history, match}) => {
    const {id}=match.params;
    const {ti}=match.params;
    const {idpoligono}=match.params;
    const [valPoligono, setValPoligono, handleInputChange, reset ] = useForm({},["nrooficio","codigostd"]);
    const listaRepresentacionGrafica = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOREPGRAFICA]);
    const listaSistemaCoordenadas = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.SISTCORDENADAS]);
    const listaTipoRaster = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPORASTER]);
    const listaMetGeneraInfo = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOGENERAINFO]);
    const [nuevoPoligono, setNuevoPoligono] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (idpoligono) {
                setNuevoPoligono(false);
                let poligonoAsociado= await getPoligono(idpoligono);
                setValPoligono(poligonoAsociado);
            }
        };
        init();
    }, []);

    const registrar = async e => {
        e.preventDefault();

        valPoligono.gestionpredialid = id;
        console.log(valPoligono);
         $('#btnguardar').button('loading');
         try {
            if (nuevoPoligono) {
                let resultPoligono = await addPoligono(valPoligono);
                $('#btnguardar').button('reset');
                toastr.success('Registro de Polígono', `El polígono fue registrado correctamente.`);
                
            } else {
                await savePoligono(valPoligono.id, valPoligono);
                toastr.success(`El Polígono con ID: ${valPoligono.id}`, 'Se actualizó correctamente.', {position: 'top-right'})
            }
            history.push(`/gestionpredial-validalist/${id}`);
        }
        catch (e) {
            toastr.error('Registro de Polígono', "Se encontró un error: " +  e.message);
            $('#btnguardar').button('reset');
        }
    }

    const refreshMapa = () => {

    }

    const procesarShape = (fileName, fileContent) => {
        console.log('dice procesar shape');
        console.log(fileName);
        console.log(fileContent);
    }

return (
    <>
    <Wraper titleForm={"Gestión Predial - Validación de Polígono"} listbreadcrumb={VALIDA_GESTIONPREDIALPOLIGONO_BREADCRUM}>
        <legend className="mleft-20">VALIDACIÓN DE AMBITO DEL PROYECTO: {ti}</legend>
            <Form onSubmit={registrar}>
                <div className="row mleft-20">
                    <div className="form-group col-lg-5">
                        <label className="control-label">
                            Cargar Geometría (formato shape)
                        </label>
                    </div>
                    <div className="form-group col-lg-5">
                        <label className="control-label">
                            URL Ortofoto (referencial)
                        </label>
                    </div>
                    <div className="form-group col-lg-2">
                        <label className="control-label">
                        </label>
                    </div>
                    <div className="form-group col-lg-5">
                        <SingleUpload
                            key="urlpoligono"
                            accept={'.*'}
                            folderSave={directorioPoligono}
                            form={valPoligono}
                            setForm={setValPoligono}
                            handleInputChange={procesarShape}
                            nameUpload={"urlpoligono"}
                                >
                        </SingleUpload>
                    </div>
                    <div className="form-group col-lg-5">
                        <Input value={valPoligono.urlortofoto || ""} onChange={handleInputChange}
                            name={"urlortofoto"} placeholder={"Ingrese URL del ortofoto"}
                            pattern="/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/"
                            type={"text"}>
                        </Input>
                    </div>
                    <div className="col-lg-2 mleft-5">
                        <button type="button" onClick={refreshMapa} className="btn btn-default btn-sm">
                            <i className="fa fa-refresh"></i> Actualizar Mapa
                        </button>
                    </div>
                </div>
                <div className="row mleft-5">
                    <div className="col-lg-8 mright-5">
                        <MapValidaPoligono></MapValidaPoligono>
                    </div>
                    <div className="form-group col-lg-4">
                        <legend className="mbot-10">Vectorial</legend>
                        <div className="mleft-5">
                            <label className="control-label">
                                Representación Gráfica:
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Select value={valPoligono.representaciongraficaid || ""}
                                onChange={handleInputChange}
                                name={"representaciongraficaid"}>
                                {listaRepresentacionGrafica.result?
                                <ComboOptions data={listaRepresentacionGrafica.result} valorkey="id" valornombre="valortexto"/>
                                : "Cargando..."}
                            </Select>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <label className="control-label">
                                Sistema de Referencia de Coordenadas (EPSG):
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Select value={valPoligono.sistcoordenadasvectorid || ""}
                                onChange={handleInputChange}
                                name={"sistcoordenadasvectorid"}>
                                {listaSistemaCoordenadas.result?
                                <ComboOptions data={listaSistemaCoordenadas.result} valorkey="id" valornombre="valortexto"/>
                                : "Cargando..."}
                            </Select>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <label className="control-label">
                                Control Topológico:
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Select value={valPoligono.controltopologico || ""}
                                onChange={handleInputChange}
                                name={"controltopologico"}>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </Select>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <label className="control-label">
                                Método de Generación de La Geoinformación:
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Select value={valPoligono.metodogeneracionid || ""}
                                onChange={handleInputChange}
                                name={"metodogeneracionid"}>
                                {listaMetGeneraInfo.result?
                                <ComboOptions data={listaMetGeneraInfo.result} valorkey="id" valornombre="valortexto"/>
                                : "Cargando..."}
                            </Select>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <label className="control-label">
                                Fecha de La Geoinformación:
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Input value={valPoligono.fechavector || ""} onChange={handleInputChange}
                                name={"fechavector"}
                                type={"date"}>
                            </Input>
                        </div>
                        <legend className="mtop-25 mbot-10">Ráster</legend>
                        <div className="mleft-5">
                            <label className="control-label">
                                Tipo:
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Select value={valPoligono.tiporasterid || ""}
                                onChange={handleInputChange}
                                name={"tiporasterid"}>
                                {listaTipoRaster.result?
                                <ComboOptions data={listaTipoRaster.result} valorkey="id" valornombre="valortexto"/>
                                : "Cargando..."}
                            </Select>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <label className="control-label">
                                Sistema de Referencia de Coordenadas (EPSG):
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Select value={valPoligono.sistcoordenadasrasterid || ""}
                                onChange={handleInputChange}
                                name={"sistcoordenadasrasterid"}>
                                {listaSistemaCoordenadas.result?
                                <ComboOptions data={listaSistemaCoordenadas.result} valorkey="id" valornombre="valortexto"/>
                                : "Cargando..."}
                            </Select>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <label className="control-label">
                                Resolución Espacial de La Geoinformación (cm/m): (e.g. 1.25cm)
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Input required={true} value={valPoligono.resolucionespacial || ""} onChange={handleInputChange}
                                name={"resolucionespacial"} placeholder={"Ingrese la resolución o escala"}
                                pattern="(\d*).?(\d+)(m|cm)"
                                type={"text"}>
                            </Input>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <label className="control-label">
                                Fecha de La Geoinformación:
                            </label>
                        </div>
                        <div className="mleft-5 mtop-5">
                            <Input value={valPoligono.fecharaster || ""} onChange={handleInputChange}
                                name={"fecharaster"}
                                type={"date"}>
                            </Input>
                        </div>
                        <div className="mtop-10 col-lg-4">
                            <label className="control-label">
                                Informe Técnico:
                            </label>
                        </div>
                        <div className="mtop-10 col-lg-8">
                            <SingleUpload
                                key="urlinforme"
                                accept={'.*'}
                                folderSave={directorioPoligono}
                                form={valPoligono}
                                setForm={setValPoligono}
                                handleInputChange={procesarShape}
                                nameUpload={"urlinforme"}
                                    >
                            </SingleUpload>
                        </div>
                    </div>
                    
                </div>
                <FormFooter>
                    <Link to={`/gestionpredial-validalist/${id}`}
                        className="btn btn-default btn-sm btn-control">Cancelar</Link>
                    <button id="btnguardar" type="submit"
                            className="btn btn-danger btn-sm btn-control">Guardar
                    </button>
                </FormFooter>
            </Form>

    </Wraper>
    </>
    );
}

export default GestionPredialPoligono;