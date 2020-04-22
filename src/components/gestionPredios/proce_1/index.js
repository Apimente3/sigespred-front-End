import React, {Component} from 'react';
import Header from "../../header/Header";

import Footer from "../../footer/Footer";
import {Link} from 'react-router-dom';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import './stylesp1.css'

import SelectProcessos from "../SelectProcessos";
import FooterProcess from "../FooterProcess";
import ResumenProcesoAvance from "../ResumenProcesoAvance";
import ResumenProcesoDatos from "../ResumenProcesoDatos";
import BrigadaProcess from "../BrigadaProcess";
import AyudaProceso from "../AyudaProceso";
import AyudaCampo from "../AyudaCampo";



import { Modal, Button } from 'antd';
import VisorPdf from "../VisorPDF";
import Titulares from "./Titulares";
import SiderbarProc from "./SiderbarProc";

class Index extends Component {

    state = {
        predio:'asd',
        isbasereg: true,
        tipoProceso:true,
        showTitulares:false,
        modal:false
    };

    isBaseReg = (e) => {
        e.preventDefault();
        this.setState({
            isbasereg: true
        })

    }
    notBaseReg = (e) => {
        e.preventDefault();
        this.setState({
            isbasereg: false
        })


    }

    setAdquisicion = (e) => {
        e.preventDefault();
        this.setState({
            tipoProceso: true
        })

    }
    setmejora = (e) => {
        e.preventDefault();
        this.setState({
            tipoProceso: false
        })


    }

    setModal2Visible = (modal2Visible) => {
        this.setState({ modal:modal2Visible });
    }


