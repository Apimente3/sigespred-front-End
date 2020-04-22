import React from 'react';
import {serverFile,initAxiosInterceptors} from "../../../../config/axios";

const ItemTimeLineVisitaCampo = ({props}) => {
    const {id,files_visita,objetivo,actividades,usuareg_visita,fech_reg_visita,fecha_inicio,informe_inspeccion}=props
    return (
        <>
            <div className="timeline-item">
                <div className="timeline-info">
                    <div className="timeline-icon bg-info">
                        <i className="fa fa-file-text-o"></i>
                    </div>
                    <div className="time" style={{fontSize: '9px', color: '#000'}}>
                        {fecha_inicio}<br/> 
                    </div>
                </div>
                <div className="panel panel-default timeline-panel">
                    <div className="panel-heading">
                        <b style={{color: '#000'}}>  {objetivo}</b>
                        <small className="pull-right text-muted">
                            <i title={'Usuario que registro'}
                               className="fa fa-user"></i> {usuareg_visita}  &nbsp;&nbsp;
                            <i title={'Fecha de registro'}
                               className="fa fa-clock-o"></i> {fech_reg_visita}
                        </small>
                    </div>
                    <div className="panel-body">
                        
                        
                        <div className="row">
                            <div className="col-lg-8">
                                <h6 style={{color:'#000'}}>Informe de Brigada:</h6>
                                <p>
                                    <a href={`${serverFile}${informe_inspeccion}`} target="_blank"><i className="fa fa-file-pdf-o fa-3x"></i></a>
                                </p>
                               

                            </div>
                            <div className="col-lg-8">
                                <h6 style={{color:'#000'}}>Objetivo:</h6>
                                <p>
                                    {objetivo}
                                </p>
                                <h6 style={{color:'#000'}}>Actividades:</h6>
                                <div dangerouslySetInnerHTML={{__html: actividades}}>
                                    
                                </div>
                               
                            </div>
                            <div className="col-lg-4">
                                <div className="pull-right">
                                    <div className="panel-group" id="accordion">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    <a className="accordion-toggle collapsed"
                                                       data-toggle="collapse"
                                                       data-parent="#accordion"
                                                       href={`colapsevc${id}`}>
                                                        <i className="fa fa-paperclip"></i> Archivos Adicionales
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id={`colapsevc${id}`}
                                                 className="panel-collapse collapse"
                                                 style={{height:'0'}}>
                                                <div className="panel-body">
                                                    <div className="dropdown-demo">

                                                        <ul className="">

                                                            <ul className="">
                                                                {
                                                                    files_visita.map(item=>
                                                                        (<>
                                                                            <li>
                                                                                <a target="_blank" href={`${serverFile}${item.filename}`}   tabIndex="-1">{item.path}</a>
                                                                            </li>
                                                                        </>)
                                                                    )
                                                                }
                                                            </ul>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                      
         
                        &nbsp;
                        <a className="btn btn-xs btn-danger"><i
                            className="fa fa-trash"></i> Eliminar</a>

                    </div>
                </div>

            </div>   
        </>
    );
};

export default ItemTimeLineVisitaCampo;