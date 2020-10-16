import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors, serverFile} from '../../../config/axios'
import {toastr} from "react-redux-toastr";

const Axios = initAxiosInterceptors();

const Upload = ({urlDocumentoInit,originalNameInit, setFile, eliminar, accept = "*"}) => {

    const [subiendoImagen, setSubiendoImagen] = useState('ninguno');
    const [porcentajeSubida, setPorcentajeSubida] = useState(0);
    const [urlDocumento, setUrlDocumento] = useState(urlDocumentoInit || '');
    const [originalName, setoriginalName] = useState(originalNameInit);

    useEffect(() => {
        const init = async () => {
            setSubiendoImagen(urlDocumento.length == 0 ? 'ninguno' : 'subido');
        };
        init();
    }, []);

    async function handleImagenSeleccionada(e) {
        try {
            const file = e.target.files[0];
            var formData = new FormData()
            formData.append('myfile', file);
            formData.append('filename', file.name);
            //  formData.append('path',generateNameunique(filename))
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                    console.log(progressEvent.loaded)
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setPorcentajeSubida(percentCompleted)
                }
            };
            setSubiendoImagen('cargando')

            const {data} = await Axios.post('/fileupload', formData, config);

            //const {filename,id,path,usuareg_id}=data;          ​

            let filesaved = data;

            setUrlDocumento(data.filename)
            setoriginalName(data.path)

            setFile(filesaved)

            setSubiendoImagen(false);
            setPorcentajeSubida(0);
            setSubiendoImagen('subido')
            toastr.info('¡ Correcto !', 'Se subio correctamente el Documento', {position: 'top-right'})

        } catch (error) {
            setSubiendoImagen(false);
            toastr.error('¡ Error !', 'Se fallo subiendo', {position: 'top-right'})
            console.log(error);
        }
    }

    const eliminarFilesubido = e => {
        setSubiendoImagen('ninguno');
        setUrlDocumento('');
        eliminar()
    }


    return (
        <>
            <div className="col-lg-12">
                {subiendoImagen == 'ninguno' ? (
                    <input name='documentofile' required="" className=" input-sm" type="file" accept={accept}
                           onChange={handleImagenSeleccionada}></input>
                ) : null}

                {subiendoImagen == 'cargando' ? (<>
                    <div className="progress progress-striped active">
                        <div className="progress-bar progress-bar-danger"
                             style={{width: `${porcentajeSubida}%`}}><span
                            style={{color: '#000'}}>{porcentajeSubida} %</span></div>
                    </div>
                    <a onClick={e => {
                        setSubiendoImagen('ninguno');
                        setUrlDocumento('')
                    }} className="btn btn-default btn-sm dropdown-toggle pull-left"
                       data-toggle="dropdown" data-toggle="tooltip"
                       data-original-title={`Permite Sincronizar`}>
                        <i className="fa fa-times" aria-hidden="true"></i></a> </>) : null}

                {subiendoImagen == 'subido' || urlDocumento.length > 0 ? (
                    <>
                        <label style={{color: '#000'}}>{originalName}</label>
                        <div className="col-lg-2">
                            <a href={serverFile + urlDocumento} target="_blank"
                               className="btn btn-default btn-sm dropdown-toggle pull-left"
                               data-toggle="dropdown" data-toggle="tooltip"
                               data-original-title={`Descargar`}>
                                <i className="fa fa-download"></i></a>
                            <a onClick={eliminarFilesubido}
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
};

export default Upload;