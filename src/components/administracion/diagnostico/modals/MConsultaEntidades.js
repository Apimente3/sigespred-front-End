import React, {useEffect, useState} from 'react';
import UploadFile from "../../../helpers/uploaders/Upload";
import UploadMultiple from "../../../helpers/uploaders/UploadMultiple";
import {initAxiosInterceptors} from "../../../../config/axios";
import {toastr} from "react-redux-toastr";
import {useDispatch, useSelector} from 'react-redux';
import {listar_actividades_diagnostico} from "../../../../actions/diagnostico/Actions";


const Axios = initAxiosInterceptors();
async function listarEntidadesSolicitud() {
    const {data} = await Axios.get(`/entidades_consulta`);
    return data;
}


async function saveConsultaEntidades(consuta_entidad) {
    const {data} = await Axios.post(`/consulta_entidades`,consuta_entidad);
    return data;
}








const MConsultaEntidades = ({solicitud,closeModalCE}) => {


 
    const {id}=solicitud;
    const [doc_envio, setDoc_envio] = useState({});
    const [doc_respuesta, setDoc_respuesta] = useState({});
    const [filesaditional, setFilesaditional] = useState([]);
    const [listaEntidades, setListaentidades] = useState([]);
  
    const [consulta_entidades,setConsulta_entidades]=useState({solicitud_id:id});

        const dispatch = useDispatch();
    const listar_actividades_diagnostico_action = (solicitud_id) => dispatch(listar_actividades_diagnostico(solicitud_id));
   // const listar_actividades_diagnostico_action = (solicitud_id) => dispatch(listar_actividades_diagnostico(solicitud_id));

/*Consulta generacion de datos*/
    useEffect(() => {
        async function initialLoad() {
            try {
                const listaentidades=await listarEntidadesSolicitud();
              
                setListaentidades(listaentidades);
               // await listar_actividades_diagnostico_action(id);
            } catch (error) {
                console.log(error);
            }
        }

        initialLoad();

    }, []);


    function handleInputChange(e) {

        setConsulta_entidades({
            ...consulta_entidades,
            [e.target.name]: e.target.value
        });
    }


    const closeModal = () => {
        closeModalCE(false);
    }
    
    const setDocumentoEnvio=(value)=>{
        setDoc_envio(value) 
    }
    
    const setFiles=(newListFiles)=>{
        setFilesaditional([...filesaditional,newListFiles])
    }

    const removeFiles=(id)=>{
        setFilesaditional(
            filesaditional.filter(file => file.id !== id)
        )
    }
    
    
    const guardarConsultaEntidad=async (e)=>{
        e.preventDefault();
        
        try {
            
          if(consulta_entidades.entidad_consulta_id=='0' || consulta_entidades.entidad_consulta_id==0){
              toastr.error(' Seleccione la Entidad a la que solicito.')
              return;
          }
            
            const {data}= await  saveConsultaEntidades({...consulta_entidades
                ,doc_envio:doc_envio.filename,doc_respuesta:doc_respuesta.filename
                ,files:filesaditional});
            console.log(data);
            closeModalCE(false);
            toastr.success(' Se registro correctamente la Consulta a la Entidad.')

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
                        <div className=" " style={{width: '1100px'}}>
                            <div className="modal-header">

                                <h4>Registro de Consulta a Entidades</h4>
                            </div>
                            <form onSubmit={guardarConsultaEntidad}>
                            <div className="modal-body">

                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext" title={'Polygono Mama'}>Datos de Consulta a Entidades</legend>
                                </fieldset>
                                    <div className="form-group">
                                        <label>Tipo Institucion </label>
                                        <select required list="organosolicitante" required=""
                                               className="form-control input-sm" type="text"
                                               placeholder="Entidad quien solicita la liberacion, adquisicion de predios e interferencias."

                                               className="form-control input-sm"
                                               name="entidad_consulta_id"
                                                
                                                onChange={handleInputChange}
                                                value={consulta_entidades.entidad_consulta_id}

                                        >
                                            <option value="0" >-- SELECCIONE --</option>
                                            {
                                                listaEntidades.map(row => <option value={row.id} >{row.denominacion}</option>)
                                            }
                                            
                                        </select>


                                      
                                    </div>
                                    <div className="form-group">
                                        <label>Institucion </label>
                                        <input required 
                                               className="form-control input-sm" type="text"
                                               placeholder="Entidad quien solicita la liberacion, adquisicion de predios e interferencias."

                                               className="form-control input-sm"
                                               name="entidad_consulta"
                                               onChange={handleInputChange}
                                               value={consulta_entidades.entidad_consulta}


                                        ></input>


                                     
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Fecha envio oficio</label>
                                                <input required type="date" className="form-control input-sm"
                                                       placeholder="Ingrese el resumen de la visita"
                                                       name="fecha_envio_oficio"

                                                       onChange={handleInputChange}
                                                       value={consulta_entidades.fecha_envio_oficio}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="form-group">
                                                <label>Documento Envio</label>
                                                
                                                <UploadFile key="upload_documento_envio" file={doc_envio} setFile={setDocumentoEnvio} ></UploadFile>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Fecha respuesta oficio</label>
                                                <input required type="date" className="form-control input-sm"
                                                       placeholder="Ingrese el resumen de la visita"
                                                       name="fecha_respuesta_oficio"

                                                       onChange={handleInputChange}
                                                       value={consulta_entidades.fecha_respuesta_oficio}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="form-group">
                                                <label>Documento respuesta</label>
                                                <UploadFile key="upload_documento_rspta" file={doc_respuesta} setFile={setDoc_respuesta}></UploadFile>
                                            </div>
                                        </div>
                                    </div>
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
                    <div className="popup_align bloqueador3">

                    </div>
                </div>
            </div>
        </>
    );
};

export default MConsultaEntidades;


function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    }

}