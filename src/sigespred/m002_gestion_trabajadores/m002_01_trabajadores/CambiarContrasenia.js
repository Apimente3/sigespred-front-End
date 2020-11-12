import React from 'react';
import {Link} from "react-router-dom";

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
} from "../../../components/forms";


import {useForm} from "../../../hooks/useForm"
import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors, serverFile} from '../../../config/axios';
const Axios = initAxiosInterceptors();

async function changePassword(object) {
    const {data} = await Axios.put(`/cambiarContrasenia`,object);
    return data;
}


const CambiarContrasenia = () => {

    const [usuario, setusuario, handleInputChange, reset] = useForm({contraseniaAnterior:"",contraseniaNueva1:"",contraseniaNueva2:""}, ['resoministerial', 'abreviatura']);

    const save = async e => {
        e.preventDefault();
        try {
            await changePassword(usuario)
            toastr.success('Se actualizo Correctamente', 'Se actualizo Correctamente', {position: 'top-right'});
            reset()
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

                        <FormGroup label={"Contraseña anterior"} require={true} withControl={6} withLabel={6}
                                   ayuda={"La contraseña anterior"}>
                            <Input required={true} value={usuario.contraseniaAnterior} onChange={handleInputChange} autocomplete={"off"}
                                   name={"contraseniaAnterior"} placeholder={"Nueva anterior"}
                                   type={"password"}>
                            </Input>
                        </FormGroup>

                        <FormGroup label={"Contraseña nueva"} require={true} withControl={6} withLabel={6}
                                   ayuda={"La contraseña nueva que utilizara"}>
                            <Input required={true} value={usuario.contraseniaNueva1} onChange={handleInputChange} autocomplete={"off"}
                                   name={"contraseniaNueva1"} placeholder={"Nueva contraseña"}
                                   type={"password"}>
                            </Input>
                        </FormGroup>

                        <FormGroup label={"Confirmar la contraseña nueva"} require={true} withControl={6} withLabel={6}
                                   ayuda={"Confirmar la contraseña nueva"}>
                            <Input required={true} value={usuario.contraseniaNueva2} onChange={handleInputChange} autocomplete={"off"}
                                   name={"contraseniaNueva2"} placeholder={"Confirmar la contraseña nueva"}
                                   type={"password"}>
                            </Input>
                        </FormGroup>



                    </Row6>

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

export default CambiarContrasenia;