import React, {useState} from 'react';
import File from "./File";
import {initAxiosInterceptors,serverFile} from '../../../config/axios';
import {toastr} from "react-redux-toastr";
import Loading from '../../../components/header/Loading'
const {$} = window;

const Axios = initAxiosInterceptors();

const UploadFile = ({listFiles, setListFiles}) => {

    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [denominacionArchivo, setDenominacionArchivo] = useState('');

    const [urlDocumento, setUrlDocumento] = useState(null);
    const [originalName, setoriginalName] = useState(null);

    const eliminarFile = (id) => {
        setListFiles(listFiles.filter(file => file.id !== id))
    }
    const addFile = (file) => {
        setListFiles([...listFiles, file])
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
            const {data} = await Axios.post('/uploadsolicitudmultiple', formData, config);
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
                        <div className="col-lg-8">

                            <div className="form-group ">
                                <label className="col-lg-2 control-label">Denominacion </label>
                                <div className="col-lg-4">
                                    <input id={'txtdenominacion'} required className="form-control input-sm" placeholder="Denominacion" onChange={setdenominacionArch}/>

                                </div>

                                <label className="col-lg-2 control-label">Archivo </label>
                                <div className="col-lg-4">
                                    <input onChange={uploadFile} type="file"/>
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-lg-8">
                            <ul className="list-group">
                                {
                                    listFiles.map(file => (
                                        <File serverFile={serverFile} eliminarFile={eliminarFile}
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

export default UploadFile;