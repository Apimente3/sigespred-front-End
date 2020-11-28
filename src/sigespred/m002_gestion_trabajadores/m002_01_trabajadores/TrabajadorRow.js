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

                <td>
                    <div className="btn-group pull-right">

                        <Link  to={`/trabajador-edit/${trabajador.id}`}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                               data-original-title={ "Editar Trabajador" }>
                            <i className="far fa-edit"></i>
                        </Link>
                        <Link  to={`/trabajador-del/${trabajador.id}`}   className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                               data-original-title={ "Eliminar Trabajador" }>

                            <i className="fas fa-trash"></i>
                        </Link>

                        <Link  to={`/trabajador-psw/${trabajador.id}`}   className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                               data-original-title={ "Cambiar Password" }>
                            <i className="fas fa-lock"></i>
                        </Link>





                    </div>
                </td>
            </tr>
        </>
    );
};

export default TrabajadorRow;