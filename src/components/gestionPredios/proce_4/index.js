import React, {Component} from 'react';
import Header from "../../header/Header";
import SelectProcessos from "../SelectProcessos";
import ResumenProcesoDatos from "../ResumenProcesoDatos";
import BrigadaProcess from "../BrigadaProcess";
import ResumenProcesoAvance from "../ResumenProcesoAvance";
import FooterProcess from "../FooterProcess";
import ResumenPredio from "../ResumenPredio";

const {jQuery} = window;

class Proce2 extends Component {

    state = {
        isbasereg: true,
        dateFocus: false
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

    componentDidMount() {
        jQuery('[data-toggle="tooltip"]').tooltip()
    }


    gfg_Run = (e) => {
        var today = new Date();
        var date = today.toJSON().slice(0, 10);
        var nDate = date.slice(8, 10) + '/'
            + date.slice(5, 7) + '/'
            + date.slice(0, 4);
        return nDate;
    }

    setFocusdate = (e) => {

        console.log('focus')
        e.preventDefault();
        this.setState({
            dateFocus: true
        })
    }
    unsetFocusdate = (e) => {

        e.preventDefault();
        console.log('unfocus')
        this.setState({
            dateFocus: false
        })
    }


    render() {
        const {isbasereg, dateFocus} = this.state;


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
                                        <h5>PROC-04 INFORME DE TASACION</h5>
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
                                        <legend align="center fielsettext">Requerimiento de Perito Tasador</legend>
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Nº
                                            de Informe Solicitando Perito Tasador</label>
                                        <div className="col-lg-3">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm"
                                                   type="date"
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de Informe"
                                            ></input>
                                        </div>

                                        <div className="col-lg-3">
                                            <input required="" className="" type="file" placeholder=""></input>
                                        </div>


                                        <div className="col-lg-1">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default form-button-proc"><i
                                                className="fa fa-eye"></i> Ver </a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Nº
                                            de O/S </label>
                                        <div className="col-lg-3">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm"
                                                   type="date"
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de inicio de O/S "
                                            ></input>
                                        </div>

                                        <div className="col-lg-3">
                                            <input required="" className="" type="file" placeholder=""></input>
                                        </div>

                                        <div className="col-lg-1">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default form-button-proc"><i
                                                className="fa fa-eye"></i> Ver </a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Nombre Perito Tasador</label>
                                        <div className="col-lg-5">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>


                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"></label>
                                        <div className="col-lg-4">
                                            <div className="pull-left m-left-sm ">
                                                <span>3</span><br></br>
                                                <small className="text-muted text-danger font-7 text-fech_proc anaranjado">Cant. Días Trancurridos desde la emision de informe a la emision de la O/S</small>
                                            </div>
                                        </div>
                                      

                                    </div>

                                </div>


                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Requerimiento Perito Supervisor</legend>
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Nº
                                            de Informe Solicitando al Supervisor</label>
                                        <div className="col-lg-3">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='date'
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de Informe"
                                            ></input>
                                        </div>

                                        <div className="col-lg-3">
                                            <input required="" className="" type="file" placeholder=""></input>
                                        </div>


                                        <div className="col-lg-1">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default form-button-proc"><i
                                                className="fa fa-eye"></i> Ver </a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Nº
                                            de O/S </label>
                                        <div className="col-lg-3">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm"
                                                   type="date"
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de inicio de O/S "
                                            ></input>
                                        </div>

                                        <div className="col-lg-3">
                                            <input required="" className="" type="file" placeholder=""></input>
                                        </div>

                                        <div className="col-lg-1">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default form-button-proc"><i
                                                className="fa fa-eye"></i> Ver </a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Nombre Supervidor</label>
                                        <div className="col-lg-5">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>


                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"></label>
                                        <div className="col-lg-4">
                                            <div className="pull-left m-left-sm ">
                                                <span>3</span><br></br>
                                                <small className="text-muted text-danger font-7 text-fech_proc anaranjado">Cant. Días Trancurridos desde la emision de informe a la emision de la O/S</small>
                                            </div>
                                        </div>


                                    </div>
                                </div>


                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Entrega de Expediente Técnico de Tasación a Perito Tasador </legend>
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            N° de oficio a Perito Tasador
                                        </label>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='date'
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de Emision"
                                            ></input>
                                        </div>

                                    

                                        <div className="col-lg-3">
                                            <input required="" className="" type="file" placeholder=""></input>
                                        </div>


                                        <div className="col-lg-1">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default form-button-proc"><i
                                                className="fa fa-eye"></i> Ver </a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                           Fecha de Entrega
                                        </label>
                                      
                                       

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='date'
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de Recepcion"
                                            ></input>
                                        </div>

                                      

                                    </div>
                                </div>

                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Informe Técnico de Tasación   </legend>
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Fecha de Inspección ocular
                                        </label>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type="text" type="date"></input>
                                        </div>
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Fecha Elab. informe
                                        </label>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='date'
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de Emision"
                                            ></input>
                                        </div>

                                 

                                     
                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Fecha de Recepcion Tnf. Tec. Tasac.
                                        </label>
                                     
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='date'
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de Recepcion"
                                            ></input>
                                        </div>

                                        <div className="col-lg-3">
                                            <input required="" className="" type="file" placeholder=""></input>
                                        </div>


                                        <div className="col-lg-1">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default form-button-proc"><i
                                                className="fa fa-eye"></i> Ver </a>
                                        </div>
                                    </div>

                                </div>

                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Conformidad del Supervisor</legend>
                                    </fieldset>
                                </form>
                                <div>
                                    

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Fecha de Conformidad
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='date'
                                                   data-toggle="tooltip" data-placement="top" title=""
                                                   data-original-title="Fecha de Recepcion"
                                            ></input>
                                        </div>

                                        <div className="col-lg-3">
                                            <input required="" className="" type="file" placeholder=""></input>
                                        </div>


                                        <div className="col-lg-1">
                                            <a target="_blank" href="/docs/2.PDF"
                                               className="btn btn-default form-button-proc"><i
                                                className="fa fa-eye"></i> Ver </a>
                                        </div>
                                    </div>

                                </div>


                          

                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Terreno</legend>
                                    </fieldset>
                                </form>
                                <div>


                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                          Area
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>Tipo Terreno</label>
                                        <div className="col-lg-2">
                                            <select id="tipopredio" className="form-control input-sm"
                                                    onChange={this.changeTipoProy}>

                                                <option value="URBANO">URBANO</option>
                                                <option value="RURAL">RURAL</option>

                                            </select>
                                        </div>

                                        <label className="col-lg-1 control-label"><span
                                            className="obligatorio">* </span>Uso</label>
                                        <div className="col-lg-2">
                                            <select id="tipopredio" className="form-control input-sm"
                                                    onChange={this.changeTipoProy}>

                                                <option value="URBANO">CASA HABITACION</option>
                                                <option value="RURAL">COMERCIAL</option>

                                            </select>
                                        </div>
                                        
                                        

                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Zonificacion
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Uso actual
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>

                                       



                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>Asentamiento Humano</label>
                                        <div className="col-lg-2">
                                            <select id="tipopredio" className="form-control input-sm"
                                                    onChange={this.changeTipoProy}>

                                                <option value="URBANO">Asentamiento Humano</option>
                                                <option value="RURAL">Urbanización</option>
                                                <option value="RURAL">Otros</option>

                                            </select>
                                        </div>
                                        <label className="col-lg-1 control-label"><span
                                            className="obligatorio">* </span>
                                          Otros
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Valor M2
                                        </label>
                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Valor Total del terreno
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>
                                    </div>

                                </div>
                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Edificaciones</legend>
                                    </fieldset>
                                </form>

                                <div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                            Area Techada</label>
                                        <div className="col-lg-2">

                                            <div className="btn-group">
                                                <button type="button"
                                                        className='btn btn-default'>SI
                                                </button>
                                                <button type="button"
                                                        className='btn btn-default'>NO
                                                </button>

                                            </div>

                                        </div>

                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                          Obras Complementarias</label>
                                        <div className="col-lg-2">

                                            <div className="btn-group">
                                                <button type="button"
                                                        className='btn btn-default'>SI
                                                </button>
                                                <button type="button"
                                                        className='btn btn-default'>NO
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                            Valor de las Edificaciones</label>
                                        <div className="col-lg-2">

                                            <input required className="form-control input-sm" type='text'
                                            ></input>

                                        </div>

                                       

                                       
                                    </div>

                                </div>

                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Plantaciones</legend>
                                    </fieldset>
                                </form>

                                <div>
                                    <div className="form-group">

                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                            Plantaciones</label>
                                        <div className="col-lg-2">

                                            <div className="btn-group">
                                                <button type="button"
                                                        className='btn btn-default'>SI
                                                </button>
                                                <button type="button"
                                                        className='btn btn-default'>NO
                                                </button>

                                            </div>

                                        </div>
                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                            Permanente</label>
                                        <div className="col-lg-2">

                                            <div className="btn-group">
                                                <button type="button"
                                                        className='btn btn-default'>SI
                                                </button>
                                                <button type="button"
                                                        className='btn btn-default'>NO
                                                </button>

                                            </div>

                                        </div>

                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                        Transitorias</label>
                                        <div className="col-lg-2">

                                            <div className="btn-group">
                                                <button type="button"
                                                        className='btn btn-default'>SI
                                                </button>
                                                <button type="button"
                                                        className='btn btn-default'>NO
                                                </button>

                                            </div>

                                        </div>
                                      
                                  
                                    </div>
                                    <div className="form-group">

                                
                                   
                                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                            Valor de las Plantaciones</label>
                                        <div className="col-lg-2">

                                            <input required className="form-control input-sm" type='text'
                                            ></input>

                                        </div>

                                    </div>
                               
                                </div>


                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext">Tasacion</legend>
                                    </fieldset>
                                </form>

                                <div>
                                    <div className="form-group">



                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Lucro Cesante 
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                            Daño Emergente
                                        </label>

                                        <div className="col-lg-2">
                                            <input required className="form-control input-sm" type='text'
                                            ></input>
                                        </div>

                                    </div>
                                    <div className="form-group">



                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>
                                         
                                        </label>


                                        <div className="col-lg-2">

                                            <div className="btn-group-vertical">
                                                <button type="button" className="btn btn-default">Negocio</button>
                                                <button type="button" className="btn btn-default">Arrendamiento</button>
                                                <button type="button" className="btn btn-default">Otros</button>
                                            
                                               
                                            </div>

                                        </div>

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>

                                        </label>

                                        <div className="col-lg-2">

                                            <div className="btn-group-vertical">
                                                <button type="button" className="btn btn-default">Perdida de Funcionalidad</button>
                                                <button type="button" className="btn btn-default">Translado de Bienes</button>
                                                <button type="button" className="btn btn-default">Gastos de Busqueda</button>
                                                <button type="button" className="btn btn-default">Acondicionamiento Remanente</button>
                                                <button type="button" className="btn btn-default">Instalacion de cerco perimetrico</button>
                                                <button type="button" className="btn btn-default">Otros</button>


                                            </div>
                                            

                                        </div>
                                        

                                    </div>
                                    
                                    


                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"></label>
                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>S/. 45,000.00</span><br></br>
                                            <small className="text-muted text-danger font-7 ">VALOR DEL TERRENO</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>S/. 45,000.00</span><br></br>
                                            <small className="text-muted text-danger font-7 ">VALOR DE LAS EDIFICACIONES</small>
                                        </div>
                                    </div>

                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>S/. 45,000.00</span><br></br>
                                            <small className="text-muted text-danger font-7 ">VALOR LAS PLATANCIONES</small>
                                        </div>
                                    </div>

                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>S/. 45,000.00</span><br></br>
                                            <small className="text-muted text-danger font-7 ">LUCRO CESANTE</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>S/. 0.00</span><br></br>
                                            <small className="text-muted text-danger font-7 ">DAÑO EMERGENTE</small>
                                        </div>
                                    </div>

                                    <label className="col-lg-2 control-label"></label>

                                    <div className="col-lg-2">
                                        <div className="pull-left m-left-sm ">
                                            <span>S/. 182,000.00</span><br></br>
                                            <small className="text-muted text-danger font-7 "><b>VALOR TOTAL</b></small>
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

export default Proce2;