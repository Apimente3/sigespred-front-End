import React, {useEffect, useState} from 'react';
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import Header from "../m000_common/headers/Header";
import {toastr} from "react-redux-toastr";
import UploadFile from "../../components/helpers/uploaders/UploadExpFiles";
import {initAxiosInterceptors, serverFile} from "../../config/axios";


import {Link} from "react-router-dom";

const Axios = initAxiosInterceptors();

async function save(filesexpediente) {
    const {data} = await Axios.post(`/save_filesexpediente`, filesexpediente);
    return data;
}

async function getFiles(codigo_expediente) {
    const {data} = await Axios.get(`/list_filesexpediente?codigo_expediente=` + codigo_expediente);
    return data;
}


const Procesos = ({match}) => {
    const {expediente: exp} = match.params;
    //alert(exp);

    const [files_expediente, set_files_expediente] = useState({
        codigo_expediente: exp,
        documento1: '',
        documento2: '',
        documento3: '',
        documento4: '',
        documento5: '',
        documento6: '',
        documento7: '',
        documento8: '',
        documento9: '',
        documento10: '',
        documento11: '',
        documento12: '',
        documento13: '',
    });
    const [stateexpediente, set_stateexpediente] = useState(exp);


    useEffect(() => {
        const init = async () => {
            //alert(exp)
            let list = await getFiles(exp);
            console.log(list);
            set_files_expediente({...files_expediente,...list});
            // set_files_expediente(getFiles(exp))
        };
        init();
    }, []);


    const savefile = (statename, filesaved) => {
        set_files_expediente({
            ...files_expediente,
            [statename]: filesaved.filename
        });
    }

    const guardarFilesExp = async () => {
        try {
            await save(files_expediente);
            toastr.info('Se guardo correctamente los archivos')
        } catch (e) {
            alert(e.error)
        }
    }


    /*Creacion de tabla as*/

    const columns=[
        {key:'id',name:"ID",editable:true}
    ]

    return (
        <>


            <Header></Header>
            <div id="wrapper" className="preload">


                <div id="main-container" style={{padding: '20px', marginLeft: '0px', marginTop: '55px'}}>
                    <div id="breadcrumb">
                        <ul className="breadcrumb">
                            <li><i className="fa fa-home"></i><a href="index.html"> Proyecto</a></li>
                            <li className="active">Predio</li>
                            <li className="active">Expediente:{stateexpediente}</li>
                        </ul>
                    </div>
                    <div className="panel panel-default">
                        <form className="form-horizontal no-margin form-border" id="formWizard1" noValidate="">
                            <div className="panel-heading">

                            </div>
                            <div className="panel-tab">
                                <ul className="wizard-steps wizard-demo" id="wizardDemo1">
                                    <li className="active">
                                        <a href="#wizardContent1" data-toggle="tab"> PROCESO DE GESTION PREDIAL : </a>
                                    </li>

                                </ul>
                            </div>

                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="wizardContent1">

                                        <div className="col-lg-3">

                                            <div className="card ">
                                                <div className="image-wrapper">
                                                    <img  src={'/img/proceso_diagnostico_tecnico_legal.jpg'} alt="Avatar"  style={{height:'300px',width:'100%'}}/>


                                                    <div className="image-overlay">
                                                        <div className="image-info">
                                                            <Link className="pull-right leter-white" to={`/proyecto-edit/`} ><i className="fa fa-sign-in fa-2x"></i></Link>
                                                            <Link to={"/proyecto-datos-generales/"}>
                                                                <div className="h3 leter-white">Actividades del Diagnostico Tecnico Legal como son: Registro de Predios y Titulares,
                                                                    Registro de Actividades de Diagnostico, Interferecias
                                                                </div> </Link>

                                                            <span></span>
                                                            <div className="image-time"></div>
                                                            <div className="image-like">


                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="" style={{wordWrap: 'break-word',padding:'20px'}}>




                                                    <Link to={"/proyecto-datos-generales/"} className="btn btn-danger block" >
                                             <h5>DIAGNOSTICO TECNICO LEGAL</h5>

                                                    </Link>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-lg-3">

                                            <div className="card ">
                                                <div className="image-wrapper">
                                                    <img  src={'/img/proceso_adquisicion_predios.jpg'} alt="Avatar"  style={{height:'300px',width:'100%'}}/>


                                                    <div className="image-overlay">
                                                        <div className="image-info">
                                                            <Link className="pull-right leter-white" to={`/proyecto-edit/`} ><i className="fa fa-sign-in fa-2x"></i></Link>
                                                            <Link to={"/proyecto-datos-generales/"}>
                                                                <div className="h3 leter-white">Actividades de los Expediente del Adquisicion de Predios, como son Trato directo o Expropiacion
                                                                </div> </Link>

                                                            <span></span>
                                                            <div className="image-time"></div>
                                                            <div className="image-like">


                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="" style={{wordWrap: 'break-word',padding:'20px'}}>




                                                    <Link to={"/proyecto-datos-generales/"} className="btn btn-danger block" >
                                                        <h5>AQUISICION DE PREDIOS</h5>

                                                    </Link>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-lg-3">

                                            <div className="card ">
                                                <div className="image-wrapper">
                                                    <img  src={'/img/proceso_adquisicion_predios.jpg'} alt="Avatar"  style={{height:'300px',width:'100%'}}/>


                                                    <div className="image-overlay">
                                                        <div className="image-info">
                                                            <Link className="pull-right leter-white" to={`/proyecto-edit/`} ><i className="fa fa-sign-in fa-2x"></i></Link>
                                                            <Link to={"/proyecto-datos-generales/"}>
                                                                <div className="h3 leter-white">Actividades de los Expediente del Adquisicion de Predios, como son Trato directo o Expropiacion
                                                                </div> </Link>

                                                            <span></span>
                                                            <div className="image-time"></div>
                                                            <div className="image-like">


                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="" style={{wordWrap: 'break-word',padding:'20px'}}>




                                                    <Link to={"/proyecto-datos-generales/"} className="btn btn-danger block" >
                                                        <h5>TRANSFERENCIA INTERESTATAL</h5>

                                                    </Link>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-lg-3">

                                            <div className="card ">
                                                <div className="image-wrapper">
                                                    <img  src={'/img/proceso_adquisicion_predios.jpg'} alt="Avatar"  style={{height:'300px',width:'100%'}}/>


                                                    <div className="image-overlay">
                                                        <div className="image-info">
                                                            <Link className="pull-right leter-white" to={`/proyecto-edit/`} ><i className="fa fa-sign-in fa-2x"></i></Link>
                                                            <Link to={"/proyecto-datos-generales/"}>
                                                                <div className="h3 leter-white">Actividades de los Expediente del Adquisicion de Predios, como son Trato directo o Expropiacion
                                                                </div> </Link>

                                                            <span></span>
                                                            <div className="image-time"></div>
                                                            <div className="image-like">


                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="" style={{wordWrap: 'break-word',padding:'20px'}}>




                                                    <Link to={"/proyecto-datos-generales/"} className="btn btn-danger block" >
                                                        <h5>RECONOCIMIENTO DE MEJORAS</h5>

                                                    </Link>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-lg-3">

                                            <div className="card ">
                                                <div className="image-wrapper">
                                                    <img  src={'/img/proceso_adquisicion_predios.jpg'} alt="Avatar"  style={{height:'300px',width:'100%'}}/>


                                                    <div className="image-overlay">
                                                        <div className="image-info">
                                                            <Link className="pull-right leter-white" to={`/proyecto-edit/`} ><i className="fa fa-sign-in fa-2x"></i></Link>
                                                            <Link to={"/proyecto-datos-generales/"}>
                                                                <div className="h3 leter-white">Actividades de los Expediente del Adquisicion de Predios, como son Trato directo o Expropiacion
                                                                </div> </Link>

                                                            <span></span>
                                                            <div className="image-time"></div>
                                                            <div className="image-like">


                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="" style={{wordWrap: 'break-word',padding:'20px'}}>




                                                    <Link to={"/proyecto-datos-generales/"} className="btn btn-danger block" >
                                                        <h5>LIBERACION DE INTERFERENCIAS </h5>

                                                    </Link>
                                                </div>
                                            </div>


                                        </div>

                                    </div>

                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Procesos;