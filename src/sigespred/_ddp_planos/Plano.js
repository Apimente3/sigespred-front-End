import React, {Component} from 'react';
import {Link} from "react-router-dom";
// import "./styles.css"

import {serverFile} from "../../config/axios";

const Plano = ({num, plano}) => {

    // const {codigo, icono, tipo_infraestructura, descripcion,portada_imagen,fecha_creacion} = plano;
    const {id, codplano, gestionpredialid, denominacion, profesionalid, profesional, fechacreacion, departamentoid, provinciaid, distritoid, digital, antecedente} = plano;   

    return (
            
        <>
            <tr>
                <td>{' '}</td>
                <td>{num}</td>
                <td>{plano.codplano}</td>
                <td>{plano.denominacion}</td>
                <td>{plano.profesional}</td>
                <td>{plano.digital}</td>
                <td> {plano.antecedente}</td>
                <td>
                    <div className="btn-group pull-right  margin-rigth-20">
                        <a className="btn btn-default dropdown-toggle" data-toggle="dropdown"><i
                            className="fa fa-ellipsis-v" aria-hidden="true"></i> </a>
                        <ul className="dropdown-menu">

                            <li><Link to={`/trabajador-edit/${plano.id}`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</Link></li>
                            <li><Link to={`/trabajador-del/${plano.id}`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                        </ul>
                    </div>
                </td>
                <td>{' '}</td>

            </tr>

        
        </>
      
    );
};

export default Plano;