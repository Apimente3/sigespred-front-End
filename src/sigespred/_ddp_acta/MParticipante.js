import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import ComboOptions from "../../components/helpers/ComboOptions";

const MParticipante = ({closeventana, codacta, participante, handleUpdateClick, listadovalores}) => { 
    
    const closeModal=()=>{      
        closeventana(false);
    }

    const ejecutarUpdate=(e)=> {
        handleUpdateClick(e, participantePopup)
    }

    const [participantePopup, setParticipantePopup] = useState(participante[0]);

    function handleInputChange(e) {
        setParticipantePopup({
            ...participantePopup,
            [ e.target.name ]: e.target.value
        });
        
    }

    return (
        <>
            <div>
                <div id="lightCustomModal_background" className="popup_background backblq"></div>
                <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                    <div style={{transform: 'scale(1)', alignContent: 'left'}}
                         className="custom-popup light  popup_content popup_content_visible bloqueador2"
                         id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a onClick={closeModal} className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " >
                            <div className="modal-header">
                                <h5>Codigo de acta: {codacta}</h5>
                            </div>
                            <form >
                                <div className="modal-body">
                                    <div className="mleft-20">
                                        <table className="table table-striped" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th key="nro">NRO</th>
                                                    <th key="profesional">PROFESIONAL</th>
                                                    <th key="actividad">ACTIVIDAD</th>
                                                    <th key="producto">PRODUCTO</th>
                                                    <th key="descripcion">DESCRIPCION</th>
                                                    <th key="fechainicio">FECHA INICIO</th>
                                                    <th key="fechacomp">FECHA COMP.</th>
                                                    <th key="finalizo">ESTADO</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {participante && participante.length > 0 &&  participante.map(function(item, i){
                                                return (<tr key={i}>
                                                            <td key={`nro_${i}`}>{i+1}</td>
                                                            <td key={`profesional_${item.usuario}`}>{item.usuario}</td>
                                                            <td key={`actividad_${item.actividad}`}>{item.actividad}</td>
                                                            <td key={`producto_${item.producto}`}>{item.producto}</td>
                                                            <td key={`descripcion_${item.descripcion}`}>{item.descripcion}</td>
                                                            <td key={`fechainicio_${item.fechainicio}`}>{item.fechainicio}</td>
                                                            <td key={`fechacomp_${item.fechacomp}`}>{item.fechacomp}</td>
                                                            <td key={`estado_${item.estadocomp}`}>{item.estadocomp}</td>
                                                        </tr>)
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">
                                            <span className="obligatorio">* </span>Estado
                                        </label>
                                        <div className="col-lg-8">
                                            <select className="form-control input-sm" id="estadocomp" name="estadocomp"
                                            value={participantePopup.estadocomp || ""}
                                            onChange={handleInputChange}
                                            >
                                                <option value="">--SELECCIONE--</option>
                                                {listadovalores.result &&
                                                    <ComboOptions data={listadovalores.result} valorkey="valorcodigo" valornombre="valortexto"/>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-4 control-label">
                                            Observación
                                        </label>
                                        <div className="col-lg-8">
                                            <input type="text" className="form-control input-sm uppercaseinput" id="observacion" name="observacion"
                                            placeholder="Ingrese alguna observación o comentario"
                                            autoComplete = "off"
                                            value={participantePopup.observacion || ""}
                                            onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button class="btn btn-sm btn-info" type="button" onClick={(e) => ejecutarUpdate(e)}><i
                                        class="fa fa-plus fa-lg"
                                    /> Actualizar </button>
                                    <button onClick={closeModal} type="button"
                                            className="btn btn-default btn-sm btn-control">Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="popup_align bloqueador3">

                    </div>
                </div>
            </div>
        </>
    );
};

export default MParticipante;