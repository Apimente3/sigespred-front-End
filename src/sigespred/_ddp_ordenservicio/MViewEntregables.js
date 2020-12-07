import React from 'react';

const MViewEntregables = ({closeventana, listaproductos, idos}) => {
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
                                <h5>Productos / Entregables asociados al Requerimiento con ID: {idos}</h5>
                            </div>
                            <form >
                                <div className="modal-body">
                                    <div className="mleft-20">
                                        <table className="table table-striped" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th key="numentregable">Nº ENTREGABLE</th>
                                                    <th key="plazo">PLAZO (DÍAS)</th>
                                                    <th key="detalle">DETALLE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {listaproductos && listaproductos.length > 0 &&  listaproductos.map(function(item, i){
                                                return (<tr key={`tr_l_${item.id}`}>
                                                            <td key={`n_${item.id}`}>{item.numentregable}</td>
                                                            <td key={`p_${item.id}`}>{item.numdias}</td>
                                                            <td key={`d_${item.id}`}>{item.detalleentregable}</td>
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

export default MViewEntregables;