
import React, {useState, useEffect, useRef} from 'react';
import {CHANGEPASS_TRABAJADOR_BREADCRUM} from "../../../config/breadcrums";
import Wraper from "../../m000_common/formContent/WraperLarge";
import {Link} from "react-router-dom";
import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {toastr} from "react-redux-toastr";
const Axios = initAxiosInterceptors();

const {$} = window;

/*Obtiene la solcitud de polygonos*/
async function getTrabajador(id) {
    const {data} = await Axios.get(`/usuario/${id}`);
    return data;
}


/*Obtiene la solcitud de polygonos*/
async function changePass(usuario) {
    const {data} = await Axios.put(`/usuario/updated-password/${usuario.id}`,usuario);
    return data;
}



const TrabajadorChangePass = ({history, match}) => {

    const {id} = match.params;
    const [trabajador, set_trabajador] = useState({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro',rol:3});


    useEffect(() => {
        async function init() {
            try {
                let traba = await getTrabajador(id)
                //traba.contrasenia;
                traba.contrasenia="";
                set_trabajador(traba);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        init();
    }, []);




    const eliminar = async e => {

        e.preventDefault();
        $('#btnguardar').button('loading');
        try {

            changePass(trabajador);
            toastr.success('Actualizacion Correcta', 'Se actualizo correctamente la contraseña.', {position: 'top-right'})
            history.push('/list-trabajadores');



        }
        catch (e) {
            alert(e.message)
        }
    }


    function handleInputChange(e) {

            set_trabajador({
                ...trabajador,
                [e.target.name]: e.target.value
            });


    }



    // const {foto} = this.state;
    return (
        <Wraper titleForm={"Eliminacion del Trabajador"} listbreadcrumb={CHANGEPASS_TRABAJADOR_BREADCRUM}>
            <form onSubmit={eliminar}>
                <div className="form-group">
                <div className="col-xs-6 col-sm-12 col-md-6">
                    <strong className="font-16">¿Desea cambias el Password al trabajador {trabajador.nombres}  {trabajador.apellidos}?</strong>
                    <small className="block text-muted">
                       DNI : {trabajador.dni}
                    </small>

                </div>
                </div>

                <div className="form-group">
                    <label className="col-lg-2 control-label">

                    </label>
                    <div className="col-lg-4">
                        <span className="obligatorio">Ingrese su nuevo Password</span>
                    </div>


                </div>
                <div className="form-group">
                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                        Password</label>
                    <div className="col-lg-4">
                        <input required type="password" className="form-control input-sm "
                               name="contrasenia"
                               onChange={handleInputChange}
                               value={trabajador.contrasenia}
                               title="La contraseña"
                               placeholder={"Ingrese la Contraseña"}
                               maxLength={8}
                               autoComplete="off"

                        >
                        </input>

                    </div>
                    <div className="col-lg-1">

                    </div>

                </div>

                <div className="panel-body">
                    <div className="form-group ">
                        <div className="col-lg-offset-2 col-lg-10">
                            <Link to={`/list-trabajadores`}
                                  className="btn btn-default btn-sm btn-control">Cancelar</Link>
                            <button id="btnguardar" type="submit"
                                    className="btn btn-danger btn-sm btn-control">Cambiar
                            </button>


                        </div>

                    </div>

                </div>

            </form>
        </Wraper>
    );

}


export default TrabajadorChangePass;
