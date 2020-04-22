
import React, {useState} from 'react';
import {initAxiosInterceptors, serverFile} from '../../../config/axios';

const Integrante = ({eliminarIntegrante,integrante}) => {
    
    const {id,foto,nombres,tipo_integrante,cargo,telefonos,correo}=integrante;
    const [edit,setEdit]=useState(false);
    const CancelEdit=(e)=>{
        setEdit(false)
    }
    const modeEdit=(e)=>{
        setEdit(true)
    }
    
    const eliminar=()=>{
       
        eliminarIntegrante(id)
    }
    
    return (
        <>
            <>
                <div className="col-md-4 col-sm-4">
                    <div className="panel avatar-team">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-4 col-sm-4">
                                    <a href="#" className="pull-left ">
                                        <img src={foto=='img/userblank.jpg'? '/'+foto:serverFile+foto}  className="img-circle foto-trabajador" alt="User Avatar"/>
                                    </a>
                                </div>
                                <div className="col-md-8 col-sm-8">
                                    <div className="pull-right"><button onClick={eliminar} type="button">X</button></div>

                                    <strong className="font-14 block">{nombres} </strong>
                                    <small className="text-muted"><i className="fa fa-id-card"
                                                                     aria-hidden="true"></i> {tipo_integrante}</small><br/>
                                    <small className="text-muted"><i className="fa fa-user-circle-o"
                                                                     aria-hidden="true"></i> {cargo}</small><br/>
                                    <small className="text-muted"><i className="fa fa-phone"
                                                                     aria-hidden="true"></i> {telefonos}</small><br/>
                                    <small className="text-muted"><i className="fa fa-envelope"
                                                                     aria-hidden="true"></i> {correo}</small><br/>



                                </div>
                            </div>

                            <div className="pull-left m-left-sm">



                            </div>
                        </div>
                    </div>
                </div>


            </>


        </>
    )


   

};

export default Integrante;