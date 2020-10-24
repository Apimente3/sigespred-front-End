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
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'


import UploadMemo from "../../components/helpers/uploaders/UploadMemo";

import {FilesUsuario} from "../../config/parameters";

import {initAxiosInterceptors, serverFile} from '../../config/axios';
import FormGroupInline from "../../components/forms/FormGroupInline";

const Axios = initAxiosInterceptors();

const {$} = window;


/*Listar tipo de infraestrucra*/
async function getListTipoInfraestructura() {
    const {data} = await Axios.get(`/tipoinfraestructura`);
    return data;
}


/*Listar tipo de infraestrucra*/
async function getListInfraestructura() {
    const {data} = await Axios.get(`/infraestructura`);
    return data;
}

const GestionPredialAdd = ({history}) => {

    const [gestionPredial, setGestionPredial] = useState({});
    const [listTipoInfraestructura, setlistTipoInfraestructura] = useState([]);
    const [listInfraestructura, setlistInfraestructura] = useState([]);

    /*Valiables Globales*/
    let listInfraestructuraGlobal = [];

    useEffect(() => {
        const init = async () => {
            setlistTipoInfraestructura(await getListTipoInfraestructura());
            listInfraestructuraGlobal = await getListInfraestructura()
            setlistInfraestructura(listInfraestructuraGlobal);
        };
        init();
    }, []);

    const limpiarForm = () => {
        //  set_trabajador({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'})
    }

    const registrar = async e => {
        e.preventDefault();
        // $('#btnguardar').button('loading');
        try {
            //  await addTrabajador(trabajador);
            toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'})
            history.push('/list-trabajadores')
        }
        catch (e) {
            alert(e.message)
        }
    }


    /*Permite el cambio del los datos del trabajador*/

    function handleInputChange(e) {
        if (['nombres', 'apellidos', 'direccion', 'cargo'].includes(e.target.name)) {
            setGestionPredial({
                ...gestionPredial,
                [e.target.name]: e.target.value.toUpperCase()
            });
        } else {
            setGestionPredial({
                ...gestionPredial,
                [e.target.name]: e.target.value
            });
        }
    }

    /*Permite Filtrar la infraestructura en relacion a una tipo de infraestrucutra*/
    const FiltrarInfraestructura = (e) => {
        let listInfraes = listInfraestructuraGlobal.filter(row => {
            return row.tipoinfraestructuraid == e.target.value;
        });
        setlistInfraestructura(listInfraes);
    }

    return (
        <Wraper titleForm={"Registro de Gestion Predial"} listbreadcrumb={REGISTRO_GESTIONPREDIAL_BREADCRUM}>
            <Form onSubmit={registrar}>
                <RowForm>
                    <Row6 title={"DATOS DE LA GESTION PREDIAL"}>
                        <FormGroup label={"Tipo Infraestructura "} require={true}>
                            <Select required={true} value={gestionPredial.tipoinfraestructuraid}
                                    onChange={
                                        (e) => {
                                            handleInputChange(e);
                                            FiltrarInfraestructura(e);
                                        }
                                    }
                                    name={"tipoinfraestructuraid"}>
                                <Options options={listTipoInfraestructura} index={"id"}
                                         valor={"denominacion"}></Options>
                            </Select>

                        </FormGroup>
                        <FormGroup label={"Proyecto"} require={true}>
                            <Select required={true} value={gestionPredial.infraestructuraid}
                                    onChange={handleInputChange}
                                    name={"infraestructuraid"}>
                                <Options options={listInfraestructura} index={"id"} valor={"descripcion"}></Options>
                            </Select>
                        </FormGroup>

                    </Row6>
                    <Row6 title={"ARCHIVOS ENVIADOS EN EL DOCUMENTO D"}>
                        <FormGroupInline>
                            <InputInline withLabel={2} withControl={10} require={true} label={"Edad"}>

                            </InputInline>
                        </FormGroupInline>
                    </Row6>
                </RowForm>

                <RowForm>
                    <Row6 title={"DATOS DEL DOCUMENTO"}>
                        <FormGroup label={"Tipo de documento "} require={true}>
                            <Select required={true} value={gestionPredial.tipodocumentoid} onChange={handleInputChange}
                                    name={"tipo_infraestructura_id"}>
                                <Options options={[{id: 1, value: "DNI"}]} index={"id"} valor={"value"}></Options>
                            </Select>
                        </FormGroup>
                        <FormGroup label={"Nro de documento"} require={true}>
                            <Input required={true} value={""} onChange={handleInputChange}
                                   name={"tipo_infraestructura_id"} placeholder={"Ingrese la nro de documento"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>
                        <FormGroup label={"Fecha de documento"} require={true}>
                            <Input required={true} value={""} onChange={handleInputChange}
                                   name={"tipo_infraestructura_id"} placeholder={"Ingrese la denominacion de Proyecto"}
                                   type={"date"}>
                            </Input>
                        </FormGroup>
                        <FormGroup label={"Asunto"} require={true}>
                            <Input required={true} value={""} onChange={handleInputChange}
                                   name={"tipo_infraestructura_id"} placeholder={"Ingrese el asunto del documento"}
                                   type={"text"}>
                            </Input>
                        </FormGroup>
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
