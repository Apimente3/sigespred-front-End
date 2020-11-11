import React, { useEffect }  from 'react';
import {Link} from "react-router-dom";
import {serverFile} from "../../config/axios";
const {$} = window;
const PoligonoRow = ({poligono, nro, callback, loadfiles, idproyecto, titproyecto}) => {

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
                <td key={`tdrowkey_15${nro}`}>{poligono.id}</td>
                <td key={`tdrowkey_2${nro}`}>{poligono.representaciongrafica}</td>
                <td key={`tdrowkey_3${nro}`}>{poligono.sistcoordenadasvector}</td>
                <td key={`tdrowkey_4${nro}`}>
                    {poligono.controltopologico === true
                    ?"Sí"
                    :"No"}
                </td>
                <td key={`tdrowkey_6${nro}`}>{poligono.fechavector}</td>
                <td key={`tdrowkey_7${nro}`}>{poligono.tiporaster}</td>
                <td key={`tdrowkey_8${nro}`}>{poligono.sistcoordenadasraster}</td>
                <td key={`tdrowkey_9${nro}`}>{poligono.resolucionespacial}</td>
                <td key={`tdrowkey_5${nro}`}>{poligono.fecharaster}</td>
                <td key={`tdrowkey_14${nro}`}>
                    {poligono.urlpoligono
                    ?<a key={`adigmapa_${nro}`} href={serverFile + poligono.urlpoligono.path} target="_blank" rel="noreferrer noopener">{poligono.urlpoligono.filename}</a>
                    :""}
                    </td>
                <td key={`tdrowkey_13${nro}`}>
                    <div key={`divrowkey_${nro}`} className="btn-group">
                        {/* <Link  to={`/solicitud-respuesta/${poligono.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Respuesta a Solicitud" }><i
                            className="fa fa-envelope fa-lg "></i></Link> */}
                        <Link key={`linkrowkey_${nro}`} to={`/gestionpredial-valida/${idproyecto}/${titproyecto}/${poligono.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Editar Datos de Polígono" }>
                            <i key={`irowkey_${nro}`} className="fa fa-edit fa-lg"></i></Link>
                        {/* <a key={`arowkey_${nro}`} onClick={() => eliminar(poligono.id, poligono.nrooficio)}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Eliminar Solicitud" }><i
                            className="fa fa-trash-o fa-lg"></i></a> */}

                    </div>
                </td>
            </tr>
        </>
    );
};

export default PoligonoRow;