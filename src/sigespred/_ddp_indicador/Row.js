import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
const {$} = window;

const TrabajadorRow = ({object}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
            <tr>

                <td>{object.categoria}</td>
                <td>{object.denominacion}</td>
                <td>{object.urlpbi}</td>
                <td>{object.archivopbi}</td>


                <td>
                    <div className="btn-group pull-right">
                        <Link  to={`/indicador-edit/${object.id}`}  className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/indicador-del/${object.id}`}   className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></Link>

                    </div>
                </td>
            </tr>
        </>
    );
};

export default TrabajadorRow;