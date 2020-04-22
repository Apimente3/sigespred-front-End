import React, {useEffect, useState} from 'react';
import UploadFile from "../../../components/helpers/uploaders/Upload";

import {initAxiosInterceptors, serverFile} from "../../../config/axios";
import {toastr} from "react-redux-toastr";
import {useDispatch, useSelector} from 'react-redux';
import {listar_actividades_diagnostico} from "../../../actions/diagnostico/Actions";

const Axios = initAxiosInterceptors();

/*Funcion que permite guardar el archivo*/
async function listarEntidadesSolicitud() {
    const {data} = await Axios.get(`/entidades_consulta`);
    return data;
}


const ModalUploadFile = ({name_propertie, row_id, closeModalUploadImage, actualizargrid}) => {

    //alert(row_id)


    const upload_name_propertie = name_propertie;
    const upload_row_id = row_id;

    const [propertie, setPropertie] = useState(name_propertie);
    const [id, setId] = useState(row_id);
    const [proyecto, set_proyecto] = useState({polygono: null, portada_imagen: '', propiedad: name_propertie});

    useEffect(() => {
        async function init() {
            try {
                setPropertie(name_propertie);
                setId(row_id);
            } catch (error) {
                console.log(error);
            }
        }

        init();
    }, []);

    const saveFotoPortada1 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen": file.filename
        });
    }

    const eliminarPortada01 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen": ''
        });
    }

    const guardar = async (e) => {

        try {
            const {data} = await Axios.post(`/save_adquisicion_predial`, {
                id: upload_row_id,
                [upload_name_propertie]: proyecto.portada_imagen
            });

            toastr.info('Se actualizó correctamente la tabla ', {"position": "bottom-center",});
            actualizargrid(e);
        } catch (e) {
            toastr.info(JSON.stringify(e), {"position": "bottom-center",})
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
                        <a href="#" onClick={closeModalUploadImage}
                           className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width: '1100px'}}>
                            <div className="modal-header">

                                <h4>Subir archivo para el campo: "{upload_name_propertie}"</h4>
                            </div>
                            <form>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Archivo :
                                        </label>

                                        <div className="col-lg-8">

                                            <UploadFile key="portada_imagen" file={{
                                                urlDocumento: '',
                                                originalName: ''
                                            }}
                                                        setFile={saveFotoPortada1}
                                                        eliminar={eliminarPortada01}></UploadFile>


                                        </div>


                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button onClick={guardar} type="button"
                                            className="btn btn-danger btn-sm btn-control">
                                        Guardar
                                    </button>
                                    <button type="button" onClick={closeModalUploadImage}
                                            className="btn btn-default btn-sm btn-control">
                                        Cerrar
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


export default ModalUploadFile;
    


