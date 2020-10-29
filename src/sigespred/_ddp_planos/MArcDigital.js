import React from 'react';
import {Link} from "react-router-dom";

const MArcDigital = ({closeventana, codplano, archivosdescargar}) => {
    
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
                        <div className=" " style={{width: '650px'}}>
                            <div className="modal-header">
                                <h5>Archivos Digitales del Plano: {codplano}</h5>
                            </div>
                            <form >
                                <div className="modal-body">
                                    <div className="mleft-20">
                                        <table className="table table-striped" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th key="lamina">DESC.</th>
                                                    <th key="digital">ARC. DIGITAL</th>
                                                    <th key="memoria">ARC. MEMORIA DESC.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {archivosdescargar && archivosdescargar.length > 0 &&  archivosdescargar.map(function(item, i){
                                                return (<tr key={`tr_lam_${item.laminaid}`}>
                                                            <td key={`lam_${item.laminaid}`}>{item.lamina}</td>
                                                            <td key={`dig_${item.laminaid}`}>{item.digital}</td>
                                                            <td key={`mem_${item.laminaid}`}>{item.memdescriptiva}</td>
                                                        </tr>)
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="modal-footer">
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

export default MArcDigital;