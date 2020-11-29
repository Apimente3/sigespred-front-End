import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import moment from 'moment';

const MAddEditInvitado = ({closeventana, usevalue}) => {
    const [invitado, setInvitado] = useState({});

    useEffect(() => {
        function initialLoad() {
                var idDate = moment().format("HHmmss");
                setInvitado({
                    ...invitado,
                    id: idDate
                });
        }
        initialLoad();
    }, []);

    const closeModal=()=>{      
        closeventana(false);
    }

    const addUpdateValor=()=>{
        if(invitado.nombreinvitado && invitado.areaentidad){
            usevalue(invitado);
            return;
        }
        toastr.error('Añadir Invitados', 'Se requiere el nombre y el área o entidad.', {position: 'top-center'})
    }

    const handleInputChange=(e)=>{
        setInvitado({
            ...invitado,
            [e.target.name]: e.target.value.toUpperCase()
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
                        <div className=" " style={{width: '500px'}}>
                            <div className="modal-header">
                                <h4>Añadir Invitado a Acta</h4>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Nombre del Invitado
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="nombreinvitado" name="nombreinvitado"
                                    placeholder="Nombre y Apellidos"
                                    required
                                    title="El nombre del invitado es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {invitado.nombreinvitado || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Área o Entidad
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="areaentidad" name="areaentidad"
                                    placeholder="Nombre de entidad o área de MTC"
                                    required
                                    title="La entidad o área es requerida"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {invitado.areaentidad || ""}
                                    />
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

export default MAddEditInvitado;