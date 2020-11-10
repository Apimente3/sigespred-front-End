import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {serverFile} from '../../config/axios';
const {$} = window;

const Row = ({row}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
            <tr>

                <td>{row.categoria}</td>
                <td>{row.denominacion}</td>
                <td>{row.urlpbi}</td>
                <td><a data-toggle="tooltip" data-original-title={ "Descargar archivo PBI" } className={"center"} href={serverFile+row.archivopbi.path} target={"_blank"}><img src={"./img/pbi.svg"} Style={"height:22px"}></img></a></td>


                <td>
                    <div className="btn-group pull-right">
                        <Link  to={`/indicador-visor/${row.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-eye fa-lg" data-toggle="tooltip" data-original-title={ "Visor" }></i></Link>
                        <Link  to={`/indicador-edit/${row.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg" data-toggle="tooltip" data-original-title={ "Editar" }></i></Link>
                        {/*     <Link  to={`/indicador-del/${row.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg" data-toggle="tooltip" data-original-title={ "Eliminar" }></i></Link>*/}

                    </div>
                </td>
            </tr>
        </>
    );
};

export default Row;