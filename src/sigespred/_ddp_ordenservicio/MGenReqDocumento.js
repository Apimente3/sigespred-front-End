import React, { useState, useEffect } from "react";
import { toastr } from "react-redux-toastr";
import {serverFile} from "../../config/axios";
import {initAxiosInterceptors} from "../../config/axios";

const Axios = initAxiosInterceptors();
const {$} = window;

async function generarDocumento(idos) {
    const {data} = await Axios.get(`/ordenservicioprint/${idos}`);
    return data;
}

const MGenReqDocumento = ({closeventana, idos}) => {
    const [mensajeResultado, setMensajeResultado] = useState('El archivo se esta generando...');
    const [archivoResultado, setArchivoResultado] = useState('');
    useEffect(() => {
        async function initialLoad() {
                if(idos){
                    try {
                        let filepath = await generarDocumento(idos);
                        setMensajeResultado(`Se genero el archivo TDR para el requerimiento con id: ${idos}`);
                        setArchivoResultado(filepath);
                    } catch (error) {
                        toastr.error('Generación de TDR', 'Se encontró un error al intentar generar el archivo.', {position: 'top-center'})
                    }
                }
        }
        initialLoad();
    }, []);

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