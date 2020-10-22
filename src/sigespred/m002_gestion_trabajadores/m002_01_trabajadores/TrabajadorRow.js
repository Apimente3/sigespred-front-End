import React from 'react';
import {Link} from "react-router-dom";

const TrabajadorRow = ({trabajador}) => {

    return (
        <>
            <tr>
                <td>{trabajador.dni}</td>
                <td>{trabajador.nombres}</td>
                <td>{trabajador.apellidos}</td>
                <td>{trabajador.telefono}</td>
                <td>{trabajador.correos}</td>

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