import React, {useState, useEffect, useRef, createContext, useContext,useCallback} from 'react';
import {ACTUALIZAR_SOLICITUD_BREADCRUM} from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import ComboOptions from "../../components/helpers/ComboOptions";
import Autocomplete from '../../components/helpers/Autocomplete';
import SingleUpload from "../../components/uploader/SingleUpload";
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
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'

import {initAxiosInterceptors, serverFile} from '../../config/axios';
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";

const Axios = initAxiosInterceptors();
const directorioSolicitudes = "solicitudextadmin";

async function getSolicitud(id) {
    const {data} = await Axios.get(`/solicitudentidad/${id}`);
    return data;
}

async function saveSolicitud(id, body) {
    const {data} = await Axios.put(`/solicitudentidad/${id}`,body);
    return data;
}

const SolicitudEdit = ({history, match}) => {
    const {id}=match.params;
    const [solicitud, setSolicitud, handleInputChange, reset ] = useForm({},["nrooficio"]);

    const listaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const listaTipoConsulta = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOSOLICEXT]);
    const listaResponsables = useAsync(helperGets.helperGetListaLocadores, []);
    const listaCanalEnvio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.SOLICCANALENVIO]);
    const listaTipoEntidades = useAsync(helperGets.helperGetListTipoEntidades, []);

    const [listaTramos, setListaTramos] = useState(null);
    const [listaEquipos, setListaEquipos] = useState(null);
    const [listaEntidades, setListaEntidades] = useState(null);

    useEffect(() => {
        const init = async () => {
            let solicitudExterna= await getSolicitud(id);
           setSolicitud(solicitudExterna)
           cargarChildrenProyecto(solicitudExterna.gestionpredialid);
           cargarEntidades(solicitudExterna.tipoentidadid);
        };
        init();
    }, []);
    
    const cargarChildrenProyecto = async(idProyecto) => {
        if (idProyecto) {
            let dataTramos = await helperGets.helperGetListTramos(idProyecto);
            let dataEquipos = await helperGets.helperGetListEquipos(idProyecto);
            setListaTramos(dataTramos);
            setListaEquipos(dataEquipos);
        } else {
            setListaTramos(null);
            setListaEquipos(null);
        }
    }

    const cargarEntidades = async(idTipoEntidad) => {
        if (idTipoEntidad) {
            let data = await helperGets.helperGetListEntidades(idTipoEntidad);
            setListaEntidades(data);
        } else {
            setListaEntidades(null);
        }
    }

    function setResponsable(idLocador) {
        setSolicitud({
            ...solicitud,
            responsableid: idLocador
        });
    }

    const handleFiltrarChildrenProyecto = async(e) => {
        cargarChildrenProyecto(e.target.value);
    }

    const handleFiltrarChildrenTipoEntidad = async(e) => {
        cargarEntidades(e.target.value);
    }

    const actualizar = async e => {
        e.preventDefault();
        try {
            await saveSolicitud(id, solicitud)
            toastr.success(`Actualización de la solicitud: ${id}`, 'Se actualizó correctamente.', {position: 'top-right'})
            history.push('/solicitud-list');
        }
        catch (e) {
            toastr.error('Se encontrarón errores al intentar actualizar', JSON.stringify(e), {position: 'top-right'})
        }
    }

    return (
        <Wraper titleForm={"Edición de Solicitud: " + solicitud.nrooficio} listbreadcrumb={ACTUALIZAR_SOLICITUD_BREADCRUM}>
            <Form onSubmit={actualizar}>
                <RowForm>
                    <Row12 title={"Datos Generales"}>
                        <Row6>
                            <FormGroup label={"Proyecto"} require={true}>
                                <Select required={true} value={solicitud.gestionpredialid || ""}
                                        onChange={handleFiltrarChildrenProyecto}
                                        name={"gestionpredialid"}>
                                    {listaProyectos.result?
                                    <ComboOptions data={listaProyectos.result} valorkey="id" valornombre="denominacion"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Tramo"}>
                                <Select value={solicitud.tramoid || ""}
                                        onChange={handleInputChange}
                                        name={"tramoid"}>
                                    <ComboOptions data={listaTramos} valorkey="id" valornombre="descripcion" />
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Subtramo"}>
                                <Input value={solicitud.subtramo || ""} onChange={handleInputChange}
                                    name={"subtramo"} placeholder={"Ingrese el subtramo"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Tipo de Consulta"} require={true}>
                                <Select required={true} value={solicitud.tipoconsultaid || ""}
                                        onChange={handleInputChange}
                                        name={"tipoconsultaid"}>
                                    {listaTipoConsulta.result?
                                    <ComboOptions data={listaTipoConsulta.result} valorkey="id" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Equipo"}>
                                <Select value={solicitud.equipoid || ""}
                                        onChange={handleInputChange}
                                        name={"equipoid"}>
                                    <ComboOptions data={listaEquipos} valorkey="id" valornombre="equipo" />
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Profesional Responsable"}>
                                {listaResponsables.result
                                ? <Autocomplete listaDatos={listaResponsables.result} callabck={setResponsable} />
                                : "Cargando..."}
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12 title={"Datos de Envío"}>
                        <Row6>
                            <FormGroup label={"Código STD"} require={true} ayuda={"Código de Sistema de Trámite Documentario"}>
                                <Input required={true} value={solicitud.codigostd || ""} onChange={handleInputChange}
                                    name={"codigostd"} placeholder={"Ingrese el código STD"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Fecha de Elaboración de Oficio"} >
                                <Input value={solicitud.fechaelaboficio || ""} onChange={handleInputChange}
                                    name={"fechaelaboficio"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Número de Oficio"} require={true}>
                                <Input required={true} value={solicitud.nrooficio || ""} onChange={handleInputChange}
                                    name={"nrooficio"} placeholder={"Ingrese el número de oficio"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Digital de Documento Enviado"}>
                                <SingleUpload
                                        key="urlarcoficio"
                                        accept={'.*'}
                                        folderSave={directorioSolicitudes}
                                        form={solicitud}
                                        setForm={setSolicitud}
                                        nameUpload={"urlarcoficio"}
                                            >
                                    </SingleUpload>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12>
                        <Row6>
                            <FormGroup label={"Tipo de Entidad"} require={true}>
                                <Select required={true} value={solicitud.tipoentidadid || ""}
                                        onChange={(e) => {handleFiltrarChildrenTipoEntidad(e); handleInputChange(e);}}
                                        name={"tipoentidadid"}>
                                    {listaTipoEntidades.result?
                                    <ComboOptions data={listaTipoEntidades.result} valorkey="id" valornombre="nombre"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Entidad"} require={true}>
                                <Select required={true} value={solicitud.entidadid || ""}
                                        onChange={handleInputChange}
                                        name={"entidadid"}>
                                    <ComboOptions data={listaEntidades} valorkey="id" valornombre="nombre" />
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Área u oficina"} require={true}>
                                <Input required={true} value={solicitud.oficinaentidad || ""} onChange={handleInputChange}
                                    name={"oficinaentidad"} placeholder={"Ingrese el área u oficina"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Sede"}>
                                <Input value={solicitud.sedeentidad || ""} onChange={handleInputChange}
                                    name={"sedeentidad"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Código de Trámite de Expediente"}>
                                <Input value={solicitud.codigotramexp || ""} onChange={handleInputChange}
                                    name={"codigotramexp"} placeholder={"Ingrese el código de trámite"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Fecha de Recepción en Entidad"} >
                                <Input value={solicitud.fecharecepcion || ""} onChange={handleInputChange}
                                    name={"fecharecepcion"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Canal de Envío"} >
                                <Select value={solicitud.canalenvio || ""}
                                        onChange={handleInputChange}
                                        name={"canalenvio"}>
                                    {listaCanalEnvio.result?
                                    <ComboOptions data={listaCanalEnvio.result} valorkey="valorcodigo" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Descripción del Canal"}>
                                <Input value={solicitud.descripcionenvio || ""} onChange={handleInputChange}
                                    name={"descripcionenvio"} placeholder={"Ingrese la descripción del canal"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12>
                        <Row6>
                            <FormGroup label={"Contacto"}>
                                <Input value={solicitud.contacto || ""} onChange={handleInputChange}
                                    name={"contacto"} placeholder={"Ingrese la persona de contacto en la entidad"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Observaciones"}>
                                <Input value={solicitud.observacion || ""} onChange={handleInputChange}
                                    name={"observacion"} placeholder={"Ingrese alguna observación o comentario"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
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

export default SolicitudEdit;