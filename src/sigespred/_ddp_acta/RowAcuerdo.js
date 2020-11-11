import React,{useEffect} from 'react';
import {Link} from "react-router-dom";
const {$} = window;

const RowAcuerdo = ({acuerdo,nro,loadParticipantes}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    const cargarPartPopup = (codacta, jsoncontent) => {
        loadParticipantes(codacta, jsoncontent);
    }

    let alerta;
    if(acuerdo.alerta=='Vencido'){
        alerta = <span className="badge badge-danger">{acuerdo.alerta}</span>;
    }else if(acuerdo.alerta=='Por vencer'){
        alerta = <span className="badge badge-warning">{acuerdo.alerta}</span>;
    }else if(acuerdo.alerta=='Cumplido'){
        alerta = <span className="badge badge-success">{acuerdo.alerta}</span>;
    }else{
        alerta = <span className="badge badge-info">{acuerdo.alerta}</span>;
    }
   
    return (
        <>
            <tr key={nro}>
                <td>{nro+1}</td>
                <td>{acuerdo.codigoacta}</td>
                <td>{acuerdo.denominacion}</td>
                <td>{acuerdo.equipo}</td>
                <td>{acuerdo.usuario}</td>
                <td>{acuerdo.actividad}</td>
                <td>{acuerdo.producto}</td>
                <td>{acuerdo.descripcion}</td>
                <td>{acuerdo.asistencia? 'ASISTIO':'FALTO'}</td>
                <td>{acuerdo.fechainicio}</td>
                <td>{acuerdo.fechacomp}</td>
                <td>{alerta}</td>
                <td>{acuerdo.estadocomp}</td>
                <td key={`btnaccion_${nro}`}>
                    <div className="btn-group pull-right">
                        <button class="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip"  data-original-title={ "Actualizar estados de compromiso" }>
                            <i
                                class="fa fa-check-circle fa-lg"
                                onClick={() => cargarPartPopup(acuerdo.codigoacta, acuerdo)}
                            />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default RowAcuerdo;