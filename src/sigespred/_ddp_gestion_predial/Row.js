import React from 'react';
import {Link} from "react-router-dom";

const TrabajadorRow = ({trabajador,nro}) => {

    return (
        <>
            <tr>
                <td>{trabajador.tipoinfraestructura}</td>
                <td>{trabajador.infraestructura}</td>
                <td>{trabajador.abreviatura}</td>
                <td>{trabajador.denominacion}</td>

                <td>{trabajador.correo}</td>

                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/trabajador-edit/${trabajador.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/trabajador-del/${trabajador.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></Link>



                    </div>
                </td>
            </tr>
        </>
    );
};

export default TrabajadorRow;