    render() {
        const {isbasereg,tipoProceso,showTitulares} = this.state;


        return (
            <div>
                <SiderbarProc predio={this.state.predio}/>
                <Modal
                    closable
                    centered
                    width='800px'
                    title="Registro de Titulares"
                    style={{ top: 20 }}
                    visible={this.state.modal}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                >
                   <Titulares/>
                </Modal>
                <Header></Header>

                <form action="">
                    <div className="container mtop-20">
                        <h4 className=" ">

                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h5>PROC-01 CERTIFICADO DE BUSQUEDA CATASTRAL <AyudaProceso descripcion={'Proceso de registro de la busqueda catastral del predio '}/>
                                        </h5>
                                    </div>
                                    <SelectProcessos history={this.props.history}/>
                                </div>


                            </div>
                            <div className="panel-body">

                                <div className={'borderreumenes'}>
                                    <ResumenProcesoDatos/>
                                </div>
                               
                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">  Datos Principales   <AyudaProceso descripcion={'Proceso de registro de la busqueda catastral del predio '}/> </legend>
                                    
                                    </fieldset>
                                </form>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">*
                                         </span>
                                    Tipo de Proceso <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-4">

                                        <div className="btn-group">
                                            <button type="button"
                                                    className={`btn btn-default ${tipoProceso ? 'active' : ''}`}
                                                    onClick={this.setAdquisicion}>Adquisicion
                                            </button>
                                            <button type="button"
                                                    className={`btn btn-default ${!tipoProceso ? 'active' : ''}`}
                                                    onClick={this.setmejora}>Pago de Mejoras
                                            </button>

                                        </div>

                                    </div>

                                    <div className="col-lg-4">

                                    </div>

                                    <div className="col-lg-2">

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* 
                                        </span> Nº
                                        de Oficio <AyudaCampo descripcion={'Numero de Oficio de la solcitud del informe de tasacion'}/>
                                    </label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>

                                    <div className="col-lg-4">
                                        <input required="" className="" type="file" placeholder=""></input>
                                    </div>

                                    <div className="col-lg-2">
                                        <a target="_blank" href="/docs/2.PDF"
                                           className="btn btn-default form-button-proc"><i
                                            className="fa fa-eye"></i> Ver </a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">*</span> Fecha Emisión <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-3">
                                        <input required="" className="form-control input-sm" type="date" placeholder=""
                                        ></input>
                                    </div>

                                    <div className="col-lg-4">

                                    </div>

                                    <div className="col-lg-2">

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">*</span> Memoria Descriptiva <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-4">
                                        <input required="" className="form-control input-sm" type="text" placeholder=""
                                        ></input>
                                    </div>

                                    <div className="col-lg-4">
                                        <input required="" className="" type="file" placeholder=""></input>
                                    </div>


                                    <div className="col-lg-2">
                                        <a target="_blank" href="/docs/2.PDF"
                                           className="btn btn-default form-button-procc btn-form-margin form-button-proc"><i
                                            className="fa fa-eye"></i> Ver </a>
                                        <a target="_blank" href="/docs/2.PDF"
                                           className="btn btn-default form-button-proc"><i
                                            className="fa fa-chain-broken"></i> Crear </a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">*</span> Plano de Localizacion <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-4">
                                        <input required="" className="form-control input-sm" type="text" placeholder=""
                                        ></input>
                                    </div>

                                    <div className="col-lg-4">
                                        <input required="" className="" type="file" placeholder=""></input>
                                    </div>

                                    <div className="col-lg-2">
                                        <a target="_blank" href="/docs/2.PDF"
                                           className="btn btn-default form-button-proc "><i
                                            className="fa fa-eye"></i> Ver </a>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">*</span> Plano de Perimetrico <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-4">
                                        <input required="" className="form-control input-sm" type="text" placeholder=""
                                        ></input>
                                    </div>

                                    <div className="col-lg-4">
                                        <input required="" className="" type="file" placeholder=""></input>
                                    </div>

                                    <div className="col-lg-2">
                                        <a target="_blank" href="/docs/2.PDF"
                                           className="btn btn-default form-button-proc"><i
                                            className="fa fa-eye"></i> Ver </a>
                                    </div>
                                </div>


                                <hr></hr>


                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> ¿
                                        Se encuentra en la Base Registral? <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-4">

                                        <div className="btn-group">
                                            <button type="button"
                                                    className={`btn btn-default ${isbasereg ? 'active' : ''}`}
                                                    onClick={this.isBaseReg}>SI
                                            </button>
                                            <button type="button"
                                                    className={`btn btn-default ${!isbasereg ? 'active' : ''}`}
                                                    onClick={this.notBaseReg}>NO
                                            </button>

                                        </div>

                                    </div>

                                    <div className="col-lg-4">

                                    </div>

                                    <div className="col-lg-2">

                                    </div>
                                </div>

                                {isbasereg ? <div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">*</span> Partida Registral <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-4">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>

                                        <div className="col-lg-4">

                                        </div>

                                        <div className="col-lg-2">

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Area <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Perimetro <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Naturaleza del Predio <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <select id="tipopredio" className="form-control input-sm"
                                                    onChange={this.changeTipoProy}>

                                                <option value="URBANO">URBANO</option>
                                                <option value="RURAL">RURAL</option>

                                            </select>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> A.Inscr.Matriz (Ha/m2)  <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> A.Direct.Afectada (Ha/m2)  <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>
                                        <label className="col-lg-2 control-label lbl-form-small"><span
                                            className="obligatorio">* </span>  A.Indirect. Afectada (Ha/m2) <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>  A.
                                            Remanente (Ha/m2) <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> A.
                                            Adquirida (Ha/m2)  <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                        <div className="col-lg-2">
                                            <input required="" className="form-control input-sm" type="text"
                                                   placeholder=""
                                            ></input>
                                        </div>


                                    </div>
                                </div> : null}


                                <hr></hr>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>  DNI / RUC <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-2">
                                        <input required="" className="form-control input-sm" type="text" placeholder=""
                                        ></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>  Afectado / Representante <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-4">
                                        <input required="" className="form-control input-sm" type="text" placeholder=""
                                        ></input>
                                    </div>
                                    <div className="col-lg-2">

                                        <a title={'Gestion de Titulares'}  href="#"
                                           className="btn btn-default form-button-proc2"
                                           onClick={() => this.setModal2Visible(true)}
                                        ><i className="fa fa-users"></i> Titulares </a>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>  Informe Tecnico Emitido <AyudaCampo descripcion={'Selecionar si el predio se va ralizar por adquisiscion de mejoras u otra labor'}/></label>
                                    <div className="col-lg-4">
                                        <input required="" className="form-control input-sm" type="text" placeholder=""
                                        ></input>
                                    </div>

                                </div>
                                <hr></hr>

                             


                                <div className={'borderreumenes'}>
                                    <BrigadaProcess/>
                                    <ResumenProcesoAvance/>
                                </div>
                                <hr></hr>

                                <div className="panel-body">
                                    <div className="form-group ">
                                        <div className="col-lg-offset-2 col-lg-10">
                                            <button id="btnguardar" type="button"
                                                    className="btn btn-danger btn-sm btn-control">

                                                Finalizar
                                            </button>


                                        </div>

                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>

                </form>
                <div className="h-list-pred-footer"></div>


                <FooterProcess/>
            </div>
        );
    }
}

export default Index;