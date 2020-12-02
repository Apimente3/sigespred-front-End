import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import ComboOptions from "../../components/helpers/ComboOptions";
import moment from 'moment';

export const MAddGanadera = ({closeventana, usevalue, listaTipoGanadero, dataganadero = null }) => {
    const [ganadero, setGanadero] = useState({});
    
    useEffect( ()=>{
        function initialLoad() {
            if(dataganadero) {
                setGanadero(dataganadero);
            }else {
                var idDate = moment().format("HHmmss");
                
                setGanadero({
                    ...ganadero,
                    id: idDate
                })

            }
        }
        initialLoad();
    }, []);

    
    const closeModal=()=>{      
        closeventana(false);
    }
    const handleInputChange=(e)=>{
        setGanadero({
            ... ganadero,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    const addUpdateValor=()=>{
        if(ganadero.tipoganadero){
            usevalue(ganadero);
            return;
        }

        toastr.error('Añadir Caracteristicas de Ganaderia', 'Se requiere seleccionar el Tipo Ganaderia.', {position: 'top-center'})
    }
    return (
        <div>
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
                                    <h4>Añadir caracteristicas tecnicas de la explitacion Ganadera</h4>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span> Tipo
                                </label>
                                <div className="col-lg-8">
                                    <select  
                                        className="form-control input-sm"  
                                        value={ganadero.tipoganadero || ""}
                                        required
                                        title="El Tipo Ganadero es Requerido"
                                        onChange={handleInputChange}
                                        name={"tipoganadero"}>
                                        <option value="">--SELECCIONE--</option>
                                        {listaTipoGanadero &&
                                            <ComboOptions data={listaTipoGanadero} valorkey="valortexto" valornombre="valortexto"/>
                                        } 
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Cantidad
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="cantidad" name="cantidad"
                                    placeholder="Ingrese la cantaidad"
                                    title="El tramo es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {ganadero.cantidad || ""}
                                    />
                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                <a onClick={addUpdateValor} className="btn btn-info btn-sm dropdown-toggle pull-left">Agregar</a>
                                <a onClick={closeModal} className="btn btn-default btn-sm btn-control">Cerrar</a>
                            </div>
                        </div>
                    </div>
                    <div className="popup_align bloqueador3"></div> 
                </div>
                    
                </div>
            </form>  
        </div>
    )
}
