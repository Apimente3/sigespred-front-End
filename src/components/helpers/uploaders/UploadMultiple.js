import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {toastr} from "react-redux-toastr";
import Loading from './LoadingUploader'
import FileMultiple from "./FileMultiple";
import {Row12,FormFooter,InputInline,FormControl,Options,Input,RowForm,FormGroupInline} from "../../forms";


import Row6 from "../../forms/Row6";

const {$} = window;

const Axios = initAxiosInterceptors();




const UploadFileMultiple = ({estado,setListFiles, removeFiles, folderSave,useContext}) => {

    const {archivos : localfiles}=useContext()


    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [denominacionArchivo, setDenominacionArchivo] = useState('');

    const [urlDocumento, setUrlDocumento] = useState(null);
    const [originalName, setoriginalName] = useState(null);



    //const [localfiles, setLocalFiles] = useState(listFiles);

    useEffect(() => {
        async function initialLoad() {
            try {
              //  setLocalFiles(listFiles())
            } catch (error) {
                console.log(error);
            }
        }
        initialLoad();
    }, localfiles);

    const eliminarFile = (id) => {
        removeFiles(id)
      //  setLocalFiles(localfiles.filter(file => file.id !== id));

    }

    const addFile = (file) => {

        //setLocalFiles([...localfiles, file]);
        setListFiles([...localfiles, file]);
    }

    const setdenominacionArch = (e) => {
        e.preventDefault();
        setDenominacionArchivo(e.target.value)
    }


    const validatedenomiancion = (e) => {
        if (denominacionArchivo.trim() == '') {
            // setDenominacionArchivo('')
            toastr.error('¡ Error !', 'Ingrese la Denominación', {position: 'top-center'})
            return;
        }
    };

    const uploadFile = async (e) => {
        try {
            if(denominacionArchivo.trim()==''){
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
                   // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // setPorcentajeSubida(percentCompleted)
                }
            };
            setSubiendoImagen('cargando')
            const {data} = await Axios.post(`/fileuploadJSONB?folder=${folderSave}&denominacion=${denominacionArchivo}`, formData, config);

            //  let filesaved = {filesave: data.filesave, originalname: data.originalname};
           // setLocalFiles([...localfiles,data])
            setListFiles([...localfiles,data]);
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
                            <FormGroupInline >
                            <InputInline require={false} onChange={setdenominacionArch} label={"Denominacion"} placeholder={"Ingrese la denominacion del archivo"} ayuda={"Aqui vienen los archivos que viene junto a la solicitud de gestion predial como Planos, Base Grafico y otros"} withControl={8}></InputInline>
                            </FormGroupInline>
                        </Row6>
                        <Row6 title={""}>
                            <FormGroupInline >
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
                                        localfiles.map(file => (
                                            <FileMultiple serverFile={serverFile} eliminarFile={eliminarFile}
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
};



export default UploadFileMultiple;