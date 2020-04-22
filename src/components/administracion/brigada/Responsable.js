
import React, {useState} from 'react';

const Resposable = ({resposable}) => {
    
    const {id,rol,nombres,correo,telefonos,cargo,foto}=resposable;

    const [edit,setEdit]=useState(false);


    const CancelEdit=(e)=>{
        setEdit(false)
    }

    const modeEdit=(e)=>{
        setEdit(true)
    }

    return (
        <>
            <div className="col-md-4 col-sm-4">
                <div className="panel avatar-team">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <a href="#" className="pull-left ">
                                    <img src={foto}  className="img-circle foto-trabajador" alt="User Avatar"/>
                                </a>
                            </div>
                            <div className="col-md-8 col-sm-8">
                               
                                <strong className="font-14 block">{nombres} </strong>
                                <small className="text-muted"><i className="fa fa-id-card"
                                                                 aria-hidden="true"></i> {rol}</small><br/>
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
    )




};

export default Resposable;