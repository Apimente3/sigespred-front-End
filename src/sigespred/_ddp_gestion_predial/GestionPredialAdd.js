import React, {useState, useEffect, useRef} from 'react';
import {REGISTRO_GESTIONPREDIAL_BREADCRUM} from "../../config/breadcrums";

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
    FormFooter
} from "../../components/forms";

import SingleUpload from "../../components/uploader/SingleUpload";
import MultipleUpload from "../../components/uploader/MultipleUpload";

import {useForm} from "../../hooks/useForm"
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import {FilesGestionPredial} from "../../config/parameters";
import {initAxiosInterceptors, serverFile} from '../../config/axios';
import FormGroupInline from "../../components/forms/FormGroupInline";

const Axios = initAxiosInterceptors();

const {$} = window;


/*Listar tipo de infraestrucra*/
async function getListTipoInfraestructura() {
    const {data} = await Axios.get(`/tipoinfraestructura`);
    return data;
}

let listInfraestructuraGlobal = [];

/*Listar tipo de infraestrucra*/
async function getListInfraestructura() {
    const {data} = await Axios.get(`/infraestructura`);
    listInfraestructuraGlobal = data;
    return data;
}



/*Guardar tipo de infraestrucra*/
async function saveGestioPredial(body) {
    const {data} = await Axios.post(`/gestionpredial`,body);
    return data;
}


