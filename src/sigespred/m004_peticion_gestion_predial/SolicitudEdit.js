import React, {useState} from 'react';
import Header from "../../header/Header";
import InputGestion from "../../agregarPredio/inputGestion";
import InputDiptra from "../../agregarPredio/InputDiptra";
import InputDgac from "../../agregarPredio/InputDGAC";
import InputApn from "../../agregarPredio/InputAPN";
import {Link} from "react-router-dom";
import FooterProcess from "../../gestionPredios/FooterProcess";
import SidebarAdm from "../SidebarAdm";

const SolicitudEdit = ({history}) => {

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
                        Modificación de Solicitud de Expropiacion de Predios
                        <span className="line"></span>
                    </h4>
                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <h5></h5>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Categoria de Proyecto</label>
                                <div className="col-lg-3">
                                    <select id="tipopredio" value={categoriaproyecto} className="form-control input-sm"
                                            onChange={e=>setCategoriaproyecto(e.target.value)}
                                    >

                                        <option value="1">VIAL</option>
                                        <option value="2">AEROPUERTARIO</option>
                                        <option value="3">PUERTARIO</option>
                                        <option value="4">FERROVIARIO</option>
                                        <option value="5">TRACK-CENTER</option>

                                    </select>
                                </div>

                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"> Concesion</label>
                                <div className="col-lg-2">
                                    <select id="tipopredio" className="form-control input-sm"
                                            onChange={e=>setConcesion(e.target.value)}
                                    >

                                        <option value="1">NINGUNO</option>
                                        <option value="2">TUMBES</option>

                                    </select>
                                </div>
                                <label className="col-lg-1 control-label"> Proyecto</label>
                                <div className="col-lg-2">
                                    <select id="tipopredio" className="form-control input-sm"
                                            onChange={e=>setProyecto(e.target.value)}
                                    >
                                        <option value="1">NINGUNO</option>
                                    </select>
                                </div>

                                <label className="col-lg-1 control-label"> Obra</label>
                                <div className="col-lg-2">
                                    <select id="tipopredio" className="form-control input-sm"
                                            onChange={e=>setObra(e.target.value)}
                                    >
                                        <option value="1">NINGUNO</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"> Departamento</label>
                                <div className="col-lg-2">
                                    <select id="tipopredio" className="form-control input-sm"
                                            onChange={e=>setDepartamento(e.target.value)}
                                    >

                                        <option value="NINGUNO">NINGUNO</option>
                                        <option value="TUMBES">TUMBES</option>

                                    </select>
                                </div>
                                <label className="col-lg-1 control-label"> Provincia</label>
                                <div className="col-lg-2">
                                    <select id="tipopredio" className="form-control input-sm"
                                            onChange={e=>setProvincia(e.target.value)}
                                    >
                                        <option value="1">NINGUNO</option>
                                    </select>
                                </div>

                                <label className="col-lg-1 control-label"> Distrito</label>
                                <div className="col-lg-2">
                                    <select id="tipopredio" className="form-control input-sm" value={distrito}
                                            onChange={e=>setDistrito(e.target.value)}
                                    >

                                        <option value="1">NINGUNO</option>


                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Nº
                                    Codigo Base</label>
                                <div className="col-lg-3">
                                    <input required className="form-control input-sm" type="text"
                                           placeholder="Ej. PM1G-AEROTM-PR-<NUM GENERADA>"
                                           onChange={e=>setCodigobase(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col-lg-1 sin-marginform">
                                    <label title={'Rango de numeracion generada'} className="control-label sin-marginform" >{}</label>
                                </div>
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Cant. Predios</label>
                                <div className="col-lg-1">
                                    <input  required className="form-control input-sm" type="text"
                                            placeholder="Cant."
                                            onChange={e=>setCantPredio(e.target.value)}
                                    ></input>
                                </div>
                            </div>


                            <hr></hr>
                            {/*Informe de gestion */}
                            <div className={''}>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe GESTION</label>
                                    <div className="col-lg-4">
                                        <input required="" className="form-control input-sm" type="text" placeholder=""
                                               value=""></input>
                                    </div>

                                    <div className="col-lg-4">
                                        <input required="" className="" type="file" placeholder="" value=""></input>
                                    </div>

                                    <div className="col-lg-2">
                                        <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                            className="fa fa-eye"></i> Ver </a>
                                    </div>
                                </div>
                            </div>
                            {/*Informe de DGAC */}
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe DGAC</label>
                                <div className="col-lg-4">
                                    <input required="" className="form-control input-sm" type="text" placeholder=""
                                           value=""></input>
                                </div>

                                <div className="col-lg-4">
                                    <input required="" className="" type="file" placeholder="" value=""></input>
                                </div>

                                <div className="col-lg-2">
                                    <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                        className="fa fa-eye"></i> Ver </a>
                                </div>
                            </div>

                            {/*Informe DIPTRA*/}

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe DIPTRA</label>
                                <div className="col-lg-4">
                                    <input required="" className="form-control input-sm" type="text" placeholder=""
                                           value=""></input>
                                </div>

                                <div className="col-lg-4">
                                    <input required="" className="" type="file" placeholder="" value=""></input>
                                </div>

                                <div className="col-lg-2">
                                    <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                        className="fa fa-eye"></i> Ver </a>
                                </div>
                            </div>
                            {/*Informe APN*/}
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe APN</label>
                                <div className="col-lg-4">
                                    <input required="" className="form-control input-sm" type="text" placeholder=""
                                           value=""></input>
                                </div>

                                <div className="col-lg-4">
                                    <input required="" className="" type="file" placeholder="" value=""></input>
                                </div>

                                <div className="col-lg-2">
                                    <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                                        className="fa fa-eye"></i> Ver </a>
                                </div>
                            </div>








                            <hr></hr>
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
                                        <Link to={`/solicitudes`} className="btn btn-default btn-sm btn-control">Cancelar</Link>

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

export default SolicitudEdit;