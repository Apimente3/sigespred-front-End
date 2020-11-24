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

async function getDatoReg(id) {
    const {data} = await Axios.get(`/predioreg/${id}`);
    return data;
}

async function saveDatoReg(id, body) {
    const {data} = await Axios.put(`/predioreg/${id}`,body);
    return data;
}

async function addDatoReg(respuesta) {
    const {data} = await Axios.post(`/predioreg`,respuesta);
    return data;
}

const PredioEditReg = ({history,  match}) => {
    const {id} = match.params;
    const {codpred}=match.params;
    // const dispatch = useDispatch();
    // const dataPredio = { predioid:id, codigopredio:codpred};
    // const setIdPredioAccion = (variable) => dispatch(actualizar(variable));
    // setIdPredioAccion(dataPredio);

    const [predioReg, setPredioReg, handleInputChange, reset ] = useForm({},["cuc"]);
    const [nuevoDatoReg, setNuevoDatoReg] = useState(true);

    useEffect(() => {
        const init = async () => {
            
            let datoRegistral= await getDatoReg(id);
            if (datoRegistral) {
                setNuevoDatoReg(false);
                setPredioReg(datoRegistral);
            }
        };
        init();
    }, []);


    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');

        try {
            if (nuevoDatoReg) {
                predioReg.id = id;
                await addDatoReg(predioReg);
                toastr.success(`Los datos registrales del predio: ${id}`, 'Se generarón correctamente.', {position: 'top-center'})
            } else {
                await saveDatoReg(predioReg.id, predioReg);
                toastr.success(`Los datos registrales del predio: ${id}`, 'Se actualizarón correctamente.', {position: 'top-center'})
            }
            //history.push('/solicitud-list');
        }
        catch (e) {
            toastr.error('Se encontrarón errores al intentar realizar el registro de datos registrales', JSON.stringify(e), {position: 'top-right'})
        }

        $('#btnguardar').button('reset');
    }

    return (
        <>
            <WraperLarge titleForm={"PREDIO: " + codpred + " / DATOS REGISTRALES"} listbreadcrumb={EDICION_PREDIOS_BREADCRUM} >
                <PredioLinks active="3"></PredioLinks>
                <Form onSubmit={registrar}>
                    <div className="mtop-35"></div>
                    <RowForm>
                        <Row6>
                            <FormGroup label={"Código de Referencia Catastral"}>
                                <Input value={predioReg.codcatastral || ""} onChange={handleInputChange}
                                    name={"codcatastral"} placeholder={"Ingrese el código de referencia catastral"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"CUC"}>
                                <Input value={predioReg.cuc || ""} onChange={handleInputChange}
                                    name={"cuc"} placeholder={"Ingrese el valor del CUC"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"¿Tiene Derecho Inscrito?"}>
                                <Select value={predioReg.inscrito || ""}
                                            onChange={handleInputChange}
                                            name={"inscrito"}>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                </Select>
                            </FormGroup>
                        </Row6>
                        <div className="col-lg-12">
                            <fieldset className="mleft-20"><legend>Datos y Documentos de Inscripción</legend>
                                <Row6>{predioReg.inscrito}
                                    <FormGroup label={"Fecha de Inscripción"} >
                                        <Input value={predioReg.fechainscripcion || ""} onChange={handleInputChange}
                                            name={"fechainscripcion"}
                                            type={"date"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <label className="col-lg-4 control-label">Área Inscrita - m<sup>2</sup></label>
                                    <div className="col-lg-8">
                                        <Input value={predioReg.areainscrita || ""} onChange={handleInputChange}
                                            name={"areainscrita"} placeholder={"Ingrese el valor de área inscrita"}
                                            pattern="^\d{1,10}(\.\d{1,4})?$"
                                            type={"text"}>
                                        </Input>
                                    </div>
                                </Row6>
                            </fieldset>
                        </div>
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

export default PredioEditReg;