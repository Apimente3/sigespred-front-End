import React, {useEffect, useState} from 'react';
import SidebarAdm from "./SiderBarDiagnostico";
import {Link} from "react-router-dom";
import UploadFile from "../solicitudes/UploadFile";
import FooterProcess from "../../gestionPredios/FooterProcess";
import Header from "../../header/Header";
import File from "../solicitudes/File";
import {initAxiosInterceptors,filepath} from "../../../config/axios";

const Axios = initAxiosInterceptors();

/*Permite cargar los reposables*/

async function cargarDatosSolicitud(denominacion) {
    const {data} = await Axios.get(`/datos-solicitud?denominacion=${denominacion}`);
    return data;
}




const DatosGenerales = ({history, match}) => {

    const {codsolicitud: solicitud} = match.params;
    const [solicitudstate, setSolicitudstate] = useState({});
    //alert(solicitud)

    useEffect(() => {
        async function getSolcitud() {
            try {
                const [soli] = await cargarDatosSolicitud(solicitud);
                if(soli){
                    setSolicitudstate(soli)  
                }else{
                    history.push('/no-encontrado')  
                }
            } catch (error) {
              
               
            }
        }

        getSolcitud();

    }, [solicitud]);


    return (
        <>
            <div>
                <SidebarAdm solicitud={solicitudstate.denominacion} />

                <form action="">

                    <Header></Header>
                    <div className="container mtop-20">
                        <h4 className="headline ">
                            Datos Generales de la Solicitud
                            <span className="line"></span>
                        </h4>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel panel-default">
                                    <form className="form-horizontal form-border no-margin">

                                        <div className="panel-body">
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Denominación :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.denominacion}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>

                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Documento :</label>
                                                <div className="col-lg-9">
                                                    <a href={filepath(solicitudstate.filesave)} target="_blank" title={solicitudstate.originalname} type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                       <i className="fa fa-file-pdf-o fa-2x"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Tipo de Proyecto :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.tipoproyecto}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Tipo de Infraestructura
                                                    :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.tipoinfraestructura}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Organo Solicitante :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.organosolicitante}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Contrato :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.contrato}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Resposable :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.responsable}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Brigada a cargo :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.brigada}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <label className="control-label col-lg-3">Fecha del Documento :</label>
                                                <div className="col-lg-9">
                                                    <label type="text" className="control-label "
                                                           data-type="email" placeholder="Email Address">
                                                        {solicitudstate.fechadocumento}
                                                    </label>
                                                </div>
                                            </div>


                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row margin-button-form "></div>

                </form>
                <FooterProcess/>
            </div>
        </>
    );
};

export default DatosGenerales;