import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import moment from 'moment';
const {$} = window;

const MAddEntregable = ({closeventana, usevalue, dataproducto = null}) => {
    const [producto, setProducto] = useState({});

    useEffect(() => {
        function initialLoad() {
                if(dataproducto){
                    setProducto(dataproducto);
                    $('#detalleentregable').val(dataproducto.detalleentregable);
                } else { 
                    var idDate = moment().format("HHmmss");
                    setProducto({
                        ...producto,
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
        if(producto.numentregable && producto.numdias && producto.porcentajepago && producto.detalleentregable){
             usevalue(producto);
            return;
        }
        toastr.error('Añadir Entregable/Producto', 'Se requieren todos los datos indicados con asterisco (*).', {position: 'top-center'})
    }

    const handleInputChange=(e)=>{
        setProducto({
            ...producto,
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
                                <h4>Añadir Entregable / Producto</h4>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Nro. de Entregable
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="numentregable" name="numentregable"
                                    placeholder="Ingrese el número de entregable"
                                    required
                                    title="El número de entregable es requerido"
                                    onChange={handleInputChange}
                                    value = {producto.numentregable || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Plazo de Entregable (días)
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="numentregable" name="numdias"
                                    placeholder="Ingrese el plazo de entregable en días"
                                    required
                                    title="El Plazo de entrega es requerido"
                                    onChange={handleInputChange}
                                    value = {producto.numdias || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                <span className="obligatorio">* </span>Porcentaje de Pago para el Entregable
                                </label>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control input-sm uppercaseinput" id="porcentajepago" name="porcentajepago"
                                    placeholder="Ingrese el porcentaje de pago"
                                    title="El porcentaje de pago es requerido"
                                    required
                                    onChange={handleInputChange}
                                    value = {producto.porcentajepago || ""}
                                    />
                                </div>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-4 control-label">
                                    <span className="obligatorio">* </span>Detalle del Entregable / Producto
                                </label>
                                <div className="col-lg-8">
                                    <textarea className="form-control input-sm noresize" placeholder="INGRESE EL DETALLE DEL ENTREGABLE / PRODUCTO"
                                    rows="4" id="detalleentregable" name="detalleentregable" onChange={handleInputChange} required
                                    // value={producto.detalleentregable || ""}
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

export default MAddEntregable;