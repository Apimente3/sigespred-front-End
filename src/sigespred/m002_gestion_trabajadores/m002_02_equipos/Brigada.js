import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Brigada =({num,history,equipo})=> {
   
    const {id,denominacion,fecha_registro,cantintegrantes,responsable}=equipo;
   let idequiq=(id==null?0:id);
    return (
        <>

            <tr>
                <td>{' '}</td>
                <td>{num+1}</td>
                <td>{denominacion}</td>
                <td>{fecha_registro}</td>
                <td >{cantintegrantes}</td>
                <td>{responsable}</td>
             
                <td>

                    <div className="btn-group pull-right  margin-rigth-20">
                        <a className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            <i
                            className="fa fa-ellipsis-v" aria-hidden="true"></i> </a>
                        <ul className="dropdown-menu">
                            <li><Link to={`/equipo-gestion/${id}`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Gestionar</Link></li>
                            <li><Link to={`/equipo-del/${id}`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                        </ul>
                    </div>
                </td>
                <td>{' '}</td>

            </tr>

            


        </>
    );

}

export default Brigada;