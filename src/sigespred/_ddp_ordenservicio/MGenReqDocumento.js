import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import {serverFile} from "../../config/axios";
import {initAxiosInterceptors} from "../../config/axios";
import ComboOptions from "../../components/helpers/ComboOptions";

const Axios = initAxiosInterceptors();
const {$} = window;

async function genDocumento(idos,idplantilla) {
    const {data} = await Axios.get(`/ordenservicioprint/${idos}?idplantilla=${idplantilla}`);
    return data;
}

const MGenReqDocumento = ({closeventana, idos, listaplantillas}) => {
    console.log(listaplantillas);
    const [mensajeResultado, setMensajeResultado] = useState('');
    const [archivoResultado, setArchivoResultado] = useState('');
    const [valorPlantilla, setValorPlantilla] = useState('');
    
    const handleInputChange = (e) => {
        setValorPlantilla(e.target.value)
    }

    const generarDocumento = async() => {
       if(!valorPlantilla) {
            toastr.warning('Generación de TDR', "Debe seleccionar un plantilla. ");
            return
        }
        $('#btngenerar').button('loading');
        if(idos){
            try {
                setMensajeResultado('El archivo se esta generando...')
                let filepath = await genDocumento(idos, valorPlantilla);
                setMensajeResultado(`Se genero el archivo TDR para el requerimiento con id: ${idos}`);
                setArchivoResultado(filepath);
            } catch (error) {
                toastr.error('Generación de TDR', 'Se encontró un error al intentar generar el archivo.', {position: 'top-center'})
            }
        }
        $('#btngenerar').button('reset');
    }

    const closeModal=()=>{      
        closeventana(false);
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
                                <h4>Generación de Documento TDR</h4>
                            </div>
                            <div className="mtop-10 mleft-20">
                                Seleccione la Plantilla a Usar
                            </div>
                            <div className="form-group mtop-10">
                                        <label className="col-lg-4 control-label">
                                            <span className="obligatorio">* </span>Plantilla
                                        </label>
                                        <div className="col-lg-8">
                                            <select className="form-control input-sm" id="templateid" name="templateid"
                                                onChange={handleInputChange}
                                                >
                                                <option value="">--SELECCIONE--</option>
                                                {listaplantillas &&
                                                <ComboOptions data={listaplantillas} valorkey="id" valornombre="nombre" />
                                                }
                                            </select>
                                        </div>
                            </div>
                            <div className="form-group text-right">
                                <button id="btngenerar" type="button" onClick={generarDocumento} className="btn btn-info btn-sm fullborder">
                                    <i className="fa fa-file-word-o"></i> Generar TDR
                                </button>
                            </div>
                            <div className="form-group mtop-10">
                                <label className="col-lg-12">
                                    {mensajeResultado}
                                </label>
                                <div className="col-lg-12 mtop-10">
                                    {archivoResultado &&
                                        <a key={`adig_${idos}`} href={serverFile + archivoResultado} target="_blank" >{archivoResultado}</a>
                                    }
                                </div>
                                <div className="col-lg-12 mtop-10">
                                    {archivoResultado &&
                                        "(Puede descargar el archivo haciendo clic en el enlace anterior)"
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
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

export default MGenReqDocumento;