import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import ComboOptions from "../../components/helpers/ComboOptions";
import moment from 'moment';

const MAddTitularPredio = ({closeventana, usevalue, listatipodoc, listaestadocivil, datatitular = null}) => {
    const [titular, setTitular] = useState({});

    useEffect(() => {
        function initialLoad() {
                if(datatitular){
                    setTitular(datatitular);
                } else { 
                    var idDate = moment().format("HHmmss");
                    setTitular({
                        ...titular,
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
        if(titular.nombretitular && titular.tipodocumento){
            usevalue(titular);
            return;
        }
        toastr.error('Añadir Titular de Predio', 'Se requiere el nombre y el tipo de documento del titular.', {position: 'top-center'})
    }

    const handleInputChange=(e)=>{
        setTitular({
            ...titular,
            [e.target.name]: e.target.value.toUpperCase()
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
                        <div className=" " style={{width: '600px'}}>
                            <div className="modal-header">
                                <h4>Añadir Titular del Predio</h4>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Nombre del titular
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="nombretitular" name="nombretitular"
                                    placeholder="Nombre Completo del Titular"
                                    required
                                    title="El nombre del titular es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {titular.nombretitular || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Tipo de Documento
                                </label>
                                <div className="col-lg-8">
                                <select  className="form-control input-sm"  value={titular.tipodocumento || ""}
                                    required
                                    title="El Tipo de Documento es Requerido"
                                    onChange={handleInputChange}
                                    name={"tipodocumento"}>
                                    <option value="">--SELECCIONE--</option>
                                    {listatipodoc &&
                                        <ComboOptions data={listatipodoc} valorkey="valortexto" valornombre="valortexto"/>
                                    }
                                </select>
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Número de Documento
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="numerodocumento" name="numerodocumento"
                                    placeholder="Número de documento del titular"
                                    title="El número de documento es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {titular.numerodocumento || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Estado Civil del Titular
                                </label>
                                <div className="col-lg-8">
                                <select  className="form-control input-sm"  value={titular.estadocivil || ""}
                                        onChange={handleInputChange}
                                        name={"estadocivil"}>
                                    <option value="">--SELECCIONE--</option>
                                    {listaestadocivil &&
                                    <ComboOptions data={listaestadocivil} valorkey="valortexto" valornombre="valortexto"/>
                                    }
                                </select>
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
        </>
    );
};

export default MAddTitularPredio;