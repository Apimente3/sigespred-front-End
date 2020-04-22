import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listar_actividades_diagnostico} from "../../../actions/diagnostico/Actions";
import SidebarAdm from "./SiderBarDiagnostico";
import {Link} from "react-router-dom";
import MConsultaEntidades from "./modals/MConsultaEntidades";
import MvisitaCampo from "./modals/MvisitaCampo";
import MInformeFinalDiagnostico from "./modals/MInformeFinalDiagnostico";

import FooterProcess from "../../gestionPredios/FooterProcess";
import Header from "../../header/Header";

import ItemTimeLineConsultaEntidad from "./common/ItemTimeLineConsultaEntidad";
import ItemTimeLineVisitaCampo from "./common/ItemTimeLineVisitaCampo";
import {initAxiosInterceptors, serverFile} from "../../../config/axios";


const Axios = initAxiosInterceptors();

async function cargarDatosSolicitud(denominacion) {
    const {data} = await Axios.get(`/datos-solicitud?denominacion=${denominacion}`);
    return data;
}


async function listaractividadesdiagnostico(solicitud_id) {

    const {data} = await Axios.get(`/list_diagnostico?solicitud_id=${solicitud_id}`);
    alert(JSON.stringify(data))
    return data;
}


const Diagnostico = ({history, match}) => {


    const {codsolicitud: solicitud} = match.params;
    const [modalCE, setModalCE] = useState(false);
    const [modalVC, setModalVC] = useState(false);
    const [modalIF, setModalIF] = useState(false);
    const [solicitudstate, setSolicitudstate] = useState({});
    // const [listaDiagnostico, setlistaDiagnostico] = useState([]);


    const dispatch = useDispatch();
    const listar_actividades_diagnostico_action = (solicitud_id) => dispatch(listar_actividades_diagnostico(solicitud_id));


    useEffect(() => {
        async function getSolcitud() {
            try {
                const [soli] = await cargarDatosSolicitud(solicitud);
                setSolicitudstate(soli);
                //const listado=await listaractividadesdiagnostico(soli.id)
                // setlistaDiagnostico( listado);
                listar_actividades_diagnostico_action(soli.id);

                // alert(soli.id)

            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }

        getSolcitud();

    }, []);

    const listaDiagnostico = useSelector(state => state.diagnostico.listado_diagnostico);


    const showModalCE = () => {
        setModalCE(true)
    }
    const closeModalCE = (estado) => {
        setModalCE(estado)
    }
    const showModalVC = () => {
        setModalVC(true);
    }
    const closeModalVC = (estado) => {
        setModalVC(estado)
    }

    const showModalIF = () => {
        setModalIF(true);
    }
    const closeModalIF = (estado) => {
        setModalIF(estado)
    }

    return (
        <>
            <div>
                <SidebarAdm solicitud={solicitud}/>
                <Header></Header>

                <form>
                    <div className="container mtop-20">
                        <h4 className="headline ">
                            Actividades de Diagnostico FISICO - LEGAL
                            <span className="line"></span>
                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                            <div className="panel-body">
                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext" title={'Polygono Mama'}>Crear
                                        Actividad {solicitud}</legend>
                                </fieldset>

                                <div>


                                   

                                    <div className="form-group ">

                                        { listaDiagnostico.informe_final.length == 0  ?
                                            (<> <div className="form-group ">


                                                    <div className="col-lg-4">
                                                        <a onClick={showModalIF} className="btn btn-default quick-btn"><i
                                                            className="fa fa-file-text-o"></i><span>Informe Final</span></a>

                                                    </div>


                                                </div>
                                                
                                                <div className="col-lg-8">
                                                <a href="#" onClick={showModalCE} type="file"
                                                   className="btn btn-success btn-sm btn-actividades">
                                                    + CONSULTA A ENTIDADES
                                                </a>
                                                &nbsp;&nbsp;
                                                <a href="#" onClick={showModalVC} type="file"
                                                   className="btn btn-info btn-sm btn-actividades">
                                                    + INSPECCION DE CAMPO
                                                </a>


                                            </div>
                                                </>
                                            ): 
                                            
                                            (<div className="col-lg-12 ">
                                                <div className="panel bg-dark">
                                                    <div className="panel-body text-center">
                                                       
                                                        <div className="seperator"></div>
                                                        <div className="m-top-md">
                                                         <span
                                                            className="h1 text-red">INFORME FINAL ENTREGADO</span>
                                                            <strong className="block">Registrado por: {listaDiagnostico.informe_final[0].usua_reg}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="panel-footer">
                                                        <div className="row">
                                                            <div className="col-xs-4">
                                                                <label className={`text-red`}>FECHA ENTREGA INFORME FINAL</label>
                                                                <strong className="block">{listaDiagnostico.informe_final[0].fecha_entrega}</strong>
                                                            </div>
                                                            <div className="col-xs-4">
                                                               <label className={`text-red`}>INFORME FINAL DE DIAGNOSTICO </label> 
                                                               
                                                                <strong className="block">
                                                                    <a href={`#`} target="_blank"><i className="fa fa-file-pdf-o fa-3x"></i></a>
                                                                </strong>
                                                                <strong className="block">{listaDiagnostico.informe_final[0].codigo}</strong>
                                                            </div>
                                                            <div className="col-xs-4">
                                                                <label className={`text-red`}><i className="fa fa-paperclip"></i> ADJUNTOS </label>
                                                                <ul className="">
                                                                    {
                                                                        listaDiagnostico.informe_final[0].files.map(item=>
                                                                            (<>
                                                                                <ol>
                                                                                    <a target="_blank" href={`${serverFile}${item.filename}`}   tabIndex="-1">{item.path}</a>
                                                                                </ol>
                                                                            </>)
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                           
                                        }
                                       


                                    </div>
                                </div>

                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext"></legend>
                                </fieldset>

                                <div>

                                    <div className="timeline-wrapper">

                                        {
                                            !listaDiagnostico.actividades || listaDiagnostico.actividades.length == 0 ?
                                                null :
                                                listaDiagnostico.actividades.map(item =>
                                                    (<>
                                                            {item.idconsulta ? (
                                                                <ItemTimeLineConsultaEntidad
                                                                props={item}></ItemTimeLineConsultaEntidad>): 
                                                                (
                                                                    <ItemTimeLineVisitaCampo  props={item} />
                                                                )
                                                            }
                                                           
                                                        </>

                                                    )
                                                )
                                        }

                                        <div className="timeline-item clearfix">
                                            <div className="timeline-info">
                                                <div className="timeline-icon bg-grey">
                                                    <i className="fa fa-pencil"></i>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <hr/>
                                <div className="panel-body">


                                </div>
                            </div>
                        </div>
                    </div>


                </form>
                <FooterProcess/>
            </div>

            {modalCE ? <MConsultaEntidades solicitud={solicitudstate} closeModalCE={closeModalCE}/> : ''}

            {modalVC ? <MvisitaCampo solicitud={solicitudstate} closeModalVC={closeModalVC}/> : ''}

            {modalIF ? <MInformeFinalDiagnostico solicitud={solicitudstate} closeModalIF={closeModalIF}/> : ''}


        </>
    );
};

export default Diagnostico;