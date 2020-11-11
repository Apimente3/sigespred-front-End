import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";

const MParticipante = ({closeventana, codacta, participante, checkFinalizo, handleUpdateClick}) => { 
    
    const closeModal=()=>{      
        closeventana(false);
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
                                                    <th key="finalizo">FINALIZO</th>
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
                                                            <td key={`estado_${item.estadocomp}`}><input type="checkbox" name="finalizo" onChange={(e) => checkFinalizo(i,e)} defaultChecked={item.estadocomp=='CUMPLIDO'? true: false}/></td>
                                                        </tr>)
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button class="btn btn-sm btn-info" type="button" onClick={(e) => handleUpdateClick(e)}><i
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