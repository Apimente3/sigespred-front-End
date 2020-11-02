import React, {useCallback, useEffect, useState, memo} from 'react';
import {initAxiosInterceptors, serverFile} from '../../config/axios';
import {toastr} from "react-redux-toastr";
import Loading from './LoadingUploader'

import {Row12,Row6, FormFooter, InputInline, FormControl, Options, Input, RowForm, FormGroupInline} from "../forms";

const {$} = window;

const Axios = initAxiosInterceptors();


const FileMultiple = ({eliminarFile,file}) => {


    const {filename,path,id,denominacion}=file;



    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);


    /*Eliminando archivos*/
    const eliminarArchivo=(e)=>{
        eliminarFile(file)
    }

    return (
        <>
            <li className=" clearfix file-content" >
                <div className="pull-left m-left-sm ">
                    <span><b>{denominacion}</b> :</span><br></br>
                </div>
                <div className="pull-left m-left-sm ">
                    <span>{filename}</span><br></br>
                </div>


                <div className="btn-group hover-dropdown pull-right">
                    <a href={`${serverFile}${path}`} target={'_blank'} className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                       data-original-title={ "Descargar" }>
                        <i className="fa fa-download fa-lg"></i> </a>

                    <a onClick={eliminarArchivo}   className="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                       data-original-title={ "Eliminar archivo" }><i
                        className="fa fa-trash-o fa-lg"></i></a>


                </div>
            </li>
        </>
    );
};


const UploadFileMultiple = memo(({form, setForm, handleInputChange, nameUpload, folderSave, accept}) => {

    console.error('se genero Multiple Upload')
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [denominacionArchivo, setDenominacionArchivo] = useState('');

    const eliminarFile = (file) => {

        let result = form[nameUpload].reduce((p,c) => (c.id !== file.id && p.push(c),p),[]);
        console.log(result)
            //form[nameUpload].filter(file => file.id !== id);
        setForm({...form, [nameUpload]: result});
    }


    const setdenominacionArch =useCallback( (e) => {
        e.preventDefault();
        setDenominacionArchivo(e.target.value)
    },[setDenominacionArchivo])


    const validatedenomiancion = (e) => {
        if (denominacionArchivo.trim() == '') {
            // setDenominacionArchivo('')
            toastr.error('¡ Error !', 'Ingrese la Denominación', {position: 'top-center'})
            return;
        }
    };

    const uploadFile = async (e) => {
        try {
            if (denominacionArchivo.trim() == '') {
                throw "No ingreso de denominacion";
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
                }
            };

            setSubiendoImagen('cargando')
            const {data} = await Axios.post(`/fileuploadJSONB?folder=${folderSave}&denominacion=${denominacionArchivo}`, formData, config);
            setForm({...form, [nameUpload]: [...(form[nameUpload]? form[nameUpload]: [] ), data]});
            setSubiendoImagen(false);
            toastr.info('¡ Correcto !', 'Se subio correctamente el Documento', {position: 'top-right'});
            setDenominacionArchivo('')

        } catch (error) {
            setSubiendoImagen('ninguno');
            setSubiendoImagen(false);
            console.log(error);
            toastr.error('¡ Error !', JSON.stringify(error), {position: 'top-right'})
        }
    }
    return (
        <>
            {subiendoImagen ? <Loading/> :
                (<div>

                    <RowForm>
                        <Row6 title={""}>
                            <FormGroupInline>
                                <InputInline require={false} onChange={setdenominacionArch} label={"Denominacion"}
                                             placeholder={"Ingrese la denominacion del archivo"}
                                             ayuda={"Aqui vienen los archivos que viene junto a la solicitud de gestion predial como Planos, Base Grafico y otros"}
                                             withControl={8}></InputInline>
                            </FormGroupInline>
                        </Row6>
                        <Row6 title={""}>
                            <FormGroupInline>
                                <label className="col-lg-4 control-label">Digital</label>
                                <div className="col-lg-8">
                                    <input onClick={validatedenomiancion} onChange={uploadFile} type="file"/>
                                </div>
                            </FormGroupInline>
                        </Row6>
                    </RowForm>

                    <RowForm>
                        <Row12 title={""}>
                            <div className="col-lg-8">
                                <ul className="list-group">
                                    {
                                        (form[nameUpload] ? form[nameUpload] : []).map((file,i) => (
                                            <FileMultiple key={i} serverFile={serverFile} eliminarFile={eliminarFile}
                                                          file={file}/>
                                        ))
                                    }
                                </ul>
                            </div>
                        </Row12>
                    </RowForm>

                </div>)
            }


        </>


    );
});

export default UploadFileMultiple;