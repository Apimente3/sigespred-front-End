import React from 'react';
import {Link} from "react-router-dom";

const RowArea = ({area}) => {

    return (
        <>
            <tr>
                <td>{are.id}</td>
                <td>{area.nombre}</td>
                <td>{area.SubArea.nombre}</td>
                <td>{area.SubArea.descripcion}</td>
                <td>{area.usuarioid}</td>

                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/equipo-edit/${area.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/equipo-del/${area.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></Link>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default RowEquipo;