import React, {useState, useEffect, useRef} from 'react';
import {REGISTRO_INDICADERES_BREADCRUM as breadcrum} from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
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
    TextArea,
    FormFooter
} from "../../components/forms";

import SingleUpload from "../../components/uploader/SingleUpload";
import MultipleUpload from "../../components/uploader/MultipleUpload";

import {useForm} from "../../hooks/useForm"
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import {FilesIndicador} from "../../config/parameters";
import {initAxiosInterceptors, serverFile} from '../../config/axios';
import FormGroupInline from "../../components/forms/FormGroupInline";

const Axios = initAxiosInterceptors();

const {$} = window;

/*Listar tipo de infraestrucra*/
async function getListTipoIndicadores() {
    const {data} = await Axios.get(`/categoriaindicador`);
    return data;
}

/*Guardar*/
async function saveIndicador(body) {
    const {data} = await Axios.post(`/indicador`,body);
    return data;
}





const IndicadorAdd = ({history}) => {

    /*Es necesario inicializar los valores por defecto */
    const [indicador, setIndicador,handleInputChange, reset ] = useForm({}, ['denominacion','descripcion']);
    const [listTipoIndicador, setListTipoIndicador] = useState([]);

    /*Files multiple */
    const [filesstate, setFilesstate] = useState([]);

    /*Valiables Globales*/
    useEffect(() => {
        const init = async () => {
            setListTipoIndicador(await getListTipoIndicadores());
        };
        init();
    }, []);

    const registrar = async e => {
        e.preventDefault();
        try {
            await saveIndicador(indicador)
            toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'});
            history.push('/indicadores');
        }
        catch (e) {

            toastr.error('Registro Incorrecto', e.response.data, {position: 'top-center'})
        }
    }




    return (
        <Wraper titleForm={"Registro de Gestion Predial"} listbreadcrumb={breadcrum}>
            <Form onSubmit={registrar}>
                <RowForm>

                    <Row12 title={"Datos Indicador"}>
                        <FormGroup withLabel={3} label={"Categoria de Indicador"} require={true}>
                            <Select required={true} value={indicador.categoriaindicadorid} onChange={handleInputChange}
                                    name={"categoriaindicadorid"}>
                                <Options options={listTipoIndicador} index={"id"}
                                         valor={"denominacion"}></Options>
                            </Select>
                        </FormGroup>
                        <FormGroup withLabel={3}  label={"Denominación"} require={true} ayuda={"Ingrese la denominación"}>
                            <Input required={true} value={indicador.denominacion} onChange={handleInputChange}
                                   name={"denominacion"} placeholder={"Ingrese la denominación"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>
                        <FormGroup withLabel={3}  label={"Descripción"} require={true} ayuda={"Ingrese la descripcion del Indicador correcto y legible"}>
                            <TextArea required={true} value={indicador.descripcion} onChange={handleInputChange}
                                   name={"descripcion"} placeholder={"Ingrese la descripción"}
                                   type={"text"}>
                            </TextArea>
                        </FormGroup>
                        <FormGroup withLabel={3}  label={"URL"} require={true} ayuda={"Direccion de Power BI publicado"}>
                            <Input required={true} value={indicador.urlpbi} onChange={handleInputChange}
                                   name={"urlpbi"} placeholder={"Ingrese la URL PBI"}
                                   type={"URL"}>
                            </Input>
                        </FormGroup>
                        <FormGroup withLabel={3}  label={"Archivo del PBI"} require={true}
                                   ayuda={"Archivo del Power BI generalmente .pbi"}>
                            <SingleUpload
                                key="archivopbi"
                                accept={'.*'}
                                folderSave={FilesIndicador.FilesIndicadores}
                                form={indicador}
                                setForm={setIndicador}
                                nameUpload={"archivopbi"}
                            >
                            </SingleUpload>
                        </FormGroup>
                        <FormGroup withLabel={3}  label={"Archivo del documento"} require={false}
                                   ayuda={"Archivo del documento de preferencia en PDF."}>
                            <SingleUpload
                                key="archivo"
                                accept={'.*'}
                                folderSave={FilesIndicador.FilesIndicadores}
                                form={indicador}
                                setForm={setIndicador}
                                nameUpload={"archivo"}
                            >
                            </SingleUpload>
                        </FormGroup>
                        <FormGroup withLabel={3}  label={"Vistas"} require={false} ayuda={"Ingrese vistas y delimite en ','"}>
                            <Input required={true} value={indicador.vistas} onChange={handleInputChange}
                                   name={"vistas"} placeholder={"Ingrese la vitas ejemplo vista1, vista2"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>

                    </Row12>
                </RowForm>

                <FormFooter>
                    <Link to={`/indicador`}
                          className="btn btn-default btn-sm btn-control">Cancelar</Link>
                    <button id="btnguardar" type="submit"
                            className="btn btn-danger btn-sm btn-control">Guardar
                    </button>
                </FormFooter>
            </Form>
        </Wraper>
    );

}


export default IndicadorAdd;
