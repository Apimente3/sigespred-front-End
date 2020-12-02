import React, {useState, useEffect} from 'react';
import {ACTUALIZAR_SOLICITUD_BREADCRUM} from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import ComboOptions from "../../components/helpers/ComboOptions";
import MultipleUpload from "../../components/uploader/MultipleUpload";
import {
    Form,
    FormGroup,
    Row6,
    Row12,
    RowForm,
    Select,
    Input,
    FormFooter
} from "../../components/forms";

import {useForm} from "../../hooks/useForm"
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'

import {initAxiosInterceptors} from '../../config/axios';
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import Autocomplete from '../../components/helpers/Autocomplete';

const {$} = window;
const Axios = initAxiosInterceptors();
const directorioSolicitudes = "FilesDDP/solicitudextadmin";

async function getSolicitud(id) {
    const {data} = await Axios.get(`/solicitudentidad/${id}`);
    return data;
}

async function getRespuesta(id) {
    const {data} = await Axios.get(`/solicitudrecepcion?solicitudid=${id}`);
    return data;
}

async function saveRespuesta(id, body) {
    const {data} = await Axios.put(`/recepciondocumento/${id}`,body);
    return data;
}

async function addRespuesta(respuesta) {
    const {data} = await Axios.post(`/recepciondocumento`,respuesta);
    return data;
}

const SolicitudRespuesta = ({history, match}) => {
    const {id}=match.params;
    const [solicitud, setSolicitud] = useState({});
    const [respuesta, setRespuesta, handleInputChange, reset ] = useForm({},["nrodocrespuesta"]);

    const listaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const listaTipoConsulta = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOSOLICEXT]);
    const listaCanalEnvio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.SOLICCANALENVIO]);
    const listaTiposDocumento = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPODOCCONSULTA]);
    const listaEntidades = useAsync(helperGets.helperGetListaAutoEntidad, []);

    const [nuevaRecepcion, setNuevaRecepcion] = useState(true);

    useEffect(() => {
        const init = async () => {
            let solicitudExterna= await getSolicitud(id);
            setSolicitud(solicitudExterna);
            let solicitudRecepcion= await getRespuesta(id);
            if (solicitudRecepcion) {
                setNuevaRecepcion(false);
            }
            setRespuesta(solicitudRecepcion);
        };
        init();
    }, []);

    function setValorEntidad(identidad) {
     
    }
    const registrarrespuesta = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        try {
            if (nuevaRecepcion) {
                respuesta.solicitudid = id;
                await addRespuesta(respuesta);
                toastr.success(`La Respuesta de la solicitud: ${id}`, 'Se generó correctamente.', {position: 'top-center'});
            } else {
                await saveRespuesta(respuesta.id, respuesta);
                toastr.success(`La Respuesta de la solicitud: ${id}`, 'Se actualizó correctamente.', {position: 'top-center'});
            }
            history.push('/solicitud-list');
        }
        catch (e) {
            toastr.error('Se encontrarón errores al intentar realizar el registro de datos', JSON.stringify(e), {position: 'top-center'});
        }
        $('#btnguardar').button('reset');
    }

    return (
        <Wraper titleForm={"Edición de Solicitud: " + solicitud.nrooficio} listbreadcrumb={ACTUALIZAR_SOLICITUD_BREADCRUM}>
            <Form onSubmit={registrarrespuesta}>
                <RowForm>
                    <Row12 title={"Datos Generales de La Solicitud"}>
                        <Row6>
                            <FormGroup label={"Proyecto"}>
                                <Select value={solicitud.gestionpredialid || ""}
                                    readonly={true}
                                    name={"gestionpredialid"}>
                                    {listaProyectos.result?
                                    <ComboOptions data={listaProyectos.result} valorkey="id" valornombre="denominacion"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Tipo de Documento Remitido"} ayuda={"Tipo de documento utilizado para la solicitud"}>
                                <Select value={solicitud.tipodocumentoid || ""}
                                        readonly={true}
                                        name={"tipodocumentoid"}>
                                    {listaTiposDocumento.result?
                                    <ComboOptions data={listaTiposDocumento.result} valorkey="id" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Código STD"} ayuda={"Código de Sistema de Trámite Documentario"}>
                                <Input value={solicitud.codigostd || ""}
                                    name={"codigostd"}
                                    readonly={true}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Entidad"}>
                                {listaEntidades.result
                                ? <Autocomplete listaDatos={listaEntidades.result} callabck={setValorEntidad} valorinit={solicitud.entidadid} readOnly={true}/>
                                : "Cargando..."}
                            </FormGroup>
                            <FormGroup label={"Área u oficina"}>
                                <Input value={solicitud.oficinaentidad || ""}
                                    name={"oficinaentidad"}
                                    readonly={true}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Tipo de Consulta"}>
                                <Select value={solicitud.tipoconsultaid || ""}
                                    readonly={true}
                                    name={"tipoconsultaid"}>
                                    {listaTipoConsulta.result?
                                    <ComboOptions data={listaTipoConsulta.result} valorkey="id" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Número de Documento"}>
                                <Input value={solicitud.nrooficio || ""}
                                    name={"nrooficio"}
                                    readonly={true}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Código de Trámite de Expediente"}>
                                <Input value={solicitud.codigotramexp || ""}
                                    name={"codigotramexp"}
                                    readonly={true}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Fecha de Recepción en Entidad"} >
                                <Input value={solicitud.fecharecepcion || ""}
                                    name={"fecharecepcion"}
                                    readonly={true}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Canal de Envío"} >
                                <Select value={solicitud.canalenvio || ""}
                                    readonly={true}
                                    name={"canalenvio"}>
                                    {listaCanalEnvio.result?
                                    <ComboOptions data={listaCanalEnvio.result} valorkey="valorcodigo" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Descripción del Canal"}>
                                <Input value={solicitud.descripcionenvio || ""}
                                    name={"descripcionenvio"}
                                    readonly={true}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12 title={"Recepción de Respuesta de La Entidad"}>
                        <Row6>
                            <FormGroup label={"Fecha de Respuesta"} require={true}>
                                <Input required={true} value={respuesta.fecharespuesta || ""} onChange={handleInputChange}
                                    name={"fecharespuesta"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Observación"} >
                                <textarea id="observaciones" name="observaciones" value={respuesta.observaciones || ""} onChange={handleInputChange} className="textarea form-control" placeholder="Ingrese alguna observación o comentario"
                                style={{resize: 'none'}}
                                ></textarea>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Número de Documento de Respuesta"} require={true}>
                                <Input required={true} value={respuesta.nrodocrespuesta || ""} onChange={handleInputChange}
                                    name={"nrodocrespuesta"} placeholder={"Ingrese el número de documento"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12  title={"Archivos Recibidos"}>
                        <MultipleUpload
                        key="multiple"
                        accept={".*"}
                        folderSave={directorioSolicitudes}
                        form={respuesta}
                        setForm={setRespuesta}
                        nameUpload={"archivos"}
                        ></MultipleUpload>
                    </Row12>
                </RowForm>
                <FormFooter>
                    <Link to={`/solicitud-list`}
                          className="btn btn-default btn-sm btn-control">Cancelar</Link>
                    <button id="btnguardar" type="submit"
                            className="btn btn-danger btn-sm btn-control">Guardar
                    </button>
                </FormFooter>
            </Form>
        </Wraper>
    );
}

export default SolicitudRespuesta;