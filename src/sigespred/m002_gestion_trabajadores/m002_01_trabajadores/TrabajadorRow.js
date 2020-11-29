import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
const {$} = window;
const TrabajadorRow = ({trabajador,nro}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);


    return (
        <>
            <tr>

                <td>{trabajador.dni}</td>
                <td>{trabajador.nombres}</td>
                <td>{trabajador.apellidos}</td>
                <td>{trabajador.telefonos}</td>
                <td>{trabajador.correo}</td>

                <td className="acciones-3bot">
                    <div className="btn-group pull-right">
                        <Link  to={`/trabajador-edit/${trabajador.id}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip"
                               data-original-title={ "Editar Trabajador" }>
                            <i className="fa fa-edit fa-lg"></i>
                        </Link>
                        <Link  to={`/trabajador-del/${trabajador.id}`}   className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip"
                               data-original-title={ "Eliminar Trabajador" }>
                            <i className="fa fa-trash fa-lg"></i>
                        </Link>
                        <Link  to={`/trabajador-psw/${trabajador.id}`}   className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                               data-original-title={ "Cambiar Password" }>
                            <i className="fa fa-lock fa-lg"></i>
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default TrabajadorRow;