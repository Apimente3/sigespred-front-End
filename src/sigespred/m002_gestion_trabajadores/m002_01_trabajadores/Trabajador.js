import React, {Component} from 'react';
import {Link} from "react-router-dom";

const Trabajador =({num,trabajador})=> {
    

  
        return (
            
            <>
                <tr>
                    <td>{' '}</td>
                    <td>{num}</td>
                    <td>{`${trabajador.nombres} ${trabajador.apellidos}`}</td>
                    <td>{trabajador.cargo}</td>
                    <td>{trabajador.dni}</td>
                    <td>{trabajador.rol}</td>
                    <td> {trabajador.telefonos}</td>
                    <td>
                        <div className="btn-group pull-right  margin-rigth-20">
                            <a className="btn btn-default dropdown-toggle" data-toggle="dropdown"><i
                                className="fa fa-ellipsis-v" aria-hidden="true"></i> </a>
                            <ul className="dropdown-menu">

                                <li><Link to={`/trabajador-edit/${trabajador.id}`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</Link></li>
                                <li><Link to={`/trabajador-del/${trabajador.id}`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                            </ul>
                        </div>
                    </td>
                    <td>{' '}</td>

                </tr>

            
            </>
          
        );
 
}

export default Trabajador;