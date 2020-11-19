import React,{useEffect} from 'react';
import {Link} from "react-router-dom";
const {$} = window;

const RowActa = ({acta,nro,loadfiles}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    const cargarPopup = (codacta, jsoncontent) => {
        console.log(jsoncontent);
        loadfiles(codacta, jsoncontent);
    }
    return (
        <>
            <tr key={nro}>
                <td key={`nro_${nro}`}>{nro+1}</td>
                <td key={`codigo_${nro}`}>{acta.codigoacta}</td>
                <td key={`equipo_${nro}`}>{acta.Equipo.equipo}</td>
                <td key={`monitor_${nro}`}>{acta.monitor}</td>
                <td key={`denominacion_${nro}`}>{acta.Equipo.GestionPredial.denominacion}</td>
                <td key={`fecha_${nro}`}>{acta.fecha}</td>
                <td key={`duracion_${nro}`}>{acta.duracion}</td>
                <td key={`estado_${nro}`}>{acta.estado}</td>
                <td key={`btn_${nro}`} className="acciones-1bot pull-center">
                    <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip"  data-original-title={ "Ver Agenda" }>
                        <i className="fa fa-book fa-lg" onClick={() => cargarPopup(acta.codigoacta, acta.agenda)} />
                    </button>
                </td>
                <td key={`btnaccion_${nro}`} className="acciones-2bot pull-center">
                    <div className="btn-group">
                        <Link  to={`/acta-edit/${acta.id}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip"  data-original-title={ "Actualizar" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        <Link  to={`/acta-del/${acta.id}`}   className="btn btn-xs btn-default" type="button" data-toggle="tooltip"  data-original-title={ "Eliminar" }><i
                            className="fa fa-trash-o fa-lg"></i></Link>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default RowActa;