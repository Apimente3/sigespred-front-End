import React, { useEffect }  from 'react';
import {Link} from "react-router-dom";
import {serverFile} from "../../config/axios";

const {$} = window;

const TramoRow = ({tramo, nro, callback, idproyecto, titproyecto}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    const eliminar = (idtramo) => {
        callback(idtramo);
    }

    return (
        <>
            <tr key={`trrowkey_${nro}`}>
                <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
                <td key={`tdrowkey_2${nro}`}>{tramo.id}</td>
                <td key={`tdrowkey_3${nro}`}>{tramo.descripcion}</td>
                <td key={`tdrowkey_14${nro}`}>
                    {tramo.urlarchivo
                    ?<a key={`adigmapa_${nro}`} href={serverFile + tramo.urlarchivo.path} target="_blank" rel="noreferrer noopener">{tramo.urlarchivo.filename}</a>
                    :""}
                </td>
                <td key={`tdrowkey_13${nro}`}>
                    <div key={`divrowkey_${nro}`} className="btn-group pull-right">
                        <Link  to={`/tramo-edit/${idproyecto}/${titproyecto}/${tramo.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Editar tramo" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <a key={`arowkey_${nro}`} onClick={() => eliminar(tramo.id)}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Eliminar tramo" }><i
                            className="fa fa-trash-o fa-lg"></i></a>

                    </div>
                </td>
            </tr>
        </>
    );
};

export default TramoRow;