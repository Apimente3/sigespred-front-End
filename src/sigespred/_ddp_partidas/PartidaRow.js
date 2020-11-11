import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
const {$} = window;
const PartidarRow = ({partida,nro}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
            <tr>
                <td>{nro+1}</td>
                <td>{partida.id}</td>
                <td>{partida.nropartida}</td>
                <td>{partida.denominacion}</td>
                <td>{partida.tramoid}</td>
                <td>{partida.subtramoid}</td>
                <td>{partida.tipopredio}</td>
                <td>{partida.fechaatencion}</td>
                <td>{partida.observacion}</td>
                { partida.estadoatencion == 'ATENDIDO' ? <td className="colorCeldaAtendido" > <span className="badge badge-info">{partida.estadoatencion}</span></td> : <td className="colorCeldaPendiente"><span className="badge badge-danger">{partida.estadoatencion}</span></td>   }
                
                <td>
                    <div className="btn-group pull-right">
                        {/* <Link  to={`/partida-respuesta/${partida.id}`}  className="btn btn-xs btn-default" type="button"  data-toggle="tooltip"  data-original-title={ "Respuesta" }><i
                            className="fa fa-envelope fa-lg "></i></Link> */}
                        <Link  to={`/partida-edit/${partida.id}`}  className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Edicion" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/partida-del/${partida.id}`}   className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Eliminar" }><i
                            className="fa fa-trash-o fa-lg"></i></Link>



                    </div>
                </td>
            </tr>
        </>
    );
};

export default PartidarRow;