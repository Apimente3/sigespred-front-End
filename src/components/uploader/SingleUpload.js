import React, {memo, useEffect, useState} from 'react';
import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors, serverFile} from '../../config/axios';
const Axios = initAxiosInterceptors();

const SingleUpload = memo(({form, setForm, handleInputChange,nameUpload,folderSave, accept}) => {

    console.error('se genero Single Upload')
    const [subiendoImagen, setSubiendoImagen] = useState('ninguno');
    const [porcentajeSubida, setPorcentajeSubida] = useState(0);
   // const [originalName, setoriginalName] = useState(form[nameUpload]||'');

    useEffect(() => {
        const init = async () => {
            setSubiendoImagen( form[nameUpload] ? 'subido' : 'ninguno' );
            //setoriginalName(form[nameUpload].filename);
        };
        init();
    }, [setSubiendoImagen,form]);


    /*Para subir la imagen seleccionada*/
    async function handleImagenSeleccionada(e) {
        try {
            const file = e.target.files[0];
            var formData = new FormData()
            formData.append('myfile', file);
            formData.append('filename', file.name);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setPorcentajeSubida(percentCompleted)
                }
            };
            setSubiendoImagen('cargando')
            /*El metodo retorn un JSON {filename,path}*/
            const {data} = await Axios.post('/fileupload?folder='+folderSave, formData, config);

            setForm({...form,[nameUpload]:data});
            setSubiendoImagen(false);
            setPorcentajeSubida(0);
            setSubiendoImagen('subido');
            toastr.info('¡ Correcto !', 'Se subio correctamente el Documento', {position: 'top-right'})

        } catch (error) {
            setSubiendoImagen(false);
            toastr.error('¡ Error !', 'Se fallo subiendo', {position: 'top-right'})
            console.log(error);
        }
    }

    /*Funcion para eliminar del formulario el archivo*/
    const eliminarFile=()=>{
        setSubiendoImagen('ninguno');
        setForm({...form,[nameUpload]:null});
    }


    return (
        <>
            <div className="col-lg-12">

                { /*Verifica si existe algun dato subido*/
                    subiendoImagen == 'ninguno' ? (
                    <input name='documentofile' required="" className=" input-sm" type="file" accept={accept}
                           onChange={handleImagenSeleccionada}></input>
                    ) : null
                }

                {subiendoImagen == 'cargando' ? (<>
                    <div className="progress progress-striped active">
                        <div className="progress-bar progress-bar-danger"
                             style={{width: `${porcentajeSubida}%`}}><span
                            style={{color: '#000'}}>{porcentajeSubida} %</span></div>
                    </div>
                    <a onClick={eliminarFile} className="btn btn-default btn-sm dropdown-toggle pull-left"
                       data-toggle="dropdown" data-toggle="tooltip"
                       data-original-title={`Permite Sincronizar`}>
                        <i className="fa fa-times" aria-hidden="true"></i></a> </>) : null}

                {subiendoImagen == 'subido' || form[nameUpload] ? (
                    <>
                        <label className="col-lg-8" style={{color: '#000'}}>{form[nameUpload].filename}</label>
                        <div className="col-lg-2">
                            <a href={serverFile + form[nameUpload].path} target="_blank"
                               className="btn btn-default btn-sm dropdown-toggle pull-left"
                               data-toggle="dropdown" data-toggle="tooltip"
                               data-original-title={`Descargar`}>
                                <i className="fa fa-download"></i></a>
                        </div>
                        <div className="col-lg-2">
                            <a onClick={eliminarFile}
                               className="btn btn-default btn-sm dropdown-toggle pull-left"
                               data-toggle="dropdown" data-toggle="tooltip"
                               data-original-title={`Permite Sincronizar`}>
                                <i className="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                    </>
                ) : null}


            </div>
        </>
    );
}
);

export default SingleUpload;