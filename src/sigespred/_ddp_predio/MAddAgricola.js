import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import ComboOptions from "../../components/helpers/ComboOptions";
import moment from 'moment';


export const MAddAgricola = ({closeventana, usevalue, listaTipoAgricola, dataagricola = null }) => {
    const [agricola, setAgricola] = useState({});
    useEffect( ()=>{
        function initialLoad() {
            if(dataagricola) {
                setAgricola(dataagricola);
            }else {
                var idDate = moment().format("HHmmss");
                
                setAgricola({
                    ...agricola,
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
        setAgricola({
            ... agricola,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    const addUpdateValor=()=>{
        if(agricola.tipoagricola){
            usevalue(agricola);
            return;
        }

        toastr.error('Añadir Caracteristicas Agricolas', 'Se requiere seleccionar el Tipo Agricola.', {position: 'top-center'})
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
                                    <h4>Añadir caracteristicas tecnicas de la explotacion agricola</h4>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span> Tipo
                                </label>
                                <div className="col-lg-8">
                                    <select  
                                        className="form-control input-sm"  
                                        value={agricola.tipoagricola || ""}
                                        required
                                        title="El Tipo Agricola es Requerido"
                                        onChange={handleInputChange}
                                        name={"tipoagricola"}>
                                        <option value="">--SELECCIONE--</option>
                                        {listaTipoAgricola &&
                                            <ComboOptions data={listaTipoAgricola} valorkey="valortexto" valornombre="valortexto"/>
                                        } 
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Descripcion
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="descripcion" name="descripcion"
                                    placeholder="Ingrese la colindancia del predio"
                                    title="La descripcion del predio"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {agricola.descripcion || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Porcentaje
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="porcentaje" name="porcentaje"
                                    placeholder="Ingrese el porcentaje del predio"
                                    title="El tramo es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {agricola.porcentaje || ""}
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
        </>
    )
}
