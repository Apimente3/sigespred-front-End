import React, {useState} from 'react';
import Header from "../../header/Header";
import {Link} from "react-router-dom";
import FooterProcess from "../../gestionPredios/FooterProcess";
import SidebarAdm from "../SidebarAdm";

const SolicitudAddPred = ({history}) => {

    const [categoriaproyecto, setCategoriaproyecto] = useState('');
    const [concesion,setConcesion] = useState('');
    const [proyecto, setProyecto] = useState('');
    const [obra, setObra] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [provincia, setProvincia] = useState('');
    const [distrito, setDistrito] = useState('');
    const [codigobase, setCodigobase] = useState('');
    const [cantpredio, setCantPredio] = useState('');
    const [brigada, setBrigada] = useState('');
    const [observacion, setObservacion] = useState('Nuevo Registro');


    return (
        <div>
            <SidebarAdm/>

            <form action="">

                <Header></Header>
                <div className="container mtop-20">
                    <h4 className="headline ">
                        Agregar mas Predios a la Solicitud 
                        <span className="line"></span>
                    </h4>
                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <h5></h5>
                        </div>
                        <div className="panel-body">

                            <div className="form-group">
                                <label className="col-lg-2 control-label"> DATOS :</label>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                        <span>AEROPORTUARIO</span><br></br>
                                        <small className="text-muted text-danger font-7">CATEGORIA</small>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="pull-left m-left-sm ">
                                        <span>PERU VIAL</span><br></br>
                                        <small className="text-muted text-danger font-7">CONCESION</small>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                        <span>AEROPUERTO DE TUMBES</span><br></br>
                                        <small className="text-muted text-danger font-7">PROYECTO</small>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="pull-left m-left-sm ">
                                        <span>-</span><br></br>
                                        <small className="text-muted text-danger font-7">OBRA</small>
                                    </div>
                                </div>



                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"></label>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                        <span>TUMBES</span><br></br>
                                        <small className="text-muted text-danger font-7">DEPARTAMENTO</small>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="pull-left m-left-sm ">
                                        <span>TUMBES</span><br></br>
                                        <small className="text-muted text-danger font-7">PROVINCIA</small>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                        <span>TUMBES</span><br></br>
                                        <small className="text-muted text-danger font-7">DISTRITO</small>
                                    </div>
                                </div>
                              



                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"></label>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                        <h4>TUM-005-PRED-</h4><br></br>
                                        <small className="text-muted text-danger font-7">CÓDIGO BASE </small>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                       <h4>45</h4><br></br>
                                        <small className="text-muted text-danger font-7">ÚLTIMO Nº</small>
                                    </div>
                                </div>

                            </div>
                         
                            
                           
                         


                            <hr></hr>
                            {/*Informe de gestion */}
                            <div className={''}>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe GESTION</label>
                                    <label className="col-lg-4 "><h4>INFORME 0023/MTC-02-2019</h4></label>
                                  
                                 
                                    <div className="col-lg-4">
                                        <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                            className="fa fa-eye"></i> Ver </a>
                                    </div>

                                  
                                </div>
                            </div>
                            {/*Informe de DGAC */}
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe DGAC</label>
                                <label className="col-lg-4 "><h4>INFORME 0023/MTC-02-2019</h4></label>


                                <div className="col-lg-2">
                                    <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                        className="fa fa-eye"></i> Ver </a>
                                </div>
                            </div>

                            {/*Informe DIPTRA*/}

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe DIPTRA</label>
                                <label className="col-lg-4 "><h4>INFORME 0023/MTC-02-2019</h4></label>


                                <div className="col-lg-2">
                                    <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                        className="fa fa-eye"></i> Ver </a>
                                </div>
                            </div>
                            {/*Informe APN*/}
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe APN</label>
                                <label className="col-lg-4 "><h4>INFORME 0023/MTC-02-2019</h4></label>


                                <div className="col-lg-2">
                                    <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                        className="fa fa-eye"></i> Ver </a>
                                </div>
                            </div>








                            <hr></hr>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Cant. Agregar</label>
                                <div className="col-lg-3">
                                    <input  required className="form-control input-sm" type="text"
                                            placeholder="Cant."
                                          
                                    ></input>
                                </div>

                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Brigada a Cargo</label>
                                <div className="col-lg-3">
                                    <select id="tipopredio" className="form-control input-sm"
                                            onChange={e=>setBrigada(e.target.value)}
                                    >
                                        <option value="0">NINGUNO</option>
                                        <option value="1">BG-001 - Brigada tumbes</option>
                                        <option value="1">BG-002 - Brigada tumbes</option>
                                        <option value="1">BG-003 - Brigada tumbes</option>
                                        <option value="1">BG-004 - Brigada tumbes</option>
                                        <option value="1">BG-005 - Brigada tumbes</option>


                                    </select>
                                </div>

                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"> </label>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                        <span>Armando Pimentel Abril</span><br></br>
                                        <small className="text-muted text-danger font-7">TECNICO</small>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="pull-left m-left-sm ">
                                        <span>Miguel Mendoza Sanchez</span><br></br>
                                        <small className="text-muted text-danger font-7">LEGAL</small>
                                    </div>
                                </div>



                            </div>

                            <hr></hr>




                            <div className="form-group ">
                                <label className="col-lg-2 control-label">Observaciones </label>
                                <div className="col-lg-6">
                                <textarea required className="form-control input-sm" placeholder="Observaciones" onChange={e=>setObservacion(e.target.value)}>
                                    Nuevo Registro
                                </textarea>
                                </div>

                            </div>
                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">
                                        <button id="btnguardar" type="submit" className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>
                                        <Link to={`/predios-list`} className="btn btn-default btn-sm btn-control">Cancelar</Link>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-button-form "></div>

            </form>
            <FooterProcess/>
        </div>
    );
};

export default SolicitudAddPred;