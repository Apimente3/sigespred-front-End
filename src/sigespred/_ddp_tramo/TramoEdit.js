import React, {useEffect, useState,createContext} from 'react';
import {Link} from "react-router-dom";
import { useAsync } from "react-async-hook";
import Wraper from "../m000_common/formContent/WraperLarge";
import {REGISTRO_TRAMOS_BREADCRUM} from "../../config/breadcrums";
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
const directorioTramos = "FilesDDP/tramosadmin";

async function getTramo(id) {
    const {data} = await Axios.get(`/tramo/${id}`);
    return data;
}

async function addTramo(tramo) {
    const {data} = await Axios.post(`/tramo`,tramo);
    return data;
}

async function saveTramo(id, body) {
    const {data} = await Axios.put(`/tramo/${id}`,body);
    return data;
}

const TramoEdit = ({history, match}) => {
    const {id}=match.params;
    const {ti}=match.params;
    const {idtramo}=match.params;
    const [tramo, setTramo, handleInputChange, reset ] = useForm({},[""]);
    const [nuevoTramo, setNuevoTramo] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (idtramo) {
                setNuevoTramo(false);
                let tramoEdit= await getTramo(idtramo);
                setTramo(tramoEdit);
            }
        };
        init();
    }, []);


    const registrar = async e => {
        e.preventDefault();

        tramo.gestionpredialid = id;
        console.log(tramo);
         $('#btnguardar').button('loading');
         try {
            if (nuevoTramo) {
                let resultTramo = await addTramo(tramo);
                $('#btnguardar').button('reset');
                toastr.success('Registro de Tramo', `El tramo fue registrado correctamente.`);

            } else {
                await saveTramo(tramo.id, tramo);
                toastr.success(`El Tramo con ID: ${tramo.id}`, 'Se actualizó correctamente.', {position: 'top-right'})
            }
            history.push(`/tramo-list/${id}`);
        }
        catch (e) {
            toastr.error('Registro de Tramo', "Se encontró un error: " +  e.message);
            $('#btnguardar').button('reset');
        }
    }


    return (
        <>
        <Wraper titleForm={"Gestión Predial - Tramo"} listbreadcrumb={REGISTRO_TRAMOS_BREADCRUM}>
            <legend className="mleft-20">TRAMOS: {ti}</legend>
            <Form onSubmit={registrar}>
                <RowForm>
                    <Row6>
                        <FormGroup label={"Descripción"} require={true}>
                            <Input value={tramo.descripcion || ""} onChange={handleInputChange}
                                name={"descripcion"} placeholder={"Ingrese la descripción"}
                                required={true} type={"text"}>
                            </Input>
                        </FormGroup>
                    </Row6>
                    <Row6>
                        <FormGroup label={"Archivo de Ámbito del Tramo o Sector"}>
                            <SingleUpload
                                    key="urlarchivo"
                                    accept={'.*'}
                                    folderSave={directorioTramos}
                                    form={tramo}
                                    setForm={setTramo}
                                    nameUpload={"urlarchivo"}
                                        >
                                </SingleUpload>
                        </FormGroup>
                    </Row6>
                </RowForm>

                <FormFooter>
                    <Link to={`/tramo-list/${id}`}
                        className="btn btn-default btn-sm btn-control">Cancelar</Link>
                    <button id="btnguardar" type="submit"
                            className="btn btn-danger btn-sm btn-control">Guardar
                    </button>
                </FormFooter>
            </Form>
        </Wraper>
        </>
    )
}

export default TramoEdit;