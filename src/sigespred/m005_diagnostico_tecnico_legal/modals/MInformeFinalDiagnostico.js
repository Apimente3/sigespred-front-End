import React, {useState} from 'react';
import UploadFile from "../../../components/helpers/uploaders/Upload";
import UploadMultiple from "../../../components/helpers/uploaders/UploadMultiple";
import {initAxiosInterceptors, serverFile} from "../../../config/axios";
import {toastr} from "react-redux-toastr";
import {useDispatch} from "react-redux";
import {listar_actividades_diagnostico} from "../../../actions/diagnostico/Actions";


const Axios = initAxiosInterceptors();

async function saveInformeFinal(informe_final) {
    const {data} = await Axios.post(`/informe_diagnostico`, informe_final);
    return data;
}

const MInformeFinalDiagnostico = ({solicitud, closeModalIF}) => {

    const {id} = solicitud;

    const [filesstate, setFilesstate] = useState([]);
    const [informe_final, setInforme_final] = useState({solicitud_id: id});
    const [informe_inspeccion, setInforme_inspeccion] = useState({});
    const closeModal = () => {
        closeModalIF(false);
    }

    const setFiles = (newListFiles) => {
        setFilesstate([...filesstate, newListFiles])
    }

    const removeFiles = (id) => {
        setFilesstate(
            filesstate.filter(file => file.id !== id)
        )
    }

    function handleInputChange(e) {


        setInforme_final({
            ...informe_final,
            [e.target.name]: e.target.value
        });
    }


    const dispatch = useDispatch();
    const listar_actividades_diagnostico_action = (solicitud_id) => dispatch(listar_actividades_diagnostico(solicitud_id));

    const guardarInformeFinal = async (e) => {
        e.preventDefault();
        try {
            const {data} = await saveInformeFinal({
                ...informe_final,
                informe_path: informe_inspeccion.filename, files: filesstate
            });
            closeModalIF(false);
            toastr.success(' Se registro correctamente la Visita a Campo.')
            listar_actividades_diagnostico_action(id)
        }
        catch (e) {
            console.log(e)
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
                        <a href="#" onClick={closeModal} className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>

                        <form onSubmit={guardarInformeFinal}>
                            <div className=" " style={{width: '1100px'}}>
                                <div className="modal-header">

                                    <h4>Registro de Informe Final del Diagnostico</h4>
                                </div>

                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Codigo del Informe Final</label>
                                            <input type="text" className="form-control input-sm"
                                                   placeholder=""
                                                   name="codigo"
                                                   onChange={handleInputChange}
                                                   value={informe_final.codigo}
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Digital del Informe Final</label><br/>
                                            <UploadFile key="upload_documento_envio" file={informe_inspeccion}
                                                        setFile={setInforme_inspeccion}></UploadFile>

                                        </div>
                                        <br/>
                                        <hr/>
                                        <div className="form-group">
                                            <label>Cantidad Predios para Adquisicion de Predios</label>
                                            <input type="text" className="form-control input-sm"
                                                   placeholder=""
                                                   name="cant_predios_adquisicion"
                                                   onChange={handleInputChange}
                                                   value={informe_final.cant_predios_adquisicion}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Cantidad Predios Transferencia InterEstatal</label>
                                            <input type="text" className="form-control input-sm"
                                                   placeholder=""
                                                   name="cant_predios_transinterestatal"
                                                   onChange={handleInputChange}
                                                   value={informe_final.cant_predios_transinterestatal}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Cantidad Predios Reconocimiento de Mejoras</label>
                                            <input type="text" className="form-control input-sm"
                                                   placeholder=""
                                                   name="cant_predios_recomejoras"
                                                   onChange={handleInputChange}
                                                   value={informe_final.cant_predios_recomejoras}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Cantidad Liberacion de Interfencias</label>
                                            <input type="text" className="form-control input-sm"
                                                   placeholder=""
                                                   name="cant_liberacionInterferencias"
                                                   onChange={handleInputChange}
                                                   value={informe_final.cant_liberacionInterferencias}
                                            />
                                        </div>
                                        <br/>
                                        <br/>
                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <label>Fecha Entrega del Informe</label>
                                                            <input type="date" className="form-control input-sm"
                                                                   placeholder="Ingrese el resumen de la visita"
                                                                   name="fecha_entrega"
                                                                   onChange={handleInputChange}
                                                                   value={informe_final.fecha_entrega}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <label>Archivos Adicionales</label><br/>

                                            </div>
                                            <hr/>
                                            <br/>
                                            <br/>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <UploadMultiple listFiles={[]} setListFiles={setFiles}
                                                                    removeFiles={removeFiles}/>

                                                </div>
                                            </div>

                                        </div>


                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <button id="btnguardar" type="submit"
                                            className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <button onClick={closeModal} type="button"
                                            className="btn btn-default btn-sm btn-control">Cerrar
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="popup_align bloqueador3">

                    </div>
                </div>
            </div>
        </>
    );
};

export default MInformeFinalDiagnostico;