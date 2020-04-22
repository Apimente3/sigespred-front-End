import React, {Component} from 'react';
import Header from "../../header/Header";
import SelectProcessos from "../SelectProcessos";
import ResumenProcesoDatos from "../ResumenProcesoDatos";
import ResumenPredio from "../ResumenPredio";
import BrigadaProcess from "../BrigadaProcess";
import ResumenProcesoAvance from "../ResumenProcesoAvance";
import FooterProcess from "../FooterProcess";

class Index extends Component {
    render() {
        return (
            <div>


                <Header></Header>

                <form action="">
                    <div className="container mtop-20">
                        <h4 className=" ">

                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h5>PROC-08 CARTA DE RESPUESTA</h5>
                                    </div>
                                    <SelectProcessos history={this.props.history}/>
                                </div>


                            </div>
                            <div className="panel-body">

                                <div className={'borderreumenes'}>
                                    <ResumenProcesoDatos/>
                                    <ResumenPredio/>
                                </div>

                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Oficio al Afectado</legend>
                                    </fieldset>
                                </form>
                                <div>

                                    <div className="form-group">
                                        <label className="col-lg-1 control-label">
                                        </label>
                                        <label className="col-lg-3 control-label"><span
                                            className="obligatorio">* </span>Carta de Aceptacion a la Intencion
                                        </label>
                                        <div className="col-lg-1">
                                            <input  name="rpta" required className="form-control input-sm" type="radio"></input>
                                        </div>
                                        <label className="col-lg-3 control-label"><span
                                            className="obligatorio">* </span>Carta de Rechazo a la Oferta </label>
                                        <div className="col-lg-1">
                                            <input name="rpta" required className="form-control input-sm" type="radio"></input>
                                        </div>
                                       
                                    </div>
                                    <hr></hr>
                                    
                                    
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Numero</label>
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
                                            className="obligatorio">* </span>Fecha de Recepcion Mesa de partes </label>
                                        <div className="col-lg-3">
                                            <input required className="form-control input-sm" type="date"></input>
                                        </div>
                                        <div className="col-lg-2">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default btn-sm "><i
                                                className="fa fa-refresh"></i> Sincronizar con Tramite Documentario </a>
                                        </div>

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>Numero Exp. MP </label>
                                        <div className="col-lg-2">
                                            <input></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>Fecha Recepcion DDP </label>
                                        <div className="col-lg-3">
                                            <input required className="form-control input-sm" type="date"></input>
                                        </div>
                                    </div>


                                </div>

                              
                       
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