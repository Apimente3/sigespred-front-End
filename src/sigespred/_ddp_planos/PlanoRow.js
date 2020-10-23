import React from 'react';
import {Link} from "react-router-dom";

const PlanoRow = ({plano,nro}) => {

    return (
        <>
            <tr>
                <td>{nro+1}</td>
                <td>{plano.id}</td>
                <td>{plano.codplano}</td>
                <td>{plano.denominacion}</td>
                <td>{plano.profesional}</td>
                <td>{plano.fechacreacion}</td>
                <td>{plano.ubicacion}</td>
                <td>{plano.digital}</td>
                <td>{plano.antecedente}</td>
                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/plano-edit/${plano.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/plano-del/${plano.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></Link>



                    </div>
                </td>
            </tr>
        </>
    );
};

export default PlanoRow;