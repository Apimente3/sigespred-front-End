import React, {Component} from 'react';
import Header from "../header/Header";

import Footer from "../footer/Footer";
import {Link} from 'react-router-dom';
import './styles.css'
import InputApn from "./InputAPN";
import InputDgac from "./InputDGAC";
import InputDiptra from "./InputDiptra";
import InputGestion from "./inputGestion";
import FooterProcess from "../gestionPredios/FooterProcess";

class EditarPredio extends Component {

    state={
        vial:true,
        aero:false,
        ferro:false,
        puerto:false
    }

    changeTipoProy=(event)=>{


        switch (event.target.value) {
            case '1':
                this.setState({
                    vial:true,
                    aero:false,
                    ferro:false,
                    puerto:false
                })
                break;
            case '2':
                this.setState({
                    vial:false,
                    aero:true,
                    ferro:false,
                    puerto:false
                })
                break;
            case '3':
                this.setState({
                    vial:false,
                    aero:false,
                    ferro:false,
                    puerto:true
                })
                break;
            case '4':
                this.setState({
                    vial:false,
                    aero:false,
                    ferro:true,
                    puerto:false
                })
                break;

        }
    }

    render() {
        const {vial,aero,ferro,puerto}=this.state;
        return (
            <div>

                <form action="">

                    <Header></Header>
                    <div className="container mtop-20">
                        <h4 className="headline ">
                            Editar de Predio
                            <span className="line"></span>
                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                            <div className="panel-heading">
                                <h5><i className="fa fa-file-text-o" aria-hidden="true"></i> Datos del Predio</h5>
                            </div>
                            <div className="panel-body">




                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Nº
                                        Codigo del Predio</label>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm" type="text"
                                               placeholder="Codigo"></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Categoria de Proyecto</label>
                                    <div className="col-lg-3">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>

                                            <option value="1">VIAL</option>
                                            <option value="2">AEROPUERTARIO</option>
                                            <option value="3">PUERTARIO</option>
                                            <option value="4">FERROVIARIO</option>
                                            <option value="5">TRACK-CENTER</option>

                                        </select>
                                    </div>

                                </div>
                                <hr></hr>
                                { vial ? (  <div><InputGestion/><InputDiptra/></div> ): null}

                                { aero ? (  <div><InputDgac/><InputDiptra/></div> ): null}

                                { ferro ? (  <div><InputGestion/><InputDiptra/></div> ): null}

                                { puerto ? (  <div><InputApn/><InputDiptra/></div> ): null}

                                <hr></hr>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"> Departamento</label>
                                    <div className="col-lg-2">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>

                                            <option value="1">NINGUNO</option>
                                            <option value="2">TUMBES</option>

                                        </select>
                                    </div>
                                    <label className="col-lg-1 control-label"> Provincia</label>
                                    <div className="col-lg-2">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>

                                            <option value="1">NINGUNO</option>


                                        </select>
                                    </div>

                                    <label className="col-lg-1 control-label"> Distrito</label>
                                    <div className="col-lg-2">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>

                                            <option value="1">NINGUNO</option>


                                        </select>
                                    </div>
                                </div>


                                <hr></hr>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Brigada a Cargo</label>
                                    <div className="col-lg-3">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>
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

                                    <div className="col-lg-3">
                                        <div className="pull-left m-left-sm ">
                                            <span>Renato Minano Elvar</span><br></br>
                                            <small className="text-muted text-danger font-7">COORDINADOR</small>
                                        </div>
                                    </div>

                                </div>

                                <hr></hr>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"> Concesion</label>
                                    <div className="col-lg-2">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>

                                            <option value="1">NINGUNO</option>
                                            <option value="2">TUMBES</option>

                                        </select>
                                    </div>
                                    <label className="col-lg-1 control-label"> Proyecto</label>
                                    <div className="col-lg-2">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>

                                            <option value="1">NINGUNO</option>


                                        </select>
                                    </div>

                                    <label className="col-lg-1 control-label"> Obra</label>
                                    <div className="col-lg-2">
                                        <select id="tipopredio" className="form-control input-sm" onChange={this.changeTipoProy}>

                                            <option value="1">NINGUNO</option>


                                        </select>
                                    </div>
                                </div>


                                <div className="form-group ">
                                    <label className="col-lg-2 control-label">Observaciones </label>
                                    <div className="col-lg-6">
                                <textarea required className="form-control input-sm" placeholder="Observaciones">
                                  
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
    }
}

export default EditarPredio;