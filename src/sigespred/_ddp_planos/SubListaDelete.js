import React from 'react';
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'

const SubListaDelete = ({data, cabecera, deleterow}) => {

    const removerElemento = (idelem) => {
        const toastrConfirmOptions = {
            onOk: () => deleterow(idelem),
        };
        toastr.confirm(`¿Desea eliminar el archivo?`, toastrConfirmOptions);
    }

    return (
        <>
                <table className="tableInside">
                    <thead>
                        <tr>
                            { cabecera.map((header,i)=>(
                                <th key={i}>{header}</th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((object, i) => (
                        <tr key={object.laminaid}>
                            <td key={`td_${i}_${object.laminaid}`}>
                                <span>{object.lamina}</span>
                            </td>
                            <td>
                                <span>{object.digital}</span>
                            </td>
                            <td>
                                <span>{object.memoria}</span>
                            </td>
                            <td align="center">
                                <a className="btn btn-default btn-sm dropdown-toggle"
                                    title="Quitar de la lista"
                                    onClick={() => removerElemento(object.laminaid)}
                                    >
                                    <i className="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>


            

            {/* <tr>
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
            </tr> */}
        </>
    );
};

export default SubListaDelete;