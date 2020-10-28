import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {toastr} from "react-redux-toastr";
import Loading from './LoadingUploader'
import FileMultiple from "./FileMultiple";

const {$} = window;

const Axios = initAxiosInterceptors();

const UploadFileMultiple = ({listFiles, setListFiles, removeFiles, folderSave}) => {


    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [denominacionArchivo, setDenominacionArchivo] = useState('');

    const [urlDocumento, setUrlDocumento] = useState(null);
    const [originalName, setoriginalName] = useState(null);

    const [localfiles, setLocalFiles] = useState(listFiles);

    useEffect(() => {

        async function initialLoad() {
            try {
                setLocalFiles(listFiles())

            } catch (error) {
                console.log(error);
            }
        }

        initialLoad();

    }, localfiles);

    const eliminarFile = (id) => {
        removeFiles(id)
        setLocalFiles(localfiles.filter(file => file.id !== id));

    }

    const addFile = (file) => {
        setListFiles(file);
        setLocalFiles([...localfiles, file]);
    }

    const setdenominacionArch = (e) => {
        e.preventDefault();
        setDenominacionArchivo(e.target.value)
    }


    const validatedenomiancion = () => {
        if ($('#txtdenominacion').val().trim() == '') {
            // setDenominacionArchivo('')
            $('#txtdenominacion').focus()
            toastr.error('¡ Error !', 'Ingrese la Denominación', {position: 'top-center'})
            return;
        }
    };

    const uploadFile = async (e) => {
        try {


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
                   // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // setPorcentajeSubida(percentCompleted)
                }
            };
            setSubiendoImagen('cargando')

            const {data} = await Axios.post('/fileuploadJSONB?folder=' + folderSave, formData, config);
            //const {filename,id,path,usuareg_id}=data;
            console.log(data)

            let filesaved = data;

            setUrlDocumento(data.path)
            setoriginalName(data.filename)


            //  let filesaved = {filesave: data.filesave, originalname: data.originalname};
            setLocalFiles([...localfiles,data])

            setSubiendoImagen(false)
            toastr.info('¡ Correcto !', 'Se subio correctamente el Documento', {position: 'top-right'})

        } catch (error) {
            setSubiendoImagen('ninguno');
            setSubiendoImagen(true);
            console.log(error);
            toastr.error('¡ Error !', JSON.stringify(error), {position: 'top-right'})
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
                                    <input id="txtdenominacion" className="form-control input-sm"
                                           placeholder="Denominacion" onChange={setdenominacionArch}/>

                                </div>

                                <label className="col-lg-2 control-label">Archivo </label>
                                <div className="col-lg-4">
                                    <input onClick={validatedenomiancion} onChange={uploadFile} type="file"/>
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
                                                      file={file}/>
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

export default UploadFileMultiple;