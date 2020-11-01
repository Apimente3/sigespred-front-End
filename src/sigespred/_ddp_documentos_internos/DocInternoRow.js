import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
const {$} = window;
const DocInternoRow = ({docinterno,nro}) => {

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
                <td>{docinterno.id}</td>
                <td>{docinterno.equipoid}</td>
                <td>{docinterno.monitorid}</td>
                <td>{docinterno.tipodocumentoid}</td>
                <td>{docinterno.codigostd}</td>
                <td>{docinterno.fecharecepcion}</td>
                <td>{docinterno.numdocrecepcion}</td>
                <td></td>
                {/* <td>{docinterno.observacion}</td>
                { partida.estadoatencion == 'ATENDIDO' ? <td className="colorCeldaAtendido" > <span className="badge badge-info">{partida.estadoatencion}</span></td> : <td className="colorCeldaPendiente"><span className="badge badge-danger">{partida.estadoatencion}</span></td>   } */}
                <td>
                    <div className="btn-group pull-right">
                        <Link  to={`/docinternos-respuesta/${docinterno.id}`}  className="btn btn-xs btn-default" type="button"  data-toggle="tooltip"  data-original-title={ "Respuesta" }><i
                            className="fa fa-envelope fa-lg "></i></Link>
                        <Link  to={`/docinternos-edit/${docinterno.id}`}  className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Edicion" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/docinternos-del/${docinterno.id}`}   className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Eliminar" }><i
                            className="fa fa-trash-o fa-lg"></i></Link>



                    </div>
                </td>
            </tr>
        </>
    );
};

export default DocInternoRow;