import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import SingleUpload from "../../../components/uploader/SingleUpload";
import {FilesUsuario} from "../../../config/parameters";
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
} from "../../../components/forms";


import {useForm} from "../../../hooks/useForm"
import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors, serverFile} from '../../../config/axios';

const Axios = initAxiosInterceptors();

async function updatePerfil(object) {
    const {data} = await Axios.put(`/uploadCV`, object);
    return data;
}

async function getTrabajador() {
    const {data} = await Axios.get(`/getPerfil`);
    if (!data.cv) {
        data.cv =null
    } else {
    }
    ;
    return data;
}


const PerfilProcesional = () => {

    const [usuario, setusuario, handleInputChange, reset] = useForm({}, ['resoministerial', 'abreviatura']);
    useEffect(() => {
        async function init() {
            try {
                let {cv,perfil} = await getTrabajador();
                setusuario({cv,perfil});
            } catch (e) {
                toastr.error('Error en el registro', e.response.data, {position: 'top-center'})
                console.log(e);
            }
        }

        init();
    }, []);

    const save = async e => {
        e.preventDefault();
        try {
            await updatePerfil(usuario);
            toastr.success('Se actualizo Correctamente', 'Se actualizo Correctamente', {position: 'top-right'});
            // reset();
        }
        catch (e) {
            toastr.error('Registro Incorrecto', e.response.data, {position: 'top-center'})
        }

    }

    return (
        <>
            <Form onSubmit={save} autocomplete={"off"}>
                <RowForm>
                    <Row6 title={""}>
                        <FormGroup label={""} require={false}
                                   ayuda={""}>
                        </FormGroup>
                        <FormGroup label={"Subir CV documentado"} require={true} withControl={6} withLabel={6}
                                   ayuda={"Subir el último Curriculum Vitae Documentado de acuerdo a lo solicitado"}>
                            <SingleUpload
                                key="uploadcv"
                                accept=".pdf"
                                folderSave={FilesUsuario.CV}
                                form={usuario}
                                setForm={setusuario}
                                nameUpload={"cv"}
                            >
                            </SingleUpload>
                        </FormGroup>
                    </Row6>
                    <Row12 title={""}>
                        <FormGroup label={"Perfil Profesional"} require={true} withControl={6} withLabel={3}
                                   ayuda={"Ingrese tu actual perfil profesional "}>


                            <textarea required className="form-control input-sm"
                                      placeholder="Ingrese tu perfil actual"
                                      name="perfil"
                                      onChange={handleInputChange}
                                      value={usuario.perfil}
                            >

                                </textarea>

                        </FormGroup>
                    </Row12>
                </RowForm>
                <FormFooter>
                    <Link to={`/`}
                          className="btn btn-default btn-sm btn-control">Cancelar</Link>
                    <button id="btnguardar" type="submit"
                            className="btn btn-danger btn-sm btn-control">Guardar
                    </button>
                </FormFooter>
            </Form>
        </>
    );
};

export default PerfilProcesional;