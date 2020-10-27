import React from 'react';
import {Link} from "react-router-dom";

const RowEquipo = ({equipo,nro}) => {

    return (
        <>
            <tr>
                <td>{equipo.id}</td>
                <td>{equipo.GestionPredial.denominacion}</td>
                <td>{equipo.equipo}</td>
                <td>{equipo.Area.nombre}</td>
                <td>{equipo.activo ? "SI" : "NO"}</td>

                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/equipo-edit/${equipo.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/equipo-del/${equipo.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></Link>



                    </div>
                </td>
            </tr>
        </>
    );
};

export default RowEquipo;