import React,{useEffect} from 'react';
import {Link} from "react-router-dom";
const {$} = window;

const RowAcuerdo = ({acuerdo,nro,loadParticipantes, showaction=true}) => {

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
        alerta = <span key={`span_1_${nro}`} className="badge badge-danger">{acuerdo.alerta}</span>;
    }else if(acuerdo.alerta=='Por vencer'){
        alerta = <span key={`span_1_${nro}`} className="badge badge-warning">{acuerdo.alerta}</span>;
    }else if(acuerdo.alerta=='Cumplido'){
        alerta = <span key={`span_1_${nro}`} className="badge badge-success">{acuerdo.alerta}</span>;
    }else{
        alerta = <span key={`span_1_${nro}`} className="badge badge-info">{acuerdo.alerta}</span>;
    }
    return (
        <>
            <tr key={`tr_${nro}`}>
                <td key={`td_1_${nro}`}>{nro+1}</td>
                <td key={`td_2_${nro}`}>{acuerdo.codigoacta}</td>
                <td key={`td_3_${nro}`}>{acuerdo.denominacion}</td>
                <td key={`td_4_${nro}`}>{acuerdo.equipo}</td>
                <td key={`td_5_${nro}`}>{acuerdo.usuario}</td>
                <td key={`td_6_${nro}`}>{acuerdo.actividad}</td>
                <td key={`td_7_${nro}`}>{acuerdo.producto}</td>
                <td key={`td_8_${nro}`}>{acuerdo.descripcion}</td>
                <td key={`td_9_${nro}`}>{acuerdo.asistencia? 'ASISTIO':'FALTO'}</td>
                <td key={`td_10_${nro}`}>{acuerdo.fechainicio}</td>
                <td key={`td_11_${nro}`}>{acuerdo.fechacomp}</td>
                <td key={`td_12_${nro}`}>{alerta}</td>
                <td key={`td_13_${nro}`}>{acuerdo.estadocomp}</td>
                {
                    showaction &&
                        <td key={`btnaccion_${nro}`}>
                            <div className="btn-group pull-right" key={`div_${nro}`}>
                                <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip" key={`btn_${nro}`}
                                data-original-title={ "Actualizar estados de compromiso" }>
                                    <i className="fa fa-check-circle fa-lg" key={`i_${nro}`}
                                        onClick={() => cargarPartPopup(acuerdo.codigoacta, acuerdo)}
                                    />
                                </button>
                            </div>
                        </td>
                }
            </tr>
        </>
    );
};

export default RowAcuerdo;