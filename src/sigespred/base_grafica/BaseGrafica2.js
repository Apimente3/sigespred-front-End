import React, {useEffect, useState,useCallback,useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import Header from "../m000_common/headers/Header";
import {Link,useLocation} from "react-router-dom";


import {initAxiosInterceptors,serverFile} from "../../config/axios";
import Propietario from "../m005_diagnostico_tecnico_legal/m005_01_predios/Propietario";
import UploadMultiple from "../../components/helpers/uploaders/UploadMultiple";
import UploadFile from "../../components/helpers/uploaders/Upload";
import {toastr} from "react-redux-toastr";


const {alasql} = window;
const Axios = initAxiosInterceptors();


/*Obtiene la solcitud de polygonos*/
async function getFilesImagesProy(codigo) {
    const {data} = await Axios.get(`/proyecto-files?codigo=${codigo}`);
    return data;
}

/*Obtiene el polygono de respositorio de polygonos cad*/
async function saveproyecto(proyecto) {

    const {data} = await Axios.post(`/saveproyecto`, proyecto);
    // let result = JSON.parse(data[0].geojson_3857);
    return data;
}


var ubigeo_global = {};
const BaseGrafica = ({history, match}) => {

    const {codproyecto} = match.params;

    const [filesstate, setFilesstate] = useState(false);
    const [proyecto_codigo, set_proyecto_codigo] = useState(codproyecto);
    const [ubicacion_predio, set_ubicacion_predio] = useState({});
    const [proyecto, set_proyecto] = useState({polygono:null,portada_imagen:'',portada_imagen2:'',portada_imagen3:''}); 
    const [distritos, set_distritos] = useState([]);


    /*Efecto para traer lo datos del sistema*/
        useEffect(() => {
            async function getSolcitud() {
                try {
                    let proyecto = await getFilesImagesProy(codproyecto);
                   
                    if(!proyecto.portada_imagen){
                        proyecto.portada_imagen='';
                    }
                    if(!proyecto.portada_imagen2){
                        proyecto.portada_imagen2='';
                    }
                    if(!proyecto.portada_imagen3){
                        proyecto.portada_imagen3='';
                    }
                    if(!proyecto.archivos){
                        proyecto.archivos=[];
                    }
    
    
                    set_proyecto({...proyecto});
                } catch (error) {
                    console.log(error);
                }
            }
            getSolcitud();
        }, []);


    function handleInputChange(e) {

        set_proyecto({
            ...proyecto,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }

    const setFiles = async (file) => {
        await set_proyecto({...proyecto, archivos: [...proyecto.archivos, file]})


    }

    const removeFiles = async (id) => {
        let files_filtered = await proyecto.archivos.filter(file =>
            file.id !== id
        );
        set_proyecto({...proyecto, archivos: files_filtered})
    }
//Metodos para guardar las images
    const saveFotoPortada1 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen": file.filename
        });
    }

    const saveFotoPortada2 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen2": file.filename
        });
    }

    const saveFotoPortada3 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen3": file.filename
        });
    }

    //Metodos para guardar las images
    const eliminarPortada01 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen": ''
        });
    }

    const eliminarPortada02 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen2": ''
        });
    }

    const eliminarPortada03 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen3": ''
        });
    }
    
    /*Funcion para guardar el proyecto*/

    async function guardarProyecto() {

        try {
            await saveproyecto(proyecto)
            toastr.info('Se guardo correctamente')
        } catch (e) {
            toastr.error('Error al guardar')
        }
    }
    const getPortaimage1=()=>{
     return   {
            urlDocumento: proyecto.portada_imagen,
                originalName: proyecto.portada_imagen
        }
    }

    const listarch = useMemo(() => proyecto.archivos, [proyecto]);



    return (
        <div>
            <Header/>
            <SiderBarDiagnostico proyecto={proyecto_codigo}/>
            <div>
                <div id="breadcrumb">
                    <ul className="breadcrumb">
                        <li><i className="fa fa-home"></i><a href="#"> Proyectos</a></li>
                        <li className="active">Busqueda de Proyectos</li>
                    </ul>
                </div>
                <div className="padding-md container">


                    <legend align="mtop-25 center fielsettext "><label className={'titleform'}>
                        REGISTRO DE LA BASE GRAFICA
                    </label>

                    </legend>
                    <div className="panel panel-default">
                        <form className="form-horizontal no-margin form-border" id="formWizard2" noValidate="">
                            <div className="panel-tab clearfix">
                                <ul className="tab-bar wizard-demo" id="wizardDemo2">
                                    <li className="">
                                        <Link to={'/configuraciones-proyecto/' + proyecto_codigo}>
                                            <i className="fa fa-cogs"></i>  Configuraciones</Link>
                                    </li>
                                    <li >
                                        <Link to={'/base-grafica-ubicacion/' + proyecto_codigo}>
                                            <i className="fa fa-map-marker"></i>   Base Grafica</Link>
                                    </li>
                                    <li className="active">
                                        <Link to={'/base-grafica-adjuntos/' + proyecto_codigo}>
                                            <i className="fa fa-photo"></i>    Portada y Archivos</Link>
                                    </li>
                                    <li >
                                        <Link to={'/brigadas-proyecto/' + proyecto_codigo}>
                                            <i className="fa fa-users"></i>   Brigadas</Link>

                                    </li>

                                </ul>
                            </div>
                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="first">

                                        <legend align=" center fielsettext "><label className={'titleform'}> Imagenes de Portada</label>
                                    </legend>

                                        <div className="form-group">
                                            <label className="col-lg-2 control-label"><span
                                                className="obligatorio">* </span> Image 01 :
                                            </label>

                                            <div className="col-lg-8">

                                                <UploadFile key="portada_imagen" file={{
                                                    urlDocumento: '',
                                                    originalName: ''
                                                }}
                                                            setFile={saveFotoPortada1} eliminar={eliminarPortada01}></UploadFile>



                                            </div>
                                            <div className="col-lg-2">
                                                {proyecto.portada_imagen.length>0? <Imagen portada_imagen={proyecto.portada_imagen}></Imagen>:''}
                                            </div>

                                        </div>

                                        <div className="form-group">
                                            <label className="col-lg-2 control-label"><span
                                                className="obligatorio">* </span> Image 02 :</label>
                                        
                                            <div className="col-lg-8">


                                                <UploadFile key="portada_imagen2" file={{
                                                    urlDocumento: proyecto.portada_imagen2,
                                                    originalName: proyecto.portada_imagen2
                                                }}
                                                            setFile={saveFotoPortada2} eliminar={eliminarPortada02}></UploadFile>
                                            </div>

                                            <div className="col-lg-2">
                                                {proyecto.portada_imagen2.length>0? <Imagen portada_imagen={proyecto.portada_imagen2}></Imagen>:''}
                                            </div>

                                        </div>

                                        <div className="form-group">
                                            <label className="col-lg-2 control-label"><span
                                                className="obligatorio">* </span> Image 03 :</label>
                                         
                                            <div className="col-lg-8">
                                                <UploadFile key="portada_imagen3" file={{
                                                    urlDocumento:'',
                                                    originalName: ''
                                                }}
                                                            setFile={saveFotoPortada3} eliminar={eliminarPortada03}></UploadFile>
                                            </div>
                                            <div className="col-lg-2">
                                                {proyecto.portada_imagen3.length>0? <Imagen portada_imagen={proyecto.portada_imagen3}></Imagen>:''}
                                            </div>

                                        </div>

                                        <form>
                                            <fieldset className={'fielsettext'}>
                                                <legend align="mtop-25 center fielsettext "><label className={'titleform'} style={{fontSize:'11px'}}><i
                                                    className="fa fa-paperclip"></i> Documentos que acreditan la
                                                    Propiedad</label> <a onClick={() => {
                                                    setFilesstate(true)
                                                }} className="btn btn-default  btn-sm fullborder ">+</a>

                                                </legend>

                                            </fieldset>

                                            {proyecto.archivos  ?
                                        <UploadMultiple listFiles={listarch} setListFiles={setFiles}
                                                                removeFiles={removeFiles}/>:''}
                                        


                                        </form>
                                    </div>

                                    <button id="btnguardar" type="button"  onClick={guardarProyecto}
                                            className="btn btn-danger btn-sm btn-control pull-right">

                                        Guardar
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>


        </div>

    );
};


const Imagen=({portada_imagen})=>{
    return (
        <>
            <a href={serverFile+portada_imagen} target="_blank"><i className="fa fa-image fa-3x"></i></a>
        </>
    )
}

export default BaseGrafica

