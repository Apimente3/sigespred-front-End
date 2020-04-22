import React, {useEffect, useState} from 'react';
const uuidv4 = require('uuid/v4');


const ModalEditPoseedor = ({closeModal,propietario,editPropietario}) => {


    const [integrante, set_integrante] = useState(propietario);


    function handleInputChange_Integrante(e) {
        set_integrante({
            ...integrante,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    const guardarIntegrante = e => {
        e.preventDefault();
        editPropietario(integrante)
        closeModal(false)
    }
    
    const close=()=>{
        closeModal(false)
    }

    return (
        <>
            <div>
                <div id="lightCustomModal_background" className="popup_background backblq"
                ></div> 
                <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                    <div style={{transform: 'scale(1)', alignContent: 'left'}}
                         className="custom-popup light  popup_content popup_content_visible bloqueador2"
                         id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a onClick={close} href="#" className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width: '1100px'}}>
                            <div className="modal-header">

                                <h4>Actualizar de Poseedor</h4>
                            </div>
                            <form onSubmit={guardarIntegrante}>
                                <div className="modal-body">

                                    <div className="form-group">

                                        <label>Tipo Poseedor</label>
                                        <select

                                            className="form-control input-sm"
                                            name="tipo_poseedor"
                                            onChange={handleInputChange_Integrante}
                                            value={integrante.tipo_poseedor}


                                        >

                                            <option value="1">Mayor 10 años de antiguedad</option>
                                            <option value="2">Menor 10 años de antiguedad</option>


                                        </select>

                                    </div>

                                    <div className="form-group">

                                        <label>Tipo Documento</label>
                                        <select

                                            className="form-control input-sm"
                                            name="tipo_documento"
                                            onChange={handleInputChange_Integrante}
                                            value={integrante.tipo_documento}


                                        >

                                            <option value="DNI">DNI</option>
                                            <option value="RUC">RUC</option>


                                        </select>

                                    </div>

                                    <div className="form-group">

                                        <label>Nro. Documento</label>
                                        <input
                                            required={'required'}
                                            type="numeric"
                                            className="form-control input-sm"
                                            maxLength={ integrante.tipo_documento=='DNI'? '8':'11'}
                                            placeholder="Ingrese Nro. Documento"

                                            name="nro_documento"
                                            onChange={handleInputChange_Integrante}
                                            value={integrante.nro_documento}
                                        />

                                    </div>
                                    {integrante.tipo_documento=='DNI'?
                                        <div className="form-group">

                                            <label> Nombres</label>
                                            <input
                                                required={'required'}
                                                type="text"
                                                className="form-control input-sm"
                                                placeholder="Ingrese los Nombres"

                                                name="nombres"
                                                onChange={handleInputChange_Integrante}
                                                value={integrante.nombres}
                                            />

                                        </div>
                                        :null}


                                    {integrante.tipo_documento=='DNI'?
                                        null
                                        : <div className="form-group">

                                            <label> Razón Social</label>
                                            <input
                                                required={'required'}
                                                type="text"
                                                className="form-control input-sm"
                                                placeholder="Ingrese los Razón Social"

                                                name="razon_social"
                                                onChange={handleInputChange_Integrante}
                                                value={integrante.razon_social}
                                            />

                                        </div>}


                                    {integrante.tipo_documento=='DNI'?
                                        <div className="form-group">

                                            <label>Apellidos </label>
                                            <input
                                                required={'required'}
                                                type="text"
                                                className="form-control input-sm"
                                                placeholder="Ingrese los Apellidos / Nombre Comercial"

                                                name="apellidos"
                                                onChange={handleInputChange_Integrante}
                                                value={integrante.apellidos}
                                            />

                                        </div>
                                        : null}


                                    {integrante.tipo_documento=='DNI'?
                                        <div className="form-group">

                                            <label>Fecha Nacimiento</label>
                                            <input
                                                required={'required'}
                                                type="date"
                                                className="form-control input-sm"
                                                placeholder="Ingrese la fecha de nacimiento con fines de conocer la edad actual del Propietario"

                                                name="fecha_nacimiento"
                                                onChange={handleInputChange_Integrante}
                                                value={integrante.fecha_nacimiento}
                                            />

                                        </div>
                                        : null}



                                    <div className="form-group">

                                        <label>Teléfonos</label>
                                        <input
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese los Telefonos"

                                            name="telefonos"
                                            onChange={handleInputChange_Integrante}
                                            value={integrante.telefonos}
                                        />

                                    </div>


                                    <div className="form-group">
                                        <label>Correo</label>
                                        <input
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese el correo de contacto"

                                            name="correo"
                                            onChange={handleInputChange_Integrante}
                                            value={integrante.correo}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Dirección</label>
                                        <input
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese la direccion donde vive o donde se le puede ubicar del Propietario la mas detallada posible "

                                            name="direccion"
                                            onChange={handleInputChange_Integrante}
                                            value={integrante.direccion}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Observación al Propietario</label>
                                        <textarea
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese algunas observaciones Ejemplo: Restricciones de Edad, Efermedades Mentales y otros que vea conveniente"

                                            name="observacion"
                                            onChange={handleInputChange_Integrante}
                                            value={integrante.observacion}
                                        />
                                    </div>


                                </div>

                                <div className="modal-footer">
                                    <button type="submit"
                                            className="btn btn-danger btn-sm btn-control">Actualizar
                                    </button>
                                    <button onClick={close} type="button"
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

export default ModalEditPoseedor;