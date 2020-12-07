import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import moment from 'moment';
const {$} = window;

const MAddActividad = ({closeventana, usevalue, dataactividad = null}) => {
    const [actividad, setActividad] = useState({});

    useEffect(() => {
        function initialLoad() {
                if(dataactividad){
                    setActividad(dataactividad);
                    $('#descripcionactividad').val(dataactividad.descripcionactividad);
                } else { 
                    var idDate = moment().format("HHmmss");
                    setActividad({
                        ...actividad,
                        id: idDate
                    });
                }
        }
        initialLoad();
    }, []);

    const closeModal=()=>{      
        closeventana(false);
    }

    const addUpdateValor=()=>{
        if(actividad.descripcionactividad){
             usevalue(actividad);
            return;
        }
        toastr.error('Añadir Actividad', 'Se requieren todos los datos indicados con asterisco (*).', {position: 'top-center'})
    }

    const handleInputChange=(e)=>{
        setActividad({
            ...actividad,
            [e.target.name]: e.target.value
        });
    }
    
    return (
        <>
        <form className={"form-horizontal"}>
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
                        <div className=" " style={{width: '600px'}}>
                            <div className="modal-header">
                                <h4>Añadir Actividad / Alcance</h4>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Actividad / Alcance
                                </label>
                                <div className="col-lg-8">
                                    <textarea className="form-control input-sm noresize" placeholder="INGRESE EL DETALLE DE LA ACTIVIDAD"
                                    rows="4" id="descripcionactividad" name="descripcionactividad" onChange={handleInputChange} required
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a onClick={addUpdateValor} className="btn btn-info btn-sm dropdown-toggle pull-left">Agregar</a>
                                <a onClick={closeModal} className="btn btn-default btn-sm btn-control">Cerrar</a>
                            </div>
                        </div>


                    </div>
                    <div className="popup_align bloqueador3">

                    </div>
                </div>
            </div>
            </form>
        </>
    );
};

export default MAddActividad;