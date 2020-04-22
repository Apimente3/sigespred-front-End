import React, {useState} from 'react';
import FileBase64 from "react-file-base64";
import ModalAddPropietario from "./ModalAddPropietario";
import ModalEditPropietario from "./ModalEditPropietario";
import {toastr} from "react-redux-toastr";

const Propietario = ({propietario,editPropietarios,removeIntegrantes}) => {
    
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
            {edit ? <ModalEditPropietario closeModal={setEdit} propietario={propietario} editPropietario={editar_propietario}/>:


                <tr>
                    <td>{`${nombres? nombres:''} ${apellidos? apellidos:''} ${razon_social ? razon_social: ''}`}</td>
                    <td>{nro_documento}</td>
                    <td>{telefonos}</td>
                    <td> {direccion}</td>
                    <td>   <div className="btn-group hover-dropdown pull-right">

                        <a href="#" onClick={()=> editar()}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></a>
                        <a href="#" onClick={()=> eliminar(propietario.id)}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></a>
                    </div>
                    </td>
                   
                </tr>
                
                
                 }

                
            



        </>
    );
};

export default Propietario;