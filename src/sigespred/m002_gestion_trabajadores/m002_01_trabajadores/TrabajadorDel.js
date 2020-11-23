
import React, {useState, useEffect, useRef} from 'react';
import {ELIMINAR_TRABAJADOR_BREADCRUM} from "../../../config/breadcrums";
import Wraper from "../../m000_common/formContent/WraperLarge";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import UploadMemo from "../../../components/helpers/uploaders/UploadMemo";
import {FilesUsuario} from "../../../config/parameters";
import {initAxiosInterceptors, serverFile} from '../../../config/axios';
const Axios = initAxiosInterceptors();

const {$} = window;

/*Obtiene la solcitud de polygonos*/
async function getTrabajador(id) {
    const {data} = await Axios.get(`/usuario/${id}`);
    return data;
}


/*Obtiene la solcitud de polygonos*/
async function deleteTrabajador(usuario) {
    const {data} = await Axios.delete(`/usuario/${usuario.id}`,usuario);
    return data;
}



const TrabajadorDel = ({history, match}) => {

    const {id} = match.params;
    const [trabajador, set_trabajador] = useState({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro',rol:3});
    const [detalletrabajador, setdetalltreasd] = useState([]);


    useEffect(() => {
        async function init() {
            try {
                let traba = await getTrabajador(id)
                delete traba.contrasenia
                traba.contrasenia="****"
                set_trabajador(traba)
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        init();
    }, []);

    const limpiarForm = () => {
        set_trabajador({foto: 'img/userblank.jpg', observacion: 'Nuevo Registro'})
    }




    const eliminar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        try {
            //   await agregarTrabajadorComp(trabajador);
            // $('#btnguardar').button('reset');

            // let person =  window.confirm("¿Desea seguir registrando ?");

            const toastrConfirmOptions = {
                onOk: () => deleteTrabajador(trabajador),
                onCancel: () => history.push('/list-trabajadores')
            };
            toastr.confirm('¿ Desea seguir registrando ?', toastrConfirmOptions);


        }
        catch (e) {
            alert(e.message)
        }
    }


    function handleInputChange(e) {
        if (['nombres', 'apellidos', 'direccion', 'cargo'].includes(e.target.name)) {
            set_trabajador({
                ...trabajador,
                [e.target.name]: e.target.value.toUpperCase()
            });
        } else {
            set_trabajador({
                ...trabajador,
                [e.target.name]: e.target.value
            });
        }

    }



    // const {foto} = this.state;
    return (
        <Wraper titleForm={"Eliminacion del Trabajador"} listbreadcrumb={ELIMINAR_TRABAJADOR_BREADCRUM}>
            <form onSubmit={eliminar}>
                <div className="form-group">
                <div className="col-xs-6 col-sm-12 col-md-6">
                    <strong className="font-16">¿Desea eliminar al trabajador {trabajador.nombres}  {trabajador.apellidos}?</strong>
                    <small className="block text-muted">
                       DNI : {trabajador.dni}
                    </small>

                </div>
                </div>

                <div className="form-group">
                    <label className="col-lg-2 control-label">

                    </label>
                    <div className="col-lg-4">
                        <span className="obligatorio">Ingrese su DNI para verificar la eliminación</span>


                    </div>


                </div>
                <div className="form-group">
                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                        DNI</label>
                    <div className="col-lg-4">
                        <input required type="text" className="form-control input-sm "
                               name="dni"
                               onChange={handleInputChange}
                               value={""}
                               title="El DNI debe ser numerico y tener 8 digitos"
                               placeholder={trabajador.dni} pattern="\d\d\d\d\d\d\d\d"
                               maxLength={8}
                               autoComplete="off"

                        >
                        </input>

                    </div>
                    <div className="col-lg-1">
                        <a className="btn btn-default btn-sm dropdown-toggle pull-left"
                           data-toggle="dropdown" data-toggle="tooltip"
                           data-original-title={`Permite Sincronizar con la RENIEC`}>
                            <i className="fa fa-refresh"></i></a>
                    </div>

                </div>

                <div className="panel-body">
                    <div className="form-group ">
                        <div className="col-lg-offset-2 col-lg-10">
                            <Link to={`/list-trabajadores`}
                                  className="btn btn-default btn-sm btn-control">Cancelar</Link>
                            <button id="btnguardar" type="submit"
                                    className="btn btn-danger btn-sm btn-control">Eliminar
                            </button>


                        </div>

                    </div>

                </div>

            </form>
        </Wraper>
    );

}


export default TrabajadorDel;