const GestionPredialAdd = ({history}) => {

    /*Es necesario inicializar los valores por defecto */
    const [gestionPredial, setGestionPredial,handleInputChange, reset ] = useForm({}, ['resoministerial','abreviatura']);
    const [listTipoInfraestructura, setlistTipoInfraestructura] = useState([]);
    const [listInfraestructura, setlistInfraestructura] = useState([]);
    const [valorDenominacion, setValorDenominacion] = useState("");
    /*Files multiple */
    const [filesstate, setFilesstate] = useState([]);

    /*Valiables Globales*/
    useEffect(() => {
        const init = async () => {
            setlistTipoInfraestructura(await getListTipoInfraestructura());
            listInfraestructuraGlobal = await getListInfraestructura()
            setlistInfraestructura(listInfraestructuraGlobal);
            //setGestionPredial({...gestionPredial,archivos:[{id:"1",path:"asdasd",}]})
        };
        init();
    }, []);

    const updateValueDenominacion = async(e) => {
        if (e.target.value) {
            setValorDenominacion(e.target.options[e.target.selectedIndex].text);
            return;
        }
        setValorDenominacion("");
    }

    const registrar = async e => {
        e.preventDefault();
        gestionPredial.denominacion = valorDenominacion;
        try {
            await saveGestioPredial(gestionPredial)
            toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'});
            history.push('/gestionpredial');
        }
        catch (e) {
            toastr.error('Registro Incorrecto', JSON.stringify(e), {position: 'top-right'})
        }
    }

    /*Permite Filtrar la infraestructura en relacion a una tipo de infraestrucutra*/
    const FiltrarInfraestructura = (e) => {

        let value = parseInt(e.target.value)
        let listInfraes = listInfraestructuraGlobal.filter(row => {
            return parseInt(row.tipoinfraestructuraid) == value;
        });
        setlistInfraestructura(listInfraes);
    }

    /*Permite agregar un file multiple*/
    const setFiles = (newListFiles) => {
        setGestionPredial({...gestionPredial,archivos: newListFiles})
    }

    /*Permite agregar un file multiple*/
    const setFilesArchivodigital = (path) => {
        setGestionPredial({...gestionPredial, archivodigital: path});
    }

    /*Permite agregar un file multiple*/
    const deleteFilesArchivodigital = () => {
        setGestionPredial({...gestionPredial, archivodigital: null});
    }

    /*Permite eliminar  un file multiple*/
    const removeFiles = (id) => {
        setFilesstate(
            filesstate.filter(file => file.id !== id)
        )
    }

    return (
        <Wraper titleForm={"Registro de Gestion Predial"} listbreadcrumb={REGISTRO_GESTIONPREDIAL_BREADCRUM}>
            <Form onSubmit={registrar}>
                <RowForm>
                    <Row6 title={"Datos de la Gestión Predial"}>
                        <FormGroup label={"Tipo Infraestructura "} require={true}>
                            <Select required={true} value={gestionPredial.tipoinfraestructuraid}
                                    onChange={FiltrarInfraestructura}
                                    name={"tipoinfraestructuraid"}>
                                <Options options={listTipoInfraestructura} index={"id"}
                                         valor={"denominacion"}></Options>
                            </Select>

                        </FormGroup>
                        <FormGroup label={"Proyecto"} require={true}>
                            <Select required={true} value={gestionPredial.infraestructuraid}
                                    onChange={(e) => {updateValueDenominacion(e); handleInputChange(e);}}
                                    name={"infraestructuraid"}>
                                <Options options={listInfraestructura} index={"id"} valor={"descripcion"}></Options>
                            </Select>
                        </FormGroup>

                        <FormGroup label={"Abreviatura"} require={true} ayuda={"Esta abreviatura será utilizada para la generacion de planos"}>
                            <Input required={true} value={gestionPredial.abreviatura} onChange={handleInputChange}
                                   name={"abreviatura"} placeholder={"Ingrese la abreviatura del proyecto"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>

                        <FormGroup label={"Resolucion Ministerial"} require={true} ayuda={"Ingrese el nro de RM"}>
                            <Input required={true} value={gestionPredial.resoministerial} onChange={handleInputChange}
                                   name={"resoministerial"} placeholder={"Ingrese el nro de RM"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>

                        <FormGroup label={"Fecha Resolucion Ministerial"} require={true}
                                   ayuda={"Fecha de la RM de publicación"}>
                            <Input required={true} value={gestionPredial.fechresoministerial}
                                   onChange={handleInputChange}
                                   name={"fechresoministerial"} placeholder={"Ingrese la fecha RM"}
                                   type={"date"}>
                            </Input>
                        </FormGroup>

                    </Row6>
                    <Row6 title={"Datos del documento de inicio de la Gestión Predial"}>
                        <FormGroup label={"Tipo de documento "} require={true}>
                            <Select required={true} value={gestionPredial.tipodocumentoid} onChange={handleInputChange}
                                    name={"tipodocumentoid"}>
                                <Options options={[{id: 1, value: "MEMORANDUM"}, {id: 2, value: "CORREO"}]} index={"id"}
                                         valor={"value"}></Options>
                            </Select>
                        </FormGroup>
                        <FormGroup label={"Nro de documento"} require={true} ayuda={"Ingrese el nro de documento"}>
                            <Input required={true} value={gestionPredial.nrodocumento} onChange={handleInputChange}
                                   name={"nrodocumento"} placeholder={"Ingrese la nro de documento"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>
                        <FormGroup label={"Archivo del documento"} require={true}
                                   ayuda={"Archivo del documento de preferencia en PDF."}>
                            <SingleUpload
                                key="upload_portada_imagen"
                                accept={'.*'}
                                folderSave={FilesGestionPredial.FilesSolicitud}
                                form={gestionPredial}
                                setForm={setGestionPredial}
                                nameUpload={"archivodigital"}
                                       >
                            </SingleUpload>
                        </FormGroup>
                        <FormGroup label={"Fecha de documento"} require={true} >
                            <Input required={true} value={gestionPredial.fechadocumento} onChange={handleInputChange}
                                   name={"fechadocumento"} placeholder={"Ingrese la denominacion de Proyecto"}
                                   type={"date"}>
                            </Input>
                        </FormGroup>
                        <FormGroup label={"Asunto"} require={true} ayuda={"Asunto del documento de solicitud"}>
                            <Input required={true} value={gestionPredial.asunto} onChange={handleInputChange}
                                   name={"asunto"} placeholder={"Ingrese el asunto del documento"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>
                    </Row6>
                </RowForm>
                <RowForm>
                    <Row6 title={"Archivos adjuntos en el documento"}>
                        <FormGroupInline>
                            <MultipleUpload
                                key="multiple"
                                accept={'.*'}
                                folderSave={FilesGestionPredial.FilesSolicitud}
                                form={gestionPredial}
                                setForm={setGestionPredial}
                                nameUpload={"archivos"}
                            >
                            </MultipleUpload>
                        </FormGroupInline>
                    </Row6>
                </RowForm>
                <FormFooter>
                    <Link to={`/gestionpredial`}
                          className="btn btn-default btn-sm btn-control">Cancelar</Link>
                    <button id="btnguardar" type="submit"
                            className="btn btn-danger btn-sm btn-control">Guardar
                    </button>
                </FormFooter>
            </Form>
        </Wraper>
    );

}


export default GestionPredialAdd;
