import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {agregar} from "../../../actions/predios/Actions";
import {toastr} from 'react-redux-toastr'



const ModalAddProyecto = ({closeModal,solicitud}) => {

    const [proyecto, set_proyecto] = useState({});


    /*FUncion que guarda el objeto predio*/
    function handleInputChange(e) {
        set_proyecto({
            ...proyecto,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    const registrar= async (e)=>{
        e.preventDefault();
        try{
        
            closeModal()
        }catch (e) {

            toastr.error('ERROR !!! el codigo ingresado ya existe.')
        }


    }

    return (
        <>
            <div>
                <div id="lightCustomModal_background" className="popup_background backblq"
                ></div>
                <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                    <div style={{transform:'scale(1)',alignContent:'left'}} className="custom-popup light  popup_content popup_content_visible bloqueador2" id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a onClick={closeModal} href="#"  className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width:'1100px'}}>
                            <div className="modal-header">

                                <h4>Registro de Proyecto</h4>
                            </div>
                            <form onSubmit={registrar}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Código del Predio</label>
                                        <input
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese el código unico del Predio."

                                            name="codigo"
                                            onChange={handleInputChange}
                                            value={predio.codigo}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese la descripcion del Predios"
                                            name="descripcion"
                                            onChange={handleInputChange}
                                            value={predio.descripcion}
                                        />
                                    </div>




                                </div>

                                <div className="modal-footer">
                                    <button id="btnguardar" type="submit"
                                            className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <button onClick={closeModal} type="button"
                                            className="btn btn-default btn-sm btn-control">Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="popup_align bloqueador3" >

                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAddPredio;