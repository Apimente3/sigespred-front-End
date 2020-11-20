import React, { useEffect }  from 'react';
import {Link} from "react-router-dom";
const {$} = window;


export const PredioRow = ( {predio, nro}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
             <tr key={`trrowkey_${nro}`}>
                <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
                <td key={`tdrowkey_2${nro}`}>{predio.id}</td>
                <td key={`tdrowkey_3${nro}`}>{predio.codigo_proyecto}</td>
                <td key={`tdrowkey_4${nro}`}>{predio.codigo}</td>
                <td key={`tdrowkey_6${nro}`}>{predio.descripcion}</td>
                <td key={`tdrowkey_12${nro}`}>{predio.accion}</td>
                <td key={`tdrowkey_13${nro}`} className="acciones-3bot">
                    <div key={`divrowkey_${nro}`} className="btn-group pull-right">
                        <Link  to={`/solicitud-respuesta/${predio.id}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-placement="bottom" data-original-title={ "Respuesta a Solicitud" }><i
                            className="fa fa-envelope fa-lg "></i></Link>
                        <Link  to={`/solicitud-edit/${predio.id}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-original-title={ "Editar Solicitud" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        {/* <a key={`arowkey_${nro}`} onClick={() => eliminar(solicitud.id, solicitud.nrooficio)}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Eliminar Solicitud" }><i
                            className="fa fa-trash-o fa-lg"></i></a> */}

                    </div>
                </td>
            </tr>
        </>
    )
}
