import React from 'react';

import {serverFile,initAxiosInterceptors} from "../../../../config/axios";



const Axios = initAxiosInterceptors();


const ItemTimeLineConsultaEntidad = ({props}) => {
   
    /*const {institucion2}=diagnotico;*/
    console.log(props)
    const {id,institucion,fecha_envio_oficio,fecha_respuesta_oficio,doc_envio,doc_respuesta,files_consulta,usuareg_consulta,fech_reg_consulta}=props
    
    return (
        <>
            <div className="timeline-item">
                <div className="timeline-info">
                    <div className="timeline-icon bg-success">
                        <i className="fa fa-file-text-o"></i>
                    </div>
                    <div className="time" style={{fontSize: '9px', color: '#000'}}>
                        {fecha_envio_oficio}
                    </div>
                </div>
                <div className="panel panel-default timeline-panel">
                    <div className="panel-heading">
                        <b style={{color: '#000'}}> {institucion}</b>
                        <small className="pull-right text-muted">
                            <i title={'Usuario que registro'}
                               className="fa fa-user"></i> {usuareg_consulta}  &nbsp;&nbsp;
                            <i title={'Fecha de registro'}
                               className="fa fa-clock-o"></i>{fech_reg_consulta}
                        </small>
                    </div>
                    <div className="panel-body">

                        <div className="panel-body p-top-sm">

                            <div className="inline-block m-top-xs">
                                <strong
                                    className="m-left-xs m-right-sm">
                                   
                                    {doc_envio? <><a target="_blank" href={`${serverFile}${doc_envio}`}>
                                        <i title="Descargar el documento de enviado" className="fa fa-file-pdf-o"></i></a></>:null}
                                        
                                    Fecha Envio Oficio :</strong>
                                <span className="badge">{fecha_envio_oficio}</span>

                            </div>
                            <span> |</span>
                            <div className="inline-block m-top-xs">
                                <strong
                                    className="m-left-xs m-right-sm">
                                    {doc_respuesta? <><a target="_blank" href={`${serverFile}${doc_respuesta}`}>
                                        <i title="Descargar el documento de recepcion" className="fa fa-file-pdf-o"></i></a></>:null}
                                   
                                    Fecha Envio Oficio :</strong>
                                <span className="badge">{fecha_respuesta_oficio}</span>

                            </div>


                            <div className="pull-right">
                                <div className="panel-group" id="accordion">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle collapsed"
                                                   data-toggle="collapse"
                                                   data-parent="#accordion"
                                                   href={`#colapse${id}`}>
                                                    <i className="fa fa-paperclip"></i> Archivos Adicionales
                                                </a>
                                            </h4>
                                        </div>
                                        <div id={`colapse${id}`}
                                             className="panel-collapse collapse"
                                             style={{height:'0'}}>
                                            <div className="panel-body">
                                                <div className="dropdown-demo">

                                                    <ul className="">
                                                        
                                                        
                                                        {
                                                            files_consulta.map(item=>
                                                                (<>
                                                                    <li>
                                                                        <a target="_blank" href={`${serverFile}${item.filename}`}   tabIndex="-1">{item.path}</a>
                                                                    </li>
                                                                </>)
                                                            )
                                                        }

                                                      
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>



                        </div>


                        <a className="btn btn-xs btn-danger"><i
                            className="fa fa-trash"></i> Eliminar</a>

                    </div>
                </div>

            </div>
        </>
    );
};

export default ItemTimeLineConsultaEntidad;