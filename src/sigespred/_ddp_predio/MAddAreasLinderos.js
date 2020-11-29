import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import ComboOptions from "../../components/helpers/ComboOptions";
import moment from 'moment';

const MAddAreasLinderos = ({closeventana, usevalue, listaTipoLindero, datalindero = null }) => {

    const [linderos, setLinderos] = useState({});

    useEffect( ()=>{
        function initialLoad() {
            if(datalindero) {
                setLinderos(datalindero);
            }else {
                var idDate = moment().format("HHmmss");
                
                setLinderos({
                    ...linderos,
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
        setLinderos({
            ... linderos,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    const addUpdateValor=()=>{
        if(linderos.tipolindero){
            usevalue(linderos);
            return;
        }

        toastr.error('Añadir areas y linderos', 'Se requiere seleccionar el lindero.', {position: 'top-center'})
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
                                    <h4>Añadir Areas y Linderos del predio</h4>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span> Linderos
                                </label>
                                <div className="col-lg-8">
                                    <select  
                                        className="form-control input-sm"  
                                        value={linderos.tipolindero || ""}
                                        required
                                        title="El Tipo de Lindero es Requerido"
                                        onChange={handleInputChange}
                                        name={"tipolindero"}>
                                        <option value="">--SELECCIONE--</option>
                                        {listaTipoLindero &&
                                            <ComboOptions data={listaTipoLindero} valorkey="valortexto" valornombre="valortexto"/>
                                        } 
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Colindancias
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="colindancia" name="colindancia"
                                    placeholder="Ingrese la colindancia del predio"
                                    title="La colindancia del predio"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {linderos.colindancia || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Tramo
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="tramo" name="tramo"
                                    placeholder="Ingrese el Tramo del predio"
                                    title="El tramo es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {linderos.tramo || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Longitud (m)
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="longitud" name="longitud"
                                    placeholder="Ingrese la longitud"
                                    title="La longitud es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {linderos.longitud || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    Numeración Municipal
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="nummunicipal" name="nummunicipal"
                                    placeholder="Ingrese la numeracion municipal"
                                    title="El numero municipal es requerido"
                                    autoComplete = "off"
                                    onChange={handleInputChange}
                                    value = {linderos.nummunicipal || ""}
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
        </>
    );
};


export default MAddAreasLinderos;
