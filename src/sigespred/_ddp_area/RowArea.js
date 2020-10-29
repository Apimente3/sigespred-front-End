import React from 'react';
import {Link} from "react-router-dom";

const RowArea = ({area}) => {

    return (
        <>
            <tr>
                <td>{area.id}</td>
                <td>{area.subareaid}</td>
                <td>{area.path}</td>
                <td>{area.descripcion}</td>
                <td>{area.usuarioid}</td>

                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/area-edit/${area.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/area-del/${area.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></Link>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default RowArea;