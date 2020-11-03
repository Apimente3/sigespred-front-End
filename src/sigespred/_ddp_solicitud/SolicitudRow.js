import React from 'react';
import {Link} from "react-router-dom";

const SolicitudRow = ({solicitud,nro, callback, loadfiles}) => {

    const eliminar = (idsolicitud, codsolicitud) => {
        callback(idsolicitud, codsolicitud);
    }

    const cargarPopup = (codsolicitud, jsoncontent) => {
        loadfiles(codsolicitud, jsoncontent);
    }

    return (
        <>
            <tr key={`trrowkey_${nro}`}>
                <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
                <td key={`tdrowkey_2${nro}`}>{solicitud.id}</td>
                <td key={`tdrowkey_3${nro}`}>{solicitud.entidad}</td>
                <td key={`tdrowkey_4${nro}`}>{solicitud.proyecto}</td>
                <td key={`tdrowkey_5${nro}`}>{solicitud.tramo}</td>
                <td key={`tdrowkey_6${nro}`}>{solicitud.tipoconsulta}</td>
                <td key={`tdrowkey_7${nro}`}>{solicitud.codigostd}</td>
                <td key={`tdrowkey_8${nro}`}>{solicitud.nrooficio}</td>
                <td key={`tdrowkey_9${nro}`}>{solicitud.fechaelaboficio}</td>
                <td key={`tdrowkey_10${nro}`}>{solicitud.plazo_atencion}</td>
                <td key={`tdrowkey_11${nro}`}>
                    <div key={`divrowkey_${nro}`} className="btn-group pull-right">
                        <Link  to={`/solicitud-edit/${solicitud.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <a key={`arowkey_${nro}`} onClick={() => eliminar(solicitud.id, solicitud.nrooficio)}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></a>

                    </div>
                </td>
            </tr>
        </>
    );
};

export default SolicitudRow;