import React, {Component} from 'react';
import Header from "../../header/Header";
import SelectProcessos from "../SelectProcessos";
import ResumenProcesoDatos from "../ResumenProcesoDatos";
import BrigadaProcess from "../BrigadaProcess";
import ResumenProcesoAvance from "../ResumenProcesoAvance";
import FooterProcess from "../FooterProcess";
import ResumenPredio from "../ResumenPredio";

class Index extends Component {

    state = {
        isbasereg:true
    };

    isBaseReg=(e)=>{
        e.preventDefault();
        this.setState({
            isbasereg:true
        })

    }
    notBaseReg=(e)=>{
        e.preventDefault();
        this.setState({
            isbasereg:false
        })


    }



    render() {
        const {isbasereg}=this.state;


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
                                        <h5>PROC-03 INCRIPCION DE ANOTACION PREVENTIVA</h5>
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
                                        <legend align="center fielsettext">SUNARP - Anotacion Preventiva</legend>
                                    </fieldset>
                                </form>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Nº
                                        de Ofic. Anot.Preventiva</label>
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
                                        className="obligatorio">* </span> Fecha de Oficio </label>
                                    <div className="col-lg-3">
                                        <input required="" className="form-control input-sm" type="date" placeholder=""
                                        ></input>
                                    </div>
                                 
                                  
                                </div>
                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">TITULO - Anotacion Preventiva</legend>
                                    </fieldset>
                                </form>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Fecha de presentacion de Titulo </label>
                                    <div className="col-lg-3">
                                        <input required="" className="form-control input-sm" type="date" placeholder=""
                                        ></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Nº
                                        de TITULO</label>
                                    <div className="col-lg-3">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>


                                </div>
                           
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Fecha de Inscripción </label>
                                    <div className="col-lg-3">
                                        <input required="" className="form-control input-sm" type="date" placeholder=""
                                        ></input>
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