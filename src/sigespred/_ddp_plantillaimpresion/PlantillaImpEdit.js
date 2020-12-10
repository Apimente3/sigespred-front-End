import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { useAsync } from "react-async-hook";
import Wraper from "../m000_common/formContent/WraperLarge";
import {EDICION_PLANTILLAIMP_BREADCRUM} from "../../config/breadcrums";
import {initAxiosInterceptors} from '../../config/axios';
import {toastr} from 'react-redux-toastr';
import {
    Form,
    FormGroup,
    Row6,
    RowForm,
    Select,
    Input,
    FormFooter
} from "../../components/forms";
import {useForm} from "../../hooks/useForm"
import ComboOptions from "../../components/helpers/ComboOptions";
import SingleUpload from "../../components/uploader/SingleUpload";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";

const Axios = initAxiosInterceptors();
const {$} = window;

async function getPlantillaImpresion(id) {
    const {data} = await Axios.get(`/plantillaimpresion/${id}`);
    return data;
}

async function addPlantillaImpresion(plantilla) {
    const {data} = await Axios.post(`/plantillaimpresion`,plantilla);
    return data;
}

async function savePlantillaImpresion(id, body) {
    const {data} = await Axios.put(`/plantillaimpresion/${id}`,body);
    return data;
}

const PlantillaImpresionEdit = ({history, match}) => {
    const {id}=match.params;
    const [plantillaImpresion, setPlantillaImpresion, handleInputChange, reset ] = useForm({},["nombre"]);
    const [nuevoPlantillaImpresion, setNuevoPlantillaImpresion] = useState(true);
    const [valorTexto, setValorTexto] = useState('');
    const listaTipoPlantilla = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.LISTATIPOPRINTTEMP]);

    useEffect(() => {
        const init = async () => {
            console.log(id);
            if (id) {
                try{
                setNuevoPlantillaImpresion(false);
                let PlantillaImpresionEdit= await getPlantillaImpresion(id);
                setPlantillaImpresion(PlantillaImpresionEdit);
                } catch(e){
                    toastr.error('Editar Plantilla', "Se encontró un error: " +  e);
                    history.push(`/printtemp-list`)
                }
            }
        };
        init();
    }, []);

    const handleSetValorTexto = (e) => {
        if (e.target.value) {
            setValorTexto(e.target.options[e.target.selectedIndex].text);
            return;
        }
        setValorTexto('');
    }

    const registrar = async e => {
        e.preventDefault();

         $('#btnguardar').button('loading');
         plantillaImpresion.nombrearchivo = plantillaImpresion.rutaarchivo.filename;
         plantillaImpresion.tipomodulovalor = valorTexto;
         try {
            if (nuevoPlantillaImpresion) {
                await addPlantillaImpresion(plantillaImpresion);
                $('#btnguardar').button('reset');
                toastr.success('Registro de Plantillas de Impresión', `La Plantilla de Impresión fue registrado correctamente.`);

            } else {
                await savePlantillaImpresion(plantillaImpresion.id, plantillaImpresion);
                toastr.success(`La Plantilla de Impresión con ID: ${plantillaImpresion.id}`, 'Se actualizó correctamente.', {position: 'top-right'})
            }
            history.push(`/printtemp-list`);
        }
        catch (e) {
            toastr.error('Registro de PlantillaImpresion', "Se encontró un error: " +  e.message);
            $('#btnguardar').button('reset');
        }
    }

    return (
        <>
        <Wraper titleForm={"Plantilla de Impresion"} listbreadcrumb={EDICION_PLANTILLAIMP_BREADCRUM}>
            <legend className="mleft-20">Datos Generales</legend>
            <Form onSubmit={registrar}>
                <RowForm>
                    <Row6>
                        <FormGroup label={"Nombre de La Plantilla"} require={true}>
                            <Input value={plantillaImpresion.nombre || ""} onChange={handleInputChange}
                                name={"nombre"} placeholder={"Ingrese la descripción"}
                                required={true} type={"text"}>
                            </Input>
                        </FormGroup>
                        <FormGroup label={"Módulo Asociado a La Plantilla"} require={true}>
                                        <Select value={plantillaImpresion.tipomodulo || ""}
                                                onChange={(e) => {handleSetValorTexto(e); handleInputChange(e);}}
                                                required="true"
                                                    name={"tipomodulo"}>
                                            {listaTipoPlantilla.result?
                                            <ComboOptions data={listaTipoPlantilla.result} valorkey="id" valornombre="valortexto"/>
                                            : "Cargando..."}
                                        </Select>
                                    </FormGroup>
                        <FormGroup label={"Archivo .docx a ser usado como plantilla"} require={true}>
                            <SingleUpload
                                    key="rutaarchivo"
                                    accept={'.docx'}
                                    folderSave={PARAMS.FilesPlantillaImpresion}
                                    form={plantillaImpresion}
                                    setForm={setPlantillaImpresion}
                                    nameUpload={"rutaarchivo"}
                                        >
                                </SingleUpload>
                        </FormGroup>
                        <FormGroup label={"¿Plantilla Activa?"} require={true}>
                                <Select value={('activo' in plantillaImpresion) ? plantillaImpresion.activo : ""}
                                            onChange={handleInputChange} required={true}
                                            name={"activo"}>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                </Select>
                            </FormGroup>
                    </Row6>
                    <Row6>
                        
                    </Row6>
                </RowForm>
                <FormFooter>
                    <Row6>
                        <Link to={`/printtemp-list`}
                            className="btn btn-default btn-sm btn-control">Cancelar</Link>
                        <button id="btnguardar" type="submit"
                                className="btn btn-danger btn-sm btn-control">Guardar
                        </button>
                    </Row6>
                </FormFooter>
            </Form>
        </Wraper>
        </>
    )
}

export default PlantillaImpresionEdit;