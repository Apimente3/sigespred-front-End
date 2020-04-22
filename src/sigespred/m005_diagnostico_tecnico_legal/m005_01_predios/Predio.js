import React from 'react';
import {Link} from "react-router-dom";

const Predio = ({predio,number}) => {

    return (
        <>

            <tr>
                <td>{' '}</td>
                <td>{number+1}</td>
                <td>{predio.codigo}</td>
                <td>{predio.usuaregistra}</td>
                <td>{predio.fech_registro}</td>
            
              
                <td>
                    <div className="pull-right m-left-sm ">
                        <div className="btn-group pull-right  margin-rigth-20">
                            <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <i
                                    className="fa fa-ellipsis-v" aria-hidden="true"></i> </button>
                            <ul className="dropdown-menu">

                                <li><Link to={`/datos-predio/${predio.codigo}`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Gestionar</Link></li>
                                <li><Link to={`/propietarios-predio/${predio.codigo}`} href="#"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Sujetos Pasivos</Link></li>
                                <li><Link to={`/expedientes/${predio.codigo}`} href="#"><i className="fa fa-file-pdf-o" aria-hidden="true"></i> Expedientes</Link></li>
                                <li><Link to={`/solicitud-del/00001`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                            </ul>
                        </div>
                    </div>
                </td>
                <td>{' '}</td>

            </tr>
            
        </>
    );
};

export default Predio;