import React, {useState} from 'react';

import UploadFile from "../../../components/helpers/uploaders/Upload";

import {initAxiosInterceptors, serverFile} from "../../../config/axios";
import  TextArea from '../../../components/helpers/TextArea';
import UploadMultiple from "../../../components/helpers/uploaders/UploadMultiple";
import {toastr} from "react-redux-toastr";
import {listar_actividades_diagnostico} from "../../../actions/diagnostico/Actions";
import {useDispatch} from "react-redux";
const {$} =window;

const Axios = initAxiosInterceptors();
async function saveVisistaCampo(visita_campo) {
    const {data} = await Axios.post(`/inspeccion_campo`,visita_campo);
    return data;
}


const MvisitaCampo = ({solicitud,closeModalVC}) => {


    const {id}=solicitud;

    const [informe_inspeccion, setInforme_inspeccion] = useState('');
    const [filesstate, setFilesstate] = useState([]);
    const [filesaditional, setFilesaditional] = useState([]);
    const [inspeccion_campo,setInspeccion_campo]=useState({solicitud_id:id});

    const dispatch = useDispatch();
    const listar_actividades_diagnostico_action = (solicitud_id) => dispatch(listar_actividades_diagnostico(solicitud_id));

    const closeModal=()=>{
        closeModalVC(false);
    }

    const setFiles=(newListFiles)=>{
        setFilesstate([...filesstate,newListFiles])
    }

    const removeFiles=(id)=>{
        setFilesstate(
            filesstate.filter(file => file.id !== id)
        )
    }



    function handleInputChange(e) {
       setInspeccion_campo({
            ...inspeccion_campo,
            [e.target.name]: e.target.value
        });
    }

    const setCheckedValue=(e)=>{
      //  console.log(e.target.checked )
        setInspeccion_campo({
            ...inspeccion_campo,
            [e.target.name]: e.target.checked
        });
    }

    const guardarVisistaCampo=async (e)=>{
        e.preventDefault();

        try {

            let actividades=$('iframe').contents().find('.wysihtml5-editor').html();
        
            

            if(inspeccion_campo.entidad_consulta_id=='0' || inspeccion_campo.entidad_consulta_id==0){
                toastr.error(' Seleccione la Entidad a la que solicito.')
                return;
            }

            const {data}= await  saveVisistaCampo({...inspeccion_campo,
                actividades:actividades  ,files:filesaditional});

            closeModalVC(false);
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
                    <div style={{transform:'scale(1)',alignContent:'left'}} className="custom-popup light  popup_content popup_content_visible bloqueador2" id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a href="#" onClick={closeModal} className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width:'1100px'}}>
                            <div className="modal-header">
                             
                                <h4>Registro de Inspección en Campo</h4>
                            </div>
                            <form onSubmit={guardarVisistaCampo}>
                            <div className="modal-body">
                            
                                    <div className="form-group">
                                        <label>Objetivo de la Inspeccion de Campo</label>
                                        <input type="text" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                                               name="objetivo"
                                               onChange={handleInputChange}
                                               value={inspeccion_campo.objetivo}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Actividades de la inspección de campo</label>
                                                <TextArea setValue={null}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Fecha Inicio Inspeccion</label>
                                                    <input type="date" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                                                           name="fecha_inicio"
                                                           onChange={handleInputChange}
                                                           value={inspeccion_campo.fecha_inicio}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Fecha Fin Inspeccion</label>
                                                    <input type="date" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                                                           name="fecha_fin"
                                                           onChange={handleInputChange}
                                                           value={inspeccion_campo.fecha_fin}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Equipo de Apoyo (Telematica, Topografia)</label>
                                                    <input type="checkbox" className="form-control input-sm" placeholder="Ingrese el resumen de la visita"
                                                           name="apoyo_equipo_tec"
                                                          
                                                           onClick={setCheckedValue}
                                                     
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                           
                                        </div>
                                        <div className="col-md-6">
                                          
                                        </div>
                                    </div>

                                <div className="row">
                                   
                                    <div className="col-md-9">
                                        <div className="form-group">
                                            <label>Informe de Brigada</label>

                                            <UploadFile key="upload_documento_envio" file={informe_inspeccion} setFile={setInforme_inspeccion} ></UploadFile>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>



                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext" title={'Polygono Mama'}><i className="fa fa-paperclip"></i> Adjuntar archivos adicionales</legend>
                                </fieldset>

                                <div className="row">
                                    <div className="col-md-12">
                                        <UploadMultiple listFiles={[]} setListFiles={setFiles} removeFiles={removeFiles}/>

                                    </div>
                                </div>
                               
                            </div>

                            <div className="modal-footer">
                                <button  type="submit"
                                        className="btn btn-danger btn-sm btn-control">Guardar
                                </button>
                                <button onClick={closeModal} type="button"
                                        className="btn btn-default btn-sm btn-control">Cerrar
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

export default MvisitaCampo;