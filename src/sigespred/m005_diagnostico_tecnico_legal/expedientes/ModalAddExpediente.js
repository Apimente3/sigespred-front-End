import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors} from "../../../config/axios";
import {toastr} from "react-redux-toastr";
const uuidv4 = require('uuid/v4');
const {$}=window;
const Axios = initAxiosInterceptors();

async function save_expediente_server(expediente) {
    const {data} = await Axios.post(`/expediente`, expediente);
    return data;
}

var property = null;

const ModalAddExpediente = ({propietario, closeModal}) => {

    //Estado del expediente
    const comboPropietarios = propietario;
    const [expediente, set_expediente] = useState({});
    const [sujeto_pasivo, set_sujeto_pasivo] = useState(propietario);
    property = propietario;
    console.log(propietario);


    /*Funcion que cierra el modal de add expediente*/
    const cerraModal = () => {
        closeModal();
    }

    /**/
    function handleInputChange(e) {

        set_expediente({
            ...expediente,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    /*Funcion que registra un expediente*/
    const registrarExpediente = async e => {

        try {
            e.preventDefault();
            
          //  if(!expediente.tipo_sujetopasivo_id)
            /*Validacion de digital de documento*/

            if(!expediente.tipo_sujetopasivo_id) {
                throw {error: " Tipo de Sujeto Pasivo "}
            }
            if(!expediente.tipo_expediente_id || expediente.tipo_expediente_id=='0') {
                throw {error: " Tipo de Expediente "}
            }
           
            /*Obteniendo los procesos*/
            let resumen_titular=$('#drpsujetopasivo option:selected').text();
            let resumen_documentos=$('#drpsujetopasivo option:selected').val();


            if(typeof resumen_documentos=="undefined" ||resumen_titular.length==0) {
                throw {error: "Seleccione un sujeto pasivo "}
            }

            let proyecto = JSON.parse(localStorage.getItem('PROYECTO_CURRENT'))[0];
            let predio = JSON.parse(localStorage.getItem('PREDIO_CURRENT'));
            console.log({
                ...expediente,
                predio_codigo: predio.codigo,
                proyecto_codigo: proyecto.codigo,
                resumen_titular:resumen_titular,
                resumen_documentos:resumen_documentos
            })
            await save_expediente_server({
                ...expediente,
                predio_codigo: predio.codigo,
                proyecto_codigo: proyecto.codigo,
                resumen_titular:resumen_titular,
                resumen_documentos:resumen_documentos,
                predio_id:predio.id,
                proyecto_id:proyecto.id
            });
            closeModal();
        }
        catch (e) {
            toastr.error(e.error)
        }


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
                        <a onClick={cerraModal} href="#" className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width: '1100px'}}>
                            <div className="modal-header">
                                <h4>Registro de Expediente</h4>
                            </div>
                            <form onSubmit={registrarExpediente}>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label>Tipo Sujeto Pasivo</label>
                                        <select

                                            className="form-control input-sm"
                                            name="tipo_sujetopasivo_id"
                                            onChange={handleInputChange}
                                            value={expediente.tipo_sujetopasivo_id}
                                        >
                                            <option value="0">--TODOS--</option>
                                            <option value="1">PROPIETARIO</option>
                                            <option value="2">POSESIONARIO MAYOR DE 10 AÑOS</option>
                                            <option value="3">POSESIONARIO MENOS DE 10 AÑOS</option>
                                            <option value="4">OCUPANTE</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Sujeto Pasivo</label>
                                        <select
id="drpsujetopasivo"
                                            className="form-control input-sm"
                                            name="tipo_poseedor"
                                            onChange={handleInputChange}
                                            value={expediente.tipoexpediente}
                                            multiple
                                        >

                                            {
                                                sujeto_pasivo.length !== 0 ?
                                                    sujeto_pasivo.map(item =>
                                                        <option
                                                            value={item.nro_documento}>{item.tipo}: {item.sujetopasivo}</option>
                                                    ) : null
                                            }
                                        </select>


                                    </div>


                                    <div className="form-group">
                                        <label>Tipo Expediente</label>
                                        <select

                                            className="form-control input-sm"
                                            name="tipo_expediente_id"
                                            onChange={handleInputChange}
                                            value={expediente.tipo_expediente_id}
                                        >
                                            <option value="0">--SELECCIONAR--</option>
                                            <option value="1">ADQUISICION EXPROPIACION</option>
                                            <option value="2">PAGO DE MEJORAS</option>
                                            <option value="3">TRANSFERENCIAS INTERESTATALES</option>
                                            <option value="4">LIBERACION DE INTERFERENCIAS</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Codigo del Expediente</label>
                                        <input
                                            required={'required'}
                                            type="numeric"
                                            className="form-control input-lg"
                                            placeholder="Ingrese Codigo del Expediente."
                                            name="codigo"
                                            onChange={handleInputChange}
                                            value={expediente.codigo}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger btn-sm btn-control">Guardar</button>
                                    <button onClick={cerraModal} type="button"
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

export default ModalAddExpediente;