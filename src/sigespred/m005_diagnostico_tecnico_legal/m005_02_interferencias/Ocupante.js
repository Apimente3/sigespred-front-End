import React, {useState} from 'react';
import FileBase64 from "react-file-base64";
import ModalAddPropietario from "./ModalAddPropietario";
import ModalEditPropietario from "./ModalEditPropietario";
import {toastr} from "react-redux-toastr";
import ModalEditPoseedor from "./ModalEditPoseedor";
import ModalEditOcupante from "./ModalEditOcupante";

const Ocupante = ({propietario,editPropietarios,removeIntegrantes}) => {

    const [edit,setEdit]=useState(false)
    const [prop,setprop]=useState(propietario)

    const { correo,
        nombres, apellidos, direccion,
        telefonos,
        observacion,
        nro_documento,
        tipo_documento,
        fecha_nacimiento,razon_social} = propietario;


    const editar= () =>{
        setEdit(true)
    }

    const editarPropietario=(prop)=>{
        editPropietarios(prop)
    }

    const eliminar=(id)=>{

        const toastrConfirmOptions = {
            onOk: async () => {

                try {
                    removeIntegrantes(id)
                }catch (e) {
                    console.log(e)
                    toastr.error(e.error)
                }

            },
            onCancel: () => {
            }
        };
        toastr.confirm('¿ Desea eliminar este Propietario ?', toastrConfirmOptions);

    }
    const editar_propietario=(integrante)=>{
        editPropietarios(integrante)
    }

    return (
        <>
            {edit ? <ModalEditOcupante closeModal={setEdit} propietario={propietario} editPropietario={editar_propietario}/>: <div>
                <li className="list-group-item clearfix trabajdorlist propietarioborder">
                    <div className="padding-trabajador">
                        <div className="clearfix ">


                            <div>
                                <div className="col-md-4">

                                    <div className="pull-left m-left-sm">
                                        <span>{`${nombres? nombres:''} ${apellidos? apellidos:''} ${razon_social ? razon_social: ''}`}</span><br></br>
                                        <small className="text-muted">Nombres / Razón Social</small>
                                    </div>

                                </div>
                                <div className="col-md-8">

                                    <div className="pull-left m-left-sm ">
                                        <span><i className="fa fa-id-card-o" aria-hidden="true"></i> {nro_documento}</span><br></br>
                                        <small
                                            className="text-muted text-danger font-7">{tipo_documento}
                                        </small>
                                    </div>

                                    <div className="pull-left m-left-sm ">
                                        <span><i className="fa fa-phone" aria-hidden="true"></i> {telefonos}</span><br></br>
                                        <small
                                            className="text-muted text-danger font-7"> TELEFONOS
                                        </small>
                                    </div>

                                    <div className="pull-left m-left-sm ">
                                        <span><i className="fa fa-phone" aria-hidden="true"></i> {direccion}</span><br></br>
                                        <small
                                            className="text-muted text-danger font-7"> DIRECCIÓN
                                        </small>
                                    </div>

                                    <div className="btn-group hover-dropdown pull-right">

                                        <a href="#" onClick={()=> editar()}  className="btn btn-xs btn-default" type="button"><i
                                            className="fa fa-edit fa-lg"></i></a>
                                        <a href="#" onClick={()=> eliminar(propietario.id)}  className="btn btn-xs btn-default" type="button"><i
                                            className="fa fa-trash-o fa-lg"></i></a>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="seperator"></div>

                    </div>


                </li>

            </div> }






        </>
    );
};

export default Ocupante;