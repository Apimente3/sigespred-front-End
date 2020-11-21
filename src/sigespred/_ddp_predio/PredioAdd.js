import React, {useState} from "react";
import {initAxiosInterceptors} from '../../config/axios';
import { REGISTRO_PREDIOS_BREADCRUM } from "../../config/breadcrums";
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

const {$} = window;
const Axios = initAxiosInterceptors();

const PredioAdd = ({history,  match}) => {
    const [predio, setPredio, handleInputChange, reset ] = useForm({},["tramo"]);
    const listaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const listaTipoPredio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOPRED]);
    const [listaTramos, setListaTramos] = useState(null);

    async function addPredio(predio) {
        const {data} = await Axios.post(`/predio`,predio);
        return data;
    }

    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');

        try {
            let predioResult = await addPredio(predio);
            toastr.success('Registro de Predio', `Se generó el predio con código ${predioResult.codigopredio}.`);
            history.push('/predio-list');
        }
        catch (e) {
            toastr.error('Registro de Predio', "Se encontró un error: " +  e.message);
        }
        $('#btnguardar').button('reset');
    }

    const handleFiltrarChildrenProyecto = async(e) => {
        cargarChildrenProyecto(e.target.value);
    }

    const cargarChildrenProyecto = async(idProyecto) => {
        if (idProyecto) {
            let dataTramos = await helperGets.helperGetListTramos(idProyecto);
            setListaTramos(dataTramos);
        } else {
            setListaTramos(null);
        }
    }

    
  return (
    <>
        <WraperLarge titleForm={"Registro de Predio (Generación de Código)"} listbreadcrumb={REGISTRO_PREDIOS_BREADCRUM} >
                <div className="row mleft-5">
                    <div className="form-group col-lg-4 mleft-5">
                        <Form onSubmit={registrar}>
                            <div>
                                <label className="control-label">
                                    <span className="obligatorio">* </span> Proyecto:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select required={true} value={predio.gestionpredialid || ""}
                                            onChange={(e) => {handleFiltrarChildrenProyecto(e); handleInputChange(e);}}
                                        name={"gestionpredialid"}>
                                    {listaProyectos.result?
                                    <ComboOptions data={listaProyectos.result} valorkey="id" valornombre="denominacion"/>
                                    : "Cargando..."}
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                    Sector / Tramo:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select value={predio.tramoid || ""}
                                        onChange={handleInputChange}
                                        name={"tramoid"}>
                                    <ComboOptions data={listaTramos} valorkey="id" valornombre="descripcion" />
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                    Sub-sector / Sub-tramo:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Input value={predio.subtramo || ""} onChange={handleInputChange}
                                        name={"subtramo"} placeholder={"Ingrese el sub-sector o sub-tramo"}
                                        type={"text"}>
                                </Input>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                <span className="obligatorio">* </span> Tipo de Predio:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select required={true} value={predio.tipopredioid || ""}
                                            onChange={handleInputChange}
                                        name={"tipopredioid"}>
                                    {listaTipoPredio.result?
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                Archivo con Geometria del Predio:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <SingleUpload
                                            key="archivopredio"
                                            accept={'.*'}
                                            folderSave={FilesGestionPredial.FilesPredios}
                                            form={predio}
                                            setForm={setPredio}
                                            nameUpload={"archivopredio"}
                                                >
                                </SingleUpload>
                            </div>
                            <div className="mtop-35">
                                <Link to={`/predio-list`}
                                className="btn btn-default btn-sm btn-control">Cancelar</Link>
                                <button id="btnguardar" 
                                        className="btn btn-danger btn-sm btn-control">Guardar
                                </button>
                            </div>
                        </Form>
                    </div>
                    <div className="col-lg-8 mright-5">
                        <MapRegistroPredio></MapRegistroPredio>
                    </div>
                </div>
        </WraperLarge>
    </>
  );
};

export default PredioAdd;