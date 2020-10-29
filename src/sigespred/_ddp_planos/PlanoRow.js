import React from 'react';
import {Link} from "react-router-dom";

const PlanoRow = ({plano,nro, callback, loadfiles}) => {

    const eliminar = (idplano, codplano) => {
        callback(idplano, codplano);
    }

    const cargarPopup = (codplano, jsoncontent) => {
        loadfiles(codplano, jsoncontent);
    }

    return (
        <>
            <tr key={`trrowkey_${nro}`}>
                <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
                <td key={`tdrowkey_2${nro}`}>{plano.id}</td>
                <td key={`tdrowkey_3${nro}`}>{plano.codplano}</td>
                <td key={`tdrowkey_4${nro}`}>{plano.denominacion}</td>
                <td key={`tdrowkey_5${nro}`}>{plano.profesional}</td>
                <td key={`tdrowkey_6${nro}`}>{plano.fechacreacion}</td>
                <td key={`tdrowkey_7${nro}`}>{plano.ubicacion}</td>
                <td key={`tdrowkey_8${nro}`}>
                    {plano.digital.toUpperCase() === 'NO'?
                        plano.digital
                        :
                        <a onClick={() => cargarPopup(plano.codplano, plano.archivos)} className="cursorpointer">
                            {plano.digital}
                        </a>
                    }
                    
                </td>
                <td key={`tdrowkey_9${nro}`}>{plano.antecedente}</td>
                <td key={`tdrowkey_10${nro}`}>
                    <div key={`divrowkey_${nro}`} className="btn-group pull-right">
                        <Link  to={`/plano-add/${plano.codplano}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-link fa-lg"></i></Link>                        
                        <Link  to={`/plano-edit/${plano.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <a key={`arowkey_${nro}`} onClick={() => eliminar(plano.id, plano.codplano)}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></a>

                    </div>
                </td>
            </tr>
        </>
    );
};

export default PlanoRow;