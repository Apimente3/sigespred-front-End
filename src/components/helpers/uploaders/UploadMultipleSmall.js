import React, {useState} from 'react';
import {initAxiosInterceptors,serverFile} from '../../../config/axios';
import {toastr} from "react-redux-toastr";
import Loading from './LoadingUploader'
import FileMultiple from "./FileMultiple";
const {$} = window;

const Axios = initAxiosInterceptors();

const UploadFileMultipleSmall = ({listFiles=[], setListFiles=()=>{}}) => {

    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [denominacionArchivo, setDenominacionArchivo] = useState('');

    const [urlDocumento, setUrlDocumento] = useState(null);
    const [originalName, setoriginalName] = useState(null);

    const [localfiles, setLocalFiles] = useState(listFiles);

    const eliminarFile = (id) => {
        
        setListFiles(listFiles.filter(file => file.id !== id));
        setLocalFiles(localfiles.filter(file => file.id !== id));

    }
    const addFile = (file) => {
        setListFiles([...listFiles, file]);
        setLocalFiles([...localfiles, file]);
    }

    const setdenominacionArch = (e) => {
        e.preventDefault();
        setDenominacionArchivo(e.target.value)
    }


    const uploadFile = async (e) => {
        try {

            if($('#txtdenominacion').val().trim()==''){
                // setDenominacionArchivo('')
                $('#txtdenominacion').focus()
                toastr.error('¡ Error !','Ingrese la Denominación', {position: 'top-center'})

                return;
            }

            setSubiendoImagen(true);
            const file = e.target.files[0];
            var formData = new FormData()
            formData.append('myfile', file);
            formData.append('filename', file.name);
            formData.append('denominacion', denominacionArchivo);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {

                    console.log(progressEvent.loaded)
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // setPorcentajeSubida(percentCompleted)
                }
            };
            setSubiendoImagen('cargando')
            const {data} = await Axios.post('/fileupload', formData, config);
            addFile(data)
            setUrlDocumento(data.filesave)
            setoriginalName(data.originalname)

            //  let filesaved = {filesave: data.filesave, originalname: data.originalname};

            setSubiendoImagen(false)
            toastr.info('¡ Correcto !', 'Se subio correctamente el Documento', {position: 'top-right'})

        } catch (error) {
            setSubiendoImagen('ninguno');
            setSubiendoImagen(true);
            console.log(error);
            toastr.error('¡ Error !', JSON.stringify(error) , {position: 'top-right'})
        }
    }
    return (
        <>
            {subiendoImagen ? <Loading/> :
                (<div className={''}>


                    <div className="form-group">
                        <div className="col-lg-12">

                            <div className="form-group ">
                             
                                <div className="col-lg-12">
                                    <input id={'txtdenominacion'} required className="form-control input-sm" placeholder="Denominacion" onChange={setdenominacionArch}/>

                                </div>

                              

                            </div>
                            <div className="form-group ">

                             
                                <div className="col-lg-12">
                                    <input onChange={uploadFile} type="file"/>
                                </div>

                            </div>


                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="form-group">
                        <div className="col-lg-8">
                            <ul className="list-group">
                                {
                                    localfiles.map(file => (
                                        <FileMultiple serverFile={serverFile} eliminarFile={eliminarFile}
                                                      props={{id: file.id, filename: file.originalname, path: file.filesave,denominacion:file.denominacion}}/>
                                    ))
                                }


                            </ul>
                        </div>
                    </div>
                </div>)
            }


        </>


    );
};

export default UploadFileMultipleSmall;