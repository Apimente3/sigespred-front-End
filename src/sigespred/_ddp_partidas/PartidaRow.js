import React from 'react';
import {Link} from "react-router-dom";

const PartidarRow = ({partida,nro}) => {

    return (
        <>
            <tr>
                <td>{nro+1}</td>
                <td>{partida.id}</td>
                <td>{partida.denominacion}</td>
                <td>{partida.nropartida}</td>
                <td>{partida.tramoid}</td>
                <td>{partida.subtramoid}</td>
                <td>{partida.tipopredioid}</td>
                <td>{partida.fechaatencion}</td>
                <td>{partida.observacion}</td>
                <td>{partida.estadoatencion}</td>

                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/partida-edit/${partida.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/partida-del/${partida.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></Link>



                    </div>
                </td>
            </tr>
        </>
    );
};

export default PartidarRow;