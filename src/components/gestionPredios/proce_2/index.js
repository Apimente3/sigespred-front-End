import React, {Component} from 'react';
import Header from "../../header/Header";
import SelectProcessos from "../SelectProcessos";
import ResumenProcesoDatos from "../ResumenProcesoDatos";
import BrigadaProcess from "../BrigadaProcess";
import ResumenProcesoAvance from "../ResumenProcesoAvance";
import FooterProcess from "../FooterProcess";
import ResumenPredio from "../ResumenPredio";
import BloqueadorProceso from "../BloqueadorProceso";
import VisorPdf from "../VisorPDF";
import ResumenDireccPredio from "../ResumenDireccPredio";

class Index extends Component {

    state = {
        isbasereg:true,
        showPDF:false
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

    showOficio=(e)=>{
        e.preventDefault();
        this.setState({
            showPDF:true
        })
    }

    closeOficio=(e)=>{
        e.preventDefault();
        this.setState({
            showPDF:false
        })
    }



    render() {
        const {isbasereg,showPDF}=this.state;


        return (
            <div>
                {
                    showPDF? <VisorPdf closeOficio={this.closeOficio}/>:null
                }

       
                <Header></Header>

                <form action="">
                    <div className="container mtop-20">
                        <h4 className=" ">

                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h5>PROC-02 OFICIO DE INICIO DE ADQUISICION</h5>
                                    </div>
                                    <SelectProcessos history={this.props.history}/>
                                </div>


                            </div>
                            <div className="panel-body">

                                <div className={'borderreumenes'}>
                                <ResumenProcesoDatos/>
                                <ResumenPredio/>
                                </div>
                                <hr></hr>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Nº
                                        de Ofic. Adquisición</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>

                                    <div className="col-lg-4">
                                        <input required="" className="" type="file" placeholder=""></input>
                                    </div>

                                    <div className="col-lg-2">
                                        <a href="#visorPDF" onClick={this.showOficio}
                                           className="btn btn-default form-button-proc"><i
                                            className="fa fa-eye"></i> Ver </a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Fecha Emisión</label>
                                    <div className="col-lg-3">
                                        <input required="" className="form-control input-sm" type="date" placeholder=""
                                        ></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Fecha Recepción</label>
                                    <div className="col-lg-3">
                                        <input required="" className="form-control input-sm" type="date" placeholder=""
                                        ></input>
                                    </div>
                                  
                                </div>

                            <ResumenDireccPredio/>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Direccion del Predio</label>
                                    <div className="col-lg-3">
                                        <input disabled={true} value={'Jron Callao 456'} required="" className="form-control input-sm" type="text" placeholder=""
                                        ></input>
                                    </div>

                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Domicilio Fiscal</label>
                                    <div className="col-lg-3">
                                        <input disabled={true} value={'Jron Callao 456'} required="" className="form-control input-sm" type="text" placeholder=""
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