import React, {memo, useEffect, useState} from 'react';
import {toastr} from "react-redux-toastr";
import styled from 'styled-components';
import {initAxiosInterceptors, serverFile} from '../../config/axios';
import {Link} from "react-router-dom";
const Axios = initAxiosInterceptors();
const {$}=window;

const LabelUpload = styled.label`
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
  white-space: nowrap;
  max-width: ${props => props.with || "120px"};
`;


const SingleUpload = memo(({form, setForm, handleInputChange,nameUpload,folderSave, accept}) => {
    const [subiendoImagen, setSubiendoImagen] = useState('ninguno');
    const [porcentajeSubida, setPorcentajeSubida] = useState(0);
   // const [originalName, setoriginalName] = useState(form[nameUpload]||'');

    useEffect(() => {
        const init = async () => {
            console.log('----------------------')
            console.log(form[nameUpload])
            setSubiendoImagen( form[nameUpload] ? 'subido' : 'ninguno' );
            $('[data-toggle="tooltip"]').tooltip();
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
                        <div className="btn-group pull-right">
                    <a onClick={eliminarFile}  className="btn btn-xs btn-default"
                       data-toggle="dropdown" data-toggle="tooltip"
                       data-original-title={`Permite Sincronizar`}>
                        <i className="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                        </>) : null}

                {subiendoImagen == 'subido' || form[nameUpload] ? (
                    <>

                        <LabelUpload  with={'160px'}
                                     title={form[nameUpload].filename} >{form[nameUpload].filename}</LabelUpload>
                        <div className="btn-group pull-right">
                            <a href={serverFile + form[nameUpload].path} target="_blank"
                               className="btn btn-xs btn-default" type="button"
                               data-toggle="dropdown" data-toggle="tooltip"
                               data-original-title={`Descargar`}>
                                <i className="fa fa-download"></i></a>

                            <a onClick={eliminarFile}
                               className="btn btn-xs btn-default" type="button"
                               data-toggle="dropdown" data-toggle="tooltip"
                               data-original-title={`Quitar`}>
                                <i className="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                    </>
                ) : null}



        </>
    );
}
);

export default SingleUpload;