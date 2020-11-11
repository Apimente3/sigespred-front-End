import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
const {$} = window;
const TrabajadorRow = ({row,nro}) => {


    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
            <tr>
                <td>{row.tipoinfraestructura}</td>
                <td>{row.infraestructura}</td>
                <td>{row.abreviatura}</td>
                <td>{row.denominacion}</td>

                <td>{row.correo}</td>

                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/gestionpredial-validalist/${row.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                               data-original-title={ "Validacion del Poligono de trabajo" }><i
                            className="fa fa-edit fa-lg"></i></Link>

                        <Link  to={`/gestionpredial-edit/${row.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                               data-original-title={ "Editar" }><i
                            className="fa fa-edit fa-lg"></i></Link>




                    </div>
                </td>
            </tr>
        </>
    );
};

export default TrabajadorRow;