import React, { useEffect }  from 'react';
import {Link} from "react-router-dom";
const {$} = window;
const SolicitudRow = ({solicitud, nro, callback, loadfiles}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    const eliminar = (idsolicitud, codsolicitud) => {
        callback(idsolicitud, codsolicitud);
    }

    return (
        <>
            <tr key={`trrowkey_${nro}`}>
                <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
                <td key={`tdrowkey_2${nro}`}>{solicitud.id}</td>
                <td key={`tdrowkey_3${nro}`}>{solicitud.entidad}</td>
                <td key={`tdrowkey_4${nro}`}>{solicitud.proyecto}</td>
                <td key={`tdrowkey_6${nro}`}>{solicitud.tipoconsulta}</td>
                <td key={`tdrowkey_7${nro}`}>{solicitud.codigostd}</td>
                <td key={`tdrowkey_8${nro}`}>{solicitud.nrooficio}</td>
                <td key={`tdrowkey_9${nro}`}>{solicitud.fecharecepcion}</td>
                <td key={`tdrowkey_5${nro}`}>{solicitud.recibiorespuesta}</td>
                <td key={`tdrowkey_14${nro}`}>{solicitud.fecharespuesta}</td>
                <td key={`tdrowkey_10${nro}`}>{solicitud.plazo_atencion}</td>
                {(solicitud.estado && solicitud.estado.toUpperCase()  === 'ATENDIDO')
                ?<td key={`tdrowkey_11${nro}`}><span className="badge badge-success">{solicitud.estado}</span></td>
                :(solicitud.estado && solicitud.estado.toUpperCase()  === 'DENTRO DEL PLAZO')
                ?<td key={`tdrowkey_15${nro}`}><span className="badge badge-info">{solicitud.estado}</span></td>
                :(solicitud.estado && solicitud.estado.toUpperCase()  === 'EN TOLERANCIA')
                ?<td key={`tdrowkey_16${nro}`}><span className="badge badge-warning">{solicitud.estado}</span></td>
                :(solicitud.estado && solicitud.estado.toUpperCase()  === 'FUERA DE PLAZO')
                ?<td key={`tdrowkey_17${nro}`}><span className="badge badge-danger">{solicitud.estado}</span></td>
                :<td key={`tdrowkey_18${nro}`}>{solicitud.estado}</td>
                }
                
                <td key={`tdrowkey_12${nro}`}>{solicitud.accion}</td>
                <td key={`tdrowkey_13${nro}`}>
                    <div key={`divrowkey_${nro}`} className="btn-group pull-right">
                        <Link  to={`/solicitud-respuesta/${solicitud.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Respuesta a Solicitud" }><i
                            className="fa fa-envelope fa-lg "></i></Link>
                        <Link  to={`/solicitud-edit/${solicitud.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Editar Solicitud" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <a key={`arowkey_${nro}`} onClick={() => eliminar(solicitud.id, solicitud.nrooficio)}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Eliminar Solicitud" }><i
                            className="fa fa-trash-o fa-lg"></i></a>

                    </div>
                </td>
            </tr>
        </>
    );
};

export default SolicitudRow;