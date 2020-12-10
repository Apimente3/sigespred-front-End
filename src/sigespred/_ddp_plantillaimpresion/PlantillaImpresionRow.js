import React, { useEffect }  from 'react';
import {Link} from "react-router-dom";

const {$} = window;

const PlantillaImpresionRow = ({plantilla, nro, callback}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    const eliminar = (idplantilla) => {
        callback(idplantilla);
    }

    return (
        <>
            <tr key={`trrowkey_${nro}`}>
                <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
                <td key={`tdrowkey_2${nro}`}>{plantilla.id}</td>
                <td key={`tdrowkey_3${nro}`}>{plantilla.nombre}</td>
                <td key={`tdrowkey_15${nro}`}>{plantilla.nombrearchivo}</td>
                <td key={`tdrowkey_15${nro}`}>{plantilla.tipomodulovalor}</td>
                {/* <td key={`tdrowkey_14${nro}`}>
                    {plantilla.urlarchivo
                    ?<a key={`adigmapa_${nro}`} href={serverFile + plantilla.urlarchivo.path} target="_blank" rel="noreferrer noopener">{plantilla.urlarchivo.filename}</a>
                    :""}
                </td> */}
                <td key={`tdrowkey_13${nro}`} className="acciones-2bot pull-center">
                    <div key={`divrowkey_${nro}`} className="btn-group">
                        <Link  to={`/printtemp-edit/${plantilla.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Editar Plantilla de Impresión" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <a key={`arowkey_${nro}`} onClick={() => eliminar(plantilla.id)}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip" data-original-title={ "Eliminar Plantilla de Impresión" }><i
                            className="fa fa-trash-o fa-lg"></i></a>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default PlantillaImpresionRow;